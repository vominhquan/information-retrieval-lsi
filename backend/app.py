import json
import os
import pickle

import gensim
import numpy as np
import requests
from flask import Flask, jsonify, render_template, request
from gensim.corpora import Dictionary
from gensim.models import LsiModel
from loguru import logger
from sklearn.metrics.pairwise import cosine_similarity
from underthesea import word_tokenize

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


current_dir = os.path.abspath(os.path.dirname(__file__))
data_path = os.path.join(current_dir, 'news_dataset')
w2v_path = os.path.join(current_dir, 'model/baomoi.model.bin')
lsi_model_path = os.path.join(current_dir, 'model/lsi_model.pickle')
name_index_mapping_path = os.path.join(
    current_dir, 'model/doc_name_index_mapping.pickle')

# expansion
w2v_model = gensim.models.KeyedVectors.load_word2vec_format(
    w2v_path, binary=True)
logger.info(f'Loaded {w2v_path}')


def expand_query(query):
    mean_vec = np.zeros(w2v_model.vector_size)
    for q in query.split():
        if q in w2v_model:
            mean_vec += w2v_model[q]

    result = w2v_model.similar_by_vector(mean_vec, 5)
    result = [term for term, score in result if score > 0.6]
    return result


# LSI core
with open(lsi_model_path, 'rb') as handle:
    logger.info(f'Loaded {lsi_model_path}')
    dictionary, vectorized_corpus, model = pickle.load(handle)

with open(name_index_mapping_path, 'rb') as handle:
    logger.info(f'Loaded {name_index_mapping_path}')
    index2name, name2index = pickle.load(handle)


def query_corpus(query, use_expansion=False, top_n=20):
    expansion = []
    query_ = word_tokenize(query, 'text').lower()
    if use_expansion:
        expansion = expand_query(query_)

    query_bow = dictionary.doc2bow(query_.split() + expansion)
    query_lsi = np.array([v for i, v in model[query_bow]])

    result = list(enumerate(cosine_similarity(
        [query_lsi], vectorized_corpus)[0]))
    result = sorted(result, key=lambda x: x[1], reverse=True)[:top_n]
    result = [(index2name[i], score) for i, score in result]
    return result


def name2content(doc_name):
    content = ''
    with open(os.path.join(data_path, doc_name), 'r', encoding='utf-16', errors="ignore") as f:
        content = f.read()
    return content


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/search', methods=['POST', 'GET'])
def search():
    try:
        mock = request.args.get('mock', False)
        if mock:
            with open(os.path.join(current_dir, 'mock.json')) as f:
                result = json.load(f)
                return jsonify(**result)

        query = request.json.get('query')
        logger.info(query)

        logger.info('Query without expansion')
        result_no_expand = query_corpus(query, False)
        result_no_expand = [{'file': r, 'content': name2content(r), 'score': s} for r, s in result_no_expand]

        logger.info('Query with expansion')
        result_expand = query_corpus(query, True)
        result_expand = [{'file': r, 'content': name2content(r), 'score': s}  for r, s in result_expand]

        logger.info('Done')
        result = {
            'result_no_expand': result_no_expand,
            'result_expand': result_expand
        }
        return jsonify(result=result)
    except Exception as e:
        logger.exception(e)
        return jsonify(err=1)


if __name__ == '__main_':
    try:
        host = os.getenv('HOST', '0.0.0.0')
        port = os.getenv('PORT', 8081)
        logger.info(f'Started server at http://{host}:{port}')
        app.run(debug=True, port=port, host=host)
    except:
        logger.warning('server stopped')

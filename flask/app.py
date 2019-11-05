import os
import json
import requests
import gensim
import pickle

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from underthesea import word_tokenize
from gensim.models import LsiModel
from gensim.corpora import Dictionary

from flask import Flask, request, jsonify, render_template


app = Flask(__name__)

data_path = '/Users/admin/personal/master/ir/news_dataset/'
w2v_path = 'baomoi.model.bin'
lsi_model_path = 'lsi_model.pickle'
name_index_mapping_path = 'doc_name_index_mapping.pickle'

############### expansion
w2v_model = gensim.models.KeyedVectors.load_word2vec_format(w2v_path, binary=True)

def expand_query(query):
    mean_vec = np.zeros(w2v_model.vector_size)
    for q in query.split():
        if q in w2v_model:
            mean_vec +=w2v_model[q]

    result = w2v_model.similar_by_vector(mean_vec, 5)
    result = [term for term, score in result if score > 0.6]
    return result

############### LSI core
with open(lsi_model_path, 'rb') as handle:
    dictionary, vectorized_corpus, model = pickle.load(handle)

with open(name_index_mapping_path, 'rb') as handle:
    index2name, name2index = pickle.load(handle)

def query_corpus(query, use_expansion=False):
    expansion = []
    query_ = word_tokenize(query, 'text').lower()
    if use_expansion:
        expansion = expand_query(query_)
    
    query_bow = dictionary.doc2bow(query_.split() + expansion)
    query_lsi = np.array([v for i, v in model[query_bow]])
    
    result = list(enumerate(cosine_similarity([query_lsi], vectorized_corpus)[0]))
    result = sorted(result, key=lambda x:x[1], reverse=True)[:20]
    result = [(index2name[i], score) for i, score in result]
    return result

def name2content(doc_name):
    content=''
    with open(data_path + doc_name, 'r', encoding='utf-16', errors="ignore") as f:
        content = f.read()
    return content


@app.route("/")
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST', 'GET'])
def search():
    try:
        query = request.args.get('query')
        print(query)
        result_no_expand = query_corpus(query, False)
        result_no_expand = [name2content(r) for r, s in result_no_expand]
        result_expand = query_corpus(query, True)
        result_expand = [name2content(r) for r, s in result_expand]

        result = {
            'result_no_expand': result_no_expand,
            'result_expand': result_expand
        }

        return jsonify(result=result)
    except:
        return None


if __name__ == '__main_':
    try:
        print('run server')
        app.run(debug=True, port=8081, host='0.0.0.0')
    except:
        print('sc stop')
        sc.stop()
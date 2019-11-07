import React from 'react'
import Layout from '../components/layout'
import Result from '../components/result'
import fetch from 'isomorphic-unfetch'

import { Input, Row, Col, Typography, message, Spin } from 'antd';

const { Text, Title } = Typography;
const { Search } = Input;

const API_HOST = process.env.API_HOST || 'http://localhost:5000'
const SAMPLE_QUERIES = ['tai tạn giao thông', 'Du lịch hội an']

class Index extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			query: '',
			loading: false,
			result_expand: [],
			result_no_expand: []
		}
	}

	doSearch = (query) => {
		this.setState({ loading: true })
		fetch(`${API_HOST}/search`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		})
			.then(res => res.json())
			.then(res => {
				console.log(res)
				const { result_expand, result_no_expand } = res.result
				this.setState({ result_expand, result_no_expand, loading: false })
			})
			.catch(err => {
				message.error(`Error ${err}`)
				this.setState({ loading: false })
			})
	}

	render () {
		return (
			<Layout>

				<Row>
					<Col span={12} offset={6}>
						<Title level={2}>
							Information Retrivial Demo
						</Title>
						<Text>Search Engine using LSI, word2vec for query expansion ...</Text>

						<div style={{ marginTop: 20 }}>
							<Search
								placeholder="input search text"
								onSearch={value => this.doSearch(value)}
								enterButton
								loading={this.state.loading}
								size="large"
								value={this.state.query}
							/>
							<Text type="secondary">
								e.g. {SAMPLE_QUERIES.map(query => (
									<><a onClick={() => this.doSearch(query)}>{query}</a>{', '}</>
								))}...
							</Text>
						</div>
					</Col>
				</Row>

				<Row type="flex" justify="center">
					{this.state.loading ? <Spin /> : null}
				</Row>

				<Row type="flex" justify="center">
					<Col span={10}>
						<Result results={this.state.result_no_expand} title="Result WITHOUT query expansion" />
					</Col>

					<Col offset={1} span={10}>
						<Result results={this.state.result_expand} title="Result WITH query expansion" />
					</Col>
				</Row>


			</Layout>
		)
	}
}

export default Index;



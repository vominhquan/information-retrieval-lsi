import React from 'react'
import { List, Avatar, PageHeader } from 'antd';


const Result = ({ results, title = 'Results without expansion' }) => {
    if (!results || !results.length) return null;

    return (
        <>
            <PageHeader title={title} />
            <List
                itemLayout="horizontal"
                dataSource={results}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            // title={item}
                            description={item}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}

export default Result
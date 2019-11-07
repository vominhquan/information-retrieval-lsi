import React from 'react'
import { List, Typography, PageHeader, Popover } from 'antd';


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
                            title={<span>{item.file}{' '}(<i>score: {item.score.toFixed(5)}</i>)</span>}
                            description={
                                <Popover placement="bottom" trigger="click" content={item.content} title={<span>{item.file}{' '}(<i>score: {item.score.toFixed(5)}</i>)</span>}>
                                    <Typography.Paragraph style={{ cursor: 'pointer' }}>{item.content.substr(0, 300)}...</Typography.Paragraph>
                                </Popover>
                            }
                        />

                    </List.Item>
                )}
            />
        </>
    )
}

export default Result
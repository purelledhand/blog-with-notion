/***********************************************/
/* 포스트 내 블록들의 id, title, content를 반환합니다. */ 
/***********************************************/
const fetch = require('node-fetch');
const {getBlogPage} = require('./getBlogPage');
//const {callNotionApi} = require('./callNotionApi');
const { API_ENDPOINT, NOTION_TOKEN } = require('./manifest');

async function getPreview() {
    postIds = await getBlogPage();

    const postContent = postIds.map(async post => {
        const res = await fetch(`${API_ENDPOINT}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              cookie: `token_v2=${NOTION_TOKEN}`,
            },
            body: JSON.stringify({
                pageId: post,
                limit: 10,
                cursor: { stack: [] },
                chunkNumber: 0,
                verticalColumns: false,
            }),
        });

        if(res.ok) {
            let postContents = await res.json();
            let previewObject = {}
            const postBody = postContents.recordMap.block[post].value
            if('properties' in postBody && 'title' in postBody.properties) {
                previewObject = {
                    "postId": post,
                    "postTitle": postBody.properties.title[0][0]
                }
            }
            const contentIds = postContents.recordMap.block[post].value.content;
            try {
                let previewStr = contentIds.map(id => {
                    if(postContents.recordMap.block[id] === undefined) return;
                    const body = postContents.recordMap.block[id].value;
                    if('properties' in body && 'title' in body.properties) {
                        return body.properties.title[0][0]
                    }
                });
                previewStr = previewStr.join(' ')

                previewObject = {
                    ...previewObject,
                    "preview": previewStr.substr(0,500)
                }
                
                return previewObject;
            } catch (e) {
                return null;
            }
        }
    });

    return await Promise.all(postContent);
}

/*
getPreview()
    .then(r => console.log(r))
    .catch(e => console.log(e));
*/
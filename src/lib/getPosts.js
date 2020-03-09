/********************************************/
/* 포스트 내 블록들의 마크다운 타입과 내용을 반환합니다. */ 
/********************************************/
const fetch = require('node-fetch');
const {getBlogPage} = require('./getBlogPage');
//const {callNotionApi} = require('./callNotionApi');
const { API_ENDPOINT, NOTION_TOKEN } = require('./manifest');

async function getPostContents() {
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
            let postObject = {}
            if('properties' in postContents.recordMap.block[post].value && 'title' in postContents.recordMap.block[post].value.properties) {
                postObject = {
                    "postTitle": postContents.recordMap.block[post].value.properties.title[0][0]
                }
            }
            const contentIds = postContents.recordMap.block[post].value.content;
            try {
                let contentsObject = contentIds.map(id => {
                    const body = postContents.recordMap.block[id].value;
                    let mdObject = {"type": body.type};
                    if('properties' in body && 'title' in body.properties) {
                        mdObject =  {
                            ...mdObject,
                            "title": body.properties.title[0][0]
                        };
                    }
                    else if(body.type==="image") {
                        mdObject = {
                            ...mdObject,
                            "source": body.properties.source[0][0]
                        }
                    }

                    return mdObject;
                });

                postObject = {
                    ...postObject,
                    contentsObject
                }

                return postObject;
            } catch (e) {
                return null;
            }
        }
    });

    return await Promise.all(postContent);
}

getPostContents()
    .then(r => console.log(r))
    .catch(e => console.log(e));
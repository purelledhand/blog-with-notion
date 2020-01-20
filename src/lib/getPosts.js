const fetch = require('node-fetch');
const {getBlogPage} = require('./getBlogPage');
const {callNotionApi} = require('./callNotionApi');
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
            
            const contentIds = postContents.recordMap.block[post].value.content;
            
            try {
                return contentIds.map(id => {
                    const body = postContents.recordMap.block[id].value;
                    if('properties' in body && 'title' in body.properties) {
                        return {
                            "type": body.type,
                            "title": body.properties.title[0][0]
                        };
                    }

                    return null;
                });
            } catch (e) {
                return null;
            }
        }
    });

    return await Promise.all(postContent);
}

getPostContents()
    .then(r => console.log(r))
    .catch(e => console.log('C'));
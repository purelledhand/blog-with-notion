const fetch = require('node-fetch');
const { BLOG_UUID, API_ENDPOINT, NOTION_TOKEN } = require('./manifest');

async function getBlogPage() {
    const res = await fetch(`${API_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: `token_v2=${NOTION_TOKEN}`,
        },
        body: JSON.stringify({
            pageId: BLOG_UUID,
            limit: 4,
            cursor: { stack: [] },
            chunkNumber: 0,
            verticalColumns: false,
        }),
    });

    if(res.ok) {
        return res.json().then(json => json.recordMap.block[BLOG_UUID].value.content);
    }
}

getBlogPage().then(res => {
    console.log(res);
});

module.exports = {getBlogPage};
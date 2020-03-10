/******************************************/
/* 블로그 테이블 내 각 페이지들의 UUID를 반환합니다. */ 
/******************************************/
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
            limit: 10,
            cursor: { stack: [] },
            chunkNumber: 0,
            verticalColumns: false,
        }),
    });

    if(res.ok) {
        const posts = await res.json();
        return Object.values(posts.recordMap.collection_view)[0].value.page_sort;
    }
}

module.exports = { getBlogPage };
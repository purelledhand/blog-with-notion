const { BLOG_ID, TOKEN } = require('./config.js');

const path = require('path');

const normalizeUuid = id => {
  if (!id) {
    throw new Error(
        `BLOG_ID in config.js is empty.`
    )
  }
  if (id.length === 36 && id[8] === '-' && id[12] === '-' && id[16] === '-') return id;
  return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(
    16,
    4
  )}-${id.substr(20)}`
}

const NOTION_TOKEN = TOKEN;
const BLOG_UUID = normalizeUuid(BLOG_ID);
const API_ENDPOINT = 'https://www.notion.so/api/v3/loadPageChunk';

module.exports = {
  NOTION_TOKEN,
  BLOG_UUID,
  API_ENDPOINT,
}
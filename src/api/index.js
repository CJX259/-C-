import axios from 'axios';
import baseUrl, { URLs } from './urls';

const appkey = 'dd_1597654682810';
const request = axios.create({
  baseURL: baseUrl,
  params: {
    appkey,
  },
});

export async function getsidebar(type) {
  const res = await request.get(URLs.getsidebar, {
    params: {
      type,
    },
  });
  return res.data;
}

export async function getGoodsList(type, page, sort, size) {
  const res = await request.get(URLs.getGoodsList, {
    params: {
      type,
      page,
      sort,
      size,
    },
  });
  return res.data;
}

export async function searchByLike(likeValue) {
  const res = await request.get(URLs.likeSearch, {
    params: {
      likeValue,
    },
  });
  return res.data;
}

export async function search(value, page, size) {
  const res = await request.get(URLs.search, {
    params: {
      type: value,
      page,
      size,
    },
  });
  return res.data;
}

// 传入一个数组
export async function getGoodsById(value) {
  const res = await request.get(URLs.getGoodsByIds, {
    params: {
      value,
    },
  });
  return res.data;
}

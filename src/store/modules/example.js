/**
 * @file app store
 * @author
 */

import http from '@/api';
import queryString from 'query-string';

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  // 注意：当部署上线时，需要将这里全部的 http://dev.ce.bktencent.com:8000 更改为你线上后端模块的URL！！！
  // 注意：当部署上线时，需要将这里全部的 http://dev.ce.bktencent.com:8000 更改为你线上后端模块的URL！！！
  // 注意：当部署上线时，需要将这里全部的 http://dev.ce.bktencent.com:8000 更改为你线上后端模块的URL！！！
  // 注意：当部署上线时，需要将这里全部的 http://dev.ce.bktencent.com:8000 更改为你线上后端模块的URL！！！
  // 注意：当部署上线时，需要将这里全部的 http://dev.ce.bktencent.com:8000 更改为你线上后端模块的URL！！！
  // 注意：当部署上线时，需要将这里全部的 http://dev.ce.bktencent.com:8000 更改为你线上后端模块的URL！！！
  actions: {
    getTableData(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      return http.get(`/api/table?&${queryString.stringify(params)}`, params, config);
    },
    // 查询业务列表
    getBizData(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      return http.get(`http://dev.ce.bktencent.com:8000/biz-list`, params, config);
    },
    // 根据业务ID，查询集群列表
    getSetData(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `http://dev.ce.bktencent.com:8000/set-list?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
    // 根据业务ID和集群ID，查询模块列表
    getModuleData(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `http://dev.ce.bktencent.com:8000/module-list?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
    // 根据传入的查询参数，查询主机列表
    getHostsData(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `http://dev.ce.bktencent.com:8000/host-list?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
    // 根据传入的主机ID，查询主机详情信息
    getHostDetail(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `http://dev.ce.bktencent.com:8000/host-detail?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
  },
};

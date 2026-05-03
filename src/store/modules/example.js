/**
 * @file app store
 * @author
 */

import http from '@/api';
import queryString from 'query-string';

// eslint-disable-next-line no-undef
const BK_BACKEND_API_PREFIX = process.env.BK_BACKEND_API_PREFIX;

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
      return http.get(`${BK_BACKEND_API_PREFIX}/biz-list`, params, config);
    },
    // 根据业务ID，查询集群列表
    getSetData(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `${BK_BACKEND_API_PREFIX}/set-list?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
    // 根据业务ID和集群ID，查询模块列表
    getModuleData(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `${BK_BACKEND_API_PREFIX}/module-list?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
    // 根据传入的查询参数，查询主机列表
    getHostsData(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `${BK_BACKEND_API_PREFIX}/host-list?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
    // 根据传入的主机ID，查询主机详情信息
    getHostDetail(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `${BK_BACKEND_API_PREFIX}/host-detail?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
    // 根据传入的主机ID列表、文件目录和文件后缀，查询主机上符合条件的文件
    searchFile(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `${BK_BACKEND_API_PREFIX}/search-file?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
    // 根据传入的主机ID和文件信息，备份符合要求的文件到指定目录
    backupFile(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `${BK_BACKEND_API_PREFIX}/backup-file?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },
    // 查询备份记录
    getBackupRecord(context, params, config = {}) {
      // eslint-disable-next-line no-undef
      const url = `${BK_BACKEND_API_PREFIX}/backup-record?${queryString.stringify(params)}`;
      return http.get(url, {}, config);
    },

  },
};

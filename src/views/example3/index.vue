<template>
  <div class="example3-wrapper">
    <bk-container :col="11">
      <bk-col :span="5">
        <bk-form form-type="inline">
          <bk-form-item label="业务">
            <p style="font-size: 14px">demo体验业务</p>
          </bk-form-item>
        </bk-form>
        <br />
        <br />
        <bk-form form-type="inline">
          <bk-form-item label="查询目录">
            <bk-input v-model="searchPath" />
          </bk-form-item>
          <bk-form-item label="查找后缀">
            <bk-input v-model="suffix" />
          </bk-form-item>
          <bk-form-item>
            <span
              v-bk-tooltips.top-start="'目录以\' / \'开头，后缀不包含\' . \''"
              style="color: #3b83ff"
            >
              <i class="bk-icon icon-info-circle-shape"></i>
            </span>
          </bk-form-item>
          <bk-form-item>
            <bk-button
              :theme="'primary'"
              type="submit"
              @click="searchFile"
              class="mr10"
              >查询</bk-button
            >
          </bk-form-item>
        </bk-form>
        <bk-table
          style="margin-top: 15px"
          :data="hostList"
          :pagination="pagination1"
          @page-change="handlePageChange1"
          @page-limit-change="handlePageLimitChange1"
        >
          <bk-table-column label="主机ID" prop="bk_host_id" />
          <bk-table-column label="主机IP" prop="bk_host_innerip" />
          <bk-table-column label="选择" prop="is_selected">
            <template slot-scope="{ row }">
              <bk-switcher v-model="row.is_selected" theme="primary">
              </bk-switcher>
            </template>
          </bk-table-column>
        </bk-table>
      </bk-col>
      <bk-col :span="6">
        <bk-form form-type="inline" style="margin-top: 50px">
          <bk-form-item label="备份目录">
            <bk-input v-model="backupPath" />
          </bk-form-item>
        </bk-form>
        <bk-table
          style="margin-top: 15px"
          :data="fileData"
          :pagination="pagination2"
          @page-change="handlePageChange2"
          @page-limit-change="handlePageLimitChange2"
          v-bkloading="{ isLoading: isLoading, title: loadingText, zIndex: 15 }"
        >
          <bk-table-column label="主机ID" prop="bk_host_id" />
          <bk-table-column label="文件列表" prop="bk_file_list" />
          <bk-table-column label="文件数量" prop="bk_file_cnt" />
          <bk-table-column label="文件总大小(字节)" prop="bk_file_total_size" />
          <bk-table-column label="操作" prop="bk_file_option">
            <template slot-scope="{ row }">
              <span
                @click="backupFile(row.bk_host_id)"
                style="color: #0000edff; cursor: pointer"
                >立即备份</span
              >
            </template>
          </bk-table-column>
        </bk-table>
      </bk-col>
    </bk-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      suffix: "log",
      hostList: [],
      host_id_list: [],
      searchPath: "/project",
      backupPath: "/project/backup",
      fileData: [],
      isLoading: false,
      loadingText: "",
      pagination1: {
        current: 1,
        count: 0,
        limit: 10,
      },
      pagination2: {
        current: 1,
        count: 0,
        limit: 10,
      },
    };
  },
  created() {
    this.searchHosts();
  },
  methods: {
    async searchHosts() {
      const data = {
        bk_biz_id: 3,
        start: (this.pagination1.current - 1) * this.pagination1.limit,
        limit: this.pagination1.limit,
      };
      const hostRes = await this.$store.dispatch("example/getHostsData", data, {
        fromCache: true,
      });
      // 对可用主机做筛选
      this.hostList = hostRes.data.info.filter(
        (host) => host.bk_host_id >= 865 && host.bk_host_id <= 869
      );
      for (const host of this.hostList) {
        host.is_selected = false;
      }
      // TODO：参照bk-table组件文档，实现分页操作
      this.pagination1.count = hostRes.data.count;
    },
    handlePageChange1(page) {
      this.pagination1.current = page;
      this.searchHosts();
    },
    handlePageChange2(page) {
      this.pagination2.current = page;
      this.searchFile();
    },
    // 监听每页条数变化
    handlePageLimitChange1(limit) {
      this.pagination1.limit = limit;
      this.pagination1.current = 1; // 重置到第一页
      this.searchHosts();
    },
    // 监听每页条数变化
    handlePageLimitChange2(limit) {
      this.pagination2.limit = limit;
      this.pagination2.current = 1; // 重置到第一页
      this.searchFile();
    },
    // 封装后的消息提示，让 searchFile 函数更简洁
    showMessage(message, theme = "primary") {
      this.$bkMessage({
        theme: theme,
        message: message,
        offsetY: 80,
      });
    },
    async searchFile() {
      this.host_id_list = this.hostList
        .filter((host) => host.is_selected)
        .map((host) => parseInt(host.bk_host_id));
      this.host_id_list = this.host_id_list.join(",");
      if (this.host_id_list.length === 0) {
        this.showMessage("请选择主机");
        return;
      }
      // TODO: 可修改为更完备的参数校验
      // 1. 去除首尾空格，防止输入纯空格
      const searchPath = this.searchPath.trim();
      const suffix = this.suffix.trim();

      // 2. 校验目录路径（更完备的校验）
      // 正则逻辑：必须以 / 开头（类Unix路径），且不能包含非法字符
      const pathRegex = /^\/([a-zA-Z0-9._-]+\/)*[a-zA-Z0-9._-]*$/;
      
      if (searchPath === "") {
        this.showMessage("请输入查找目录！", "primary");
        return;
      } else if (!pathRegex.test(searchPath)) {
        this.showMessage("请输入合法的绝对路径！", "error");
        return;
      }

      // 3. 校验后缀
      // 正则逻辑：通常后缀不应包含空格或特殊路径转义符
      const suffixRegex = /^[a-zA-Z0-9.]+$/;
      if (suffix === "") {
        this.showMessage("请输入查找后缀！", "primary");
        return;
      } else if (!suffixRegex.test(suffix)) {
        this.showMessage("后缀格式不正确（仅限字母、数字和点）", "error");
        return;
      }
      const queryData = {
        host_id_list: this.host_id_list,
        search_path: this.searchPath,
        suffix: this.suffix,
        start: (this.pagination2.current - 1) * this.pagination2.limit,
        limit: this.pagination2.limit,
      };
      this.loadingText = "正在查找文件……";
      this.isLoading = true;
      let res;
      try {
        res = await this.$store.dispatch("example/searchFile", queryData, {});
      } catch (err) {
        console.log(err);
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      this.fileData = [];
      let errMsg = "";
      for (const log of res.data) {
        if (log.message) {
          // 目录不存在或查找失败
          errMsg += `${log.bk_host_id}: ${log.message}` + "; ";
        } else {
          this.fileData.push(JSON.parse(JSON.stringify(log)));
        }
      }
      if (errMsg !== "") {
        const config = {
          theme: "error",
          message: errMsg,
          offsetY: 80,
          ellipsisLine: 3,
        };
        this.$bkMessage(config);
      }
      this.pagination2.count = res.total;

    },
    async backupFile(hostId) {
      this.host_id_list = [hostId];
      if (this.backupPath === "") {
        const config = {
          theme: "primary",
          message: "请输入备份目录！",
          offsetY: 80,
        };
        this.$bkMessage(config);
        return;
      }
      const queryData = {
        host_id_list: this.host_id_list,
        search_path: this.searchPath,
        suffix: this.suffix,
        backup_path: this.backupPath,
      };
      this.loadingText = "正在备份文件……";
      this.isLoading = true;
      try {
        await this.$store.dispatch("example/backupFile", queryData, {});
      } catch (err) {
        console.log(err);
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      const config = {
        theme: "success",
        message: "文件备份成功！",
        offsetY: 80,
      };
      this.$bkMessage(config);
    },
  },
};
</script>


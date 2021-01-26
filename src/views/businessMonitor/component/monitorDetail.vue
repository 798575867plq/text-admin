<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle">
        <a-icon type="smile-o" />Name
      </span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >{{ tag.toUpperCase() }}</a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import NIM from "../../../utils/NIM_Web_NIM_v7.9.0";
import WebRTC from "../../../utils/NIM_Web_WebRTC_v7.9.0.js";

const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
  created() {
    this.getNim();
  },
  methods: {
    getNim() {
      // const nim = SDK.NIM.getInstance({
      //   debug: true,
      // });

      NIM.use(WebRTC);
      // console.log(SDK);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
import axios from "axios";
import qs from "qs";
import { message } from "antd";
const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.defaults.transformRequest = (data) => {
  if (data !== null && typeof data === "object") data = qs.stringify(data);
  console.log("9527:data", data);

  return data;
};
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理，例如添加 token 等
    return config;
  },
  (error) => {
    // 请求错误时做一些处理
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 对响应数据做一些处理，例如统一处理错误码等
    return response.data;
  },
  (error) => {
    message.error("当前网路繁忙，请稍后再试！！！");
    // 响应错误时做一些处理
    return Promise.reject(error);
  }
);

export default instance;

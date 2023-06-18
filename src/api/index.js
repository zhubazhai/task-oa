import request from "./request";

export const getTaskList = (params) => {
  return request({ url: "/getTaskList", method: "get", params });
};
export const addTask = (data) => {
  return request({ url: "/addTask", method: "post", data });
};
export const removeTask = (params) => {
  return request({ url: "/removeTask", method: "get", params });
};

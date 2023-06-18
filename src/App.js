import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Button, Tag, Table, Modal, Form, Input, DatePicker } from "antd";
import { getTaskList, addTask, removeTask } from "../src/api/index";
import { flushSync } from "react-dom";

class App extends React.Component {
  state = {
    tableData: [],
    modelVisible: false,
    tabState: 0,
    loading: false,
    ruleFrom: { task: "", time: "" }
  };
  columns = [
    // {
    //   title: "序号",
    //   dataIndex: "index",
    //   width: 80,
    //   render: (value, record, index) => index + 1
    // },
    { title: "编号", dataIndex: "state" },
    { title: "任务描述", dataIndex: "task" },
    { title: "状态", dataIndex: "state" },
    { title: "完成时间", dataIndex: "time" },
    {
      title: "操作",
      dataIndex: "action",
      render: (value, record, index) => (
        <Button
          size="small"
          onClick={async () => {
            await removeTask({ id: record.id });
            this.getData();
          }}
        >
          删除
        </Button>
      )
    }
  ];

  closeModal = () => {
    this.setState({ modelVisible: false });
  };
  submit = async () => {
    const { task, time } = this.state.ruleFrom;
    await addTask({ task: { task }, time });
    this.setState({ modelVisible: false });
    this.getData();
  };
  getData = async () => {
    const { tabState } = this.state;
    this.setState({ loading: true });
    let { list } = await getTaskList({ state: tabState });

    this.setState({ tableData: list, loading: false });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    let { tableData, modelVisible, tabState, loading } = this.state;

    return (
      <div className="App">
        <h2 className="App-header">
          <span className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span> OA 任务管理系统</span>
          </span>
          <Button
            size="small"
            onClick={() => {
              this.setState({
                modelVisible: true
              });
            }}
          >
            新增任务
          </Button>
        </h2>
        <div className="App-body">
          <div className="tag-box">
            {[
              { label: "全部", state: 0 },
              { label: "未完成", state: 1 },
              { label: "已完成", state: 2 }
            ].map((i) => (
              <Tag
                color={tabState === i.state ? "#282c34" : "blue"}
                onClick={() => {
                  console.log("9527:componentDidMount");
                  flushSync(() => {
                    this.setState({
                      tabState: i.state
                    });
                  });
                  this.getData();
                }}
              >
                {i.label}
              </Tag>
            ))}
          </div>
          <Table
            dataSource={tableData}
            columns={this.columns}
            loading={loading}
          />
        </div>
        <Modal
          title="新增"
          open={modelVisible}
          onCancel={this.closeModal}
          okText="确认提交"
          cancelText="取消"
          onOk={this.submit}
        >
          <Form>
            <Form.Item
              label="任务"
              value={this.state.ruleFrom.task}
              onChange={(ev) => {
                this.setState({
                  ruleFrom: { ...this.state.ruleFrom, task: ev.target.value }
                });
                console.log("9527: ev.target", ev.target.value);
              }}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="时间">
              <DatePicker
                showTime
                value={this.state.ruleFrom.time}
                onChange={(time) => {
                  this.setState({
                    ruleFrom: { ...this.state.ruleFrom, time }
                  });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Button, Tag, Table, Modal } from "antd";

class App extends React.Component {
  state = {
    tableData: [],
    modelVisible: false
  };
  columns = [
    { title: "序号" },
    { title: "编号" },
    { title: "任务描述" },
    { title: "状态" },
    { title: "完成时间" },
    { title: "操作" }
  ];
  render() {
    let { tableData, modelVisible } = this.state;

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
            <Tag color="#282c34">全部</Tag>
            <Tag>已完成</Tag>
            <Tag>未完成</Tag>
          </div>
          <Table
            dataSource={tableData}
            columns={this.columns}
            loading={false}
          />
        </div>
        <Modal title="新增" open={modelVisible}></Modal>
      </div>
    );
  }
}

export default App;

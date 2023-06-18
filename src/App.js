import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Button, Tag, Table } from "antd";

class App extends React.Component {
  state = {
    tableData: []
  };
  columns = [];
  render() {
    let { tableData } = this.state;
    return (
      <div className="App">
        <h2 className="App-header">
          <span className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span> OA 任务管理系统</span>
          </span>
          <Button size="small">新增任务</Button>
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
      </div>
    );
  }
}

export default App;

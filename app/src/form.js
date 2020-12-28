"use strict";

import React from "react";
import { render } from "react-dom";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "", result: "" };

    this.handleChange = this.handleChange.bind(this);
    this.testStart = this.testStart.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }
  testStart() {
    // this.setState({ url: event.target.value });
    axios.get("http://localhost:3131/test_start?url=" + this.state.url).then((res) => {
      this.setState({ result: res.data.result });
    });
  }

  render() {
    return (
      <div>
        <div className="content">
          <input type="text" value={this.state.url} onChange={this.handleChange} />
        </div>
        <div className="content">
          <button type="button" onClick={this.testStart}>
            テスト開始
          </button>
        </div>
        <div className="content">
          結果
          <textarea className="result-text" defaultValue={this.state.result}></textarea>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector("#form");
render(<Form />, domContainer);

"use strict";

import React from "react";
import { render } from "react-dom";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "", result: "", hierarchy: "" };

    this.handleHierarchyChange = this.handleHierarchyChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.testStart = this.testStart.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }
  handleHierarchyChange(event) {
    this.setState({ hierarchy: event.target.value });
  }
  testStart() {
    // this.setState({ url: event.target.value });
    axios.get("http://localhost:3131/test_start?url=" + this.state.url + "&hierarchy=" + this.state.hierarchy).then((res) => {
      this.setState({ result: res.data.result });
    });
  }

  render() {
    return (
      <div>
        <label className="content">
          <p>URL</p>
          <input type="text" value={this.state.url} onChange={this.handleChange} />
        </label>
        <label className="content">
          <p>階層</p>
          <input type="text" className="bottom-margin" value={this.state.hierarchy} onChange={this.handleHierarchyChange} />
        </label>
        <div className="content">
          <button type="button" onClick={this.testStart}>
            テスト開始
          </button>
        </div>
        <div className="content">
          <p>結果</p>
          <textarea className="result-text" defaultValue={this.state.result}></textarea>
        </div>
      </div>
    );
  }
}

// const domContainer = document.querySelector("#form");
// render(<Form />, domContainer);
export default Form;

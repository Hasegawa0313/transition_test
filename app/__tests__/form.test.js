import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import "regenerator-runtime";

import Form from "../src/form";
import { ExpectationFailed } from "http-errors";
import axios from "axios";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  container.id = "form";
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("URLを入力し、テスト開始する", async () => {
  const fakeResult = {
    message: "compolete",
    result: "hogehogeho~ge",
  };

  const mockGet = jest.spyOn(axios, "get");
  mockGet.mockImplementation((url) => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeResult),
    });
  });

  await act(async () => {
    render(<Form />, container);
  });

  fireEvent.change(screen.getByLabelText("URL", { selector: "input" }), {
    target: { value: "http://localhost:3111" },
  });
  fireEvent.click(screen.getByText("テスト開始"));

  const textarea = document.querySelector("textarea");
  console.log(textarea.attributes);

  expect(textarea.value).toBe(fakeResult.result);

  axios.get.mockRestore();
});

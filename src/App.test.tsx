import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from './App';

describe("App", () => {
  test("Has empty messages on load", () => {
    const app: RenderResult = render(
      <App />
    )
    expect(app.getByText("Messages")).toBeInTheDocument()
  })
  test("Has username form on load", () => {
    const app: RenderResult = render(
      <App />
    )
    expect(app.getByText("Username: anonimo")).toBeInTheDocument()
  })
})

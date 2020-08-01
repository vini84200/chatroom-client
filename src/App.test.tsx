import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';

describe("App", () => {
  
  it("Has username form on load", () => {
    const app: RenderResult = render(
      <App />
    )
    expect(app.getByText("Username: anonimo")).toBeInTheDocument()
  })
})

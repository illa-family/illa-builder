import { render, screen } from "@testing-library/react"
import { WrappedAlert } from "../index"
import "@testing-library/jest-dom"

test("WrappedAlert renders correctly", () => {
  render(<WrappedAlert title="Alert Title" content="Alert Content" />)
  expect(screen.getByText("Alert Title")).toBeInTheDocument()
  expect(screen.getByText("Alert Content")).toBeInTheDocument()
})

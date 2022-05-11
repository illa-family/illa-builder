import { render, screen } from "@testing-library/react"
import { WrappedButton } from "../../Button"

test("WrappedButton renders correctly", () => {
  render(<div>WrappedButton</div>)
  expect(screen.getByText("Button")).toBeInTheDocument()
})

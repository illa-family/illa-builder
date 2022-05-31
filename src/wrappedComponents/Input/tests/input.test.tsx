import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { WrappedInput } from "../index"

import userEvent from "@testing-library/user-event"
import { WrappedInputRefType } from "../interface"
import { WrappedEditableText } from "../../EditableText"
test("WrappedInput renders correctly", () => {
  render(<WrappedInput placeholder={"input-placeholder"} />)
  expect(screen.getByPlaceholderText("input-placeholder")).toBeInTheDocument()
})

test("WrappedInput renders correctly when enter", async () => {
  const changeEvent = jest.fn()
  render(
    <WrappedInput
      value={"test-editable-text"}
      placeholder={"input-placeholder"}
      onChange={changeEvent}
    />,
  )

  expect(screen.getByPlaceholderText("input-placeholder")).toBeInTheDocument()
  await userEvent.type(
    screen.getByPlaceholderText("input-placeholder"),
    " World!",
  )
  expect(changeEvent).toBeCalled()
})

test("WrappedInput renders correctly with prefix and suffix", async () => {
  render(
    <WrappedInput
      value={"test-editable-text"}
      prefixIcon={<span>prefixIcon </span>}
      suffixIcon={<span>suffixIcon</span>}
      prefixText={"prefixText"}
      suffixText={"suffixText"}
    />,
  )
  expect(screen.getByText("prefixIcon")).toBeInTheDocument()
  expect(screen.getByText("suffixIcon")).toBeInTheDocument()
  expect(screen.getByText("prefixText")).toBeInTheDocument()
  expect(screen.getByText("suffixText")).toBeInTheDocument()
})

test("WrappedInpute enders with ref", () => {
  let inputRef: WrappedInputRefType | null
  render(
    <div>
      <WrappedInput
        value={"test-editable-text"}
        placeholder={"input-placeholder"}
        ref={(ref) => (inputRef = ref)}
      />
      <button
        onClick={() => {
          inputRef?.focus()
        }}
      >
        click up
      </button>
    </div>,
  )
  fireEvent.click(screen.getByText("click up"))
  expect(screen.getByPlaceholderText("input-placeholder")).toHaveFocus()
})

import { ValidateCheckProps } from "./interface"

export const handleValidateCheck = (
  value?: string,
  props?: ValidateCheckProps,
) => {
  if (!value || !props) return true
  if (props.maxLength && value.length > Number.parseInt(props.maxLength)) {
    return false
  }
  if (props.minLength && value.length < Number.parseInt(props.minLength)) {
    return false
  }

  switch (props.pattern) {
    case "Email":
      return validateEmail(value)
    case "URL":
      return isValidURL(value)
    case "Regex":
      if (!props.regex) return true
      const matchPattern = new RegExp(props.regex)
      return matchPattern.test(value)
  }
}

const validateEmail = (email: string) => {
  const str =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailMatchPattern = new RegExp(str)
  return emailMatchPattern.test(email)
}

function isValidURL(str: string) {
  const matchStr = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  const urlMatchPattern = new RegExp(matchStr)
  return urlMatchPattern.test(str)
}

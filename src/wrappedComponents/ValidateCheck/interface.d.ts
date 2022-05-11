export interface ValidateCheckProps {
  pattern?: "Email" | "URL" | "Regex"
  regex?: string
  minLength?: string
  maxLength?: string
}

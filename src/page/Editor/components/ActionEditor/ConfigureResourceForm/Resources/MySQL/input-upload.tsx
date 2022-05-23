import { Input } from "@illa-design/input"
import { useState, useRef, FC } from "react"
import { InputUploadProps } from "./interface"
import { Button } from "@illa-design/button"
import { DisplayNoneCSS } from "./style"

export const InputUpload: FC<InputUploadProps> = (props) => {
  const { resetValue, registerValue } = props
  const [fileName, setFileName] = useState("")
  const uploadRef = useRef<HTMLInputElement | null>(null)
  const handleUpload = () => {
    uploadRef.current?.click()
  }
  return (
    <div>
      <Input
        placeholder="e.g.path/to/root.crt"
        value={fileName}
        suffix={{
          render: (
            <Button
              variant="text"
              colorScheme="techPurple"
              onClick={handleUpload}
              type="button"
            >
              Choose a File
            </Button>
          ),
        }}
        onClear={() => {
          setFileName("")
          resetValue()
        }}
        allowClear
      />
      <input
        css={DisplayNoneCSS}
        {...registerValue}
        ref={(e) => {
          registerValue.ref(e)
          uploadRef.current = e
        }}
        onChange={(event) => {
          registerValue.onChange(event)
          const files = event.target.files
          if (files) {
            setFileName(files[0].name)
          }
        }}
        type="file"
      />
    </div>
  )
}

InputUpload.displayName = "InputUpload"

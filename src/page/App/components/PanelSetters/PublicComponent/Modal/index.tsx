import { FC, useMemo } from "react"
import { modalWrapperStyle } from "./style"
import { ModalHeader } from "./header"
import { ModalBody } from "./body"
import { ModalProps } from "./interface"
import { css } from "@emotion/react"

export const BaseModal: FC<ModalProps> = (props) => {
  const {
    title,
    handleCloseModal,
    childrenSetter,
    widgetDisplayName,
    attrPath,
    _css,
    header,
  } = props

  const _header = useMemo(() => {
    return (
      header ?? (
        <ModalHeader title={title} handleCloseModal={handleCloseModal} />
      )
    )
  }, [header, title, handleCloseModal])

  return (
    <div css={css(modalWrapperStyle, _css)}>
      {_header}
      <ModalBody
        childrenSetter={childrenSetter}
        widgetDisplayName={widgetDisplayName}
        attrPath={attrPath}
      />
    </div>
  )
}
BaseModal.displayName = "BaseModal"

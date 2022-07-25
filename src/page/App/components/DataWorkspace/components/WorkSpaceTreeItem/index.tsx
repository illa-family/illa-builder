import { FC } from "react"
import { CaretRightIcon } from "@illa-design/icon"
import { motion } from "framer-motion"
import { WorkSpaceTreeItemProps } from "./interface"
import {
  itemNameStyle,
  itemNameDescStyle,
  applyItemContainerStyle,
  applyExpandIconStyle,
  applyJsonContentStyle,
  jsonContentAnimation,
} from "./style"
import { useDispatch, useSelector } from "react-redux"
import { getExpandedKeys } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { WorkSpaceTreeNode } from "./WorkSpaceTreeNode"

export const WorkSpaceTreeItem: FC<WorkSpaceTreeItemProps> = (props) => {
  const { title, data, isSelected, handleSelect } = props
  const expandedKeys = useSelector(getExpandedKeys)
  const isExpanded = expandedKeys.includes(title)
  const dispatch = useDispatch()
  const keyArr = Object.keys(data).filter((item) => !item.startsWith("$"))
  return (
    <div
      onClick={() => {
        handleSelect?.([title])
      }}
    >
      <div
        css={applyItemContainerStyle(isSelected, 0)}
        onClick={() => {
          if (isExpanded) {
            dispatch(configActions.removeExpandedKey(title))
          } else {
            dispatch(configActions.setExpandedKey(expandedKeys.concat(title)))
          }
        }}
      >
        <span css={applyExpandIconStyle(isExpanded, 0)}>
          <CaretRightIcon />
        </span>
        <label css={itemNameStyle}>{title}&nbsp;</label>
        <label css={itemNameDescStyle}>
          {`{}`}&nbsp;{keyArr.length}
          {keyArr.length > 1 ? "keys" : "key"}
        </label>
      </div>
      <motion.div
        css={applyJsonContentStyle(isSelected, keyArr.length > 0 && isExpanded)}
        variants={jsonContentAnimation}
        role="region"
        animate={isExpanded ? "enter" : "exit"}
        initial={false}
        transition={{ duration: 0.2 }}
      >
        {keyArr.map((name) => (
          <WorkSpaceTreeNode
            key={name}
            name={name}
            value={data[name]}
            itemKey={title + name}
            level={0}
          />
        ))}
      </motion.div>
    </div>
  )
}

WorkSpaceTreeItem.displayName = "WorkSpaceTreeItem"

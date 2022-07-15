import { forwardRef } from "react"
import { Pagination } from "@illa-design/pagination"
import { WrappedPaginationProps } from "./interface"

export const WrappedPagination = forwardRef<HTMLDivElement, WrappedPaginationProps>(
  (props, ref) => {
    return (
      <Pagination />
    )
  }
)

WrappedPagination.displayName = "WrappedPagination"
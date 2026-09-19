import type { ReactElement } from "react"

type PropTypes = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element?: any
    className?: string
    children: ReactElement | string
}

const DsTypography = ({ element, className, children }: PropTypes) => {
    const TagComponent = element ? element : 'span'
    return (
        <TagComponent className={className}>{children}</TagComponent>
    )
}
export default DsTypography;
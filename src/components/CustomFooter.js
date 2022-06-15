import { Footer } from "antd/lib/layout/layout";

const CustomFooter = ({ children }) => (
    <Footer style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0
    }}>{children}</Footer>
)
export default CustomFooter;
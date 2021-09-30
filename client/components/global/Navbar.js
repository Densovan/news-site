import { Layout, Divider } from 'antd';
import {
    TiUser,
    TiUserAdd,
  } from "react-icons/ti";
import Link from "next/link";

const { Header } = Layout;
const NavBar = ({auth}) => {
    return(
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="nav">
                <div className="logo">
                  <Link href="/">
                    <img src="/assets/images/logo.png" alt="logo" />
                  </Link>
                </div>
                {auth ? (
                    <div>
                        Profile
                    </div>
                ):(
                    <div className="top-nav-rigth">
                        <TiUser className="gmail-top-nav" />
                        <Link href="/signin">Sign in</Link>
                        <Divider className="devider-top-nav" type="vertical" />
                        <TiUserAdd size={19} className="gmail-top-nav" />
                        <Link href="/register">Register</Link>
                    </div>
                )}
            </div>
        </Header>
    )
}
export default NavBar
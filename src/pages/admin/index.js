import React, { Component } from "react";
import nextExpressPage from "next-express/page";
import dynamic from "next/dynamic";
import { LoadingPages } from "../../component/admin/include/middleware/LoadingPages";

const Wrapper = dynamic(
  () => import("../../component/admin/include/template/Wrapper/Wrapper"),
  { ssr: false }
);
const Sidebar = dynamic(
  () => import("../../component/admin/include/template/sidebar/Sidebar"),
  { ssr: false }
);
const SideBarMain = dynamic(
  () => import("../../component/admin/include/sideBarCom/SideBarMain"),
  { ssr: false }
);

const Content = dynamic(
  () => import("../../component/admin/include/template/content/Content"),
  { ssr: false }
);

const TopBar = dynamic(
  () => import("../../component/admin/include/template/header/TopBar"),
  { ssr: false }
);

const SidebarToggle = dynamic(
  () => import("../../component/admin/include/topBarCom/SidebarToggle"),
  { ssr: false }
);

const TopbarSearch = dynamic(
  () => import("../../component/admin/include/topBarCom/TopbarSearch"),
  { ssr: false }
);

const TopbarNavbar = dynamic(
  () => import("../../component/admin/include/topBarCom/TopbarNavbar"),
  { ssr: false }
);

const ContainerContent = dynamic(
  () => import("../../component/admin/include/pagecontentCom/ContainerContent"),
  { ssr: false }
);

const ScrolltoTopButton = dynamic(
  () => import("../../component/admin/include/scrolltotop/ScrolltoTopButton"),
  { ssr: false }
);

const LogoutModal = dynamic(
  () => import("../../component/admin/include/logoutmodal/LogoutModal"),
  { ssr: false }
);


class Index extends Component {
  _isMounted = false;
  static async getInitialProps(ctx) {
     
    return { stars: '' }
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <Sidebar>
            <SideBarMain />
          </Sidebar>
          <Content>
            <TopBar>
              <SidebarToggle />
              <TopbarSearch />
              <TopbarNavbar />
            </TopBar>
            <ContainerContent />
          </Content>
        </Wrapper>
        <ScrolltoTopButton />
        <LogoutModal />
      </React.Fragment>
    );
  }
}

export default LoadingPages(nextExpressPage(Index));

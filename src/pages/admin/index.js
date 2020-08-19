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
import { CheckIsEmpty } from "../../component/library/FuncCheckEmpty";
import { adminSignIn } from "../../redux/action/pagesAdminActions";
import { connect } from "react-redux";


class Index extends Component {
  _isMounted = false;
  static async getInitialProps(ctx) {
    const { query } = ctx;
    if (CheckIsEmpty(query)) {
      const { csrfToken } = query._nextExpressData;
      return { csrfToken: csrfToken };
    }
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._isMounted = true;
    const { csrfToken } = this.props;
    this.props.dispatch(adminSignIn(csrfToken));
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.pagesCheckAdmin !== this.props.pagesCheckAdmin) {
      const { data } = this.props.pagesCheckAdmin;
      if (data === "Bad Login Info Admin") {
        if (typeof window !== "undefined") {
          window.location.href = "/admin/login";
        }
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { data } = this.props.pagesCheckAdmin;
    return (
      <React.Fragment>
        {data !== "Bad Login Info Admin" ? (
          <>
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
          </>
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    pagesCheckAdmin: state.checkAdminReducers.admin,
  };
}

export default connect(mapStateToProps)(LoadingPages(nextExpressPage(Index)));

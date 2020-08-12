import React from "react";
import Divider from "../unity/divider/Divider";
import SidebarHeading from "../unity/sidebarheading/SidebarHeading";
import SidebarToggler from "../unity/sidebartoggler/SidebarToggler";

const SideBarMain = React.memo(() => {
  const linkToHomePage = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };
  return (
    <React.Fragment>
      {/* Sidebar - Brand */}

      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        onClick={linkToHomePage}
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>

        <div className="sidebar-brand-text mx-3">
          SB Admin <sup>2</sup>
        </div>
      </a>

      <Divider classDivider="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>
      <Divider classDivider="sidebar-divider" />

      {/* Heading */}
      <SidebarHeading classHeading="sidebar-heading">Interface</SidebarHeading>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cog"></i>
          <span>Components</span>
        </a>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Components:</h6>
            <a className="collapse-item" href="buttons.html">
              Buttons
            </a>
            <a className="collapse-item" href="cards.html">
              Cards
            </a>
          </div>
        </div>
      </li>
      {/* Nav Item - Utilities Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Utilities</span>
        </a>
        <div
          id="collapseUtilities"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Utilities:</h6>
            <a className="collapse-item" href="utilities-color.html">
              Colors
            </a>
            <a className="collapse-item" href="utilities-border.html">
              Borders
            </a>
            <a className="collapse-item" href="utilities-animation.html">
              Animations
            </a>
            <a className="collapse-item" href="utilities-other.html">
              Other
            </a>
          </div>
        </div>
      </li>
      {/* Divider */}
      <Divider classDivider="sidebar-divider" />

      {/* Heading */}
      <SidebarHeading classHeading="sidebar-heading">Addons</SidebarHeading>

      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Pages</span>
        </a>
        <div
          id="collapsePages"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Login Screens:</h6>
            <a className="collapse-item" href="login.html">
              Login
            </a>
            <a className="collapse-item" href="register.html">
              Register
            </a>
            <a className="collapse-item" href="forgot-password.html">
              Forgot Password
            </a>
            <div className="collapse-divider"></div>
            <h6 className="collapse-header">Other Pages:</h6>
            <a className="collapse-item" href="404.html">
              404 Page
            </a>
            <a className="collapse-item" href="blank.html">
              Blank Page
            </a>
          </div>
        </div>
      </li>
      {/* Divider */}
      <Divider classDivider="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <SidebarToggler />
    </React.Fragment>
  );
});

export default SideBarMain;

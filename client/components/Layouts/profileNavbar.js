import React from "react";
import ActiveLink from "../../components/activeLink";

const profileNavbar = () => {
  return (
    <React.Fragment>
      <div className="acc-navbar">
        <div className="sub-acc-navbar">
          <ActiveLink
            href="/dashboard/allstories"
            activeClassName="profile-navbar-active"
          >
            <div className="profile-navbar">
              <span>Posts</span>
            </div>
          </ActiveLink>
          <ActiveLink
            href="/dashboard/saved"
            activeClassName="profile-navbar-active"
          >
            <div className="profile-navbar">
              <span>Saved</span>
            </div>
          </ActiveLink>
          <ActiveLink
            href="/dashboard/following"
            activeClassName="profile-navbar-active"
          >
            <div className="profile-navbar">
              <span>Followings</span>
            </div>
          </ActiveLink>
          <ActiveLink href="/" activeClassName="profile-navbar-active">
            <div className="profile-navbar">
              <span>Followers</span>
            </div>
          </ActiveLink>
        </div>
      </div>
    </React.Fragment>
  );
};

export default profileNavbar;

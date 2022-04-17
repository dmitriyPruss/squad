import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import { clearUserStore, headerRequest } from "../../actions/actionCreator";
import CONSTANTS from "../../constants";
import styles from "./Header.module.sass";

const {
  ANONYM_IMAGE_PATH,
  PUBLIC_URL,
  STATIC_IMAGES_PATH,
  CUSTOMER,
  CREATOR,
  MODERATOR,
  CONTACTS: { TEL },
  HEADER_PATHS_WITHOUT_AUTH,
} = CONSTANTS;

class Header extends React.Component {
  componentDidMount() {
    const { data, getUser, location } = this.props;

    let getWithoutAuth;

    HEADER_PATHS_WITHOUT_AUTH.forEach((path) => {
      if (location.pathname === path) {
        getWithoutAuth = true;
      }
    });

    if (getWithoutAuth) {
      return;
    }

    if (!data) {
      getUser();
    }
  }

  logOut = () => {
    localStorage.clear();

    const { clearUserStore, history } = this.props;

    clearUserStore();
    history.replace("/login");
  };

  startContests = () => {
    const { history } = this.props;
    history.push("/startContest");
  };

  renderLoginButtons = () => {
    const { data } = this.props;

    if (data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                data.avatar === "anon.png"
                  ? ANONYM_IMAGE_PATH
                  : `${PUBLIC_URL}${data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${data.displayName}`}</span>
            <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
            <ul>
              {data.role !== MODERATOR && (
                <li>
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <span>View Dashboard</span>
                  </Link>
                </li>
              )}
              <li>
                <Link to="/account" style={{ textDecoration: "none" }}>
                  <span>My Account</span>
                </Link>
              </li>
              {data.role === CREATOR && (
                <li>
                  <Link to="/transactions" style={{ textDecoration: "none" }}>
                    <span>Transactions</span>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: "none" }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: "none" }}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              {data.role === MODERATOR && (
                <li>
                  <Link to="/offerList" style={{ textDecoration: "none" }}>
                    <span>Offer`s list</span>
                  </Link>
                </li>
              )}
              <li>
                <span onClick={this.logOut}>Logout</span>
              </li>
            </ul>
          </div>
          {data.role !== CREATOR ? (
            <img
              src={`${STATIC_IMAGES_PATH}email.png`}
              className={styles.emailIcon}
              alt="email"
            />
          ) : (
            <div>
              <Link to="/emailPage" style={{ textDecoration: "none" }}>
                <MarkAsUnreadIcon className={styles.creatorEmailIcon} />
              </Link>
            </div>
          )}
        </>
      );
    }
    return (
      <>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: "none" }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  render() {
    const { isFetching, data } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <a href="http://www.google.com">Read Announcement</a>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <img src={`${STATIC_IMAGES_PATH}phone.png`} alt="phone" />
            <span>{TEL}</span>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <Link to="/">
            <img
              src={`${STATIC_IMAGES_PATH}blue-logo.png`}
              className={styles.logo}
              alt="blue_logo"
            />
          </Link>
          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <ul>
                <li>
                  <span>NAME IDEAS</span>
                  <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                  <ul>
                    <li>
                      <a href="http://www.google.com">Beauty</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Consulting</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">E-Commerce</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Fashion & Clothing</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Finance</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Real Estate</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Tech</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">More Categories</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>CONTESTS</span>
                  <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                  <ul>
                    <li>
                      <Link to="/howItWorks">HOW IT WORKS</Link>
                    </li>
                    <li>
                      <Link to="/buttonGroup">BUTTON GROUP</Link>
                    </li>
                    <li>
                      <Link to="/eventsPage">EVENTS</Link>
                    </li>
                    <li>
                      <Link to="/pricing">PRICING</Link>
                    </li>
                    <li>
                      <a href="http://www.google.com">AGENCY SERVICE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">ACTIVE CONTESTS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">WINNERS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LEADERBOARD</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">BECOME A CREATIVE</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Our Work</span>
                  <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                  <ul>
                    <li>
                      <a href="http://www.google.com">NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">TAGLINES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LOGOS</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">TESTIMONIALS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Names For Sale</span>
                  <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                  <ul>
                    <li>
                      <a href="http://www.google.com">POPULAR NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">SHORT NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">INTRIGUING NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">NAMES BY CATEGORY</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">VISUAL NAME SEARCH</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">SELL YOUR DOMAINS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Blog</span>
                  <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                  <ul>
                    <li>
                      <a href="http://www.google.com">ULTIMATE NAMING GUIDE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">
                        POETIC DEVICES IN BUSINESS NAMING
                      </a>
                    </li>
                    <li>
                      <a href="http://www.google.com">CROWDED BAR THEORY</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">ALL ARTICLES</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {data && data.role === CUSTOMER && (
              <div
                className={styles.startContestBtn}
                onClick={this.startContests}
              >
                START CONTEST
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.userStore;

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(headerRequest()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

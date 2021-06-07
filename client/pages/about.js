import React from "react";
import { Breadcrumb, Row, Col } from "antd";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiRss,
  TiMediaPlay,
  TiLocationArrowOutline,
} from "react-icons/ti";
import TopNavbar from "../components/Layouts/topNavbar";
import MainNavbar from "../components/Layouts/mainNavbar";
import Footer from "../components/Layouts/footer";

const About = () => {
  return (
    <React.Fragment>
      <TopNavbar />
      <MainNavbar />
      <div className="container">
        <br></br>
        <center>
          <h1 className="about-main-title">About Us</h1>
          <Breadcrumb style={{ marginTop: "-24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>About Us</Breadcrumb.Item>
          </Breadcrumb>
        </center>
      </div>
      {/* ======================Describe about====================== */}
      <div className="back-color-about top-about">
        <div className="container">
          <Row gutter={[32, 32]}>
            <Col sm={24} md={12}>
              <div className="content-about">
                <h1 className="widget-title-about">Who We Are?</h1>
                <p>
                  Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac
                  turpis. Donec sit amet eros. Lorem ipsum dolor sit amet,
                  consecvtetuer. Mauris fermentum dictum magna. Sed laoreet
                  aliquam leo. Ut tellus dolor, dapibus eget, elementum vel,
                  cursus eleifend, elit. Aenean auctor wisi et urna. Aliquam
                  erat volutpat. Duis ac turpis. Integer rutrum ante eu lacus.
                  Vestibulum libero nisl, porta vel, scelerisque eget, malesuada
                  at, neque.{" "}
                </p>
                <a href="#member">
                  <button className="meet-our-team-btn">Meet Our Team</button>
                </a>
              </div>
            </Col>
            <Col sm={24} md={12}>
              <div>
                <img className="about-image" src="/assets/images/about.jpeg" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* ======================Mission About====================== */}

      <div className="container top-about">
        <Row gutter={[32, 32]}>
          <Col sm={24} md={8}>
            <div className="about-card">
              <div
                className="about-style"
                style={{
                  backgroundImage: `url("/assets/images/mission.jpg")`,
                }}
              ></div>
              <div className="content-mission">
                <h1>Our Mission</h1>
                <p>
                  Vestibulum sed ante. Donec sagittis euismod purus. Sed ut
                  perspiciatis unde omnis iste natus error sit. voluptatem
                  accusantium doloremque.
                </p>
                {/* <button className="mission-btn">Read More</button> */}
              </div>
            </div>
          </Col>
          <Col sm={24} md={8}>
            <div className="about-card">
              <div
                className="about-style"
                style={{
                  backgroundImage: `url("/assets/images/mission.jpg")`,
                }}
              ></div>
              <div className="content-mission">
                <h1>Our Mission</h1>
                <p>
                  Vestibulum sed ante. Donec sagittis euismod purus. Sed ut
                  perspiciatis unde omnis iste natus error sit. voluptatem
                  accusantium doloremque.
                </p>
                {/* <button className="mission-btn">Read More</button> */}
              </div>
            </div>
          </Col>
          <Col sm={24} md={8}>
            <div className="about-card">
              <div
                className="about-style"
                style={{
                  backgroundImage: `url("/assets/images/mission.jpg")`,
                }}
              ></div>
              <div className="content-mission">
                <h1>Our Mission</h1>
                <p>
                  Vestibulum sed ante. Donec sagittis euismod purus. Sed ut
                  perspiciatis unde omnis iste natus error sit. voluptatem
                  accusantium doloremque.
                </p>
                {/* <button className="mission-btn">Read More</button> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* ================Member================= */}
      <div id="member" className="container">
        <div className="our-member-content">
          <center>
            <h1 className="about-main-title">Our Member</h1>
            <h3 className="about-submain-title">
              The people behind the Company
            </h3>
          </center>
          <div style={{ marginTop: "30px" }}>
            <center>
              <Row gutter={[12, 12]}>
                <Col xs={12} md={8}>
                  <div className="member">
                    <img className="img-member" src="/assets/images/Den.png" />
                    <div>
                      <h2 className="name">Sovanden</h2>
                    </div>
                    <div>
                      <h3 className="position">Web Developer</h3>
                    </div>
                    <div className="social-member">
                      <a className="facebook-member">
                        <TiSocialFacebook />
                      </a>
                      <a className="facebook-member">
                        <TiSocialTwitter />
                      </a>
                      <a className="facebook-member">
                        <TiLocationArrowOutline />
                      </a>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={8}>
                  <div className="member">
                    <img className="img-member" src="/assets/images/Den.png" />
                    <div>
                      <h2 className="name">Sovanden</h2>
                    </div>
                    <div>
                      <h3 className="position">Web Developer</h3>
                    </div>
                    <div className="social-member">
                      <a className="facebook-member">
                        <TiSocialFacebook />
                      </a>
                      <a className="facebook-member">
                        <TiSocialTwitter />
                      </a>
                      <a className="facebook-member">
                        <TiLocationArrowOutline />
                      </a>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={8}>
                  <div className="member">
                    <img className="img-member" src="/assets/images/Den.png" />
                    <div>
                      <h2 className="name">Sovanden</h2>
                    </div>
                    <div>
                      <h3 className="position">Web Developer</h3>
                    </div>
                    <div className="social-member">
                      <a className="facebook-member">
                        <TiSocialFacebook />
                      </a>
                      <a className="facebook-member">
                        <TiSocialTwitter />
                      </a>
                      <a className="facebook-member">
                        <TiLocationArrowOutline />
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </center>
          </div>
        </div>
      </div>
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default About;

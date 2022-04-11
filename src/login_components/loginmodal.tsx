import "antd/dist/antd.css";
import { useState } from "react";
import Loginpage from "./loginpage";
import Resetpass from "./resetpass";
import Registration from "./registration";
import { Modal, PageHeader, Carousel } from "antd";
import Button from "antd-button-color";
import "antd-button-color/dist/css/style.css";
import Logo from "./static/assets/vbLogo.png";
import firstImage from "./static/assets/landingImage.png";
import secondImage from "./static/assets/Vikasbandhu_Five.jpg";
import thirdImage from "./static/assets/Vikasbandhu_One.jpg";
import fourthImage from "./static/assets/Vikasbandhu_Two.jpg";
import fifthImage from "./static/assets/Image_Govt1.jpg";
const contentStyle = {
  height: "88vh",
  color: "#fff",
  lineHeight: "160px",
  background: "#364d79",
};

const imageStyle = {
  width: "100%",
  height: "88vh",
};
const Loginmodal = () => {
  const [visiblelog, setVisiblelog] = useState(false);
  // const [visiblerepass, setVisiblerepass] = useState(false);
  const [visiblereg, setVisiblereg] = useState(false);
  const [logforget, setLogforget] = useState(false);
  const [openreset, setopenreset] = useState(false);

  const closeLogin = (data: boolean) => {
    setLogforget(data);
  };
  const closeRegister = (data: boolean) => {
    setVisiblereg(data);
  };

  const openresetpage = (data: boolean) => {
    setopenreset(data);
  };

  return (
    <div>
      <PageHeader
        className="site-page-header-responsive"
        title="VikasBandhu"
        extra={[
          <Button key="1" type="success" onClick={() => setVisiblelog(true)}>
            Login
          </Button>,
          <Button
            key="2"
            type="success"
            with="ghost"
            onClick={() => setVisiblereg(true)}
          >
            Register
          </Button>,
        ]}
        avatar={{ src: Logo }}
      ></PageHeader>

      <Modal
        centered
        visible={!logforget && visiblelog && !openreset && visiblelog} // || !openreset && visiblelog
        onCancel={() => setVisiblelog(false)}
        footer={null}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <p></p>
        <Loginpage closeLogin={closeLogin} openresetpage={openresetpage} />
      </Modal>

      <Modal
        centered
        visible={openreset}
        footer={null}
        onCancel={() => setopenreset(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Resetpass openresetpage={openresetpage} />
      </Modal>

      <Modal
        centered
        visible={visiblereg}
        footer={null}
        onCancel={() => setVisiblereg(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        bodyStyle={{ overflowY: "scroll", height: 600 }}
      >
        <p>Registration</p>
        <Registration closeRegister={closeRegister} />
      </Modal>

      <Carousel autoplay speed={1000}>
        <div>
          <h3 style={contentStyle}>
            <img style={imageStyle} src={firstImage} alt="firstImage" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img style={imageStyle} src={secondImage} alt="firstImage" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img style={imageStyle} src={thirdImage} alt="firstImage" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img style={imageStyle} src={fourthImage} alt="firstImage" />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img style={imageStyle} src={fifthImage} alt="firstImage" />
          </h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Loginmodal;

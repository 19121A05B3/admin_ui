import Bar from "./bar";
import Detail from "./Detprof";
import { Link } from "react-router-dom";
import { Breadcrumb, Image, Row, Col, Typography } from "antd";
import { Menu, Dropdown } from "antd";
import { CaretDownOutlined, BellFilled } from "@ant-design/icons";
import "antd/dist/antd.css";
import MobileDrawer from "./mobileHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const { Text } = Typography;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/transactions">Transactions</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/matches">Matches</Link>
    </Menu.Item>
  </Menu>
);
const getStyledLink = (linkName: String) => <Text strong>{linkName}</Text>;

function AppHeader() {
  const { foDetails } = useSelector((state: RootState) => state.main);

  return (
    <div className="header app-header">
      <div className="standard-bar">
        <Bar
          mail="contactus@samparkbindhu.in    "
          phone="        +91-9902956664"
        />
      </div>
      <Row
        align="middle"
        justify="center"
        wrap={true}
        className="landing-page-header-bar"
      >
        <Col span={2}>
          <Row justify="end">
            <Image className="logo" src="./logo192.png" preview={false} />
          </Row>
        </Col>
        <Col span={17}>
          <Row justify="end" wrap={true} className="mb15">
            <Breadcrumb className="header-breadcrumb" separator=" ">
              <Breadcrumb.Item className="item button">
                <Link to="/">{getStyledLink("Dashboard")}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Dropdown overlay={menu}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {getStyledLink("Operations")}
                    <CaretDownOutlined />
                  </a>
                </Dropdown>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="item button">
                <Link to="/users">{getStyledLink("Users")}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="item button">
                <Link to="/produces">{getStyledLink("Produces")}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="item bell">
                <BellFilled className="bellfill" />
              </Breadcrumb.Item>
            </Breadcrumb>
          </Row>
        </Col>
        <Col span={5}>
          <Row justify="center">
            {foDetails.phone_no === "" ? "" : <Detail />}
          </Row>
        </Col>
      </Row>
      {foDetails.phone_no === "" ? "" : <MobileDrawer />}
    </div>
  );
}
export default AppHeader;

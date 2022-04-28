import { useState } from "react";
import { Dropdown, Menu, Col, Image, Row, Avatar } from "antd";
import { MenuOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./customStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/slices/loginCheck";
import { capitalize } from "../../dashboard-ui/components/users";

const MobileDrawer = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { foDetails } = useSelector((state: RootState) => state.main);

  const dropdownmenu = (
    <Menu>
      <Menu.Item>
        <Link to="/transactions">Transactions</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/matches">Matches</Link>
      </Menu.Item>
    </Menu>
  );

  const menu = (
    <Menu
      className="dropdown-menu"
      onClick={() => setVisible(true)}
      theme="dark"
    >
      <Menu.Item key={1}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Dropdown overlay={dropdownmenu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Operations
            <CaretDownOutlined />
          </a>
        </Dropdown>
      </Menu.Item>
      <Menu.Item key={3}>
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key={4}>
        <Link to="/produces">Produces</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="mobile-visible">
      <Row>
        <Col span={2}>
          <Image className="logo" src="./logo192.png" preview={false} />
        </Col>
        <Col span={13}></Col>
        <Col span={2}>
          <a onClick={() => dispatch(logout())}>
            <Avatar className="mt11" />
          </a>
        </Col>
        <Col span={5} className="mt6">
          <Row className="foname">{capitalize(foDetails["name "])}</Row>
          <Row>FO ID: {foDetails.phone_no}</Row>
        </Col>
        <Col span={2}>
          <Dropdown
            className="mobile-dropdown"
            overlay={menu}
            onVisibleChange={() => setVisible(!visible)}
            visible={visible}
          >
            <MenuOutlined
              className="menu"
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default MobileDrawer;

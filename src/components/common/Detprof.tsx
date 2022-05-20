import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Row, Col, Dropdown, Menu } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { capitalize } from "../../dashboard-ui/components/users";
import { RootState } from "../../store";
import { logout } from "../../store/slices/loginCheck";
import "./customStyles.scss";

function Detail(props: any) {
  const dispatch = useDispatch();

  const { foDetails } = useSelector((state: RootState) => state.main);
  const [profilevisible, setprofileVisible] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <Link to="/">Profile</Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <a onClick={() => dispatch(logout())}>
          <LogoutOutlined /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row gutter={16} wrap={false}>
      <Col>
        <Row className="foname">{capitalize(foDetails["name "])}</Row>
        <Row className="foid">FO ID:{foDetails.phone_no}</Row>
      </Col>
      <Col>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Avatar className="mt11" />
          </a>
        </Dropdown>
      </Col>
    </Row>

    //     <div className="container">
    //   <div className="row-2-70">
    //   <div className="cname">Mahesha</div>
    //   <div className="cid">FO ID:192192</div>
    //   </div>
    //   <div className="row-2-30">
    //   <Avatar/>
    //   </div>

    //  </div>
  );
}

export default Detail;

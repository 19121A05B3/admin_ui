import { LogoutOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Avatar, Row, Col, Dropdown, Menu, Modal, Image } from "antd";
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <a onClick={showModal} style={{ color: "black" }}>
          Profile
        </a>
        <Modal
          title="Profile"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div style={{ display: "block" }}>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 4 }}
                md={{ span: 4 }}
              >
                <Image
                  width={150}
                  src={foDetails.profile_loc}
                  alt="Unable to load profile photo"
                />
              </Col>
            </Row>

            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                Name &emsp;
              </Col>
              <Col>: {capitalize(foDetails.name)}</Col>
            </Row>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                Gender &emsp;
              </Col>
              <Col>: {foDetails.gender}</Col>
            </Row>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                Email ID &emsp;
              </Col>
              <Col>: {foDetails.email}</Col>
            </Row>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                Phone No &emsp;
              </Col>
              <Col>: {foDetails.phone_no}</Col>
            </Row>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                Experience &emsp;
              </Col>
              <Col>: {foDetails.years_of_experience}</Col>
            </Row>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                Aadhaar Card&emsp;
              </Col>
              <Col>
                :{" "}
                <a href={foDetails.adhar_loc} target="_blank" rel="noreferrer">
                  <PaperClipOutlined />
                  {foDetails.adhar_loc.slice(
                    foDetails.adhar_loc.lastIndexOf("/") + 1,
                    foDetails.adhar_loc.length
                  )}
                </a>
              </Col>
            </Row>

            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                Pan card &emsp;
              </Col>
              <Col>
                :{" "}
                <a href={foDetails.pan_loc} target="_blank" rel="noreferrer">
                  <PaperClipOutlined />
                  {foDetails.pan_loc.slice(
                    foDetails.pan_loc.lastIndexOf("/") + 1,
                    foDetails.pan_loc.length
                  )}
                </a>
              </Col>
            </Row>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                State &emsp;
              </Col>
              <Col>: {foDetails.state}</Col>
            </Row>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                District &emsp;
              </Col>
              <Col>: {foDetails.distict}</Col>
            </Row>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                Thaluka &emsp;
              </Col>
              <Col>: {foDetails.thaluka}</Col>
            </Row>
            <Row>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 7 }}
                lg={{ span: 7 }}
                md={{ span: 7 }}
              ></Col>
              <Col
                xs={{ span: 5 }}
                sm={{ span: 5 }}
                lg={{ span: 5 }}
                md={{ span: 4 }}
              >
                Address &emsp;
              </Col>
              <Col>: {foDetails.address}</Col>
            </Row>
          </div>
        </Modal>
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
        <Row className="foname">{capitalize(foDetails.name)}</Row>
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
  );
}

export default Detail;

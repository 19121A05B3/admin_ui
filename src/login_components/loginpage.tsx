import { Form, Input, Modal } from "antd";
import { setUserName } from "../store/slices/loginCheck";
import { message } from "antd";
import "antd/dist/antd.css";
import Button from "antd-button-color";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Forgetpass from "./forgetpass";
import { LoginCheck } from "../store/slices/loginCheck";
import { useDispatch } from "react-redux";
import "./Sass/customComponent.scss";
import { processingPopUp } from "../helper";

const Loginpage = (props: any) => {
  const customClassName = `custom-primary-button`;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [val, setval] = useState(0);
  const [form] = Form.useForm();
  // const [user, setuser] = useState("");
  useEffect(() => {
    const showmessage = async () => {
      if (val === 1) {
        success();
      }
      if (val === 2) {
        error();
      }
      if (val === 3) {
        warning();
      }
    };
    showmessage();
  }, [val]);
  // message alearting funcitons

  const success = () => {
    message.success("Welcome to VikasBandhu");
  };

  const error = () => {
    message.error("Wrong credentials");
  };

  const warning = () => {
    message.warning("Please reset your password to proceed");
  };

  const onFinish = async (values: any) => {
    const hider = processingPopUp();
    const vals = await LoginCheck(values);
    hider();

    if (vals === 1) {
      setval(1);
      dispatch(setUserName(sessionStorage.getItem("userName") ?? ""));
      form.resetFields();
    }
    if (vals === 2) {
      setval(2);
      form.resetFields();
      form.setFieldsValue({ username: values.username });
    }
    if (vals === 3) {
      setval(3);
      props.openresetpage(true);
    }
    setval(0);
  };

  const forgetOpen = () => {
    setVisible(true);
    props.closeLogin(true);
  };

  const forgetClose = () => {
    setVisible(false);
    props.closeLogin(false);
  };

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        // initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          label="Phone Number/Email"
          className="margin-unset login-phone-number"
          rules={[
            { required: true, message: "Please input your phone no or email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="phone no / email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          className="margin-unset login-phone-number"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          {/* <Link className="login-form-forgot" to="./profileimg.txs" >Forgot password</Link>  */}
          <a
            href="/#"
            className="login-form-forgot"
            style={{ textDecoration: "underline", color: "grey" }}
            onClick={() => {
              forgetOpen();
            }}
          >
            Forgot Password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            {...{ className: customClassName }}
            type="primary"
            htmlType="submit"
            block
          >
            Log in
          </Button>
        </Form.Item>
      </Form>

      <Modal
        centered
        visible={visible}
        onCancel={() => {
          forgetClose();
        }}
        width={500}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <p>Set New password</p>
        <Forgetpass forgetClose={forgetClose} />
      </Modal>
    </>
  );
};

export default Loginpage;

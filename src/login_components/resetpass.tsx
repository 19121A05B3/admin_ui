import { Form, Input, message, Typography } from "antd";
import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import validator from "validator";
import Button from "antd-button-color";
import "./Sass/customComponent.scss";
import { ResetPassword } from "../store/slices/loginCheck";
const { Text, Title } = Typography;

const Resetpass = (props: any) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [check, setCheck] = useState(0);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    let { newpassword } = values;
    const vals = await ResetPassword(newpassword);
    if (vals == 1) {
      message.success("Please login with your new password");
      form.resetFields();
      props.openresetpage(false);
    } else {
      message.error("Something went wrong");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const validate = (value: string) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
    ) {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };
  return (
    <>
      <Text>Welcome new user now create strong new your password</Text>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label={<Title level={5}>New Password</Title>}
          name="newpassword"
          {...(errorMessage && {
            validateStatus: "error",
            help: "Not a strong password",
          })}
          rules={[{ required: true, message: "Please input your password" }]}
          hasFeedback
        >
          <Input
            onChange={(e) => validate(e.target.value)}
            placeholder={"At least 8 characters along with nums and symbols"}
          />
        </Form.Item>

        <Form.Item
          label={<Title level={5}>Enter New Password Again</Title>}
          name="confirm"
          rules={[
            { required: true, message: "Please input your password again" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newpassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
          dependencies={["password"]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="success" htmlType="submit" block>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Resetpass;

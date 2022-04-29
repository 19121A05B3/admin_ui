import { Form, Input, message, Typography } from 'antd';
import "antd/dist/antd.css";
import './Sass/customComponent.scss';
import { MailOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import validator from 'validator';
import Button from "antd-button-color";
import { ForgetPassword, Mailchecker } from '../store/slices/loginCheck';
const { Text, Title } = Typography;
const Forgetpass = (props: any) => {
  const [errorMessage, setErrorMessage] = useState(false)
  const [passcheck, setpasschek] = useState(0)
  const [stage, setStage] = useState(1);

  const onFinish = async (values: any) => {
    const len = Object.keys(values).length
    if (len == 1) {
      let { username } = values
      let mailchek = await Mailchecker(username);
      if (mailchek == 1) {
        message.success("verified mail check otp");
        setStage(0)
      }
      else {
        message.error("incorrect email")
      }
    }

    if (len == 3) {
      let passchek = await ForgetPassword(values)
      if (passchek == 1) {
        message.success("Great password")
        props.forgetClose()
      }
      if (passchek == 2) {
        message.warning("incorrect otp")
      }
      if (passcheck == 3) {
        message.error("something went wrong")
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validate = (value: any) => {

    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage(false)
    } else {
      setErrorMessage(true)
    }
  }

  return (
    <>
      {stage ? (
        <Form
          name="basic"
          layout='vertical'
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item style={{ marginBottom: 0 }}
            label={<Title level={4}>Forgot your password?</Title>} >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Email' }, {
                type: 'email',
                message: 'please input valid E-mail!',
              }]}
              style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Mail Id" />
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px' }}
            >
              <Button type="success" block htmlType="submit">
                Send OTP
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>) : (
        <><Text>We have sent a password code to your register mail/phone no. Enter it below to reset your password</Text><Form
          name="basic"
          layout='vertical'
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="" style={{ marginBottom: 0 }}>
            <Form.Item
              name="OTP"
              label={<Title level={5}>Code</Title>}
              className='margin-unset login-phone-number'
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter OTP" />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label={<Title level={5}>New Password</Title>}
            className='margin-unset login-phone-number'
            name="password"
            {...(errorMessage && {
              validateStatus: "error",
              help: "Not a strong password",
            })}
            rules={[{ required: true, message: 'Please input your password' }]}
            hasFeedback
          >
            <Input.Password onChange={(e) => validate(e.target.value)} placeholder={"At least 8 characters along with nums and symbols"} />
          </Form.Item>

          <Form.Item
            label={<Title level={5}>Enter New Password Again</Title>}
            className='margin-unset login-phone-number'
            name="confirm"
            rules={[{ required: true, message: 'Please input your password again' }, ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            })]}
            dependencies={['password']}
            hasFeedback
          >
            <Input.Password placeholder={"Enter Same Password"} />
          </Form.Item>

          <Form.Item>
            <Button type="success" block htmlType="submit">
              Set Password
            </Button>
          </Form.Item>
        </Form></>
      )}
    </>
  );
};


export default Forgetpass;
import { Form, Input, Button, message, Typography } from 'antd';
import "antd/dist/antd.css";
import './Sass/customComponent.scss';
import { MailOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import validator from 'validator';
import { ForgetPassword, Mailchecker } from '../store/slices/loginCheck';
const { Text, Title } = Typography;
const Forgetpass = (props: any) => {
  const customClassName = `custom-primary-button`;
  const [errorMessage, setErrorMessage] = useState(false)
  const [mailcheckval, setMailcheckval] = useState(0)
  const [passcheck, setpasschek] = useState(0)
  const [stage, setStage] = useState(1);

  const showmail = async () => {
    if (mailcheckval == 1) {
      const statment = "verified mail check otp"
      success(statment)
    }
    if (mailcheckval == 2) {
      const statment2 = "incorrect email"
      error(statment2)
    }
  }

  const showpass = () => {
    if (passcheck == 1) {
      const statment = "Great password"
      success(statment)
    }
    if (passcheck == 2) {
      const statment2 = "incorrect otp"
      error(statment2)
    }
    if (passcheck == 3) {
      const statment2 = "Something went wrong"
      error(statment2)
    }
  }
  const success = (statment: any) => {
    message.success(statment);
  };

  const error = (statment: any) => {
    message.error(statment);
  };

  useEffect(() => {
    showmail();
  }, [mailcheckval])

  useEffect(() => {
    showpass();
  }, [passcheck])

  const onFinish = async (values: any) => {
    const len = Object.keys(values).length
    if (len == 1) {
      let { username } = values
      let mailchek = await Mailchecker(username);
      if (mailchek == 1) {
        setMailcheckval(1)
        setStage(0)
      }
      else {
        setMailcheckval(2)
      }
      setMailcheckval(0)
    }

    if (len == 3) {
      let passchek = await ForgetPassword(values)
      if (passchek == 1) {
        setpasschek(1)
        props.forgetClose()
      }
      if (passchek == 2) {
        setpasschek(2)
      }
      if (passcheck == 3) {
        setpasschek(3)
      }
      setpasschek(0)
    }
    console.log('Success:', values, Object.keys(values).length);

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
          // initialValues={{ remember: true }}
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
              <Button type="primary" {...{ className: customClassName }} block htmlType="submit">
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
            <Button type="primary" {...{ className: customClassName }} block htmlType="submit">
              Set Password
            </Button>
          </Form.Item>
        </Form></>
      )}
    </>
  );
};


export default Forgetpass;
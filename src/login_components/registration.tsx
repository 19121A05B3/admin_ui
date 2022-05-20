import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { uploadFileToS3 } from "../store/slices/loginCheck";
import Button from "antd-button-color";
import "antd-button-color/dist/css/style.css";
import { UploadOutlined } from "@ant-design/icons";
import {
  RegisterSingleCheck,
  RegisterBulkCheck,
} from "../store/slices/RegistrationCheck";
import { Form, Input, InputNumber, Select, Upload, message } from "antd";
import { RcFile } from "antd/lib/upload";
import { dp, processingPopUp } from "../helper";
(window as any).Buffer = (window as any).Buffer || require("buffer").Buffer;

// let profilePic: RcFile | string = "";
// let adharPic: RcFile | string = "";
// let panPic: RcFile | string = "";
// let exceldata: RcFile | string = "";

export default function Registration(props: any) {
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      sm: { span: 6, offset: 2 },
    },
    wrapperCol: {
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 0,
        offset: 0,
      },
    },
  };

  const [form] = Form.useForm();
  const [stage, setStage] = useState(1);
  const [profileList, setProfileList] = useState([]);
  const [mobile, setmobile] = useState("");
  const [isnumError, setIsnumError] = useState(true);
  const [isprofileError, setIsprofileError] = useState(false);
  const [ispanError, setIspanError] = useState(true);
  const [isadharError, setIsadharError] = useState(true);
  const [isexcelError, setIsexcelError] = useState(true);
  const [val, setval] = useState(0);

  const onFinish = async (values: any) => {
    const hider = processingPopUp();
    try {
      delete values["prefix"];
      if (Object.keys(values).length > 1) {
        const profs3 = await uploadFileToS3(profileList[0]["originFileObj"]);
        values["profile_loc"] = profs3;
        const adhars3 = await uploadFileToS3(
          values["adharcardpic"]["fileList"][0]["originFileObj"]
        );
        values["adhar_loc"] = adhars3;
        const pans3 = await uploadFileToS3(
          values["pancardpic"]["fileList"][0]["originFileObj"]
        );
        values["pan_loc"] = pans3;
        delete values["pancardpic"];
        delete values["adharcardpic"];
        delete values["profilepic"];
        const register = await JSON.parse(await RegisterSingleCheck(values));
        dp(register.status);
        if (register.status === "success") {
          message.success("Successfully Registered");
          form.resetFields();
          props.closeRegister(false);
        } else if (register.status.message === "User account already exists") {
          message.warning("User account already exists use other credentials");
          form.resetFields();
          props.closeRegister(false);
        } else {
          message.error("Something went wrong");
          form.resetFields();
          props.closeRegister(false);
        }
      } else {
        dp("CAME TO ELSE BLOCK");
        const excels3 = await uploadFileToS3(
          values["excel"]["fileList"][0]["originFileObj"]
        );
        values["url"] = excels3;
        delete values["excel"];
        const register = await JSON.parse(await RegisterBulkCheck(values));
        dp(register);
        if (register.status === "success") {
          message.success("Successfully Registered");
          form.resetFields();
          props.closeRegister(false);
        } else if (register.status.message === "User account already exists") {
          message.warning("User account already exists use other credentials");
          form.resetFields();
          props.closeRegister(false);
        } else {
          message.error("Something went wrong");
          form.resetFields();
          props.closeRegister(false);
        }
      }
      form.resetFields();
      setProfileList([]);
    } catch (err) {
      dp("Error in on finish");
      dp(err);
      message.error("Something went wrong");
    } finally {
      hider();
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  const onPreviewProfile = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    let imgWindow = window.open(src)!;
    imgWindow.document.write(image.outerHTML);
  };

  const onPreviewPan = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
  };

  const onPreviewAdhar = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
  };
  const onProfileChange = ({ fileList: newFileList }: any) => {
    setProfileList(newFileList);
    if (newFileList.length === 0) {
      setIsprofileError(false);
    } else {
      setIsprofileError(true);
    }
  };

  return (
    <>
      <div style={{ marginBottom: 0 }}>
        <div style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
          <Button
            type="success"
            block
            onClick={() => {
              setStage(1);
            }}
          >
            Register with details
          </Button>
        </div>
        <div
          style={{
            display: "inline-block",
            width: "calc(50% - 4px)",
            margin: "0 4px",
          }}
        >
          <Button
            type="success"
            block
            onClick={() => {
              setStage(2);
            }}
          >
            Register with excel file
          </Button>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        {stage === 1 && (
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: "91",
            }}
            scrollToFirstError
            labelAlign="left"
            onValuesChange={(_, allValues) => {
              let pandata = 0;
              let adhardata = 0;
              if (allValues["pancardpic"] != undefined) {
                pandata = Object.keys(
                  allValues["pancardpic"]["fileList"]
                ).length;
              }
              if (allValues["adharcardpic"] != undefined) {
                adhardata = Object.keys(
                  allValues["adharcardpic"]["fileList"]
                ).length;
              }
              if (pandata === 0) {
                setIspanError(false);
              } else {
                setIspanError(true);
              }
              if (adhardata === 0) {
                setIsadharError(false);
              } else {
                setIsadharError(true);
              }
            }}
          >
            <Form.Item
              wrapperCol={{ offset: 10, span: 14 }}
              name="profilepic"
              extra="upload profile"
              {...(!isprofileError && {
                validateStatus: "warning",
              })}
            >
              <ImgCrop>
                <Upload
                  beforeUpload={(file) => {
                    const isPNG = [
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                    ].includes(file.type);
                    console.log(file.size, "in image");
                    if (file.size > 1048576) {
                      message.error(`${file.name} the file is larger than 1MB`);
                      return Upload.LIST_IGNORE;
                    }
                    if (!isPNG) {
                      message.error(`${file.name} is not a proper file`);
                      return isPNG || Upload.LIST_IGNORE;
                    }
                    return false;
                  }}
                  listType="picture-card"
                  fileList={profileList}
                  onChange={onProfileChange}
                  onPreview={onPreviewProfile}
                  accept="image/*"
                >
                  {profileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Item>

            <Form.Item
              name="assigned_user_type"
              label="User Type"
              rules={[{ required: true, message: "Please select user type!" }]}
            >
              <Select placeholder="select your user type">
                <Option value="seller">Seller</Option>
                <Option value="buyer">Buyer</Option>
                <Option value="other">Others</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your Name!" },
                {
                  pattern: new RegExp(/^[a-zA-Z]*$/),
                  message: "only alphabets are allowed",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              name="years_of_experience"
              label="Experience"
              rules={[
                {
                  type: "number",
                  min: 0,
                  max: 12,
                },
                {
                  required: true,
                  message: "Please enter month number",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="phone_number"
              label="Phone Number"
              {...(!isnumError && {
                validateStatus: "error",
                help: "Should be 10 digit number",
              })}
              rules={[
                { required: true, message: "Please input phone number!" },
                {
                  pattern: new RegExp(/^[0-9]{10,10}$/),
                  message: "enter 10 digit number",
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setmobile(e.target.value);
                  if (e.target.value.length === 10) {
                    setIsnumError(true);
                  } else {
                    setIsnumError(false);
                  }
                }}
                id="phone_no"
                title="Enter 10 digit number"
                pattern="[1-9]{1}[0-9]{9}"
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: "Please Enter your Address!" },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
              label="Taluk"
              name="thaluka"
              rules={[
                { required: true, message: "Please input your Taluk!" },
                {
                  pattern: new RegExp(/^[a-zA-Z]*$/),
                  message: "only alphabets are allowed",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Distict"
              name="distict"
              rules={[
                { required: true, message: "Please input your Distict!" },
                {
                  pattern: new RegExp(/^[a-zA-Z]*$/),
                  message: "only alphabets are allowed",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[
                { required: true, message: "Please input your State!" },
                {
                  pattern: new RegExp(/^[a-zA-Z]*$/),
                  message: "only alphabets are allowed",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="pin_code"
              name="zip"
              rules={[
                { required: true, message: "Please input your pin code!" },
                {
                  pattern: new RegExp(/^[0-9]{6,6}$/),
                  message: "enter six digit number",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="pancard"
              name="pancardpic"
              {...(!ispanError && {
                validateStatus: "error",
                help: "Please upload pancard",
              })}
              rules={[
                { required: true, message: "Please upload pancard photo" },
              ]}
              extra="upload pancard"
            >
              <Upload
                name="pancard"
                maxCount={2}
                beforeUpload={(file) => {
                  const isPNG = [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    ".pdf",
                    "application/pdf",
                  ].includes(file.type);
                  console.log(file.size, "check file size");
                  if (!isPNG) {
                    message.error(`${file.name} is not a proper file`);
                    return isPNG || Upload.LIST_IGNORE;
                  }
                  if (file.size > 1048576) {
                    message.error(`${file.name} the file is larger than 1MB`);
                    return Upload.LIST_IGNORE;
                  }
                  return false;
                }}
                onPreview={onPreviewPan}
                accept="image/*,.pdf"
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="AadhaarCard"
              name="adharcardpic"
              {...(!isadharError && {
                validateStatus: "error",
                help: "Please upload adharcard",
              })}
              rules={[{ required: true, message: "Please upload adharcard" }]}
              extra="upload adharcard"
            >
              <Upload
                name="adhar"
                maxCount={1}
                beforeUpload={(file) => {
                  const isPNG = [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    ".pdf",
                    "application/pdf",
                  ].includes(file.type);
                  if (!isPNG) {
                    message.error(`${file.name} is not a proper file`);
                    return isPNG || Upload.LIST_IGNORE;
                  }
                  if (file.size > 1048576) {
                    message.error(`${file.name} the file is larger than 1MB`);
                    return Upload.LIST_IGNORE;
                  }
                  return false;
                }}
                onPreview={onPreviewAdhar}
                accept="image/*,.pdf"
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="success"
                htmlType="submit"
                block
                disabled={!ispanError || !isadharError}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        )}
        {stage == 2 && (
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            labelAlign="left"
            onFieldsChange={(_, allFields) => {
              let data;
              if (allFields[0]["value"]) {
                data = Object.keys(allFields[0]["value"]["fileList"]).length;
              }

              if (data == 0) {
                setIsexcelError(false);
              } else {
                setIsexcelError(true);
              }
            }}
          >
            <Form.Item
              label="excel"
              name="excel"
              {...(!isexcelError && {
                validateStatus: "error",
                help: "Should uplaod file",
              })}
              rules={[{ required: true, message: "Should uplaod file" }]}
              extra="upload excel file"
            >
              <Upload
                name="excel"
                beforeUpload={(file) => {
                  const isPNG = [
                    "text/csv",
                    "text/comma-separated-values",
                    "application/csv",
                  ].includes(file.type);
                  console.log(file.type);
                  if (!isPNG) {
                    message.error(`${file.name} is not a proper file`);
                    return isPNG || Upload.LIST_IGNORE;
                  }
                  return false;
                }}
                accept=".csv"
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="success"
                htmlType="submit"
                block
                disabled={!isexcelError}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </>
  );
}

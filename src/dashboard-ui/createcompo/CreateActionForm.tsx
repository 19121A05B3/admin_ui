import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { Form, Input, Select, Button, Space, message } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import AttachFile from "./AttachFile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  createNewAction,
  getActionsTabData,
  getUserName,
} from "../../store/slices/mainSlice";
import { uploadFileToS3 } from "../../services/s3_service";
import { processingPopUp } from "../../helper";
interface propType {
  onDone: Function;
}
export default function CreateActionForm() {
  // const { onDone } = props;

  //declaring variables
  const { TextArea } = Input;
  const value = "";
  const [showUser, setShowUser] = useState(true);
  const [showProduce, setShowProduce] = useState(false);
  const [showSellerID, setShowSellerID] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showAttachFile, setShowAttachFile] = useState(true);
  // const [isFileUploading, setIsFileUploading] = useState(false);
  const { userName } = useSelector((state: RootState) => state.login);

  const [isnumError, setIsnumError] = useState(true);
  const ADD_USER = "Add User";
  const USER = "user";
  const [custormerName, setCustomerName] = useState("");
  const [myForm] = Form.useForm();

  const ADD_PRODUCE = "Add Produce";
  const [formData, setFormData] = useState({
    category_type: "user",
    sk: "Add User",
    details: "",
    sel_buy_id: "",
    doc_location: "",
    request: "Add User",
  });

  const onSubmitFile = async (file: any) => {
    console.log("On submit file");
    if (!file) return false;
    const hider = processingPopUp("Uploading file");
    const result: string | boolean | void = await uploadFileToS3(file);
    hider();
    if (result !== undefined && result !== "") {
      message.success("File Upload Success");
      setFormData((prevState) => {
        return {
          ...prevState,
          doc_location: result,
        };
      });
    } else {
      message.error("Something went wrong while uploading file");
    }
  };

  function handleCategory(e: any) {
    setFormData((prevState) => {
      return {
        ...prevState,
        category_type: e ?? USER,
        sk: e === USER ? ADD_USER : ADD_PRODUCE,
        request: e === USER ? ADD_USER : ADD_PRODUCE,
      };
    });
    if (e === "user") {
      setShowProduce(false);
      setShowUser(true);

      setShowDetails(true);
      setShowAttachFile(true);
      setShowSellerID(false);
    } else {
      setShowUser(false);
      setShowProduce(true);
      setShowDetails(true);
      setShowAttachFile(true);
      setShowSellerID(true);
    }
  }
  const dispatch = useDispatch();

  async function handleCreate() {
    console.log(formData);

    if (formData.category_type !== "" && formData.sk !== "") {
      if (formData.sk !== ADD_USER && formData.sel_buy_id === "") {
        message.error("Please fill all details");
        return;
      }

      if (
        formData.request !== "Login" &&
        formData.request !== "Change Phone Number" &&
        formData.request !== "Update Info" &&
        formData.doc_location === ""
      ) {
        message.error("File is required");
        return;
      }

      console.log(userName);
      const finalFormData = { ...formData, pk: "admin#" + userName };
      const hider = processingPopUp();
      const res = await createNewAction(finalFormData);
      hider();
      console.log(res["Status"]);

      console.log(finalFormData);

      // TODO: Uncomment this line
      dispatch(getActionsTabData(userName));

      setFormData({
        category_type: "user",
        sk: "Add User",
        details: "",
        sel_buy_id: "",
        doc_location: "",
        request: "Add User",
      });
    } else {
      message.error("Please fill required details");
    }

    // onDone();
    setShowProduce(false);
    setShowUser(true);

    setShowDetails(true);
    setShowAttachFile(true);
    setShowSellerID(false);
  }

  function handleUser(requestIssue: any) {
    let requestType = "";
    console.log(requestIssue);
    switch (requestIssue) {
      case "addUser":
        setShowDetails(true);
        setShowAttachFile(true);
        setShowSellerID(false);
        requestType = "Add User";
        break;
      case "login":
        setShowDetails(true);
        setShowAttachFile(false);
        setShowSellerID(true);
        requestType = "Login";
        break;
      case "changePhoneNumber":
        setShowDetails(true);
        setShowAttachFile(false);
        setShowSellerID(true);
        requestType = "Change Phone Number";
        break;
      case "updateBankInfo":
        setShowDetails(true);
        setShowAttachFile(true);
        setShowSellerID(true);
        requestType = "Update Bank Info";
        break;
      default:
        break;
    }
    setFormData((prevState) => {
      return {
        ...prevState,
        sk: requestType,
        request: requestType,
      };
    });
  }
  function handleProduce(requestIssue: any) {
    let requestType = "";
    switch (requestIssue) {
      case "addProduce":
        setShowDetails(true);
        setShowAttachFile(true);
        setShowSellerID(true);
        requestType = "Add Produce";
        break;
      case "deleteProduce":
        setShowDetails(true);
        setShowAttachFile(true);
        setShowSellerID(true);
        requestType = "Delete Produce";
        break;
      case "updateInfo":
        setShowDetails(true);
        setShowAttachFile(false);
        setShowSellerID(true);
        requestType = "Update Info";
        break;
      default:
        break;
    }
    setFormData((prevState) => {
      return {
        ...prevState,
        sk: requestType,
        request: requestType,
      };
    });
  }
  const handleTextArea = (e: any) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        details: e.target.value,
      };
    });

    console.log(formData);
  };
  const handleSellerBuyerId = async (e: any) => {
    if (
      /^[0-9]+$/.test(e.target.value) &&
      e.target.value &&
      e.target.value.length === 10
    ) {
      console.log("hello");
      setIsnumError(true);
      const userName = await getUserName(e.target.value);
      if (userName && userName.length > 0) {
        setCustomerName(userName);
      }
      setFormData((prevState) => {
        return {
          ...prevState,
          sel_buy_id: "user#" + e.target.value,
        };
      });
    } else {
      setIsnumError(false);
      setCustomerName("");
    }

    console.log(formData);
  };

  const tailLayout = {
    wrapperCol: { span: 10 },
  };
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { offset: 1, span: 20 },
  };

  return (
    <Form
      className="form-item"
      name="basic"
      {...layout}
      form={myForm}
      // initialValues={{ remember: true }}
      autoComplete="off"
      labelAlign="left"
      colon={false}
      // onFinish={handleCancelling}
    >
      <Form.Item style={{ marginTop: "10px" }} name="category" label="Category">
        <Select
          defaultValue="User"
          bordered={false}
          suffixIcon={<CaretDownFilled />}
          style={{
            width: 205,
            border: "1px solid #C4C4C4",
            borderRadius: "5px",
          }}
          onChange={handleCategory}
        >
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="produce">Produce</Select.Option>
        </Select>
      </Form.Item>

      {showUser && (
        <Form.Item name="requestIssueUser" label="RequestIssue">
          <Select
            defaultValue="Add User"
            bordered={false}
            suffixIcon={<CaretDownFilled />}
            style={{
              width: 205,
              border: "1px solid #C4C4C4",
              borderRadius: "5px",
            }}
            onChange={handleUser}
          >
            <Select.Option value="addUser">Add User</Select.Option>
            <Select.Option value="login">Login</Select.Option>
            <Select.Option value="changePhoneNumber">
              Change Phone Number
            </Select.Option>
            <Select.Option value="updateBankInfo">
              Update Bank Info
            </Select.Option>
          </Select>
        </Form.Item>
      )}
      {showProduce && (
        <Form.Item name="requestIssueProduce" label="RequestIssue">
          <Select
            defaultValue="addProduce"
            bordered={false}
            suffixIcon={<CaretDownFilled />}
            style={{
              width: 205,
              border: "1px solid #C4C4C4",
              borderRadius: "5px",
            }}
            onChange={handleProduce}
          >
            <Select.Option value="addProduce">Add Produce</Select.Option>
            <Select.Option value="updateInfo">Update Info</Select.Option>
            <Select.Option value="deleteProduce">Delete Produce</Select.Option>
          </Select>
        </Form.Item>
      )}
      {showSellerID && (
        <Form.Item
          name="SellerID"
          label="Seller/Buyer ID"
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
          <Space>
            <Input
              style={{
                width: 205,
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
              }}
              id="seller/buyerid"
              title="Enter 10 digit number"
              pattern="[1-9]{10}"
              onChange={handleSellerBuyerId}
            />

            <p style={{ color: "#6F6B6B" }}>
              {custormerName && custormerName.length > 0 && "Seller/Buyer:"}{" "}
              {custormerName}
            </p>
          </Space>
          <p style={{ color: "#6F6B6B" }}>Please enter Seller/Buyer Id</p>
        </Form.Item>
      )}
      {showDetails && (
        <Form.Item label="Details" name="details">
          <TextArea
            value={value}
            onChange={handleTextArea}
            placeholder=""
            autoSize={{ minRows: 3, maxRows: 5 }}
            style={{
              width: 369,
              border: "1px solid #C4C4C4",
              borderRadius: "5px",
            }}
          />
        </Form.Item>
      )}
      {showAttachFile && (
        <Form.Item name="attachFile" wrapperCol={{ offset: 3, span: 20 }}>
          <AttachFile onSubmit={onSubmitFile} />
        </Form.Item>
      )}

      <Form.Item style={{ marginTop: "40px" }} {...tailLayout}>
        {/* <Button
          type="link"
          htmlType="button"
          style={{ color: "#C4C4C4" }}
          onClick={handleCancelling}
        >
          Cancel
        </Button> */}
        <Button
          type="primary"
          style={{ background: "#12805C", borderRadius: "3px" }}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}

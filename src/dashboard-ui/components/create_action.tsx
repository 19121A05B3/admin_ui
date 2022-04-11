//Create new action
import React from "react";
import "./create_action.scss";
import { useState } from "react";
import AttachFile from "./attach_file";
import { uploadFileToS3 } from "../../services/s3_service";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewAction,
  getActionsTabData,
} from "../../store/slices/mainSlice";
import { RootState } from "../../store";

const ADD_USER = "Add User";
const PRODUCE = "produce";
const USER = "user";

const ADD_PRODUCE = "Add Produce";
export default function CreateNewAction() {
  const [showActionForm, setShowActionForm] = useState(false);
  const [showUserRequestIssue, setShowUserRequestIssue] = useState(true);
  const [showProduceRequestIssue, setShowProduceRequestIssue] = useState(false);
  const [showAddUser, setShowAddUser] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showChangePhoneNumber, setShowChangePhoneNumber] = useState(false);
  const [showUpdateBankInfo, setShowUpdateBankInfo] = useState(false);
  const [showAddProduce, setShowAddProduce] = useState(false);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [showDeleteProduce, setShowDeleteProduce] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const { userName } = useSelector((state: RootState) => state.login);

  const [formData, setFormData] = useState({
    // {
    //   pk:fo_id,(admin#9000242424)
    //   sk:request/issue,
    //   category:Produce/user,
    //   seller/buyerid:user#457657866,
    //   details:"dfghktjn",
    //   doc_location:''(optional)
    //   }

    category_type: "user",
    sk: "Add User",
    details: "",
    sel_buy_id: "",
    doc_location: "",
    request: "Add User",
  });

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const AttachFileSection = (marginTop: number) => {
    return (
      <div
        className="file-attach"
        style={{ marginTop: marginTop, position: "absolute" }}
      >
        <AttachFile onSubmit={onSubmitFile} />
        {isFileUploading ? <Spin indicator={antIcon} /> : ""}
      </div>
    );
  };

  const onSubmitFile = async (file: any) => {
    console.log("On submit file");
    if (!file) return false;
    setIsFileUploading(true);
    const result: string | boolean | void = await uploadFileToS3(file);
    setIsFileUploading(false);
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

  function handleCategory(event: any) {
    setFormData((prevState) => {
      return {
        ...prevState,
        category_type: event.target.value ?? USER,
        sk: event.target.value == USER ? ADD_USER : ADD_PRODUCE,
        request: event.target.value == USER ? ADD_USER : ADD_PRODUCE,
      };
    });

    if (event.target.value === "user") {
      setShowUserRequestIssue(true);
      setShowProduceRequestIssue(false);
      setShowAddUser(true);
      setShowLogin(false);
      setShowChangePhoneNumber(false);
      setShowUpdateBankInfo(false);
      setShowAddProduce(false);
      setShowUpdateInfo(false);
      setShowDeleteProduce(false);
    } else {
      setShowUserRequestIssue(false);
      setShowProduceRequestIssue(true);
      setShowAddUser(false);
      setShowLogin(false);
      setShowChangePhoneNumber(false);
      setShowUpdateBankInfo(false);
      setShowAddProduce(true);
      setShowUpdateInfo(false);
      setShowDeleteProduce(false);
    }
  }

  function handleUser(requestIssue: any) {
    let requestType = "";

    switch (requestIssue.target.value) {
      case "addUser":
        setShowAddUser(true);
        setShowLogin(false);
        setShowChangePhoneNumber(false);
        setShowUpdateBankInfo(false);
        setShowAddProduce(false);
        setShowUpdateInfo(false);
        setShowDeleteProduce(false);
        requestType = "Add User";
        break;
      case "login":
        setShowLogin(true);
        setShowAddUser(false);
        setShowChangePhoneNumber(false);
        setShowUpdateBankInfo(false);
        setShowAddProduce(false);
        setShowUpdateInfo(false);
        setShowDeleteProduce(false);
        requestType = "Login";
        break;
      case "changePhoneNumber":
        setShowChangePhoneNumber(true);
        setShowAddUser(false);
        setShowLogin(false);
        setShowUpdateBankInfo(false);
        setShowAddProduce(false);
        setShowUpdateInfo(false);
        setShowDeleteProduce(false);
        requestType = "Change Phone Number";
        break;
      case "updateBankInfo":
        setShowUpdateBankInfo(true);
        setShowAddUser(false);
        setShowLogin(false);
        setShowChangePhoneNumber(false);
        setShowAddProduce(false);
        setShowUpdateInfo(false);
        setShowDeleteProduce(false);
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

  const dispatch = useDispatch();

  async function handleCreate() {
    console.log(formData);

    if (formData.category_type !== "" && formData.sk !== "") {
      if (formData.sk != ADD_USER && formData.sel_buy_id == "") {
        message.error("Please fill all details");
        return;
      }
      console.log(userName);
      const finalFormData = { ...formData, pk: "admin#" + userName };

      const res = await createNewAction(finalFormData);
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
      message.error("Please fill all details");
    }
    setShowActionForm(false);
    setShowUserRequestIssue(true);
    setShowProduceRequestIssue(false);
    setShowAddUser(true);
    setShowLogin(false);
    setShowChangePhoneNumber(false);
    setShowUpdateBankInfo(false);
    setShowAddProduce(false);
    setShowUpdateInfo(false);
    setShowDeleteProduce(false);
  }

  async function handleCancel() {
    setShowActionForm(false);
    setShowUserRequestIssue(true);
    setShowProduceRequestIssue(false);
    setShowAddUser(true);
    setShowLogin(false);
    setShowChangePhoneNumber(false);
    setShowUpdateBankInfo(false);
    setShowAddProduce(false);
    setShowUpdateInfo(false);
    setShowDeleteProduce(false);
  }
  function handleProduce(requestIssue: any) {
    let requestType = "";
    switch (requestIssue.target.value) {
      case "addProduce":
        setShowAddProduce(true);
        setShowAddUser(false);
        setShowLogin(false);
        setShowChangePhoneNumber(false);
        setShowUpdateBankInfo(false);
        setShowUpdateInfo(false);
        setShowDeleteProduce(false);
        requestType = "Add Produce";
        break;
      case "updateInfo":
        setShowUpdateInfo(true);
        setShowAddUser(false);
        setShowLogin(false);
        setShowChangePhoneNumber(false);
        setShowUpdateBankInfo(false);
        setShowAddProduce(false);
        setShowDeleteProduce(false);
        requestType = "Update Info";
        break;
      case "deleteProduce":
        setShowDeleteProduce(true);
        setShowAddUser(false);
        setShowLogin(false);
        setShowChangePhoneNumber(false);
        setShowUpdateBankInfo(false);
        setShowAddProduce(false);
        setShowUpdateInfo(false);
        requestType = "Delete Produce";
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

  const handleSellerBuyerId = (e: any) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        sel_buy_id: "user#" + e.target.value,
        // sel_buy_id: e.target.value,
      };
    });

    console.log(formData);
  };

  return (
    <div className="create-new-action">
      {showActionForm && (
        <div>
          <button className="action-button" onClick={handleCancel}>
            + Create New Action
          </button>
        </div>
      )}

      {!showActionForm && (
        <div>
          <button
            className="action-button"
            onClick={() => setShowActionForm(true)}
          >
            {" "}
            + Create New Action
          </button>
        </div>
      )}

      {showActionForm && (
        <div className="action-form">
          <label>
            <span className="category">Category</span>
            <select
              className="category-select"
              onChange={handleCategory}
              defaultValue="select"
            >
              {/* <option value="select">select</option> */}
              <option value={USER}>User</option>
              <option value={PRODUCE}>Produce</option>
            </select>
          </label>

          {showUserRequestIssue && (
            <div className="request-issue">
              <label>
                <span className="req-issue">Request/Issue</span>
                <select
                  className="req-issue-select"
                  onChange={handleUser}
                  defaultValue="select"
                >
                  {/* <option value="select">select</option> */}
                  <option value="addUser">Add User</option>
                  <option value="login">Login</option>
                  <option value="changePhoneNumber">Change Phone Number</option>
                  <option value="updateBankInfo">Update Bank Info</option>
                </select>
              </label>
            </div>
          )}
          {showProduceRequestIssue && (
            <div className="request-issue">
              <label>
                <span className="req-issue">Request/Issue</span>
                <select
                  className="req-issue-select"
                  onChange={handleProduce}
                  defaultValue="select"
                >
                  {/* <option value="select">select</option> */}
                  <option value="addProduce">Add Produce</option>
                  <option value="updateInfo">Update Info</option>
                  <option value="deleteProduce">Delete Produce</option>
                </select>
              </label>
            </div>
          )}
          {showAddUser && (
            <div className="add-user">
              <label>
                <span className="details"> Details</span>
                <textarea
                  onChange={handleTextArea}
                  className="details-textarea" /* defaultValue="Please add following seller and buyers" */
                />
                <br />
                <br />
                <br />
                {AttachFileSection(10)}
              </label>
              <div className="create">
                <br />
                <br />
                {
                  <button type="submit" onClick={handleCreate}>
                    Create
                  </button>
                }
              </div>
            </div>
          )}
          {showLogin && (
            <div className="Login">
              <label>
                <span className="seller-buyer-id">Seller/Buyer Id</span>
                <input
                  className="input seller-buyer-text"
                  type="text"
                  onChange={handleSellerBuyerId}
                />
              </label>
              <br /> <br />
              <label>
                <span className="seller-buyer-details">Details</span>
                <textarea
                  onChange={handleTextArea}
                  className="seller-buyer-details-textarea" /* defaultValue="Seller unable to login.Please change password" */
                />
              </label>
              <div className="create">
                {
                  <button type="submit" onClick={handleCreate}>
                    {" "}
                    Create
                  </button>
                }
              </div>
            </div>
          )}
          {showChangePhoneNumber && (
            <div className="change-phone-number">
              <label>
                <span className="seller-buyer-id">Seller/Buyer Id</span>
                <input
                  className="input seller-buyer-text"
                  onChange={handleSellerBuyerId}
                  type="text"
                />
              </label>
              <br /> <br />
              <label>
                <span className="seller-buyer-details">Details</span>
                <textarea
                  onChange={handleTextArea}
                  className="seller-buyer-details-textarea" /*  defaultValue="Change Phone number to:" */
                />
              </label>
              <div className="create">
                {
                  <button type="submit" onClick={handleCreate}>
                    {" "}
                    Create
                  </button>
                }
              </div>
            </div>
          )}

          {showUpdateBankInfo && (
            <div className="update-bank-info">
              <label>
                <span className="seller-buyer-id">Seller/Buyer Id</span>
                <input
                  className="input seller-buyer-text"
                  type="text"
                  onChange={handleSellerBuyerId}
                />
              </label>
              <br />
              <br />
              <label>
                <span className="seller-buyer-details">Details</span>
                <textarea
                  onChange={handleTextArea}
                  className="seller-buyer-details-textarea" /* defaultValue="Change bank account no to:" */
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                {AttachFileSection(60)}
                {/* <button className="update-bank-info-attach-file"> <PaperClipOutlined />Attach file </button> */}
              </label>

              <div className="create">
                {
                  <button type="submit" onClick={handleCreate}>
                    {" "}
                    Create
                  </button>
                }
              </div>
            </div>
          )}

          {showAddProduce && (
            <div className="add-produce">
              <label>
                <span className="seller-buyer-id">Seller/Buyer Id</span>
                <input
                  className="input seller-buyer-text"
                  type="text"
                  onChange={handleSellerBuyerId}
                />
              </label>
              <br />
              <br />
              <label>
                <span className="seller-buyer-details">Details</span>
                <textarea
                  onChange={handleTextArea}
                  className="seller-buyer-details-textarea" /* defaultValue="Add following produce to above seller" */
                />
                <br />
                <br />
                <br />
                {AttachFileSection(60)}

                {/* <button className="update-bank-info-attach-file"> <PaperClipOutlined />Attach file </button> */}
              </label>
              <br />
              <br />
              <div className="create">
                {
                  <button type="submit" onClick={handleCreate}>
                    {" "}
                    Create
                  </button>
                }
              </div>
            </div>
          )}

          {showUpdateInfo && (
            <div className="update-info">
              <label>
                <span className="seller-buyer-id">Seller/Buyer Id</span>
                <input
                  className="input seller-buyer-text"
                  type="text"
                  onChange={handleSellerBuyerId}
                />
              </label>
              <br />
              <br />
              <label>
                <span className="seller-buyer-details">Details</span>
                <textarea
                  onChange={handleTextArea}
                  className="seller-buyer-details-textarea" /* defaultValue="Crop: Change quantity to:" */
                />
              </label>
              <div className="create">
                {
                  <button type="submit" onClick={handleCreate}>
                    {" "}
                    Create
                  </button>
                }
              </div>
            </div>
          )}

          {showDeleteProduce && (
            <div className="delete-produce">
              <label>
                <span className="seller-buyer-id">Seller/Buyer Id</span>
                <input
                  className="input seller-buyer-text"
                  type="text"
                  onChange={handleSellerBuyerId}
                />
              </label>
              <br /> <br />
              <label>
                <span className="seller-buyer-details">Details</span>
                <textarea
                  onChange={handleTextArea}
                  className="seller-buyer-details-textarea" /* defaultValue="Delete the following produce" */
                />
              </label>
              <div className="create">
                {
                  <button type="submit" onClick={handleCreate}>
                    {" "}
                    Create
                  </button>
                }
              </div>
            </div>
          )}

          <div className="cancel">
            <span onClick={handleCancel}>Cancel</span>
          </div>
        </div>
      )}
    </div>
  );
}

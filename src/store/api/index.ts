import { message } from "antd";
import axios from "axios";
import { dp } from "../../helper";

const getAppHeaders = () => {
  const token = sessionStorage.getItem("token");
  console.log(token);
  const headerData = {
    Authorization: token ?? "",
    "Content-Type": "application/json",
  };
  return headerData;
};

const getBodyData = () => {
  const adminId = sessionStorage.getItem("userName");
  const bodyData = {
    admin: "admin#" + adminId,
  };
  dp(bodyData);
  return bodyData;
};

export const baseUrl =
  "https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com/dev/admin";

export const fetchSellerBuyerData = async (id: String) => {
  try {
    let finalData = await axios({
      method: "post",
      url: baseUrl + "/transactions",
      data: getBodyData(),
      headers: getAppHeaders(),
    });
    return finalData.data;
  } catch (err) {
    dp(err);
    return undefined;
  }
};

export const fetchVBUserData = async (id: String) => {
  try {
    let finalData = await axios({
      method: "post",
      url: baseUrl + "/vbusers",
      headers: getAppHeaders(),
      data: getBodyData(),
    });
    console.log(finalData.data);
    return finalData.data;
  } catch (err) {
    dp(err);
    return undefined;
  }
};
export const fetchProduceData = async (id: String) => {
  try {
    let finalData = await axios({
      method: "post",
      url: baseUrl + "/produces",
      headers: getAppHeaders(),
      data: getBodyData(),
    });
    return finalData.data;
  } catch (err) {
    dp(err);
    return undefined;
  }
};
export const fetchactionTabData = async (id: string) => {
  try {
    let finalData = await axios({
      method: "post",
      url: baseUrl + "/request_issues",
      headers: getAppHeaders(),
      data: getBodyData(),
    });
    console.log(finalData.data);
    return finalData.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const updateStatusApi = async (dataToPost: any) => {
  try {
    let finalData = await axios({
      method: "post",
      url: baseUrl + "/status_change",
      headers: getAppHeaders(),
      data: dataToPost,
    });
    console.log(finalData);
    return true;
  } catch (err) {
    message.error(`${err}`);
    return undefined;
  }
};

export const idCardApi = async (dataToPost: any) => {
  try {
    let finalData = await axios({
      method: "post",
      url: baseUrl + "/idcard",
      headers: getAppHeaders(),
      data: dataToPost,
    });
    console.log(finalData);
    return finalData.data;
  } catch (err) {
    message.error(`${err}`);
    return undefined;
  }
};

export const createNewActionApi = async (dataToPost: any) => {
  try {
    let finalData = await axios({
      method: "post",
      url: baseUrl + "/create_action",
      headers: getAppHeaders(),
      data: dataToPost,
    });
    return finalData.data;
  } catch (err) {
    message.error(`${err}`);
    return undefined;
  }
};

export const fetchFODetails = async (id: String) => {
  try {
    let finalData = await axios({
      method: "post",
      url: baseUrl + "/fieldofficer_details",
      headers: getAppHeaders(),
      //  {
      //   Authorization:
      //     "eyJraWQiOiJLNDZVWjkydHEzZGJvcHhYbmE1ak5tWWRhUGhKbXBRc3ZxM3JERisyS1NVPSIsImFsZyI6IlJTMjU2In0",
      // },
      data: getBodyData(),
      // {
      //   admin: "admin#" + "9392024242",
      // },
    });
    return finalData.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const fetchUserName = async (userID: String) => {
  try {
    let finalData = await axios({
      method: "post",
      url: baseUrl + "/findusername",
      headers: getAppHeaders(),
      data: {
        user: "user#" + userID,
      },
    });
    return finalData.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

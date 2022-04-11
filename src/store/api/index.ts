import { message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { dp } from "../../helper";
import { RootState } from "../../store";
import store from "../index";

// store.subscribe(listener);

// function select(state: any) {
//   return state.login.userName;
// }

// function listener() {
//   let token = select(store.getState());
//   userName = token;
// }

// const baseUrl = "https://i2esbt8nni.execute-api.ap-south-1.amazonaws.com/dev";

const headerValue = {
  "Content-Type": "text/plain",
  "Access-Control-Allow-Origin": "*",
};
export const fetchSellerBuyerData = async (id: String) => {
  try {
    let finalData = await axios({
      method: "post",
      // url: baseUrl + "/transactions",
      url: "/transactions",
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        admin: "admin#" + id,
      },
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
      // url: baseUrl + "/vbusers",
      url: "/vbusers",

      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        admin: "admin#" + id,
      },
    });
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
      // url: baseUrl + "/produces",
      url: "/produces",
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        admin: "admin#" + id,
      },
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
      // url: baseUrl + "/request_issues",
      url: "/request_issues",

      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
      data: { admin: "admin#" + id },
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
      url: "/status_change",
      // url: baseUrl + "/status_change",

      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
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
      url: "/idcard",
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
      data: dataToPost,
    });
    console.log(finalData);
    return finalData.data.IDLocation;
  } catch (err) {
    message.error(`${err}`);
    return undefined;
  }
};

export const createNewActionApi = async (dataToPost: any) => {
  try {
    let finalData = await axios({
      method: "post",
      // url: baseUrl + "/create_action",
      url: "/create_action",
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
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
      url: "/fieldofficer_details",
      headers: headerValue,
      data: {
        admin: "admin#" + id,
      },
    });
    console.log("FO DETAILS");
    console.log(finalData.data);
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
      url: "/findusername",
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        user: "user#" + userID,
      },
    });
    return finalData.data[0].name;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

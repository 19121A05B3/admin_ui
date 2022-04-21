import axios from "axios";
import { dp } from "../../helper";

const baseUrl = "https://9uedorofia.execute-api.ap-south-1.amazonaws.com/dev/admin";
export const RegisterSingleCheck = async (val) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    let data = await axios.post(baseUrl + "/create_fo", val, headers);
    console.log(data);
    return data.data.body;
  } catch (err) {
    dp(err);
    dp("Error while registering single user");
  }
};

export const RegisterBulkCheck = async (val) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    let data = await axios.post(baseUrl + "/bulkusersdemo", val, headers);
    return data;
  } catch (err) {
    dp(err);
    dp("Error while registering bulk users");
  }
};

import axios from "axios";
import { dp } from "../../helper";
export const RegisterSingleCheck = async (val) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    let data = await axios.post("/create_fo", val, headers);
    return data;
  } catch (err) {
    dp(err);
    dp("Error while registering single user");
  }
};

export const RegisterBulkCheck = async (val) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    let data = await axios.post("/bulkusersdemo", val, headers);
    return data;
  } catch (err) {
    dp(err);
    dp("Error while registering bulk users");
  }
};

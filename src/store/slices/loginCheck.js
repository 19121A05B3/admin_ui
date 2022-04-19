import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import axios from "axios";
import { baseUrl, fetchFODetails } from "../api";
import S3FileUpload from "react-s3";
import { dp } from "../../helper";

var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1",
});

const poolId = process.env.REACT_APP_UserPoolId;
const ClientId = process.env.REACT_APP_ClientId;

const poolData = {
  UserPoolId: poolId,
  ClientId: ClientId,
};

const userPool = new CognitoUserPool(poolData);

let loggedInUser = "";

const getuser = (username) => {
  return new CognitoUser({ Username: username, Pool: userPool });
};

export const LoginCheck = async (val) => {
  return new Promise((resolve, reject) => {
    let { username, password } = val;
    const user = getuser(username);
    loggedInUser = user;
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        var accessToken = data.getAccessToken().getJwtToken();
        const token = data.refreshToken.token;
        const tokenToSend = data.getIdToken().getJwtToken();
        sessionStorage.setItem("userName", user.username);
        sessionStorage.setItem("token", tokenToSend);
        dp(token);
        dp(accessToken);
        dp(user.username);
        resolve(1);
      },
      onFailure: (err) => {
        dp(err);
        resolve(2);
      },
      newPasswordRequired: (data) => {
        dp(data);
        resolve(3);
      },
    });
  });
};

export const ResetPassword = async (newpassword) => {
  return new Promise((resolve, reject) => {
    console.log(newpassword, "hai");
    const user = loggedInUser;
    console.log(user);
    user.completeNewPasswordChallenge(
      newpassword,
      {},
      {
        onSuccess: (result) => {
          console.log(result);
          resolve(1);
        },
        onFailure: (err) => {
          console.log(err);
          resolve(2);
        },
      }
    );
  });
};

export const ForgetPassword = async (val) => {
  return new Promise((resolve, reject) => {
    let { OTP, password } = val;
    const user = loggedInUser;
    user.confirmPassword(OTP, password, {
      onSuccess: (data) => {
        console.log("Success Changed Successfully");
        resolve(1);
      },
      onFailure: (err) => {
        console.error("Something Went Wrong! Please try again");
        resolve(2);
      },
    });
  });
};

export const Mailchecker = async (email) => {
  return new Promise((resolve, reject) => {
    // const email = 'balupremchand6@gmail.com';
    loggedInUser = getuser(email);
    axios
      .post(baseUrl + "/fieldofficer_cognito", { admin: email })
      .then((data) => {
        if (data.data.Status == "Success") {
          loggedInUser.forgotPassword({
            onSuccess: (data) => {
              console.log(data);
            },
            onFailure: (err) => {
              console.log(err);
            },
            inputVerificationCode: (data) => {
              console.log("code sent successfully");
              resolve(1);
            },
          });
        }
        if (data.data.Status == "Not Found") {
          resolve(2);
        }
      })
      .catch((err) => {
        resolve(3);
      });
  });
};

export const uploadFileToS3 = async (fileToUpload) => {
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: "ap-south-1",
    accessKeyId: process.env.REACT_APP_S3_ACCESS_TOKEN,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
  };

  return new Promise((resolve, reject) => {
    S3FileUpload.uploadFile(fileToUpload, config)
      .then((data) => {
        resolve(data.location);
      })
      .catch((err) => {
        console.error(err);
        dp("ERROR WHILE UPLOADING FILE");
      });
  });
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    userName: "",
    // foDetails: {},
  },
  extraReducers: (builder) => {
    // builder.addCase(getFODetails.fulfilled, (state, action) => {
    //   state.foDetails = action.payload;
    //   console.log(action.payload);
    // });
  },

  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("userName");
      window.location.reload(false);
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserName, logout } = loginSlice.actions;
export default loginSlice.reducer;

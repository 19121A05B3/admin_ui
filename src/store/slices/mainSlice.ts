import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { useSelector } from "react-redux";
import store from "../index";

import {
  fetchProduceData,
  fetchSellerBuyerData,
  fetchVBUserData,
  fetchactionTabData,
  updateStatusApi,
  createNewActionApi,
  fetchFODetails,
  idCardApi,
  fetchUserName,
} from "../api";
import {
  transactionDummyData,
  produceDummyData,
  vbuserDummyData,
  actionsTabDummyData,
} from "./dummyData";
import { dp } from "../../helper";

const isDev = false;

export const getFODetails = createAsyncThunk(
  "getFODetails",
  async (id: String) => {
    dp(":::Fetching FO Details::::");
    const res = await fetchFODetails(id);
    if (res == undefined) throw "Error while fetching fo details";
    dp("fo data fetched success");

    return res;
  }
);

export const getTransactionData = createAsyncThunk(
  "getTransactionData",
  async (id: String) => {
    dp(":::Fetching Transaction Data::::");

    // throw "ERROR IN TRANSACTION DATA";

    if (isDev) return transactionDummyData;
    const res = await fetchSellerBuyerData(id);
    if (res == undefined) throw "Error while transaction data";
    dp("transaction data fetched success");

    return res;
  }
);

export const getVBUsersData = createAsyncThunk(
  "getVBUsersData",
  async (id: String) => {
    dp(":::Fetching VB User Data::::");

    if (isDev) return vbuserDummyData;
    const res = await fetchVBUserData(id);
    if (res == undefined) throw "Error while fetching vb user data";
    dp("VB USER data fetched success");
    return res;
  }
);

export const getProduceData = createAsyncThunk(
  "getProduceData",
  async (id: String) => {
    dp(":::Fetching Produce Data::::");

    if (isDev) return produceDummyData;
    const res = await fetchProduceData(id);
    if (res == undefined) throw "Error while produce data";
    dp("produce data fetched success");

    return res;
  }
);

export const getActionsTabData = createAsyncThunk(
  "getActionsTabData",
  async (userName: string) => {
    dp(":::Fetching actions tab Data::::");

    if (isDev) return actionsTabDummyData;
    const res = await fetchactionTabData(userName);
    if (res == undefined) throw "Error while action tab data";
    dp("action tab data fetched success");

    return res;
  }
);

export const updateStatus = async (myData: {
  pk: string;
  sk: string;
  status: string;
}) => {
  const { pk, sk, status } = myData;
  let data = {
    pk: pk,
    sk: sk,
    status_change: status,
  };

  if (isDev) return;
  const res = await updateStatusApi(JSON.stringify(data));
  if (res) {
    message.success("SUCCESS");
  } else {
    message.error("Failed to update status");
  }

  return res;
};

export const createNewAction = async (formData: {}) => {
  // BODY SCHEMA TO SEND
  // {
  //   pk:fo_id,(admin#9000242424)
  //   sk:request/issue,
  //   category:Produce/user,
  //   seller/buyerid:user#457657866,
  //   details:"dfghktjn",
  //   doc_location:''(optional)
  //   }
  let data = {
    ...formData,
  };

  if (isDev) return;

  const res = await createNewActionApi(JSON.stringify(data));
  console.log(res);
  if (res !== false) message.success(res.Status ?? "SUCCESS");

  return res;
};
export const idCard = async (myData: { userid: string; usertype: string }) => {
  const { userid, usertype } = myData;
  let data = {
    userid: userid,
    usertype: usertype,
  };

  if (isDev) return;
  const res = await idCardApi(JSON.stringify(data));

  // if (res) {
  //   // message.success("SUCCESS");
  // } else {
  //   // message.error("Failed to update status");
  // }
  return res;
};

export const getUserName = async (userID: string) => {
  if (isDev) return;
  const res = await fetchUserName(userID);
  return res;
};

const initialState = {
  isActionsTabData: false,
  isProduceData: false,
  isUsersData: false,
  isTransactionData: false,
  isFoDetails: false,
  isNewFO: false,

  retryFO: 0,
  retryActionsTabData: 0,
  retryProduceData: 0,
  retryVbUserData: 0,
  retryTransactionData: 0,

  foDetails: {
    assigned_user_type: "",
    "name ": "",
    phone_no: "",
    username: "",
    zips_assigned: [],
    address: "",
    email: "",
    users: [],
    years_of_experience: "",
    thaluka: "",
  },

  transactionData: {
    Individual_Transactions: {},
    Buyer_data: [],
    Seller_data: [],
    Seller_matches: [],
    match_produces: [],
    totallto: "",
    totalat: "",
    totalttv: "",
    totalms: "",
    summary: {},
    matches_produces: [],
    produces: {
      seller: [],
      buyer: [],
    },
    seller_quantity_range: {
      min: 0,
      max: 0,
    },
    buyer_quantity_range: {
      min: 0,
      max: 0,
    },
    seller_transaction_range: {
      min: 0,
      max: 0,
    },
    buyer_transaction_range: {
      min: 0,
      max: 0,
    },
    match_transaction_range: {
      min: 0,
      max: 0,
    },
    match_quantity_range: {
      min: 0,
      max: 0,
    },
  },
  vbUserData: {
    Seller: [],
    Buyer: [],
    totalusers: "",
    summary: {},
    user_types: {
      buyer: [],
      seller: [],
    },
  },

  produceData: {
    buyer_data: undefined,
    Individual_Produces: [],
    sellyes: undefined,
    sellno: [],
    totallto2: "",
    totalintent: "",
    summary: {},
    produce: {
      seller: [],
      buyer: [],
    },
    grade: {
      seller: [],
      buyer: [],
    },
    category: {
      seller: [],
      buyer: [],
    },
    variety: {
      seller: [],
      buyer: [],
    },
    apmc_price: { min: 0, max: 9000000 },
    price_per_qnt: { min: 0, max: 9000000 },
    seller_qty: { min: 0, max: 9000000 },
    buyer_qty: { min: 0, max: 9000000 },
  },
  actionsTabData: {
    Issues_Individual: {},
    OnGoing: [],
    Completed: [],
    category_type: [],
    status: [],
    requests: [],
  },
  summarizedData: {
    lto1: [],
    lto2: [],
    at: [],
    sp: [],
    ttv: [],
    vbu: [],
    match_status: [],
  },
};

const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getFODetails.rejected, (state) => {
      state.retryFO++;
    });

    builder.addCase(getActionsTabData.rejected, (state) => {
      state.retryActionsTabData++;
    });

    builder.addCase(getProduceData.rejected, (state) => {
      state.retryProduceData++;
    });

    builder.addCase(getVBUsersData.rejected, (state) => {
      state.retryVbUserData++;
    });

    builder.addCase(getTransactionData.rejected, (state) => {
      state.retryTransactionData++;
    });

    builder.addCase(getFODetails.fulfilled, (state, action) => {
      if (
        action.payload[0] &&
        action.payload[0].zips_assigned &&
        action.payload[0].zips_assigned.length > 0
      ) {
        state.isFoDetails = true;
      } else {
        state.isNewFO = true;
      }
      state.foDetails = action.payload[0];
    });

    builder.addCase(getActionsTabData.fulfilled, (state, action) => {
      state.isActionsTabData = true;
      console.log(action.payload);
      console.log("THIS IS THE PAYLOAD");
      state.actionsTabData = action.payload;
    });

    builder.addCase(getProduceData.fulfilled, (state, action) => {
      state.isProduceData = true;
      console.log("produuuuuuuuuuuuuu");
      console.log(action.payload);

      state.produceData = action.payload;
      state.summarizedData.sp = action.payload.summary["sp"];
      state.summarizedData.lto2 = action.payload.summary["lto"];
      console.log(action.payload.summary["lto"]);
      console.log("SUMMMMMMMM");
      console.log("THIS IS THE PAYLOAD");
    });

    builder.addCase(getVBUsersData.fulfilled, (state, action) => {
      state.isUsersData = true;
      state.vbUserData = action.payload;
      if (action.payload) {
        state.summarizedData.vbu = action.payload.summary["vbu"];
      }
    });

    builder.addCase(getTransactionData.fulfilled, (state, action) => {
      state.isTransactionData = true;
      state.transactionData = action.payload;
      state.summarizedData.at = action.payload.summary["at"];
      state.summarizedData.ttv = action.payload.summary["ttv"];
      state.summarizedData.lto1 = action.payload.summary["lto"];
      state.summarizedData.match_status =
        action.payload.summary["match_status"];
    });
  },
});

export default mainSlice.reducer;

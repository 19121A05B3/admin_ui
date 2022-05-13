import { Affix, Button, Typography } from "antd";
import "./dashboard-ui/dashboard.scss";
import "./App.scss";
import AppHeader from "./components/common/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard-ui";
import Produces from "./dashboard-ui/components/produce";
import Users from "./dashboard-ui/components/usersmenu";
import Matches from "./dashboard-ui/components/matchesmenu";
import Transactions from "./dashboard-ui/components/transactionsmenu";
import Loginmodal from "./login_components/loginmodal";
import { useEffect } from "react";
import {
  getTransactionData,
  getProduceData,
  getVBUsersData,
  getActionsTabData,
  getFODetails,
} from "./store/slices/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUserName } from "./store/slices/loginCheck";
import { RootState } from "./store";
import { loadingIndicator } from "./dashboard-ui/components/transactions";

function App() {
  const { userName } = useSelector((state: RootState) => state.login);
  const {
    isActionsTabData,
    isProduceData,
    isUsersData,
    isTransactionData,
    isFoDetails,
    isNewFO,
    retryFO,
    retryActionsTabData,
    retryProduceData,
    retryTransactionData,
    retryVbUserData,
  } = useSelector((state: RootState) => state.main);

  const dispatch = useDispatch();

  ///////////////// Retrry logic
  useEffect(() => {
    if (retryFO === 0) return;
    setTimeout(() => {
      dispatch(getFODetails(userName));
    }, 3000);
  }, [retryFO]);

  useEffect(() => {
    if (retryActionsTabData === 0) return;
    setTimeout(() => {
      dispatch(getActionsTabData(userName));
    }, 3000);
  }, [retryActionsTabData]);

  useEffect(() => {
    if (retryProduceData === 0) return;
    setTimeout(() => {
      dispatch(getProduceData(userName));
    }, 3000);
  }, [retryProduceData]);

  useEffect(() => {
    if (retryTransactionData === 0) return;
    setTimeout(() => {
      dispatch(getTransactionData(userName));
    }, 3000);
  }, [retryTransactionData]);

  useEffect(() => {
    if (retryVbUserData === 0) return;
    setTimeout(() => {
      dispatch(getVBUsersData(userName));
    }, 3000);
  }, [retryVbUserData]);

  ////// retry logic ends

  useEffect(() => {
    const userName = sessionStorage.getItem("userName") ?? "";
    if (userName !== undefined && userName !== "") {
      dispatch(setUserName(userName));
      dispatch(getFODetails(userName));
    }
  }, [userName]);

  useEffect(() => {
    const userName = sessionStorage.getItem("userName") ?? "";
    if (isFoDetails && userName !== undefined && userName !== "") {
      dispatch(getTransactionData(userName));
      dispatch(getProduceData(userName));
      dispatch(getVBUsersData(userName));
      dispatch(getActionsTabData(userName));
    }
  }, [isFoDetails, isNewFO]);

  if (userName === undefined || userName === "") return <Loginmodal />;

  if (isNewFO)
    return (
      <div className="no-data-fo">
        <Typography.Title level={4}>No Data for this FO</Typography.Title>
        <Button type="primary" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </div>
    );

  return isActionsTabData &&
    isProduceData &&
    isTransactionData &&
    isUsersData &&
    isFoDetails ? (
    <Router>
      <div className="App">
        <Affix>
          <AppHeader />
        </Affix>
        <Routes>
          {/* <Route path="/" element={<Loginmodal />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/produces" element={<Produces />} />
          <Route path="/users" element={<Users />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </Router>
  ) : (
    loadingIndicator
  );
}

export default App;

import { Row, Col, Card, Select, Anchor } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import InfoDetails from "./info_details";
import { useState } from "react";
import Intentosell from "./intentToSell";
import Matches from "./matches";
import Users from "./users";
import TransactionsV2 from "./transactions";

const { Link } = Anchor;
const { Option } = Select;
const LTO = "LTO";
const AT = "AT";
const SP = "SP";
const TTV = "TTV";
const VBU = "VBU";
const MS = "MS";
const US = "US";

const initFilterData = {
  filterText: "All",
  group: "",
};

const initSummaryData = [
  //live transactions
  { legend: "Trade Pending", value: 0 },
  { legend: "Trade Confirmed", value: 0 },
  { legend: "Seller Confirmed", value: 0 },
  { legend: "Transportation to be Assigned", value: 0 },
  { legend: "Transportation Assigned", value: 0 },
  { legend: "Produce to be Picked", value: 0 },
  { legend: "Produce Picked", value: 0 },
  { legend: "Produce in Transit", value: 0 },
  { legend: "Produce Delivered", value: 0 },
  // vb users
  { legend: "Seller Only", value: 0 },
  { legend: "Buyer Only", value: 0 },
  { legend: "Seller+Buyer", value: 0 },
  // All Transactions
  { legend: "On Going", value: 0 },
  { legend: "Pending", value: 0 },
  { legend: "Completed", value: 0 },
  // Seller produce
  { legend: "Yes", value: 0 },
  { legend: "No", value: 0 },
  // Total Transaction Value
  { legend: "Produce Type Staple", value: 0 },
  { legend: "Produce Type Cash", value: 0 },
  { legend: "Produce Type Oil", value: 0 },
  { legend: "Produce Type Spices", value: 0 },
  { legend: "Produce Type Pulses", value: 0 },
  // Match status
  { legend: "Buyer to confirm", value: 0 },
  { legend: "Seller to confirm", value: 0 },
  // User Status
  { legend: "Active", value: 0 },
  { legend: "Active/F", value: 0 },
  { legend: "Add Produce Blocked", value: 0 },
  { legend: "", value: 0 },
  { legend: "", value: 0 },
  { legend: "", value: 0 },
  { legend: "", value: 0 },
  { legend: "", value: 0 },
  { legend: "", value: 0 },
];

export default function Information() {
  const [showTransactions, setShowTransactions] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [filterData, setFilterData] = useState(initFilterData);
  const [showintenttosell, setShowintenttosell] = useState(false);

  const transactions = () => {
    setShowTransactions(true);
    setShowMatches(false);
    setShowUsers(false);
    setShowintenttosell(false);
  };

  const matches = () => {
    setShowTransactions(false);
    setShowMatches(true);
    setShowUsers(false);
    setShowintenttosell(false);
  };

  const intentToSell = () => {
    setShowTransactions(false);
    setShowMatches(false);
    setShowUsers(false);
    setShowintenttosell(true);
  };

  const user = () => {
    setShowTransactions(false);
    setShowMatches(false);
    setShowUsers(true);
    setShowintenttosell(false);
  };
  const getData = (group: string) => {
    if (group === AT) {
      const atData = summarizedData.at;
      if (atData !== undefined && atData.length === 3) return atData;
      return initSummaryData.slice(12, 15);
    } else if (group === TTV) {
      const ttvData = summarizedData.ttv;
      if (ttvData !== undefined && ttvData.length === 5) return ttvData;
      return initSummaryData.slice(17, 22);
    } else if (group === LTO) {
      const lto1 = summarizedData.lto1;
      const lto2 = summarizedData.lto2;
      const combinedData: Array<{ legend: string; value: number }> =
        lto1.concat(lto2) ?? [];
      let localCount = 0;
      combinedData.map((val: any) => {
        localCount += Number.parseInt(val["value"] ?? "0");
      });
      return combinedData.concat(initSummaryData.slice(combinedData.length, 9));
    } else if (group === VBU) {
      const fetchedData = summarizedData.vbu;
      if (fetchedData !== undefined && fetchedData.length === 2)
        return fetchedData;
      return initSummaryData.slice(9, 12);
    } else if (group === SP) {
      const fetchedData = summarizedData.sp;
      if (fetchedData !== undefined && fetchedData.length === 2)
        return fetchedData;
      return initSummaryData.slice(15, 17);
    } else if (group === MS) {
      const fetchedData = summarizedData.match_status;
      if (fetchedData !== undefined && fetchedData.length === 2) {
        return fetchedData;
      } else if (fetchedData !== undefined && fetchedData.length === 1) {
        var b = initSummaryData.slice(22, 23);
        b[1] = fetchedData[0];
        return b;
      } // Need to be removed once both seller and buyer matches data is ready
      return initSummaryData.slice(22, 25);
    } else if (group === US) {
      const fetchedData = summarizedData.userStatusBuyer;
      const combinedData =
        fetchedData.concat(summarizedData.userStatusSeller) ?? [];

      if (combinedData !== undefined && combinedData.length === 7) {
        return combinedData;
      }

      return initSummaryData.slice(25, 32);
    }

    return [];
    // Just to satisfy ts
  };

  const { summarizedData } = useSelector((state: RootState) => state.main);
  const { totalusers } = useSelector(
    (state: RootState) => state.main.vbUserData
  );
  const { totallto, totalttv, totalat, totalms } = useSelector(
    (state: RootState) => state.main.transactionData
  );
  const { totallto2, totalintent } = useSelector(
    (state: RootState) => state.main.produceData
  );

  // const totalltov = totallto + totallto2;

  // useEffect(() => {
  //   dispatch(getTransactionData());
  //   dispatch(getProduceData());
  //   dispatch(getVBUsersData());
  //   dispatch(getActionsTabData());
  // }, []);

  const getFilterText = (group: string) =>
    group === filterData["group"] ? filterData["filterText"] : "All";

  const buildSelector = (data: any, group: string) => {
    return (
      <Select
        defaultValue="All"
        className="width120"
        onChange={(value) => {
          const updatedFilterData = { group: group, filterText: value };
          setFilterData(updatedFilterData);
        }}
      >
        <Option value="All">All</Option>
        {data.map((item: any) => {
          return <Option value={item["legend"]}>{item["legend"]}</Option>;
        })}
      </Select>
    );
  };

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <Row gutter={[20, 20]} style={{ padding: "10px" }}>
          <Col span={24}>
            <Card
              className="boxShadowStyle"
              title="Live Transaction Overview"
              extra={buildSelector(getData(LTO), "LTO")}
            >
              {totallto !== "" && totallto2 !== "" ? (
                <InfoDetails
                  group={LTO}
                  calculatedCount={totallto + totallto2}
                  appliedFilter={getFilterText(LTO)}
                  isHalfDonut={true}
                  chartData={getData(LTO)}
                  colors={[
                    "rgba(24, 87, 141, 1)",
                    "rgba(26, 75, 132, 1)",
                    "rgba(29, 63, 121, 1)",
                    "rgba(32, 51, 110, 1)",
                    "rgba(134, 221, 212, 1)",
                    "rgba(102, 197, 202, 1)",
                    "rgba(45, 72, 123, 1)",
                    "rgba(87, 185, 196, 1)",
                    "rgba(73, 173, 191, 1)",
                  ]}
                />
              ) : null}
              <Anchor
                onClick={transactions}
                targetOffset={110}
                affix={false}
                className="scroll"
              >
                <Link href="#transactionsDiv" title="View Details" />
              </Anchor>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="VB Users" className="boxShadowStyle">
              {totalusers && (
                <InfoDetails
                  isHalfDonut={false}
                  calculatedCount={totalusers}
                  chartData={getData(VBU)}
                  colors={[
                    "rgba(81, 130, 108, 1)",
                    "rgba(198, 178, 114, 1)",
                    "rgba(51, 67, 76, 1)",
                  ]}
                />
              )}

              <Anchor
                onClick={user}
                targetOffset={110}
                affix={false}
                className="scroll"
              >
                <Link href="#transactionsDiv" title="View Details" />
              </Anchor>
            </Card>
          </Col>

          <Col span={8}>
            <Card
              title="All Transactions"
              className="boxShadowStyle"
              extra={buildSelector(getData(AT), AT)}
            >
              {totalat && (
                <InfoDetails
                  appliedFilter={getFilterText(AT)}
                  isHalfDonut={false}
                  calculatedCount={totalat}
                  chartData={getData(AT)}
                  colors={[
                    "rgba(163, 67, 123, 1)",
                    "rgba(237, 196, 54, 1)",
                    "rgba(235, 111, 93, 1)",
                  ]}
                />
              )}
              <Anchor
                onClick={transactions}
                targetOffset={110}
                affix={false}
                className="scroll"
              >
                <Link href="#transactionsDiv" title="View Details" />
              </Anchor>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Seller Produce: Intent to Sell Status"
              className="boxShadowStyle"
              extra={buildSelector(getData(SP), SP)}
            >
              {totalintent && (
                <InfoDetails
                  appliedFilter={
                    SP === filterData["group"]
                      ? filterData["filterText"]
                      : "All"
                  }
                  isHalfDonut={false}
                  chartData={getData(SP)}
                  calculatedCount={totalintent}
                  colors={["rgba(73, 108, 206, 1)", "rgba(217, 228, 237, 1)"]}
                />
              )}
              <Anchor
                onClick={intentToSell}
                targetOffset={110}
                affix={false}
                className="scroll"
              >
                <Link href="#transactionsDiv" title="View Details" />
              </Anchor>
            </Card>
          </Col>
          <Col span={16}>
            <Card
              title="Total Transaction Value"
              className="boxShadowStyle"
              extra={buildSelector(getData(TTV), TTV)}
            >
              {totalttv && (
                <InfoDetails
                  calculatedCount={totalttv}
                  appliedFilter={getFilterText(TTV)}
                  isHalfDonut={true}
                  chartData={getData(TTV)}
                  colors={[
                    "rgba(163, 67, 123, 1)",
                    "rgba(242, 126, 84, 1)",
                    "rgba(246, 160, 65, 1)",
                    "rgba(237, 196, 54, 1)",
                    "rgba(198, 78, 115, 1)",
                  ]}
                />
              )}
              <Anchor
                onClick={transactions}
                targetOffset={110}
                affix={false}
                className="scroll"
              >
                <Link href="#transactionsDiv" title="View Details" />
              </Anchor>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Match Status" className="boxShadowStyle">
              {totalms && (
                <InfoDetails
                  isHalfDonut={false}
                  calculatedCount={totalms}
                  chartData={getData(MS)}
                  colors={["rgba(231, 222, 212, 1)", "rgba(218, 76, 98, 1)"]}
                />
              )}
              <Anchor
                onClick={matches}
                targetOffset={110}
                affix={false}
                className="scroll"
              >
                <Link href="#transactionsDiv" title="View Details" />
              </Anchor>
            </Card>
          </Col>

          <Col span={24}>
            <Card
              className="boxShadowStyle"
              title="User Status"
              extra={buildSelector(getData(US), "US")}
            >
              {totallto !== "" && totallto2 !== "" ? (
                <InfoDetails
                  group={US}
                  calculatedCount={0}
                  appliedFilter={getFilterText(US)}
                  isHalfDonut={true}
                  chartData={getData(US)}
                  colors={[
                    "rgba(24, 87, 141, 1)",
                    "rgba(26, 75, 132, 1)",
                    "rgba(29, 63, 121, 1)",
                    "rgba(32, 51, 110, 1)",
                    "rgba(134, 221, 212, 1)",
                    "rgba(102, 197, 202, 1)",
                    "rgba(45, 72, 123, 1)",
                    "rgba(87, 185, 196, 1)",
                    "rgba(73, 173, 191, 1)",
                  ]}
                />
              ) : null}
              <Anchor
                onClick={transactions}
                targetOffset={110}
                affix={false}
                className="scroll"
              >
                <Link href="#transactionsDiv" title="View Details" />
              </Anchor>
            </Card>
          </Col>
        </Row>
      </div>
      
      <div id="transactionsDiv" className="mt50">
        {showTransactions ? <TransactionsV2 /> : null}
        {showMatches ? <Matches /> : null}
        {showUsers ? <Users /> : null}
        {showintenttosell ? <Intentosell /> : null}
      </div>
    </>
  );
}

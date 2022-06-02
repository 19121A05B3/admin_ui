import { ColumnsType } from "antd/es/table";
import "antd/dist/antd.css";
import { Tabs, Typography, Row, Col, Tooltip } from "antd";
import { Table, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { loadingIndicator } from "./transactions";
const { TabPane } = Tabs;
const enabled = 0; // Need to be removed later
interface User {
  pk: string;
  produce: string;
  matched_quantity: string;
  dayssinceadded: Number;
  buyer_location: string;
  buyer_id: string;
  gsi: string;
  created_at: Date;
  seller_final_price: string;
  askingdeliverydate: Date;
}
// const handleDateChange = (date: any) => {
//   if (date) {
//     const currentDateInSeconds = new Date().getTime();
//     const dd = new Date(date);
//     const selectedDateInSeconds = dd.getTime();
//     const timeDifference = currentDateInSeconds - selectedDateInSeconds;
//     let timeDifferenceInDays = timeDifference / (1000 * 60 * 60 * 24);
//     if (timeDifferenceInDays > 0 && timeDifferenceInDays < 1) {
//       timeDifferenceInDays = 1;
//     }
//     timeDifferenceInDays = Math.ceil(timeDifferenceInDays);
//     return timeDifferenceInDays.toString();
//   }
// };

export default function App() {
  const data: string | any[] | readonly User[] | undefined = []; // Need to be removed when buyer matches enabled
  const { Seller_matches } = useSelector(
    (state: RootState) => state.main.transactionData
  );

  const { foDetails } = useSelector((state: RootState) => state.main);
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "pk",
      key: "ID",
      render: (val: string) => {
        return (
          <>
            <Tooltip title={val}>
              <span>
                {val && val.slice(val.indexOf("#") + 1, val.indexOf("#") + 10)}
                ..
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Produce",
      dataIndex: "produce",
      key: "Produce",
    },
    {
      title: "Transaction Value",
      dataIndex: "seller_final_price",
      key: "TransactionValue",
      render: (sfp: Number) => <>₹{sfp}</>,
    },
    {
      title: "Quantity",
      key: "Quantity",
      dataIndex: "matched_quantity",
      render: (mq: Number) => <>{mq}qtl</>,
    },
    {
      title: "Seller ID",
      key: "SellerID",
      dataIndex: "gsi",
      render: (pk: any) => (
        <>
          {user_destiny_data[pk] != "" ? (
            <>{user_destiny_data[pk]}</>
          ) : (
            <>---</>
          )}
          <br></br>
        </>
      ),
    },
    {
      title: "Buyer ID",
      key: "BuyerID",
      dataIndex: "buyer_id",
      render: (pk: any) => (
        <>
          {user_destiny_data[pk] != "" ? (
            <>{user_destiny_data[pk]}</>
          ) : (
            <>---</>
          )}
          <br></br>
        </>
      ),
    },
    {
      title: "Buyer Location",
      key: "BuyerLocation",
      dataIndex: "buyer_location",
    },
    // {
    //   title: "Days Since Added",
    //   key: "DaysSinceAdded",
    //   dataIndex: "created_at",
    //   render: (created_at: any) => handleDateChange(created_at),
    // },
    // {
    //   title: "Asking Delivery Date",
    //   key: "AskingDeliveryDate",
    //   dataIndex: "AskingDeliveryDate",
    //   render: (ad: any) => {
    //     return (
    //       <>
    //         {ad == undefined && <>---</>}
    //         {ad && <>{ad}</>}
    //       </>
    //     );
    //   },
    // },
  ];
  const viewAllButton = (
    <div className="vab">
      <br></br>
      <Col span={23}>
        <Row justify="end" wrap={false}>
          <a href={"/matches"}>View all Matches</a>
        </Row>
      </Col>
    </div>
  );
  return (
    <div className="t card-container">
      <Typography.Title level={4} className="title1">
        Current Matches
      </Typography.Title>
      <Space> </Space>
      <Tabs type="card" className="card">
        {foDetails.assigned_user_type !== "buyer" && (
          <TabPane tab="Seller Matches" key="1">
            {Seller_matches != undefined ? (
              <>
                <Table
                  columns={columns}
                  dataSource={Seller_matches.slice(0, 5)}
                  pagination={false}
                  scroll={{ x: 1350 }}
                />
                {viewAllButton}
              </>
            ) : (
              loadingIndicator
            )}
          </TabPane>
        )}

        {foDetails.assigned_user_type !== "seller" && (
          <TabPane tab="Buyer Matches" key="2">
            {data != undefined ? (
              <>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  scroll={{ x: 1350 }}
                />
                {viewAllButton}
              </>
            ) : (
              loadingIndicator
            )}
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}

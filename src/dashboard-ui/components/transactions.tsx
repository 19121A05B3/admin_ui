import "antd/dist/antd.css";
import {
  Tabs,
  Table,
  Typography,
  Space,
  Spin,
  Row,
  Col,
  Divider,
  Timeline,
  Tooltip,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ColumnsType } from "antd/lib/table";
import {
  IBuyerTransaction,
  ISellerTransaction,
} from "../../store/app_interfaces";
import { CBuyerColumns, CSellerColumns } from "../../store/table_columns";
import { Link } from "react-router-dom";
import { capitalize } from "./users";
const { TabPane } = Tabs;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const loadingIndicator = (
  <div className="loin">
    <Spin indicator={antIcon} tip="Loading" />
  </div>
);

const TransactionsV2 = () => {
  const { Seller_data, Buyer_data } = useSelector(
    (state: RootState) => state.main.transactionData
  );
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  const CSellerColumns: ColumnsType<ISellerTransaction> = [
    {
      title: "ID",
      dataIndex: "pk",
      key: "pk",
      render: (val: string) => {
        return (
          <>
            <Tooltip title={val}>
              <span>
                {val.slice(val.indexOf("#") + 1, val.indexOf("#") + 10)}..
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: ["gsi_status", "event_latest"],
      key: "gsi_status",
      render: (con, i: any) => {
        return (
          <>
            {i["gsi_status"] === undefined && <>---</>}
            {i["gsi_status"] && (
              <p className={i["gsi_status"]}>{capitalize(i["gsi_status"])}</p>
            )}
            {i["event_latest"] === undefined && <>---</>}
            {i["event_latest"] && <>{i["event_latest"]}</>}
          </>
        );
      },
    },
    {
      title: "Produce",
      dataIndex: "produce",
      key: "produce",
    },
    {
      title: "Transaction Value",
      dataIndex: "seller_final_price",
      key: "seller_final_price",

      render: (seller_final_price: string) => <>₹{seller_final_price}</>,
    },
    {
      title: "Quantity",
      dataIndex: "matched_quantity",
      key: "matched_quantity",
      render: (matched_quantity: string) => <>{matched_quantity}qtl</>,
    },

    {
      title: "Seller ID",
      dataIndex: "gsi",
      key: "gsi",
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
      title: "Buyer",
      dataIndex: ["buyer_id", "buyer_location"],
      key: "buyer_id",
      render: (_buyer, i) => (
        <>
          {user_destiny_data[i["buyer_id"]] != "" ? (
            <>{user_destiny_data[i["buyer_id"]]}</>
          ) : (
            <>---</>
          )}
          <br></br>
          <>{i["buyer_location"]}</>
        </>
      ),
    },
  ];

  const CBuyerColumns: ColumnsType<IBuyerTransaction> = [
    {
      title: "ID",
      dataIndex: "pk",
      key: "created_at",
      render: (val: string) => {
        return (
          <>
            <Tooltip title={val}>
              <span>
                {val.slice(val.indexOf("#") + 1, val.indexOf("#") + 10)}..
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: ["gsi_status", "event_latest"],
      key: "gsi_status",
      render: (con, i: any) => {
        return (
          <>
            {i["gsi_status"] === undefined && <>---</>}
            {i["gsi_status"] && (
              <p className={i["gsi_status"]}>{capitalize(i["gsi_status"])}</p>
            )}
            {i["event_latest"] === undefined && <>---</>}
            {i["event_latest"] && <>{i["event_latest"]}</>}
          </>
        );
      },
    },

    {
      title: "Produce",
      dataIndex: "produce",
      key: "produce",
    },
    {
      title: "Transaction Value",
      dataIndex: "buyer_final_price",
      key: "buyer_final_price",

      render: (buyer_final_price: string) => <>₹{buyer_final_price}</>,
    },
    {
      title: "Quantity",
      dataIndex: "matched_quantity",
      key: "matched_quantity",
      render: (matched_quantity: string) => <>{matched_quantity}qtl</>,
    },
    {
      title: "Buyer ID",
      dataIndex: "gsi",
      key: "gsi",
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
      title: "Seller",
      dataIndex: ["seller_id", "seller_location"],
      key: "seller_id",
      render: (_buyer, i) => (
        <>
          {user_destiny_data[i["seller_id"]] != "" ? (
            <>{user_destiny_data[i["seller_id"]]}</>
          ) : (
            <>---</>
          )}
          <br></br>
          <>{i["seller_location"]}</>
        </>
      ),
    },
  ];

  var seller: any = [];
  var buyer: any = [];
  for (var i = 0; i < 5; i++) {
    seller.push(Seller_data[i]);
  }
  for (i = 0; i < 5; i++) {
    buyer.push(Buyer_data[i]);
  }

  const { foDetails } = useSelector((state: RootState) => state.main);

  const expandedRowRender = (
    passedData: IBuyerTransaction | ISellerTransaction,
    ind: any
  ) => {
    const data = passedData.events;

    return (
      <Row>
        <Col>
          <Divider plain orientation="left">
            <Typography.Title level={5}>Transaction Events</Typography.Title>
          </Divider>
        </Col>
        <Col span={24} className="ml100">
          {data.length === 0 ? (
            <Typography.Text strong>No Events to show</Typography.Text>
          ) : null}
          <Timeline>
            {data.map((event: any) => {
              return (
                <Timeline.Item>
                  <Typography.Text strong>
                    {event.event_description}&nbsp;
                  </Typography.Text>
                  on &nbsp;
                  {new Date(event.event_timestamp).toLocaleString()}
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Col>
      </Row>
    );
  };

  const viewAllButton = (
    <Row justify="end">
      <Link to="/transactions">View all Transactions</Link>
      <br></br>
    </Row>
  );

  return (
    <div className="t v2 transactions-table">
      <Typography.Title level={4} className="title">
        Live Transaction Details
      </Typography.Title>
      <Space> </Space>
      <Tabs type="card" className="card">
        {foDetails.assigned_user_type !== "buyer" && (
          <TabPane tab="Seller Transactions" key="1">
            {Seller_data != undefined ? (
              <>
                {/* Seller transactions table */}
                <Table<ISellerTransaction>
                  rowKey={(record) => record.created_at}
                  size="small"
                  expandable={{ expandedRowRender }}
                  columns={CSellerColumns}
                  dataSource={Seller_data.slice(0, 5)}
                  pagination={false}
                  footer={() => {
                    return viewAllButton;
                  }}
                  scroll={{ x: 1350 }}
                  rowClassName={(record, index) =>
                    record.gsi_status ? "b" + record.gsi_status : ""
                  }
                />
              </>
            ) : (
              loadingIndicator
            )}
          </TabPane>
        )}
        {foDetails.assigned_user_type !== "seller" && (
          <TabPane tab="Buyer Transactions" key="2">
            {buyer.length != undefined ? (
              <>
                {/* Buyer transactions table */}
                <Table<IBuyerTransaction>
                  rowKey={(record) => record.created_at}
                  size="small"
                  expandable={{ expandedRowRender }}
                  columns={CBuyerColumns}
                  dataSource={Buyer_data.slice(0, 5)}
                  pagination={false}
                  scroll={{ x: 1350 }}
                  footer={() => {
                    return viewAllButton;
                  }}
                  rowClassName={(record, index) =>
                    record.gsi_status ? "b" + record.gsi_status : ""
                  }
                />
              </>
            ) : (
              loadingIndicator
            )}
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default TransactionsV2;

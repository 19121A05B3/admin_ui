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
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  IBuyerTransaction,
  ISellerTransaction,
} from "../../store/app_interfaces";
import { CBuyerColumns, CSellerColumns } from "../../store/table_columns";
import { Link } from "react-router-dom";
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

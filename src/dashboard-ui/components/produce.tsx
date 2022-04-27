import { Tabs, Button, Typography } from "antd";
import Producestab from "./producestab";
import Producestab2 from "./producestab2";
import Allproduces from "./allProduces";

import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import { loadingIndicator } from "./transactions";

const { TabPane } = Tabs;

export default function Produces() {
  const { sellno, buyer_data, sellyes } = useSelector(
    (state: RootState) => state.main.produceData
  );

  const [showAllProduces, setShowAllProduces] = useState(false);
  const allProduces = () => {
    setShowAllProduces(!showAllProduces);
  };
  const { foDetails } = useSelector((state: RootState) => state.main);

  const combined = () => {
    let data = sellyes ?? [];

    const finalData = data.concat(sellno ?? []);

    return finalData;
  };

  return (
    <div className="produce match card-container">
      <Typography.Paragraph className="prodtitle">
        Produces
      </Typography.Paragraph>
      <Button className="allprod" type="default" onClick={allProduces}>
        All Produces
      </Button>
      <Typography.Paragraph className="produces">
        Supported by VikasBandhu
      </Typography.Paragraph>
      <Tabs defaultActiveKey="1" type="card">
        {!showAllProduces && foDetails.assigned_user_type !== "buyer" && (
          <TabPane tab="Intent to Sell : (Yes)" key="1">
            <div className="mb25"></div>
            {sellyes ? <Producestab sellData={sellyes} /> : loadingIndicator}
          </TabPane>
        )}
        {showAllProduces && foDetails.assigned_user_type !== "buyer" && (
          <TabPane tab="Intent to Sell : (Yes, No)" key="1">
            <div className="mb25"></div>
            {sellyes && sellno ? (
              <Allproduces sellData={combined()} />
            ) : (
              loadingIndicator
            )}
          </TabPane>
        )}
        {foDetails.assigned_user_type !== "seller" && (
          <TabPane tab="Interested to Buy" key="2">
            <div className="mb25"></div>
            {buyer_data ? (
              <Producestab2 buyer_data={buyer_data} />
            ) : (
              loadingIndicator
            )}
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}

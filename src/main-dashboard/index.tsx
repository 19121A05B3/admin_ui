import React from 'react';
import HeaderText from '../app-components/headerText';
import { Tabs, Card, Select  } from 'antd';
import OngoingOverview from './onGoingTransactionOverview';
import CurrentMatchesTable from './currentMatchesTable';
import OnGoingTransactionDetails from './onGoingTransactionDetails';
import './main-dashboard.scss'
const { TabPane } = Tabs;
const { Option } = Select;

const MainDashboard = () => {
    return (
        <>
            <HeaderText />
            <Tabs defaultActiveKey="1" type="card" size={'large'}>
                <TabPane tab="Information" key="1">
                    <Card
                        title="On Going Transaction Overview" 
                        extra={
                            <Select defaultValue="all">
                                <Option value="all">All</Option>
                                <Option value="picked">Picked up</Option>
                            </Select>
                        }
                    >
                        <OngoingOverview />
                        <OnGoingTransactionDetails />
                        <CurrentMatchesTable />
                    </Card>
                </TabPane>
                <TabPane tab="Actions" key="2">
                    Actions
                </TabPane>
            </Tabs>
        </>
    )
}

export default MainDashboard;

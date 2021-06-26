import React from 'react';
import { 
    Breadcrumb,
    Image,
    Badge,
    Tooltip,
    Button,
    Typography
} from 'antd';
import { BellFilled } from '@ant-design/icons';
import Logo from '../static/assets/logo.jpg';
import './header.scss'

const {Title} = Typography;

const AppHeader = () => {
    return (
        <div className="landing-page-header-bar">
            <Image width={"6vw"} height={"11vh"} src={Logo} preview={false} />
            <div className="display-flex-row align-center">
                <Breadcrumb className="custom-breadcrumb" separator=" ">
                    <Breadcrumb.Item href="#home">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item href="#home">Users</Breadcrumb.Item>
                    <Breadcrumb.Item href="#aim">Crops</Breadcrumb.Item>
                </Breadcrumb>
                <Badge count={1} className="custom-badge">
                    <Tooltip title="Notifications">
                        <Button 
                            shape="circle"
                            size="large"
                            icon={<BellFilled style={{ fontSize: "large", paddingLeft: "0.3em"}} />}
                            onClick={() => {}}
                        />
                    </Tooltip>
                </Badge>
                <Title level={4} className='margin-unset' style={{padding: "0.5em"}}>{'Mahesh Kumar'}</Title>
            </div>
      </div>
    )
}

export default AppHeader;
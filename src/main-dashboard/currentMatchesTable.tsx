import React from 'react';
import {Table} from 'antd';
import { currentMatchesData } from '../mocks/currentMatches';
import { getDateString } from '../utils';

const matchesTableColumns = [
    {
        title: 'Match Date',
        dataIndex: 'matchDate',
        key: 'matchDate',
        render: (matchDate: string) => {
            return <p>{getDateString(matchDate)}</p>
        }
    },
    {
        title: 'Crop',
        dataIndex: 'cropName',
        key: 'cropName',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Seller ID',
        dataIndex: 'sellerId',
        key: 'sellerId',
    },
    {
        title: 'Buyer ID',
        dataIndex: 'buyerId',
        key: 'buyerId',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Asking Price Per Qtil',
        dataIndex: 'askingPrice',
        key: 'askingPrice',
    },
    {
        title: 'Seller Total',
        dataIndex: 'sellerTotal',
        key: 'sellerTotal',
    },
    {
        title: 'Buyer Total',
        dataIndex: 'buyerTotal',
        key: 'buyerTotal',
    },
    {
        title: 'Days Since Added',
        dataIndex: 'daysSinceAdded',
        key: 'daysSinceAdded',
    },
]

const CurrentMatchesTable = () => {
    return (
        <div className='current-matches-container'>
            <h2>Current Matches</h2>
            <Table
                className='current-matches-table'
                pagination={false}
                columns={matchesTableColumns}
                dataSource={currentMatchesData} />
        </div>
    )
}

export default CurrentMatchesTable;
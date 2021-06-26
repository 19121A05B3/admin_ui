import React from 'react';
import {Table} from 'antd';
import { getDateString } from '../utils';
import { onGoingTransactionsData } from '../mocks/onGoingTransactions';

const onGoingTransactionsTableColumns = [
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
        title: 'Seller Total',
        dataIndex: 'sellerTotal',
        key: 'sellerTotal',
    },
    {
        title: 'Transaction Value',
        dataIndex: 'transactionValue',
        key: 'transactionValue',
    },
    {
        title: 'Buyer Accept Date',
        dataIndex: 'buyerAcceptDate',
        key: 'buyerAcceptDate',
        render: (buyerAcceptDate: string) => {
            return <p>{getDateString(buyerAcceptDate)}</p>
        }
    },
    {
        title: 'Seller Accept Date',
        dataIndex: 'sellerAcceptDate',
        key: 'sellerAcceptDate',
        render: (sellerAcceptDate: string) => {
            return <p>{getDateString(sellerAcceptDate)}</p>
        }
    },
]

const OnGoingTransactionDetails = () => {
    return (
        <div className='ongoing-trasnactions-details-container'>
            <h2>Ongoing Trasnactions Details</h2>
            <Table
                className='ongoing-trasnactions-details-table'
                pagination={false}
                columns={onGoingTransactionsTableColumns}
                dataSource={onGoingTransactionsData}
            />
        </div>
    )
}

export default OnGoingTransactionDetails;
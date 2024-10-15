import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { login, getUserProfile } from '../../../services/api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from '../../../components/common/layout/PageWrapper';
import useTranslate from '../../../components/hooks/useTranslate';
import { commonMessage } from '../../../components/locales/intl';
import { defineMessages } from 'react-intl';
import styles from './CartUser.module.scss';

const messages = defineMessages({
  jewelryTitle: {
    id: 'src.pages.Login.index.jewelry',
    defaultMessage: 'Jewelry'
  },
});

const CartUser = () => {
  const [orders, setOrders] = useState([]);
  return (
    // <PageWrapper
    //   routes={[
    //     { breadcrumbName: translate.formatMessage(messages.jewelryTitle), path: `/jewelry` },
    //     ]}
    // >
      <div className={styles.profile}>
        <div className={styles.profileUser}>
          <span style={{fontSize: '24px', fontWeight: '300'}}>ĐƠN HÀNG CỦA BẠN</span>
          <table style={{ width: '100%', height: '105px', borderCollapse: 'collapse', marginTop: '20px', border: '1px solid #ebebeb' }}>
                <thead>
                    <tr>
                        <th style={{ width: '182px', height: '35px', border: '1px solid #ccc', backgroundColor: '#01567f', color: 'white' }}>Đơn hàng</th>
                        <th style={{ width: '108px', height: '35px', border: '1px solid #ccc', backgroundColor: '#01567f', color: 'white' }}>Ngày</th>
                        <th style={{ width: '132px', height: '35px', border: '1px solid #ccc', backgroundColor: '#01567f', color: 'white' }}>Địa chỉ</th>
                        <th style={{ width: '282px', height: '35px', border: '1px solid #ccc', backgroundColor: '#01567f', color: 'white' }}>Giá trị đơn hàng</th>
                        <th style={{ width: '245px', height: '35px', border: '1px solid #ccc', backgroundColor: '#01567f', color: 'white' }}>TT thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                                Không có đơn hàng nào.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.address}</td>
                                <td>{order.value}</td>
                                <td>{order.paymentStatus}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    // </PageWrapper>
  );
}

export default CartUser;
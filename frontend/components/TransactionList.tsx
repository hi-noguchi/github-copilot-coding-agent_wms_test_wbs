import React from 'react';
import { Transaction } from '../types/transaction';
import { Product } from '../types/product';
import { Location } from '../types/location';

type TransactionListProps = {
  transactions: Transaction[];
  products: Product[];
  locations: Location[];
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, products, locations }) => {
  
  const getProductName = (productId: string): string => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };
  
  const getLocationName = (locationId: string | null): string => {
    if (!locationId) return '外部';
    const location = locations.find(l => l.id === locationId);
    return location ? location.name : 'Unknown Location';
  };
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>タイプ</th>
            <th>商品</th>
            <th>数量</th>
            <th>出庫元</th>
            <th>入庫先</th>
            <th>日時</th>
            <th>参照番号</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.type}</td>
              <td>{getProductName(transaction.product_id)}</td>
              <td>{transaction.quantity}</td>
              <td>{getLocationName(transaction.source_location_id)}</td>
              <td>{getLocationName(transaction.destination_location_id)}</td>
              <td>{new Date(transaction.timestamp).toLocaleString('ja-JP')}</td>
              <td>{transaction.reference_number || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
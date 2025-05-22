import React from 'react';
import { Inventory } from '../types/inventory';
import { Product } from '../types/product';
import { Location } from '../types/location';

type InventoryListProps = {
  inventoryItems: Inventory[];
  products: Product[];
  locations: Location[];
};

const InventoryList: React.FC<InventoryListProps> = ({ inventoryItems, products, locations }) => {
  
  const getProductName = (productId: string): string => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };
  
  const getLocationName = (locationId: string): string => {
    const location = locations.find(l => l.id === locationId);
    return location ? location.name : 'Unknown Location';
  };
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>商品</th>
            <th>場所</th>
            <th>数量</th>
            <th>最終更新</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{getProductName(item.product_id)}</td>
              <td>{getLocationName(item.location_id)}</td>
              <td>{item.quantity}</td>
              <td>{new Date(item.last_updated).toLocaleString('ja-JP')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
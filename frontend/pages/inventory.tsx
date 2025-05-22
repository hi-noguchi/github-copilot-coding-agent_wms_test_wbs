import { GetServerSideProps } from 'next';
import React from 'react';
import InventoryList from '../components/InventoryList';
import { Inventory } from '../types/inventory';
import { Product } from '../types/product';
import { Location } from '../types/location';

interface InventoryPageProps {
  inventoryItems: Inventory[];
  products: Product[];
  locations: Location[];
}

export default function InventoryPage({ inventoryItems, products, locations }: InventoryPageProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>在庫管理</h1>
        <button className="button">在庫調整</button>
      </div>
      
      <InventoryList 
        inventoryItems={inventoryItems} 
        products={products} 
        locations={locations} 
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Mock inventory data (this would come from API in production)
    const inventoryItems = [
      { id: 'INV001', product_id: 'P001', location_id: 'L001', quantity: 150, last_updated: '2023-05-20T09:00:00' },
      { id: 'INV002', product_id: 'P001', location_id: 'L002', quantity: 75, last_updated: '2023-05-21T14:30:00' },
      { id: 'INV003', product_id: 'P002', location_id: 'L001', quantity: 200, last_updated: '2023-05-19T11:15:00' },
      { id: 'INV004', product_id: 'P003', location_id: 'L003', quantity: 50, last_updated: '2023-05-22T08:45:00' },
      { id: 'INV005', product_id: 'P004', location_id: 'L003', quantity: 35, last_updated: '2023-05-18T16:20:00' },
      { id: 'INV006', product_id: 'P005', location_id: 'L004', quantity: 500, last_updated: '2023-05-17T10:00:00' }
    ];

    const products = [
      { id: 'P001', name: '電子部品A', description: '高性能マイクロチップ', category: '電子部品', unit: '個', price: 1200, supplier_id: 'S001' },
      { id: 'P002', name: '電子部品B', description: '高耐久コンデンサ', category: '電子部品', unit: '個', price: 800, supplier_id: 'S002' },
      { id: 'P003', name: '工具セットA', description: '精密ドライバー5本セット', category: '工具', unit: 'セット', price: 3500, supplier_id: 'S003' },
      { id: 'P004', name: '工具セットB', description: 'プライヤー3種セット', category: '工具', unit: 'セット', price: 2800, supplier_id: 'S003' },
      { id: 'P005', name: '原材料A', description: '高純度アルミニウム', category: '原材料', unit: 'kg', price: 1500, supplier_id: 'S004' }
    ];

    const locations = [
      { id: 'L001', name: 'メイン倉庫A', type: 'ストレージ', address: '東京都新宿区1-1-1', capacity: 1000 },
      { id: 'L002', name: 'メイン倉庫B', type: 'ストレージ', address: '東京都新宿区1-1-2', capacity: 800 },
      { id: 'L003', name: '工具保管庫', type: 'スペシャル', address: '東京都渋谷区2-3-4', capacity: 200 },
      { id: 'L004', name: '原材料倉庫', type: 'ストレージ', address: '埼玉県さいたま市5-6-7', capacity: 2000 },
      { id: 'L005', name: '一時保管庫', type: 'テンポラリー', address: '東京都新宿区1-1-3', capacity: 300 }
    ];

    return {
      props: {
        inventoryItems,
        products,
        locations
      }
    };
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    return {
      props: {
        inventoryItems: [],
        products: [],
        locations: []
      }
    };
  }
};
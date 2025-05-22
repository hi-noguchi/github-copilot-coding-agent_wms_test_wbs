import { GetServerSideProps } from 'next';
import React from 'react';
import TransactionList from '../components/TransactionList';
import { Transaction } from '../types/transaction';
import { Product } from '../types/product';
import { Location } from '../types/location';

interface TransactionsPageProps {
  transactions: Transaction[];
  products: Product[];
  locations: Location[];
}

export default function TransactionsPage({ transactions, products, locations }: TransactionsPageProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>入出庫管理</h1>
        <div className="flex gap-2">
          <button className="button">入庫登録</button>
          <button className="button button-secondary">出庫登録</button>
        </div>
      </div>
      
      <TransactionList 
        transactions={transactions} 
        products={products} 
        locations={locations} 
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Mock transactions data (this would come from API in production)
    const transactions = [
      { 
        id: 'T001', 
        type: '入庫', 
        product_id: 'P001', 
        quantity: 50,
        source_location_id: null,
        destination_location_id: 'L001',
        timestamp: '2023-05-15T09:30:00',
        user_id: 'U001',
        reference_number: 'PO12345'
      },
      { 
        id: 'T002', 
        type: '入庫', 
        product_id: 'P002', 
        quantity: 100,
        source_location_id: null,
        destination_location_id: 'L001',
        timestamp: '2023-05-15T10:15:00',
        user_id: 'U001',
        reference_number: 'PO12345'
      },
      { 
        id: 'T003', 
        type: '移動', 
        product_id: 'P001', 
        quantity: 25,
        source_location_id: 'L001',
        destination_location_id: 'L002',
        timestamp: '2023-05-16T14:20:00',
        user_id: 'U002',
        reference_number: 'TR789'
      },
      { 
        id: 'T004', 
        type: '出庫', 
        product_id: 'P003', 
        quantity: 10,
        source_location_id: 'L003',
        destination_location_id: null,
        timestamp: '2023-05-18T11:45:00',
        user_id: 'U003',
        reference_number: 'SO4567'
      },
      { 
        id: 'T005', 
        type: '入庫', 
        product_id: 'P005', 
        quantity: 200,
        source_location_id: null,
        destination_location_id: 'L004',
        timestamp: '2023-05-17T08:30:00',
        user_id: 'U001',
        reference_number: 'PO6789'
      }
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
        transactions,
        products,
        locations
      }
    };
  } catch (error) {
    console.error('Error fetching transactions data:', error);
    return {
      props: {
        transactions: [],
        products: [],
        locations: []
      }
    };
  }
};
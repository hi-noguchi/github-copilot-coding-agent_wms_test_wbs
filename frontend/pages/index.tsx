import { GetServerSideProps } from 'next';
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import TransactionList from '../components/TransactionList';
import { Product } from '../types/product';
import { Transaction } from '../types/transaction';
import { Location } from '../types/location';
import { Inventory } from '../types/inventory';
import axios from 'axios';

interface DashboardProps {
  products: Product[];
  transactions: Transaction[];
  locations: Location[];
  inventoryItems: Inventory[];
  totalProducts: number;
  totalInventory: number;
  totalLocations: number;
  recentTransactions: Transaction[];
}

export default function Dashboard({
  products,
  locations,
  totalProducts,
  totalInventory,
  totalLocations,
  recentTransactions
}: DashboardProps) {
  return (
    <>
      <h1 className="mb-4">ダッシュボード</h1>
      
      <div className="dashboard">
        <DashboardCard title="総商品数" value={totalProducts} />
        <DashboardCard title="総在庫数" value={totalInventory} />
        <DashboardCard title="総保管場所数" value={totalLocations} />
      </div>

      <h2 className="mb-3 mt-4">最近の取引</h2>
      <TransactionList 
        transactions={recentTransactions} 
        products={products} 
        locations={locations} 
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // In a real application, we would fetch from the API
  // For now, we're simulating the API response with hardcoded data
  try {
    // Simulating API calls
    const baseUrl = 'http://localhost:8000/api';
    
    // In production, this would be actual API calls
    // const productsResponse = await axios.get(`${baseUrl}/products`);
    // const products = productsResponse.data;
    
    // For demo purposes, use hardcoded data
    const products = [
      { id: 'P001', name: '電子部品A', description: '高性能マイクロチップ', category: '電子部品', unit: '個', price: 1200, supplier_id: 'S001' },
      { id: 'P002', name: '電子部品B', description: '高耐久コンデンサ', category: '電子部品', unit: '個', price: 800, supplier_id: 'S002' },
    ];
    
    const locations = [
      { id: 'L001', name: 'メイン倉庫A', type: 'ストレージ', address: '東京都新宿区1-1-1', capacity: 1000 },
      { id: 'L002', name: 'メイン倉庫B', type: 'ストレージ', address: '東京都新宿区1-1-2', capacity: 800 },
    ];
    
    const inventoryItems = [
      { id: 'INV001', product_id: 'P001', location_id: 'L001', quantity: 150, last_updated: '2023-05-20T09:00:00' },
      { id: 'INV002', product_id: 'P001', location_id: 'L002', quantity: 75, last_updated: '2023-05-21T14:30:00' },
    ];
    
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
      }
    ];
    
    // Calculate dashboard metrics
    const totalProducts = products.length;
    const totalInventory = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalLocations = locations.length;
    const recentTransactions = transactions.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 5);
    
    return {
      props: {
        products,
        transactions,
        locations,
        inventoryItems,
        totalProducts,
        totalInventory,
        totalLocations,
        recentTransactions,
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      props: {
        products: [],
        transactions: [],
        locations: [],
        inventoryItems: [],
        totalProducts: 0,
        totalInventory: 0,
        totalLocations: 0,
        recentTransactions: [],
      }
    };
  }
};
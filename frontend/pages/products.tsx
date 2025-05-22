import { GetServerSideProps } from 'next';
import React from 'react';
import ProductList from '../components/ProductList';
import { Product } from '../types/product';

interface ProductsPageProps {
  products: Product[];
}

export default function ProductsPage({ products }: ProductsPageProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>商品管理</h1>
        <button className="button">新規商品追加</button>
      </div>
      
      <ProductList products={products} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // In a real application, we would fetch from the API
  // For now, we're simulating the API response with hardcoded data
  
  try {
    // Mock products data (this would come from API in production)
    const products = [
      { id: 'P001', name: '電子部品A', description: '高性能マイクロチップ', category: '電子部品', unit: '個', price: 1200, supplier_id: 'S001' },
      { id: 'P002', name: '電子部品B', description: '高耐久コンデンサ', category: '電子部品', unit: '個', price: 800, supplier_id: 'S002' },
      { id: 'P003', name: '工具セットA', description: '精密ドライバー5本セット', category: '工具', unit: 'セット', price: 3500, supplier_id: 'S003' },
      { id: 'P004', name: '工具セットB', description: 'プライヤー3種セット', category: '工具', unit: 'セット', price: 2800, supplier_id: 'S003' },
      { id: 'P005', name: '原材料A', description: '高純度アルミニウム', category: '原材料', unit: 'kg', price: 1500, supplier_id: 'S004' }
    ];

    return {
      props: {
        products
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: []
      }
    };
  }
};
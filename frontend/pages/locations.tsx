import { GetServerSideProps } from 'next';
import React from 'react';
import { Location } from '../types/location';

interface LocationsPageProps {
  locations: Location[];
}

export default function LocationsPage({ locations }: LocationsPageProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>倉庫/棚管理</h1>
        <button className="button">新規場所追加</button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>タイプ</th>
              <th>住所</th>
              <th>収容能力</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.type}</td>
                <td>{location.address}</td>
                <td>{location.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Mock locations data (this would come from API in production)
    const locations = [
      { id: 'L001', name: 'メイン倉庫A', type: 'ストレージ', address: '東京都新宿区1-1-1', capacity: 1000 },
      { id: 'L002', name: 'メイン倉庫B', type: 'ストレージ', address: '東京都新宿区1-1-2', capacity: 800 },
      { id: 'L003', name: '工具保管庫', type: 'スペシャル', address: '東京都渋谷区2-3-4', capacity: 200 },
      { id: 'L004', name: '原材料倉庫', type: 'ストレージ', address: '埼玉県さいたま市5-6-7', capacity: 2000 },
      { id: 'L005', name: '一時保管庫', type: 'テンポラリー', address: '東京都新宿区1-1-3', capacity: 300 }
    ];

    return {
      props: {
        locations
      }
    };
  } catch (error) {
    console.error('Error fetching locations data:', error);
    return {
      props: {
        locations: []
      }
    };
  }
};
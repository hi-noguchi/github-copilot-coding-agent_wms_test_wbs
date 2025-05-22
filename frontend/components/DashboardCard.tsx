import React from 'react';

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {icon && <div className="card-icon">{icon}</div>}
      </div>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default DashboardCard;
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'ダッシュボード' },
  { href: '/inventory', label: '在庫管理' },
  { href: '/products', label: '商品管理' },
  { href: '/transactions', label: '入出庫' },
  { href: '/locations', label: '倉庫/棚' },
];

const Navbar: React.FC = () => {
  const router = useRouter();
  
  return (
    <nav className="nav">
      {navItems.map((item) => (
        <Link 
          href={item.href} 
          key={item.href}
          className={router.pathname === item.href ? "nav-item active" : "nav-item"}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
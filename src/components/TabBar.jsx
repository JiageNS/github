// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Activity, ShoppingBag, ClipboardList, User } from 'lucide-react';

export function TabBar({
  activeTab,
  onTabChange
}) {
  const tabs = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'courses',
    label: '瘦身',
    icon: Activity
  }, {
    id: 'shop',
    label: '商城',
    icon: ShoppingBag
  }, {
    id: 'orders',
    label: '订单',
    icon: ClipboardList
  }, {
    id: 'profile',
    label: '我的',
    icon: User
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return <button key={tab.id} className={`flex flex-col items-center flex-1 py-2 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} onClick={() => onTabChange(tab.id)}>
              <Icon size={24} className="mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>;
      })}
      </div>
    </div>;
}
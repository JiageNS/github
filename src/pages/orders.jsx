// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Package, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function OrdersPage(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedTab, setSelectedTab] = useState('all');
  const orders = [{
    id: '2024072301',
    status: 'delivered',
    items: [{
      name: '专业瑜伽垫',
      quantity: 1,
      price: 89,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop'
    }],
    total: 89,
    date: '2024-07-20',
    tracking: '已签收'
  }, {
    id: '2024072202',
    status: 'shipping',
    items: [{
      name: '智能运动手环',
      quantity: 1,
      price: 199,
      image: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=100&h=100&fit=crop'
    }],
    total: 199,
    date: '2024-07-21',
    tracking: '运输中'
  }, {
    id: '2024072103',
    status: 'pending',
    items: [{
      name: '蛋白粉',
      quantity: 2,
      price: 299,
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=100&h=100&fit=crop'
    }],
    total: 598,
    date: '2024-07-22',
    tracking: '待发货'
  }];
  const tabs = [{
    id: 'all',
    name: '全部',
    icon: Package
  }, {
    id: 'pending',
    name: '待发货',
    icon: Clock
  }, {
    id: 'shipping',
    name: '运输中',
    icon: Package
  }, {
    id: 'delivered',
    name: '已完成',
    icon: CheckCircle
  }];
  const getStatusInfo = status => {
    const statusMap = {
      pending: {
        text: '待发货',
        color: 'text-orange-500',
        bg: 'bg-orange-50'
      },
      shipping: {
        text: '运输中',
        color: 'text-blue-500',
        bg: 'bg-blue-50'
      },
      delivered: {
        text: '已完成',
        color: 'text-green-500',
        bg: 'bg-green-50'
      }
    };
    return statusMap[status] || statusMap.pending;
  };
  const filteredOrders = selectedTab === 'all' ? orders : orders.filter(order => order.status === selectedTab);
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    $w.utils.navigateTo({
      pageId: tabId,
      params: {}
    });
  };
  const handleOrderClick = orderId => {
    $w.utils.navigateTo({
      pageId: 'orderDetail',
      params: {
        id: orderId
      }
    });
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部标题 */}
      <div className="bg-white px-4 pt-12 pb-4">
        <h1 className="text-xl font-bold text-gray-900">我的订单</h1>
      </div>

      {/* 订单状态标签 */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex space-x-6">
          {tabs.map(tab => <button key={tab.id} className={`pb-2 text-sm font-medium ${selectedTab === tab.id ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`} onClick={() => setSelectedTab(tab.id)}>
              {tab.name}
            </button>)}
        </div>
      </div>

      {/* 订单列表 */}
      <div className="px-4 py-4 pb-20">
        {filteredOrders.length === 0 ? <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">暂无订单</p>
          </div> : <div className="space-y-4">
            {filteredOrders.map(order => {
          const statusInfo = getStatusInfo(order.status);
          return <div key={order.id} className="bg-white rounded-lg shadow-sm" onClick={() => handleOrderClick(order.id)}>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500">订单号：{order.id}</span>
                      <span className={`text-sm font-medium ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                    
                    {order.items.map((item, index) => <div key={index} className="flex items-center py-2">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-3" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          ¥{item.price}
                        </span>
                      </div>)}
                    
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-gray-500">
                        {order.date} · {order.tracking}
                      </span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">共{order.items.length}件商品</span>
                        <span className="text-sm font-medium text-gray-900">
                          实付¥{order.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>;
        })}
          </div>}
      </div>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}
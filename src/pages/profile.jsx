// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { User, Settings, ShoppingBag, LogOut, ChevronRight } from 'lucide-react';

import { TabBar } from '@/components/TabBar';

export default function ProfilePage(props) {
  const { $w, style } = props;
  const [activeTab, setActiveTab] = useState('profile');

  // 手机号脱敏函数（中间4位隐藏）
  const maskPhone = (phone) => {
    if (!phone) return '未绑定';
    return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
  };

  // 用户信息（新增手机号处理）
  const userInfo = {
    name: $w.auth.currentUser?.name || '小明',
    avatar: $w.auth.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    level: '黄金会员',
    streak: 15,
    phone: $w.auth.currentUser?.phone || '13800138000' // 假设从 auth 获取手机号
  };

  // 功能菜单（移除图标相关配置）
  const quickActions = [
    { title: '优惠券', value: '共0张' },
    { title: '收藏', value: '3' },
    { title: 'B礼卡', value: '3' },
    { title: '积分', value: '3' }
  ];

  const menuItems = [
    {
      icon: ShoppingBag,
      title: '我的订单',
      subtitle: '查看所有订单',
      color: 'text-purple-500'
    }, {
      icon: Settings,
      title: '系统设置',
      subtitle: '通知、主题等设置',
      color: 'text-blue-500'
    }, {
      icon: ChevronRight,
      title: '邀请好友',
      subtitle: '邀请界面',
      color: 'text-blue-500'
    }
  ];

  const handleTabChange = tabId => {
    setActiveTab(tabId);
    $w.utils.navigateTo({ pageId: tabId, params: {} });
  };

  const handleLogout = () => {
    console.log('退出登录');
  };

  return (
    <div style={style} className="min-h-screen bg-gray-50 ">

      {/* 用户信息头部 */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 w-[calc(100%-1rem)] px-4 pt-2 pb-2 border-2 border-blue-300 rounded-lg mx-2 ">
        <div className="flex items-center">
          <img src={userInfo.avatar} alt="用户头像" className="w-10 h-10 rounded-full border-4 border-white" />
          <div className="ml-4 text-white">
            <h2 className="text-xl font-bold">{userInfo.name}</h2>
            <p className="text-sm opacity-90">{userInfo.level}</p>
            {/* 替换「连续打卡」为「脱敏手机号」 */}
            <div className="flex items-center mt-2">
              <span className="text-xs opacity-80">
                手机号：{maskPhone(userInfo.phone)}
              </span>
            </div>
          </div>
        </div>

        {/* VIP卡片 */}
        <div className="py-2">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-[0.5rem] shadow-sm p-2 text-white">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">BVIP还有224天后到期</div>
                <div className="text-sm opacity-90 mt-1">全年不限次</div>
              </div>
              <button className="bg-white text-yellow-600 px-2 py-1 rounded-full text-sm font-medium">
                立即续费
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 功能卡片（移除图标，简化布局） */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            {quickActions.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs text-gray-500 mt-2">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 菜单列表 */}
      <div className="px-4 pb-20">
        <div className="bg-white rounded-lg mb-4">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div className="flex items-center p-4 cursor-pointer" onClick={() => console.log(`点击了${item.title}`)}>
                <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.subtitle}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              {index < menuItems.length - 1 && <div className="ml-16 h-px bg-gray-100" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg">
          <div className="flex items-center p-4 cursor-pointer text-red-500" onClick={handleLogout}>
            <LogOut size={20} className="mr-3" />
            <span className="text-sm font-medium">退出登录</span>
          </div>
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
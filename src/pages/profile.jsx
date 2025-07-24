// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Settings, ShoppingBag, LogOut, ChevronRight } from 'lucide-react';
import { TabBar } from '@/components/TabBar';

export default function ProfilePage(props) {
  const { $w, style } = props;
  const [activeTab, setActiveTab] = useState('profile');

  // 手机号脱敏
  const maskPhone = (phone) => {
    if (!phone) return '未绑定';
    return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
  };

  // 用户信息
  const userInfo = {
    name: $w?.auth?.currentUser?.name || '小明',
    avatar: $w?.auth?.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    level: '黄金会员',
    phone: $w?.auth?.currentUser?.phone || '13800138000'
  };

  // 快捷功能
  const quickActions = [
    { title: '优惠券', value: '共0张' },
    { title: '收藏', value: '3' },
    { title: 'B礼卡', value: '3' },
    { title: '积分', value: '3' }
  ];

  // 菜单列表
  const menuItems = [
    {
      icon: ShoppingBag,
      title: '我的订单',
      subtitle: '查看所有订单',
      color: 'text-purple-400'
    }, {
      icon: Settings,
      title: '系统设置',
      subtitle: '通知、主题等设置',
      color: 'text-blue-400'
    }, {
      icon: ChevronRight,
      title: '邀请好友',
      subtitle: '邀请界面',
      color: 'text-green-400'
    }
  ];

  // 切换标签
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({ pageId: tabId, params: {} });
    }
  };

  // 退出登录
  const handleLogout = () => {
    console.log('退出登录');
  };

  return (
    <div style={{ ...style, backgroundColor: '#000', minHeight: '100vh' }} className="text-gray-100 p-0 m-0">
      {/* 顶部用户信息 */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-5 border border-blue-700">
          <div className="flex items-center">
            <img
              src={userInfo.avatar}
              alt="用户头像"
              className="w-16 h-16 rounded-full border-4 border-white"
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-white">{userInfo.name}</h2>
              <p className="text-sm text-blue-100 mt-1">{userInfo.level}</p>
              <div className="mt-2">
                <span className="text-sm text-blue-100">
                  手机号：{maskPhone(userInfo.phone)}
                </span>
              </div>
            </div>
          </div>

          {/* VIP卡片 */}
          <div className="mt-4">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-3 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">BVIP还有224天后到期</div>
                  <div className="text-sm opacity-90 mt-1">全年不限次</div>
                </div>
                <button className="bg-white text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                  立即续费
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 功能卡片 */}
      <div className="px-4 py-2">
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-3">
                <span className="text-sm font-medium text-white">{item.title}</span>
                <span className="text-xs text-gray-300 mt-2">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 菜单列表 */}
      <div className="px-4 py-4 pb-20">
        <div className="bg-gray-800 rounded-xl border border-gray-700 mb-4">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div className="flex items-center p-4 cursor-pointer" onClick={() => console.log(`点击了${item.title}`)}>
                <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="text-xs text-gray-300">{item.subtitle}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              {index < menuItems.length - 1 && (
                <div className="ml-14 h-px bg-gray-700" />
              )}
            </div>
          ))}
        </div>

        {/* 退出登录 */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="flex items-center p-4 cursor-pointer text-red-400" onClick={handleLogout}>
            <LogOut size={20} className="mr-3" />
            <span className="text-sm font-medium">退出登录</span>
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <TabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className="bg-gray-900 border-t border-gray-800"
      />
    </div>
  );
}

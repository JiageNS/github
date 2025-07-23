// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { User, Settings, Heart, CreditCard, Shield, LogOut, ChevronRight } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function ProfilePage(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('profile');
  const userInfo = {
    name: $w.auth.currentUser?.name || '小明',
    avatar: $w.auth.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    level: '黄金会员',
    points: 2580,
    streak: 15
  };
  const menuItems = [{
    icon: Heart,
    title: '我的收藏',
    subtitle: '收藏的课程和文章',
    color: 'text-red-500'
  }, {
    icon: CreditCard,
    title: '会员中心',
    subtitle: '查看会员权益',
    color: 'text-yellow-500'
  }, {
    icon: Shield,
    title: '隐私设置',
    subtitle: '管理个人信息',
    color: 'text-green-500'
  }, {
    icon: Settings,
    title: '系统设置',
    subtitle: '通知、主题等设置',
    color: 'text-blue-500'
  }];
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    $w.utils.navigateTo({
      pageId: tabId,
      params: {}
    });
  };
  const handleLogout = () => {
    // 退出登录逻辑
    console.log('退出登录');
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 用户信息头部 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 pt-12 pb-8">
        <div className="flex items-center">
          <img src={userInfo.avatar} alt="用户头像" className="w-20 h-20 rounded-full border-4 border-white" />
          <div className="ml-4 text-white">
            <h2 className="text-xl font-bold">{userInfo.name}</h2>
            <p className="text-sm opacity-90">{userInfo.level}</p>
            <div className="flex items-center mt-2">
              <span className="text-xs opacity-80">连续打卡 {userInfo.streak} 天</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-around mt-6 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold">{userInfo.points}</div>
            <div className="text-xs opacity-80">积分</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs opacity-80">完成课程</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">8.5kg</div>
            <div className="text-xs opacity-80">减重</div>
          </div>
        </div>
      </div>

      {/* 菜单列表 */}
      <div className="px-4 py-4 pb-20">
        <div className="bg-white rounded-lg mb-4">
          {menuItems.map((item, index) => <div key={index}>
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
            </div>)}
        </div>

        <div className="bg-white rounded-lg">
          <div className="flex items-center p-4 cursor-pointer text-red-500" onClick={handleLogout}>
            <LogOut size={20} className="mr-3" />
            <span className="text-sm font-medium">退出登录</span>
          </div>
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}
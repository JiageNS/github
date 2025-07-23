// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronRight, Flame, Leaf, Dumbbell, Clock, Star } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function HomePage(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('home');
  const [todayData, setTodayData] = useState({
    steps: 8432,
    calories: 356,
    duration: 45,
    progress: 84
  });
  const courses = [{
    id: 1,
    title: 'HIIT燃脂训练',
    description: '高强度间歇训练，快速燃脂',
    duration: 30,
    level: '中级',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    icon: Flame,
    color: 'text-orange-500'
  }, {
    id: 2,
    title: '晨间瑜伽',
    description: '唤醒身体，提升柔韧性',
    duration: 45,
    level: '初级',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop',
    icon: Leaf,
    color: 'text-green-500'
  }, {
    id: 3,
    title: '核心力量',
    description: '强化核心肌群，塑造线条',
    duration: 25,
    level: '高级',
    image: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=200&fit=crop',
    icon: Dumbbell,
    color: 'text-blue-500'
  }];
  const healthTips = [{
    title: '运动后这样吃，燃脂效果翻倍',
    description: '运动后30分钟内补充蛋白质...',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=100&h=100&fit=crop'
  }, {
    title: '睡眠不足会影响减肥效果？',
    description: '研究表明，每天睡7-9小时...',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop'
  }, {
    title: '每天10分钟，改善体态的拉伸动作',
    description: '久坐族必学的5个拉伸动作...',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
  }];
  useEffect(() => {
    // 模拟数据更新
    const timer = setInterval(() => {
      setTodayData(prev => ({
        ...prev,
        steps: prev.steps + Math.floor(Math.random() * 10),
        calories: prev.calories + Math.floor(Math.random() * 2),
        duration: prev.duration + Math.floor(Math.random() * 0.5)
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    $w.utils.navigateTo({
      pageId: tabId,
      params: {}
    });
  };
  const handleCourseClick = courseId => {
    $w.utils.navigateTo({
      pageId: 'courseDetail',
      params: {
        id: courseId
      }
    });
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部欢迎区域 */}
      <div className="bg-white px-4 pt-12 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              早上好，{$w.auth.currentUser?.name || '小明'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              今天是 {new Date().toLocaleDateString('zh-CN', {
              month: 'long',
              day: 'numeric',
              weekday: 'short'
            })}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={$w.auth.currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'} alt="用户头像" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="px-4 pb-20">
        {/* 今日数据卡片 */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">今日运动数据</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{todayData.steps.toLocaleString()}</div>
              <div className="text-sm opacity-80">步数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{todayData.calories}</div>
              <div className="text-sm opacity-80">消耗(kcal)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{todayData.duration}</div>
              <div className="text-sm opacity-80">时长(分钟)</div>
            </div>
          </div>
          <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">目标完成度</span>
              <span className="text-sm font-semibold">{todayData.progress}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full transition-all duration-500" style={{
              width: `${todayData.progress}%`
            }} />
            </div>
          </div>
        </div>

        {/* 推荐课程 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">推荐课程</h3>
            <button className="text-sm text-orange-500 flex items-center" onClick={() => $w.utils.navigateTo({
            pageId: 'courses',
            params: {}
          })}>
              查看全部 <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-2 -mx-4 px-4">
            {courses.map(course => {
            const Icon = course.icon;
            return <div key={course.id} className="flex-none w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCourseClick(course.id)}>
                  <div className="relative">
                    <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded-t-xl" />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {course.duration}分钟
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-500 mb-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon size={16} className={course.color} />
                        <span className="text-sm text-gray-600 ml-1">{course.level}</span>
                      </div>
                      <button className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
                        开始
                      </button>
                    </div>
                  </div>
                </div>;
          })}
          </div>
        </div>

        {/* 健康资讯 */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">健康小贴士</h3>
          <div className="space-y-3">
            {healthTips.map((tip, index) => <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-start">
                <div className="w-16 h-16 rounded-lg overflow-hidden mr-3">
                  <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{tip.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{tip.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}
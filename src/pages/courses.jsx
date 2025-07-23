// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Search, Filter, Clock, Flame, Star, ChevronRight } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function CoursesPage(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'hiit',
    name: 'HIIT'
  }, {
    id: 'yoga',
    name: '瑜伽'
  }, {
    id: 'strength',
    name: '力量'
  }, {
    id: 'cardio',
    name: '有氧'
  }];
  const courses = [{
    id: 1,
    title: 'HIIT燃脂训练',
    description: '高强度间歇训练，快速燃脂',
    duration: 30,
    level: '中级',
    category: 'hiit',
    rating: 4.8,
    students: 1234,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    calories: 350
  }, {
    id: 2,
    title: '晨间瑜伽',
    description: '唤醒身体，提升柔韧性',
    duration: 45,
    level: '初级',
    category: 'yoga',
    rating: 4.9,
    students: 892,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop',
    calories: 180
  }, {
    id: 3,
    title: '核心力量',
    description: '强化核心肌群，塑造线条',
    duration: 25,
    level: '高级',
    category: 'strength',
    rating: 4.7,
    students: 567,
    image: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=200&fit=crop',
    calories: 280
  }, {
    id: 4,
    title: '有氧舞蹈',
    description: '快乐燃脂，提升心肺功能',
    duration: 40,
    level: '中级',
    category: 'cardio',
    rating: 4.6,
    students: 1567,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop',
    calories: 320
  }];
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
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
      {/* 顶部搜索栏 */}
      <div className="bg-white px-4 pt-12 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="搜索课程..." className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <button className="p-2 bg-gray-100 rounded-full">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex space-x-3 overflow-x-auto">
          {categories.map(category => <button key={category.id} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedCategory === category.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setSelectedCategory(category.id)}>
              {category.name}
            </button>)}
        </div>
      </div>

      {/* 课程列表 */}
      <div className="px-4 py-4 pb-20">
        <div className="grid gap-4">
          {filteredCourses.map(course => <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden" onClick={() => handleCourseClick(course.id)}>
              <div className="flex">
                <img src={course.image} alt={course.title} className="w-32 h-24 object-cover" />
                <div className="flex-1 p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {course.duration}分钟
                      </span>
                      <span className="flex items-center">
                        <Flame size={12} className="mr-1" />
                        {course.calories}kcal
                      </span>
                      <span className="flex items-center">
                        <Star size={12} className="mr-1 text-yellow-400" />
                        {course.rating}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}
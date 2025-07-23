// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Search, ShoppingCart, Star, Filter } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
export default function ShopPage(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const products = [{
    id: 1,
    name: '专业瑜伽垫',
    price: 89,
    originalPrice: 129,
    rating: 4.8,
    sales: 2341,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
    tags: ['防滑', '加厚', '环保']
  }, {
    id: 2,
    name: '智能运动手环',
    price: 199,
    originalPrice: 299,
    rating: 4.7,
    sales: 1567,
    image: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=300&h=300&fit=crop',
    tags: ['心率监测', '防水', '长续航']
  }, {
    id: 3,
    name: '蛋白粉',
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    sales: 892,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop',
    tags: ['增肌', '低脂', '易吸收']
  }, {
    id: 4,
    name: '运动水壶',
    price: 49,
    originalPrice: 69,
    rating: 4.6,
    sales: 3456,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
    tags: ['大容量', '防漏', '便携']
  }];
  const categories = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'equipment',
    name: '器材'
  }, {
    id: 'nutrition',
    name: '营养品'
  }, {
    id: 'clothing',
    name: '服装'
  }, {
    id: 'accessories',
    name: '配件'
  }];
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    $w.utils.navigateTo({
      pageId: tabId,
      params: {}
    });
  };
  const handleProductClick = productId => {
    $w.utils.navigateTo({
      pageId: 'productDetail',
      params: {
        id: productId
      }
    });
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部搜索栏 */}
      <div className="bg-white px-4 pt-12 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="搜索商品..." className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <button className="p-2 bg-gray-100 rounded-full">
            <ShoppingCart size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex space-x-3 overflow-x-auto">
          {categories.map(category => <button key={category.id} className="px-4 py-2 rounded-full text-sm whitespace-nowrap bg-gray-100 text-gray-700">
              {category.name}
            </button>)}
        </div>
      </div>

      {/* 商品列表 */}
      <div className="px-4 py-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          {products.map(product => <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden" onClick={() => handleProductClick(product.id)}>
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-orange-500 font-bold">¥{product.price}</span>
                  <span className="text-gray-400 text-xs line-through ml-2">¥{product.originalPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Star size={12} className="text-yellow-400 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                  <span>已售{product.sales}</span>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}
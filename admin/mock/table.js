const Mock = require('mockjs')




/*
items| 30  从属性值 [{}, {} ...] 中随机选取30个元素，作为最终值，即按value的属性生成30个数据
Mock.mock( template )    根据数据模板生成模拟数据，并没有添加url
*/
const data = Mock.mock({
  'items|30': [{          
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})


//把模拟数据转存到响应中，并没有对ajax 拦截， 暴露出mock 接口
module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      // 赋予生成的假数据
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

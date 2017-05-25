# qd-data
crawling data from website by nodejs

#### Installation

```bash
yarn add qd-data
or
npm i qd-data --save
```

#### Example

##### 当当网数据提取
```js
const qdDDBang = require('qd-data').DangDang.Bang
const qdDDCommon = require('qd-data').DangDang.Common
/**
* 获取书热销榜籍数据
*   参数一 回调函数
*       返回书籍数组
*           title   书名
*           img     图片链接
*           price   价格
*           author  作者
*           publistDate 出版时间
*           publisher   出版社
*           link    链接
*   参数二 页码(如果大于中页数取最后一页)
*   参数三 分类名字
*/
qdDDBang.getBestSellers(function(data){
    console.log(data) //数组
},1,'益智游戏')

/**
* 获取热销榜中页数
*   参数一 回调函数
*       返回总页数  数字
*/
qdDDBang.getBestSellersPageCount(function(pageCount){
    console.log(pageCount)//热销榜总页数
})

/**
* 获取分类数据
*   参数一 回调函数
*       返回分类数组
*       name    分类名字
*       lev     分类等级(1大类,2小蕾)
*       link    分类的链接
*/
qdDDCommon.getBookTypes(function(types){
    console.log(types) //获取所有的分类数据
})
```

##### 东方财富资讯网数据提取
```js
var qdEMF = require('qd-data').EastMoney.News

/**
* 获取要闻精华总页数
*   参数一 回调函数
*       返回总页数   数字
*/
qdEMF.getPageCount(function(pageCount){
    console.log(pageCount)//要闻精华总页数
})

/**
* 获取要闻精华数据
*   参数一 回调函数
*       返回数组
*       title   标题
*       img     图片
*       link    链接
*   参数二 页码(可选,默认为1)
*/
qdEMF.getFinanceNews(function(data){
    console.log(data)//要闻精华数据
},1)
```
##### 新浪网股票数据
```js
var stockTrade = require('qd-data').Stock.Trade
/**
* 获取单只股票的数据
*   参数一 回调函数
*       返回数据
*       code            编码
*       name            名字
*       trade           当前价格
*       high            最高价
*       low             最低价
*       volume          成交量
*       volumePrice     成交价格
*       settlement      昨日收盘价
*       open            开盘价
*       changeMoney     涨跌价格 
*       changePercent   涨跌幅度
*   参数二 股票代码
*/
stockTrade.getInfoByCode(function(data){
    console.log(data)
},'600611')

/**
* 获取多只股票的数据
*   参数一 回调函数
*       返回一个数组
*   参数二 股票代码(数组形式进行传递)
*/
stockTrade.getInfoByCodes(function(data){
    console.log(data)
},['600611','000877','601088'])

/**
* 获取新浪 财经中的精彩推荐内容
*/
stockTrade.getNews(function(data){
    console.log(data)
})
```

##### 常用数据提取
```js

var life = require('qd-data').Others.Life
var music = require('qd-data').Others.Music

/**
* 根据城市获取天气数据
*   参数一 回调函数
*   参数二 查询的城市信息
*/
life.getWeatherbyCity(function(data) {
  console.log(data)
},'北京')

/**
* 根据关键字检索网易云音乐中的数据
*   参数一 回调函数
*       title       歌单(专辑)名字
*       a_id        歌单(专辑)id
*       songs       歌曲数组
*           name    歌名
*           url     歌曲链接
*   参数二 关键字
*   参数三 获取的数量[可选]
*/
music.getSongsSearch(function(data){
    console.log(data)
},'遇见',10)

```

Test
```bash
mocha #运行测试代码
```


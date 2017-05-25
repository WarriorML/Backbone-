/**
 * Created by yuluo on 2017/5/7.
 * 从新浪网获取交易行情数据
 */
const helper = require('../helper')
var baseUrl = 'http://hq.sinajs.cn/list='
const Stock = {
    /**
     * 获取指定股票的交易信息
     * @param cb
     * @param code
     */
    getInfoByCode(cb, code){
        code = code.startsWith('60') ? `sh${code}` : `sz${code}`
        var url = baseUrl + code
        helper.getDataFromWeb(url, $ => {
            if ($) {
                var res = $.text().split('=')[1].replace(/"/g, '').split(',')
                var obj = {}
                obj.code = code //编码
                obj.name = res[0]//名字
                obj.trade = res[3] * 1//当前价格
                obj.high = res[4] * 1//最高价
                obj.low = res[5] * 1//最低价
                // obj.max = $('#gt3').text()//涨停价
                // obj.min = $('#gt10').text()//跌停价
                obj.volume = res[8] * 1 //成交量
                obj.volumePrice = res[9] * 1//成交 手
                obj.settlement = res[2] * 1//昨日收盘价 元
                obj.open = res[1] * 1//开盘价
                obj.changeMoney = obj.trade - obj.settlement //涨跌价格
                obj.changePercent = obj.changeMoney / obj.open //涨跌幅度
                cb(obj)
            }
            else {
                cb({})
            }
        })
    },
    /**
     * 获取多个股票的交易信息
     * @param cb
     * @param codes
     */
    getInfoByCodes(cb, codes){
        var index = 0
        var that = this
        var result = []

        function getTemData() {
            if (index < codes.length) {
                that.getInfoByCode(function (temData) {
                    result.push(temData)
                    index += 1
                    getTemData()
                }, codes[index])
            }
            if (index == codes.length) {
                cb(result)
            }
        }

        getTemData()
    },
    //获取新浪网 财经 > 股票博客 > 精彩推荐
    getNews(cb, hasContent = false){
        helper.getDataFromWeb('http://finance.sina.com.cn/blog/8.html', $ => {
            var result = []
            if ($) {
                $('.listBlk li').each(function () {
                    $tag = $(this)
                    var obj = {}
                    obj.title = $tag.find('a').eq(0).text()
                    obj.link = $tag.find('a').eq(0).attr('href')
                    obj.author = $tag.find('font a').text()
                    obj.date = $tag.find('font').text().match(/\((.*?)\)/)[1]
                    result.push(obj)
                })
                cb(result)
            }
            else {
                cb(result)
            }
        })
    }
}
module.exports = Stock
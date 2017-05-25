/**
 * Created by yuluo on 2017/5/6.
 * 获取东方财富网的要问精华数据
 */
const baseUrl = 'http://finance.eastmoney.com/'
const helper = require('../helper')
const News = {
    /**
     * 根据页码获取新闻
     * @param cb    回调函数
     * @param page  [页码]
     */
    getFinanceNews(cb,page=1){
        if (isNaN(page)) {
            page = 1
        }
        this.getPageCount(function (maxPage) {
            if (maxPage < page) {
                page = maxPage
            }
            var url = baseUrl + `yaowen_cywjh_${page}.html`
            var result = []
            helper.getDataFromWeb(url,$=>{
                if($){
                    $('.artitleList li[id]').each(function(){
                        var $tag = $(this)
                        var obj = {}
                        obj.title = $tag.find('.title a').text()
                        obj.link = $tag.find('.title a').attr('href')
                        obj.img = $tag.find('.newsImg').attr('src')
                        result.push(obj)
                    })
                    cb(result)
                }
                else{
                    cb([])
                }
            })
        })
    },
    /**
     * 获取总页数
     * @param cb
     */
    getPageCount(cb){
        var url = baseUrl + 'yaowen_cywjh_1.html'
        helper.getDataFromWeb(url,$=>{
            if($){
                // console.log($('#pageNoDiv a[target="_self"]').last().text())
                cb(Number($('#pageNoDiv a[target="_self"]').last().prev().text()))
            }
            else{
                cb(0)
            }
        })
    }

}
module.exports = News
/**
 * Created by yuluo on 2017/5/5.
 * 获取当当网书籍分类数据
 */
const helper = require('../helper') //引入帮助文件
const common = {
    //获取分类数据 左侧导航中的分类数据
    getBookTypes(cb){
        var url = 'http://bang.dangdang.com/books/bestsellers'
        helper.getDataFromWeb(url,$=>{
            if($){
                var result = []
                $('.side_nav').each(function(){
                    var obj = {}
                    var $tag = $(this).find('a')
                    obj.name = $tag.text()
                    obj.link = $tag.attr('href')
                    obj.lev = 1
                    // obj.children = []
                    $(this).next().find('li').each(function(){
                        var objChild = {}
                        var $tagChild = $(this).find('a')
                        objChild.name = $tagChild.text()
                        objChild.link = $tagChild.attr('href')
                        objChild.lev = 2
                        result.push(objChild)
                    })
                    result.push(obj)
                })
                cb(result)
            }
            else{
                cb([])
            }
        })
    }
}
module.exports = common
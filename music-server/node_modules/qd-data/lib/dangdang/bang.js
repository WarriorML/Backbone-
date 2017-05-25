const common = require('./common')
const helper = require('../helper') //引入帮助文件
const Bang = {
    /**
     * 获取图书畅销榜
     * @param cb    回调函数
     * @param page  页码
     */
    getBestSellers(cb, page = 1, type = "") {
        if (isNaN(page)) {
            page = 1
        }
        if (type) {
            common.getBookTypes(types => {
                var typeObj = types.find(t => {
                    return t.name == type
                })
                var url = typeObj.link.substring(0, typeObj.link.length - 1)

                this.getBestSellersPageCount(function (maxPage) {
                    if (maxPage < page) {
                        page = maxPage
                    }
                    helper.getDataFromWeb(url + page, $ => {
                        if ($) {
                            var result = []
                            $('.bang_list li').each(function () {
                                result.push(getBookData($(this)))
                            })
                            cb(result)
                        }
                        else {
                            cb([])
                        }
                    })
                })
            })
        }
        else {
            var url = 'http://bang.dangdang.com/books/bestsellers/1-'
            this.getBestSellersPageCount(function (maxPage) {
                if (maxPage < page) {
                    page = maxPage
                }
                helper.getDataFromWeb(url + page, $ => {
                    if ($) {
                        var result = []
                        $('.bang_list li').each(function () {
                            result.push(getBookData($(this)))
                        })
                        cb(result)
                    }
                    else {
                        cb([])
                    }
                })
            })
        }
    },
    /**
     * 获取图书畅销榜总页数
     * @param cb    回调函数
     */
    getBestSellersPageCount(cb){
        helper.getDataFromWeb('http://bang.dangdang.com/books/bestsellers', $ => {
            if ($) {
                cb(Number($('.paging li.next').prev().text()))
            }
            else {
                cb(0)
            }
        })
    }
}
/**
 * 筛选书籍数据
 * @param $tag
 * @returns {{}}
 */
function getBookData($tag) {
    var book = {}
    book.img = $tag.find('.pic img').attr('src')
    book.title = $tag.find('.name a').attr('title')
    book.link = $tag.find('.name a').attr('href')
    book.price = $tag.find('.price_n').first().text().replace("¥", "")
    book.author = $tag.find('.publisher_info').first().find('a').attr('title')
    book.publishDate = $tag.find('.publisher_info').last().find('span').text()
    book.publisher = $tag.find('.publisher_info').last().find('a').text()
    return book
}

module.exports = Bang
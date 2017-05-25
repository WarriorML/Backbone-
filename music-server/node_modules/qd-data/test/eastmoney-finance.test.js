/**
 * Created by yuluo on 2017/5/6.
 * 东方财富网 要闻精华测试
 */
const qdEMF = require('../lib/index').EastMoney.News
const expect = require('chai').expect
const Table = require('easy-table')//用于打印输出结果

describe('东方财富网数据测试',()=>{
    it('总记录页数应该为数字',done=>{
        qdEMF.getPageCount(pageCount=>{
            expect(pageCount).to.be.a('number')
            done()
        })
    })
    it('总记录页数应该大于0',done=>{
        qdEMF.getPageCount(pageCount=>{
            expect(pageCount).to.be.above(0)
            done()
        })
    })
    it('新闻记录获取成功',done=>{
        qdEMF.getFinanceNews(data=>{
            expect(data.length).to.be.above(1)
            console.log(Table.print((data)))
            done()
        })
    })

    it('传递很大的页数,新闻记录获取成功',done=>{
        qdEMF.getFinanceNews(data=>{
            expect(data.length).to.be.above(1)
            console.log(Table.print((data)))
            done()
        },2000)
    })
})
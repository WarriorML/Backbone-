/**
 * Created by yuluo on 2017/5/7.
 */
const expect = require('chai').expect
const Table = require('easy-table')//用于打印输出结果
const Stock = require('../lib').Stock

describe('测试stock相关数据',()=>{
    it('根据code获取行情数据',done=>{
        Stock.Trade.getInfoByCode(data=>{
            console.log(Table.print(data))
            done()
        },'600611')
    })

    it('根据codes获取多只股票行情数据',done=>{
        Stock.Trade.getInfoByCodes(data=>{
            console.log(Table.print(data))
            done()
        },['600611','000877','601088'])
    })

    it('获取新浪的资讯数据',done=>{
        Stock.Trade.getNews(data=>{
            console.log(Table.print(data))
            done()
        })
    })
})
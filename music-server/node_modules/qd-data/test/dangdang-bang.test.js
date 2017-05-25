var qdDDBang = require('../index').DangDang.Bang
var qdDDCommon = require('../index').DangDang.Common
const expect = require('chai').expect
const Table = require('easy-table')//用于打印输出结果

describe('测试当当网相关数据提取', () => {
    it('热销榜数据长度大于1', (done) => {
        qdDDBang.getBestSellers((res) => {
            expect(res.length).to.be.above(1)
            console.log(Table.print(res))
            done()
        })
    })
    it('热销榜获取数据时,传递一个超级大的页数', done => {
        qdDDBang.getBestSellers(res => {
            expect(res.length).to.be.above(1)
            console.log(Table.print(res))
            done()
        },10000)
    })
    it('热销榜总页数必须为数字', done => {
        qdDDBang.getBestSellersPageCount(res => {
            expect(res).to.be.a('number')
            done()
        })
    })
    it('热销榜总页数必须为大与1', done => {
        qdDDBang.getBestSellersPageCount(res => {
            expect(res).to.be.above(1)
            done()
        })
    })
    // it('测试获取所有的热销榜数据', done => {
    //     var allData = []
    //     qdDDBang.getBestSellersPageCount(pageCount => {
    //         var pageIndex = 1
    //         function getTemData(){
    //             if(pageIndex<=pageCount){
    //                 qdDDBang.getBestSellers(data => {
    //                     allData = allData.concat(data)
    //                     if (pageIndex == pageCount) {
    //                         expect(allData.length).to.be.above(1)
    //                         console.log(Table.print(allData))
    //                         done()
    //                     }
    //                     console.log(`第${pageIndex}页数据提取成功`)
    //                     pageIndex += 1
    //                     getTemData()
    //                 }, pageIndex)
    //             }
    //         }
    //         getTemData()
    //     })
    // })
    it('获取榜单中数据的分类',done=>{
        qdDDCommon.getBookTypes(data=>{
            expect(data).to.be.an('array')
            console.log(Table.print(data))
            done()
        })
    })
    it('获取榜单中的益智游戏分类',done=>{
        qdDDBang.getBestSellers(res => {
            expect(res.length).to.be.above(1)
            console.log(Table.print(res))
            done()
        },10000,'益智游戏')
    })
})

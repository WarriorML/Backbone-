/**
 * Created by yuluo on 2017/5/8.
 * 测试其他other
 */
const qdOthersLife = require('../lib').Others.Life
const qdOthersMusic = require('../lib').Others.Music
const expect = require('chai').expect
const Table = require('easy-table')//用于打印输出结果
var fs = require('fs')
describe('测试其他常用模块',()=>{
    it('测试调用天气预报接口,获取城市天气预报',done=>{
        qdOthersLife.getWeatherbyCity(data=>{
            console.log(data)
            done()
        },'北京')
    })

    // it('测试网易云音乐获取数据',done=>{
    //     qdOthersMusic.getMusicsByAlbum(function(data){
    //         console.log(data)
    //         done()
    //     },32311)
    // })

    it('测试网易云音乐搜索数据',done=>{
        qdOthersMusic.getSongsSearch(function(data){
            console.log(data)
            //测试结果写入文件中
            // fs.writeFile('./遇见.json',JSON.stringify(data),err=>{
            //     console.log(err)
            // })
            done()
        },'遇见')
    })
})
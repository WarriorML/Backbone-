/**
 * Created by yuluo on 2017/5/6.
 * 工具类
 */
const axios = require('axios')
const iconv = require('iconv-lite')//解码获取到的数据(针对中文编码问题[gb2312,gbk])
const cheerio = require('cheerio')
/**
 * 根据url获取数据
 * @param url
 * @param cb
 */
function getDataFromWeb(url, cb) {
    // console.log(url)
    axios.get(url, {responseType: 'arraybuffer'})
        .then(res => {
            if (res.headers['content-type'].toLowerCase().includes('gb') || url.includes('eastmoney.com') ||
            url.includes('finance.sina.com.cn')) {
                res.data = iconv.decode(res.data, 'gb2312')
            }
            var $ = cheerio.load(res.data)
            cb($)
        })
        .catch(err => {
            console.log(err)
            cb({})
        })
}

/**
 * 获取JSON数据 get方式
 * @param url       请求的url
 * @param cb        回调函数
 * @param config    配置信息
 */
function getJSONFromWeb(url,cb,config){
    axios.get(url,config)
        .then(res=>{
            cb(res.data)
        })
        .catch(err=>{
            console.log(err)
            cb({})
        })
}

/**
 * post方式获取数据
 * @param url       请求地址
 * @param cb        回调函数
 * @param data      request的数据
 * @param config    配置信息
 */
function postJSONFromWeb(url,cb,data,config){
    // console.log(data)
    axios.post(url,data,config)
        .then(res=>{
            cb(res.data)
        })
        .catch(err=>{
            console.log(err)
            cb({})
        })
}

module.exports = {
    getDataFromWeb:getDataFromWeb,
    getJSONFromWeb:getJSONFromWeb,
    postJSONFromWeb:postJSONFromWeb
}
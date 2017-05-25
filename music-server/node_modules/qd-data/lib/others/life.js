/**
 * Created by yuluo on 2017/5/8.
 * 日常生活服务类
 */
const helper = require('../helper')
const weatherBaseUrl = "http://wthrcdn.etouch.cn/weather_mini?city="
const Life = {
    /**
     * 根据城市名字获取天气数据
     * @param cb
     * @param city
     */
    getWeatherbyCity(cb,city){
        city = encodeURI(city)//对参数进行url编码
        helper.getJSONFromWeb(weatherBaseUrl+city,data=>{
            if(data){
                // console.log($)
                cb(data)
            }
            else{
                cb({})
            }
        })
    }
}
module.exports = Life

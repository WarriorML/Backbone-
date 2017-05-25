/**
 * Created by yuluo on 2017/5/9.
 * 获取网易云音乐数据
 */
const helper = require('../helper')
const NeteaseMusic = {

    /**
     *
     * @param cb        回调函数
     * @param keyWord   关键字
     * @param limit     获取的数量
     */
    getSongsSearch(cb, keyWord,limit=20){
        /*
         {
         s:keyWord,
         limit:100,
         offset:0,
         type:1,
         sub:false
         }
         */
        var that = this
        helper.postJSONFromWeb('http://music.163.com/api/search/get/', data => {
            // console.log(data.result.songs.length)
            if (data) {
                var result = []
                var indexAlbum = 0

                function eachAlbums() {
                    // that.getMusicsByAlbum()
                    // console.log(indexAlbum)
                    var album = data.result.songs[indexAlbum].album
                    var m = {}
                    m.title = album.name
                    // m.pic = album.artist.img1v1Url
                    m.a_id = album.id
                    m.songs = []
                    that.getMusicsByAlbum(songs => {

                        m.songs = songs

                        result.push(m)
                        if (indexAlbum == data.result.songs.length) {
                            cb(result)
                        }
                        if (indexAlbum < data.result.songs.length) {
                            eachAlbums()
                            indexAlbum += 1
                        }
                    }, m.a_id)
                }

                eachAlbums()
                // data.result.songs.forEach(album=>{
                //     var m = {}
                //     m.title = album.name
                //     // m.pic = album.artist.img1v1Url
                //     m.a_id = album.id
                //     m.songs = []
                //     result.push(m)
                // })

            }
            else {
                cb({})
            }
        }, `s=${keyWord}&limit=${limit}&offset=0&type=1&sub=false`)
    },
    /**
     * 获取歌单(专辑)的歌曲
     * @param cb    回调函数
     * @param id    歌单(专辑)的id
     */
    getMusicsByAlbum(cb, id){
        // console.log(id)
        helper.getJSONFromWeb(`http://music.163.com/api/album/${id}/`, function (data) {
            if (data) {
                // console.log(data)
                var result = []
                if (data.album) {
                    data.album.songs.forEach(item => {
                        var song = {}
                        song.name = item.name
                        song.url = item.mp3Url
                        result.push(song)
                    })
                }
                cb(result)
            }
            else {
                cb([])
            }
        }, {
            headers: {Referer: 'http://music.163.com'}
        })
    }
}
module.exports = NeteaseMusic
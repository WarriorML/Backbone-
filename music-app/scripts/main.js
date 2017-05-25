var _data = [] //当前所有的歌单数据
var AlbumView = Backbone.View.extend({
    initialize: function () {
        this.render()
        //ajax获取数据
        $.getJSON('http://localhost:3000/music', function (data) {
            this.loadDataEnd(data)
        }.bind(this))
    },
    events: {
        'click #search': 'doSearch',
        'keyup input':'keyupHandle'
    },
    keyupHandle:function(e){
        if(e.keyCode == 13){
            this.doSearch()
        }
    },
    doSearch: function () {
        var keyWord = this.$el.find('input').val()
        //重新调用取数据方法 把输入框中的内容传递到服务器
        $.getJSON('http://localhost:3000/music', { key_word: keyWord }, function (data) {
            this.loadDataEnd(data)
        }.bind(this))
    },
    render: function () {
        this.$el.html(`<div id="albums" class="panel panel-danger">
                <div class="panel-heading">
                    <h3 class="panel-title">歌曲搜索</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search for...">
                                <span class="input-group-btn">
                                <button id="search" class="btn btn-default" type="button">Go!</button>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div id="albumsList"></div>
                </div>
            </div>`)
        return this
    },
    //获取完成之后渲染页面
    loadDataEnd: function (data) {
        _data = data //赋值全局变量歌单数据
        var strHtml = ''
        data.forEach(function (item) {
            strHtml += `<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <div class="thumbnail">
                <a href="#songs/${item.a_id}">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495023040105&di=d5398c352154b7a830176e503bf8c264&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201507%2F30%2F20150730163204_A24MX.thumb.700_0.jpeg" alt="">
                </a>
                <div class="caption">
                    <h3>${item.title}</h3>
                </div>
            </div>
        </div>`
        })
        this.$el.find('#albumsList').html($(strHtml))
    }
})
var SongsView = Backbone.View.extend({
    initialize: function (params) {
        this.aId = params.aId * 1 //设置传递过来的数据保存在this对象中
        var filterResult = _data.find(function (album) {
            return album.a_id == this.aId
        }.bind(this))
        if (filterResult) {
            this.songs = filterResult.songs //数据筛选
            this.render()
            this.audio = this.$el.find('audio')[0]
        }
        else {
            window.location.href = '#'
        }
    },
    events: {
        'click .list-group-item': 'changeSong'
    },
    changeSong: function (e) { //选择歌曲后
        var $tag = $(e.currentTarget)
        this.audio.src = $tag.data('src')
        this.audio.play() //执行播放
    },
    render: function () {
        var strHtml = ''
        this.songs.forEach(function (song) {
            strHtml += `<a href="javascript:void(0)" class="list-group-item" data-src="${song.url}">${song.name}</a>`
        })
        this.$el.html(`<div class="panel panel-danger">
                  <div class="panel-heading">
                        <h3 class="panel-title">歌单</h3>
                  </div>
                  <div class="panel-body">
                        <audio src="http://m2.music.126.net/BKFYlWCooCuOe-PGkq41Zg==/18662010859984505.mp3" controls></audio>
                        <div class="list-group">
                            ${strHtml}
                        </div>
                        <a href="#" class="btn btn-info">返回</a>
                  </div>
            </div>`)
        return this
    }
})
var R = Backbone.Router.extend({
    //当路由地址切换的时候使用不同的视图文件渲染页面
    routes: {
        '': 'indexPage',
        'songs/:id': 'songsPage'
    },
    indexPage: function () {
        var page = new AlbumView()
        $('#app').html(page.el)
    },
    songsPage: function (id) {
        var page = new SongsView({ aId: id }) //创建歌曲列表的时候传递歌单id
        // console.log(id)
        $('#app').html(page.el)
    }
})
var r = new R()
Backbone.history.start()
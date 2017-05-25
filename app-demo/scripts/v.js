var T = Backbone.Model.extend({})//模型
var Animal = Backbone.Collection.extend({
    model:T
})//集合
var ListView = Backbone.View.extend({
    initialize:function(params){
        console.log('试图初始化完成...')
        this.c = params.c
        this.listenTo(this.c,'add',this.added)//为model添加事件
        this.render()
    },
    added:function(){//集合添加事件触发
        console.log(this.c.models)//输出数据
        this.render()
    },
    events:{
        'click li':'clickHandle',//事件监听
        'keyup .it':'itHandle' //事件监听
    },
    el:'<div><input class="it"><br><ul></ul></div>',
    render:function(){
        console.log(this.$el)
        // for(var i=0;i<10;i++){
        //     this.$el.find('ul').append('<li>'+i+'</li>')
        // }
        this.$el.find('ul').html('')
        for(var i=0;i<this.c.length;i++){
            var str = this.c.at(i).get('name')
            this.$el.find('ul').append('<li>'+str+'</li>')
        }
        return this
    },
    clickHandle:function(e){ //事件处理函数
        console.dir(e)
    },
    itHandle:function(e){
        if(e.keyCode == 13){//键值为13代表回车键
            //this.$el返回的是一个当前view中的el的jQuery实例
            console.log(this.$el.find('.it').val())
            var temVal = this.$el.find('.it').val()
            //this.$el.find('ul').append('<li>'+temVal+'</li>')

            var m = new T({
                name:temVal
            })
            this.c.add(m)

        }
    }
})


var dogs = new Animal()//实例化一个结合对象

var lv = new ListView({c:dogs}) //创建视图的时候传递参数
console.dir(lv)
// $('#app').html(lv.el)
//详情试图
var DetailView = Backbone.View.extend({
    initialize:function(){
        this.render()
    },
    el:'<h1>我是详情页</h1>',
    render:function(){
        return this
    }
})
var dv = new DetailView()
var R = Backbone.Router.extend({
    routes:{
        '':'indexPage',
        'detail':'detailPage'
    },
    indexPage:function(){
        $('#app').html(lv.el)
    },
    detailPage:function(){
        $('#app').html(dv.el)
    }
})
var r = new R()
Backbone.history.start()



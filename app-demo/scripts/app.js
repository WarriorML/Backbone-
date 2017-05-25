/**
 * 创建一个model
 *  student
 *      name(姓名),age(年龄),gender(性别),fav(爱好)
 * 监听属性的变化
 */
var Student = Backbone.Model.extend({
    // constructor:function(){//模型初始化
    //     // console.log(this)
    //     // $('#title').html('我的名字是'+this.get('name')+'<br>'+JSON.stringify(this.toJSON()))
    // }
    render:function(){
        // console.log('渲染...')
        // $('#title').html('我的名字是'+this.get('name')+'<br>'+JSON.stringify(this.toJSON()))
        var $h6 = $('<h6></h6>')
        $h6.html(`我的名字是${this.get('name')}<br>${JSON.stringify(this.toJSON())}`)
        $('#app').append($h6)
    }
})

var tom = new Student({
    name:'Tom',
    age:18,
    gender:'男',
    fav:'sleep'
})
tom.on('change',function(){
    tom.render()
    // console.log("tom's attributes is changed!")
    // $('#title').html('我的名字是'+tom.get('name')+'<br>'+JSON.stringify(tom.toJSON()))
})
tom.render()
// $('#title').html('我的名字是'+tom.get('name')+'<br>'+JSON.stringify(tom.toJSON()))
console.dir(tom)
// tom.set('age',21) //改变tom的年龄属性
//为输入框添加keyup事件,keyup之后触发模型的设置属性事件
$('#txt').keyup(function(){
    tom.set('age',$(this).val())
})
tom.render()
// $('#txt').bind('keydown',function(){
//     console.log($(this).val())
// })
// //失去焦点的时候
// $('#txt').change(function(){
//     console.group('txt的change事件触发')
//     console.log($(this).val())
//     console.groupEnd('txt的change事件触发')
// })
/**
 * jQuery事件绑定
 *  $(selector).事件类型(function...)
 *      如 $(selector).click(function()....)
 *  $(selector).bind(事件类型,function...)
 *      如 $(selector).bind('click',function()...)
 *  $(selector).on(事件类型,[selector],function...)
 *      如 $(selector).on('click','div',function()...)
 *      为元素选择器内部的div绑定事件,在绑定的时候div可以动态加入
 *      也叫事件委托
 */
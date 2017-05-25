var Person = Backbone.Model.extend({})
var People = Backbone.Collection.extend({
    model:Person,
    render:function(){
        for(var i=0;i<this.length;i++){
            //把每一个人显示在页面上
            var $h6 = $('<p></p>')
            $h6.html(`我的名字是${this.at(i).get('name')}`)
            $('#app').append($h6)
        }
    }
})
//0=<Math.random()<1
var people = new People()
for(var i=0;i<10;i++){
    var p1 = new Person({
        name:'person-'+(i+1),//姓名
        age:Math.ceil(Math.random()*98)+1//年龄
    })
    people.push(p1)
}
console.dir(people)
people.render()
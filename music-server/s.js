var express = require('express')
var app = express()
var music = require('qd-data').Others.Music
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get('/music', (req, res) => {
    var k = '遇见'
    if(req.query.key_word){
        k = req.query.key_word
    }
    music.getSongsSearch(function (data) {
        // console.log(data)
        res.json(data)
    }, k, 10)
})

app.listen('3000', () => {
    console.log('服务器运行于3000端口')
})
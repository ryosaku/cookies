var express = require('express')
var app = express()

app.engine('html', require('ejs').renderFile)
app.use(cookiesM)

app.get('/show', show)

function show(req, res) {
    var data = [
        {title: 'Mathematics', price: 100},
        {title: 'Thai', price: 100},
        {title: 'Biology', price: 100}
    ]
    res.render('show.html', {book:data})
}

app.get('/', (req, res) => res.render('index.html'))
app.get('/login', (req, res) => res.render('index.html'))
app.get('/profile', (req, res) => {
    if(valid[req.token]){
        res.render('profile.html')
    }else{
        res.redirect('/login')
    }
})

app.get('/do-login', (req, res) => {
    if(req.query.user == 'markz' && req.query.password == mark123){
        valid.push(req.token)
        res.redirect('/profile')
    }else{
        res.redirect('/login?massage=invalid')
    }
})

app.get('/logout', (req, res) => {
    delete valid[req.token];
    res.render
})

app.listen(2000)

function cookiesM(req, res, next) {
    if(req.header.cookie == null){
        req.header.cookie = ''
    }
    var item = req.header.cookie.split(';')
    for(var v of item){
        var data = v.split('=')
        if(data[0] == 'token'){
            req.token = data[1]
        }
    }
    if(req.token == null){
        var c = parseInt(Math.random() * 1000000000)
        req.token = c
        res.set('Set-cookie', 'token=' + c)
    }
    /*console.log(req.header)
    if(req.header.cookie == null){
        var c = parseInt(Math.random() * 1000000000)
        //req.header.cookie = 'token=' + c
        req.token = c
        res.set('Set-cookie', 'token=' + c)
    }else{
        var item = req.header.cookie.split(';')
        for(var v of item){
            var data = v.split('=')
            if(data[0] == 'token'){
                req.token = data[1]
            }
        }
    }*/
    next()
}

/*app.get('/', index)

function index(req, res) {
    res.render('index.html')
}

app.get('/', function (req, res) {
    res.render('index.html')
})*/
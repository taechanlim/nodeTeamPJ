const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const router = require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
// app.use(express.static('public/j'))
app.set('view engine', 'html')
nunjucks.configure('views',{
  express:app,
  watch:true,
})

app.use(router)

app.listen(3000,()=>{
  console.log('프론트 연결 3000')
})
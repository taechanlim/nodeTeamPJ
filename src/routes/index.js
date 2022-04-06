const express = require('express')
const router = express.Router()
const mainRouter = require('./main')
const adminRouter = require('./admin')
const boardRouter = require('./board')
const noticeRouter = require('./notice')
const qnaRouter = require('./qna')
const userRouter = require('./user')
const authRouter = require('./auth')
const testRouter = require('./test')
const {alertmove} = require('../public/util/alert.js')


const userAccess = (req,res,next)=>{
    try{
    const jwtDecode = require('jwt-decode');
    let token = jwtDecode(req.cookies.token)
    // console.log(token)
    if(token){
        next()
    }else{
        res.send(alertmove('/','회원만 가능한 기능입니다'))
    }
    }catch(e){
        res.send(alertmove('/','회원만 가능한 기능입니다'))
    }
}


const adminAccess = (req,res,next)=>{
    try{
    let token = jwtDecode(req.cookies.token)
    const userlevel = token.level
    if(userlevel === 3){
        next()
    }else{
        res.send(alertmove('/','관리자만 가능한 기능입니다'))
    }
    }catch(e){
        res.send(alertmove('/','관리자만 가능한 기능입니다'))
    }
}

router.use('/',mainRouter)
router.use('/admin',adminAccess,adminRouter)
router.use('/board',userAccess,boardRouter)
router.use('/notice',noticeRouter)
router.use('/qna',qnaRouter)
router.use('/user',userRouter)
router.use('/kakao',authRouter)

router.use('/test',testRouter)


module.exports = router
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


const board_access = (req,res,next)=>{
    let token = req.headers.cookie //user level등급을 부여하면 등급별 권한을 조절할수있다.(응용방법)
    if(token != undefined){
       next()
    }else{
        res.send(alertmove('/','회원만 가능한 기능입니다'))
    }
}

router.use('/',mainRouter)
router.use('/admin',adminRouter)
router.use('/board',board_access,boardRouter)
router.use('/notice',noticeRouter)
router.use('/qna',qnaRouter)
router.use('/user',userRouter)
router.use('/kakao',authRouter)

router.use('/test',testRouter)


module.exports = router
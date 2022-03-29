const express = require('express')
const router = express.Router()
const mainRouter = require('./main')
const adminRouter = require('./admin')
const boardRouter = require('./board')
const noticeRouter = require('./notice')
const qnaRouter = require('./qna')
const userRouter = require('./user')
const authRouter = require('./auth')

router.use('/',mainRouter)
router.use('/admin',adminRouter)
router.use('/board',boardRouter)
router.use('/notice',noticeRouter)
router.use('/qna',qnaRouter)
router.use('/user',userRouter)
router.use('/kakao',authRouter)

module.exports = router
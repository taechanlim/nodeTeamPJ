const express = require('express')
const router = express.Router()

// 회원가입
router.get('/join',(req,res)=>{
  console.log('--------------------- 회원가입 페이지 ---------------------')
  res.render('./user/join')
})

// 로그인 (아이디 비밀번호 안맞았을 때, 인증토큰 없을 때)
router.get('/login',(req,res)=>{
  console.log('--------------------- 로그인 페이지 (로그인 실패함) ---------------------')
  res.render('./user/login')
})

// 환영페이지
router.get('/welcome',(req,res)=>{
  console.log('--------------------- 환영 페이지 ---------------------')
  res.render('./user/welcome')
})

// 마이페이지
router.get('/mypage',(req,res)=>{
  console.log('--------------------- 회원 정보 페이지 (마이페이지) ---------------------')
  res.render('./user/mypage')
})

// 로그아웃 클릭시 실행
router.post('/api/logout',(req,res)=>{
  const [,jwt] = req.body.cookies.split('=')
  console.log(jwt)
  const [,payload,] = jwt.split('.')
  const decodingPayload = Buffer.from(payload,'base64').toString()
  const nickname = JSON.parse(decodingPayload).nickname
  console.log(nickname)

  let response = {
    nickname:nickname
  }

  response = {...response}

  res.json(response)
})

module.exports = router
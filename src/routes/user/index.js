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

module.exports = router
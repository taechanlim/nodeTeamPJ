const express = require('express')
const router = express.Router()

// 회원가입
router.get('/join',(req,res)=>{
  console.log('--------------------- 회원가입 페이지 ---------------------')
  res.render('./user/join')
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
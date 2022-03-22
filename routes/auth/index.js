const express = require('express')
const router = express.Router()

// kakao 인증 페이지
router.get('/kakao',(req,res)=>{
  console.log('--------------------- 카카오 인증 페이지 ---------------------')
  res.render('./auth/kakao')
})

module.exports = router
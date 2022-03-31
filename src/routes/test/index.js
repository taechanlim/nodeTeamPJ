const express = require('express')
const router = express.Router()

// 회원가입
router.get('/upload',(req,res)=>{
  console.log('--------------------- 업로드 테스트 페이지 ---------------------')
  res.render('./test/uploadTest')
})

module.exports = router
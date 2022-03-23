const express = require('express')
const router = express.Router()

// 메인 페이지
router.get('/',(req,res)=>{
  console.log('--------------------- 메인 페이지 ---------------------')
  res.render('./main/index')
})

// router.post

module.exports = router
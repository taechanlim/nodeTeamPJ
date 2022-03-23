const express = require('express')
const router = express.Router()

// QNA 작성 페이지
router.get('/write',(req,res)=>{
  console.log('--------------------- QNA 작성 페이지 ---------------------')
  res.render('./qna/write')
})

// QNA 리스트 페이지
router.get('/list',(req,res)=>{
  console.log('--------------------- QNA 리스트 페이지 ---------------------')
  res.render('./qna/list')
})

// QNA 보기 페이지
router.get('/view',(req,res)=>{
  console.log('--------------------- QNA 보기 페이지 ---------------------')
  res.render('./qna/view')
})

// QNA 수정 페이지
router.get('/update',(req,res)=>{
  console.log('--------------------- QNA 수정 페이지 ---------------------')
  res.render('./qna/update')
})

module.exports = router
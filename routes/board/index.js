const express = require('express')
const router = express.Router()

// 글 작성 페이지
router.get('/write',(req,res)=>{
  console.log('--------------------- 글 작성 페이지 ---------------------')
  res.render('./board/write')
})

// 리스트 페이지
router.get('/list',(req,res)=>{
  console.log('--------------------- 글 리스트 페이지 ---------------------')
  res.render('./board/list')
})

// 글 보기 페이지
router.get('/view',(req,res)=>{
  console.log('--------------------- 글 보기 페이지 ---------------------')
  res.render('./board/view')
})

// 글 수정 페이지
router.get('/update',(req,res)=>{
  console.log('--------------------- 글 수정 페이지 ---------------------')
  res.render('./board/update')
})

module.exports = router
const express = require('express')
const router = express.Router()

// 공지사항 작성 페이지
router.get('/write',(req,res)=>{
  console.log('--------------------- 공지사항 작성 페이지 ---------------------')
  res.render('./notice/write')
})

// 공지사항 리스트 페이지
router.get('/list',(req,res)=>{
  console.log('--------------------- 공지사항 리스트 페이지 ---------------------')
  res.render('./notice/list')
})

// 공지사항 보기 페이지
router.get('/view',(req,res)=>{
  console.log('--------------------- 공지사항 보기 페이지 ---------------------')
  res.render('./notice/view')
})

// 공지사항 수정 페이지
router.get('/update',(req,res)=>{
  console.log('--------------------- 공지사항 수정 페이지 ---------------------')
  res.render('./notice/update')
})

module.exports = router
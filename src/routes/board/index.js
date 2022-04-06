const express = require('express')
const {renderWithToken} = require("../headerLoginOut");
const router = express.Router()

// 글 작성 페이지
router.get('/write',(req,res)=>{
  console.log('--------------------- 글 작성 페이지 ---------------------')
  renderWithToken(req, res, './board/write')
})

// 리스트 페이지
router.get('/list',(req,res)=>{
  console.log('--------------------- 글 리스트 페이지 ---------------------')
  renderWithToken(req, res, './board/list')
})

// 글 보기 페이지
router.get('/view',(req,res)=>{
  console.log('--------------------- 글 보기 페이지 ---------------------')
  renderWithToken(req, res, './board/view')
})

// 글 수정 페이지
router.get('/update',(req,res)=>{
  console.log('--------------------- 글 수정 페이지 ---------------------')
  renderWithToken(req, res, './board/update')
})

module.exports = router
const express = require('express')
const {renderWithToken} = require("../headerLoginOut");
const router = express.Router()

// 관리자 페이지
router.get('/',(req,res)=>{
  console.log('--------------------- 관리자 페이지 ---------------------')
  renderWithToken(req, res, './admin/index')
})

// 유저 관리 페이지
router.get('/user',(req,res)=>{
  console.log('--------------------- 관리자 유저 관리 페이지 ---------------------')
  renderWithToken(req, res, './admin/user')
})

// 게시판 관리 페이지
router.get('/board',(req,res)=>{
  console.log('--------------------- 관리자 게시판 관리 페이지 ---------------------')
  renderWithToken(req, res, './admin/board')
})

module.exports = router
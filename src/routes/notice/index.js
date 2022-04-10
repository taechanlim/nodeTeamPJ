const express = require('express')
const router = express.Router()
const {alertmove} = require('../../public/util/alert.js')

const adminAccess = (req,res,next)=>{
  try{
  const jwtDecode = require('jwt-decode')
  let token = jwtDecode(req.cookies.token)
  const userlevel = token.level
  if(userlevel === 3){
      next()
  }else{
      res.send(alertmove('/notice/board','관리자만 가능한 기능입니다'))
  }
  }catch{
      res.send(alertmove('/notice/board','관리자만 가능한 기능입니다'))
  }
}

// 공지사항 리스트 페이지
router.get('/list',(req,res)=>{
  console.log('--------------------- 공지사항 리스트 페이지 ---------------------')
  res.render('./notice/list')
})
router.get('/board',(req,res)=>{
  console.log('--------------------- 공지사항 작성 페이지 ---------------------')
  res.render('./notice/board')
})

// 공지사항 작성 페이지
router.get('/write',adminAccess,(req,res)=>{
  console.log('--------------------- 공지사항 작성 페이지 ---------------------')
  res.render('./notice/write')
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
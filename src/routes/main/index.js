const express = require('express')
const router = express.Router()
const mainController = require('./mainController')

// 메인 페이지
router.get('/',mainController.main)

// router.post

module.exports = router
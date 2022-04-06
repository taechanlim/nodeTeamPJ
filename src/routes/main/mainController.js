exports.main = (req, res, next) => {
  console.log('--------------------- 메인 페이지 ---------------------')
  if (req.cookies.token) {
    const jwtDecode = require('jwt-decode');
    let token = jwtDecode(req.cookies.token)
    const { nickname } = token
    console.log(token)

    res.render('./main/index', {
      nickname: nickname
    })
  } else {
    res.render('./main/index')
  }
}

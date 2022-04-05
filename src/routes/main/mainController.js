const jwtDecode = require('jwt-decode');
exports.main = (req, res) => {
  console.log('--------------------- 메인 페이지 ---------------------')
  if (req.cookies.token) {
    let token = jwtDecode(req.cookies.token)
    const {userid, nickname} = token
    console.log(token)

    res.render('./main/index', {
      nickname: nickname
    })
  } else {
    res.render('./main/index')
  }


}

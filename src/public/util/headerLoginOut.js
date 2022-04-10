function renderWithToken(req, res, path) {
  if (req.cookies.token) {
    const jwtDecode = require('jwt-decode');
    let token = jwtDecode(req.cookies.token)
    const { nickname,level ,address,point,phonenumber} = token
    console.log(token)

    res.render(`${path}`, {
      nickname: nickname,
      level : level,
      address : address,
      point : point,
      phonenumber : phonenumber

    })
  } else {
    res.render(`${path}`)
  }
}

module.exports = {
  renderWithToken
}
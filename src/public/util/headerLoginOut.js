function renderWithToken(req, res, path) {
  if (req.cookies.token) {
    const jwtDecode = require('jwt-decode');
    let token = jwtDecode(req.cookies.token)
    const { nickname } = token
    console.log(token)

    res.render(`${path}`, {
      nickname: nickname
    })
  } else {
    res.render(`${path}`)
  }
}

module.exports = {
  renderWithToken
}
const renderWithToken = require('../../public/util/headerLoginOut').renderWithToken
exports.main = (req, res, next) => {
  console.log('--------------------- 메인 페이지 ---------------------')
  renderWithToken(req, res, './main/index')
}



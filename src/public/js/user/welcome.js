let welcome = {}
document.addEventListener('DOMContentLoaded',async (e)=> {
  // 요청에대한 코드를 작성해서 결과물을 받아와야합니다.
  const response = await axios.post('http://localhost:4001/api/user/welcome', {
    withCredentials: true,
  })

  // code
  const trElement = document.querySelector('#board_list > #board_row').innerHTML // String .. replace()
  list = {
    ...response
  }
})
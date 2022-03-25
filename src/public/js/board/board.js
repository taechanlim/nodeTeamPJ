const board_Frm = document.querySelector('#board_write_Frm')
board_Frm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  // 이쪽코드가 실행된다!
  const cate_name = document.querySelector('#board_cate_name')
  const subject = document.querySelector('#board_subject')
  const content = document.querySelector('#board_content')

  const body = {
    cate_name:cate_name.value,
    subject:subject.value,
    content:content.value
  }
  console.log(body)
  try {
    const response = await axios.post('http://localhost:4001/api/board/write',body,{
      'Content-type':'application/json',
      withCredentials:true,
    })

    if (response.data.errno !== 0) throw new Error('Error')

    location.href = 'http://localhost:3000/board/list'
  } catch (e) {
    alert('기다려보셈; 해결해드림')
  }
  // response.data 담기는내용.
  // {
  // "result": [
  //         {
  //             "userid": "admin",
  //             "name": "aa",
  //             "nickname": "qweq",
  //             "userlevel": 1
  //         }
  //     ],
  // "errno": 0
  // }
})
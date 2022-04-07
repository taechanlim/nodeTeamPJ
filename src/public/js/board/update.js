// console.log('board/update 확인')
// console.log(location.pathname)
// /board/view/9 ->
async function view(){
  // const [,,,idx] = location.pathname.split('/') // []
  const [,idx] = location.href.split('=') // []
  const intIdx = parseInt(idx)
  const [,nickname] = location.href.split('?')
  
  let inputSubject = document.querySelector('#update_subject')
  const nicknameBox = document.querySelector('#nickname')
  let inputContent = document.querySelector('#update_content')

  const response = await axios.post(`http://localhost:4001/api/board/view?idx=${intIdx}&nickname=${nickname}`,{
    withCredentials:true,
  })

  if ( response.data.errno === 0) {
    const [{subject,nickname,content}] = response.data.result
    console.log(response.data)
    inputContent.value = subject
    nicknameBox.innerHTML = nickname
    inputSubject.value = content
  } else {

  }
}
view()


document.querySelector('#board_update_form').addEventListener('submit',async (e)=>{
  e.preventDefault()
  const subject = document.querySelector('#update_subject').value
  const content = document.querySelector('#update_content').value
  const [,idx] = location.href.split('?')
  const [,index] = idx.split('=')
  const intIdx = parseInt(index)
  console.log(intIdx)


  const body = {
    subject:subject,
    content:content,
    idx:intIdx
  }

  try {
    const response = await axios.post('http://localhost:4001/api/board/update',body,{
      'Content-type':'application/json',
      withCredentials:true,
    })

    if (response.data.errno !== 0) throw new Error('Error')
    console.log(response)
    location.href = `http://localhost:3000/board/view?idx=${intIdx}`
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
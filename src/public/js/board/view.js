console.log(location.pathname)
console.log('board/view 확인')
// /board/view/9 ->
async function view(){
  // const [,,,idx] = location.pathname.split('/') // []
  const [,idx] = location.href.split('=') // []
  const intIdx = parseInt(idx)
  console.log(intIdx)
  const subjectBox = document.querySelector('#subject')
  const nicknameBox = document.querySelector('#nickname')
  const contentBox = document.querySelector('#content')

  const response = await axios.post(`http://localhost:4001/api/board/view?idx=${intIdx}`,{
    withCredentials:true,
  })

  if ( response.data.errno === 0) {
    const [{subject,nickname,content}] = response.data.result
    console.log(response.data)
    subjectBox.innerHTML = subject
    nicknameBox.innerHTML = nickname
    contentBox.innerHTML = content
  } else {

  }
}
view()
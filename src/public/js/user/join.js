console.log('user/join .js')
const join_Frm = document.querySelector('#user_join_frm')
join_Frm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  // 이쪽코드가 실행된다!

  const body = {
    userid:document.querySelector('#userid').value,
    userpw:document.querySelector('#userpw').value,
    profile_img:document.querySelector('#profile_img').value,
    username:document.querySelector('#username').value,
    nickname:document.querySelector('#nickname').value,
    address:document.querySelector('#address').value,
    gender:document.querySelector('input[name="gender"]:checked').value,
    telephone:document.querySelector('#telephone').value,
    phonenumber:document.querySelector('#phonenumber').value,
    email:document.querySelector('#email').value,
    introduce:document.querySelector('#introduce').value,
  }

  console.log('바디임',body)
  try {
    const response = await axios.post('http://localhost:4001/api/user/join',body,{
      'Content-type':'application/json',
      withCredentials:true,
    })
    console.log('리스폰스 데이터: ',response.data)
    if (response.data.errno !== 0) throw new Error('Error')

    location.href = 'http://localhost:3000/'
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
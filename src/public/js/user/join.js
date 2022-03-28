const join_Frm = document.querySelector('#user_join_frm')
join_Frm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  // 이쪽코드가 실행된다!
  const userid = document.querySelector('#userid')
  const userpw = document.querySelector('#userpw')
  const username = document.querySelector('#username')
  const nickname = document.querySelector('#nickname')
  const address = document.querySelector('#address')
  const gender = document.querySelector('input[name="gender"]:checked')
  const telephone = document.querySelector('#telephone')
  const phonenumber = document.querySelector('#phonenumber')
  const email = document.querySelector('#email')
  const introduce = document.querySelector('#introduce')

  const body = {
    userid:userid.value,
    userpw:userpw.value,
    username:username.value,
    nickname:nickname.value,
    address:address.value,
    gender:gender.value,
    telephone:telephone.value,
    phonenumber:phonenumber.value,
    email:email.value,
    introduce:introduce.value
  }

  console.log(body)
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
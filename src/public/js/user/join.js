console.log('user/join .js')
// 회원가입 폼
const join_Frm = document.querySelector('#user_join_frm')
join_Frm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  const { userid, userpw, img, username, nickname, address, gender, telephone, phonenumber, email, introduce } = e.target

  const formData = new FormData()
  formData.append('userid',userid.value)
  formData.append('userpw',userpw.value)
  formData.append('img',img.files[0])
  formData.append('username',username.value)
  formData.append('nickname',nickname.value)
  formData.append('address',address.value)
  formData.append('gender',gender.value)
  formData.append('telephone',telephone.value)
  formData.append('phonenumber',phonenumber.value)
  formData.append('email',email.value)
  formData.append('introduce',introduce.value)

  try {
    const response = await axios.post('http://localhost:4001/api/user/join',formData,{
      'Content-type':'application/json',
      withCredentials:true,
    })
    // console.log('리스폰스 데이터: ',response.data)

    if (response.data.errno !== 0) throw new Error('Error')

    switch(response.data.errno) {
      case 1406:
        alert('성별을 선택해주세요!')
        break;
      case 1062:
        alert('아이디가 중복됩니다')
        break;
    }

    location.href = 'http://localhost:3000/'
  } catch (e) {
    alert('기다려보셈; 해결해드림')
  }

})

// 아이디 중복체크 ( 커서 이동시 )
const input_userid = document.querySelector('#userid')
const input_box = document.querySelector('.box_userid')
const join_id_alert = document.querySelector('#insert_join_id > span')
input_userid.addEventListener('focus',async (e)=>{
  const userid = e.target.value
  if (userid.length > 1) {
    const body = {
      userid: userid
    }

    try {
      const response = await axios.post('http://localhost:4001/api/user/idcheck', body, {
        'Content-type': 'application/json',
        withCredentials: true,
      })
      console.log(response.data)
      idCheck(response.data)
    } catch (e) {
      console.log('! idcheck 오류\n ', e)
    }
  }
})

// 아이디 중복체크 ( 커서 빠질시 )
input_userid.addEventListener('blur',async (e)=>{
  const userid = e.target.value
  if (userid.length > 1) {
    const body = {
      userid:userid
    }

    try {
      const response = await axios.post('http://localhost:4001/api/user/idcheck',body,{
        'Content-type':'application/json',
        withCredentials:true,
      })
      console.log(response.data)
      idCheck(response.data)
    } catch(e) {
      console.log('! idcheck 오류\n ',e)
    }
  }
})

function idCheck(responseData) {
  switch(responseData) {
    case 1:
      input_box.style.background = 'darkorange'
      join_id_alert.innerHTML = '이미 사용 중인 아이디입니다.'
      break;
    // border 빨강색 변하기, 이미 있는 아이디입니다.
    case 2:
      input_box.style.background = 'darkseagreen'
      join_id_alert.innerHTML = '사용 가능한 아이디 입니다.'
      break;
    // border 초록색 변하기, 사용 가능한 아이디입니다.
  }
}
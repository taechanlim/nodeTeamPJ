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

    location.href = 'http://localhost:3000/'
  } catch (e) {
    alert('기다려보셈; 해결해드림')
  }

})

// 아이디 중복체크 버튼
const dupBtn = document.querySelector('#id_checkDuplication')
dupBtn.addEventListener('click',async (e)=>{
  const userid = document.querySelector('#userid').value

  const body = {
    userid:userid
  }

  try {
    const response = await axios.post('http://localhost:4001/api/user/idcheck',body,{
      'Content-type':'application/json',
      withCredentials:true,
    })
    console.log(response.data)

  } catch(e) {
    console.log('! idcheck 오류\n ',e)
  }
})
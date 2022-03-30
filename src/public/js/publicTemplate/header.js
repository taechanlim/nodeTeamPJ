console.log('헤더')
addEventListener('DOMContentLoaded',(e)=>{

})

// 헤더 로그인 폼
const login_Frm = document.querySelector('#login_Frm_main')
login_Frm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  // 이쪽코드가 실행된다!
  const userid = document.querySelector('#login_userid')
  const userpw = document.querySelector('#login_userpw')

  const body = {
    userid:userid.value,
    userpw:userpw.value
  }
  console.log(body)
  try {
    const response = await axios.post('http://localhost:4001/api/user/login',body,{
      'Content-type':'application/json',
      withCredentials:true,
    })

    if (response.data.errno !== 0) throw new Error('Error')

    alert(`
                  아이디 : ${response.data.result[0].userid}
                  닉네임 : ${response.data.result[0].nickname}
              `)

    location.href = 'http://localhost:3000'
  } catch (e) {
    alert('아이디 와 패스워드 확인해주셈.')
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

// 헤더 로그아웃 버튼
const logoutBtn = document.querySelector('#logout')
logoutBtn.addEventListener('click',async (e)=>{

  const body = {
    cookies:document.cookie
  }

  const response = await axios.post('http://localhost:3000/user/api/logout',body,{
    'Content-type':'application/json',
    withCredentials:true,
  })

  console.log(response.data.nickname)
  const nickname = response.data.nickname
  alert(`
    그래! 가버려!!\n ${nickname} 이자식 또만나자!! 
  `)

  let [cookies] = document.cookie.split('=')

  delCookie(cookies)
  location.href = 'http://localhost:3000'
})

// 이름에 해당하는 쿠키 삭제
function delCookie(name) {
  let date = new Date();
  date.setDate(date.getDate() - 100);
  let Cookie = `${name}=;Expires=${date.toUTCString()}`
  document.cookie = Cookie;
}
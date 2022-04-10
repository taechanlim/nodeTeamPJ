console.log('헤더')
addEventListener('DOMContentLoaded',(e)=>{

})
const login_Frm = document.querySelector('#login_Frm_main')
if (login_Frm) {
// 헤더 로그인 폼
  login_Frm.addEventListener('submit', async (e) => {
    e.preventDefault()
    // 이쪽코드가 실행된다!
    const userid = document.querySelector('#login_userid')
    const userpw = document.querySelector('#login_userpw')

    const body = {
      userid: userid.value,
      userpw: userpw.value
    }
    console.log(body)
    try {
      const response = await axios.post('http://localhost:4001/api/user/login', body, {
        'Content-type': 'application/json',
        withCredentials: true,
      })

      if (response.data.errno !== 0) throw new Error('Error')

      alert(`
                  아이디 : ${response.data.result[0].userid}
                  닉네임 : ${response.data.result[0].nickname}
              `)

      location.href = 'http://localhost:3000/user/welcome'
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
} else {
// 헤더 로그아웃 버튼
  const logoutBtn = document.querySelector('#logout')
  logoutBtn.addEventListener('click', async (e) => {

    // let [cookies] = document.cookie
    if (document.cookie.split(';').some((i)=>i.trim().startsWith('access_token='))) {
      console.log('되ㅑ네?')
      location.href = 'http://localhost:3000/kakao/logout'

    } else {
      const response = await axios.post('http://localhost:3000/user/api/logout',{
        'Content-type': 'application/json',
        withCredentials: true,
      })

      const nickname = response.data.nickname
      alert(`
      그래! 가버려!!\n ${nickname} 이자식 또만나자!! 
      `)

      location.href = 'http://localhost:3000'
    }
  })
}

// 이름에 해당하는 쿠키 삭제
//   function delCookie(name) {
//     let date = new Date();
//     date.setDate(date.getDate() - 100);
//     let Cookie = `${name}=;Expires=${date.toUTCString()}`
//     document.cookie = Cookie;
//   }

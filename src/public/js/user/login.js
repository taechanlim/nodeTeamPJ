const login_frm = document.querySelector('#login_Frm_main')
login_frm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  // 이쪽코드가 실행된다!
  const userid = document.querySelector('#login_userid')
  const userpw = document.querySelector('#login_userpw')

  const body = {
    userid:userid.value,
    userpw:userpw.value
  }
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
    location.href = `http://localhost:3000?userid=${userid}`
  } catch (e) {
    alert('아이디 와 패스워드 확인해주셈.')
  }


  // response.data 담기는내용.
  //{
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


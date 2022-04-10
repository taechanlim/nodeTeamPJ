const board_Frm = document.querySelector('#board_write_Frm')
board_Frm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  // 이쪽코드가 실행된다!
  const {subject, content} = e.target

  const body = {
    subject:subject.value,
    content:content.value
  }

  try {
    const response = await axios.post('http://localhost:4001/api/notice/write',body,{
      'Content-type':'application/json',
      withCredentials:true,
    })

    if (response.data.errno !== 0) throw new Error('Error')

    location.href = 'http://localhost:3000/notice/board'
  } catch (e) {
    alert('기다려보셈; 해결해드림')
  }
  
})



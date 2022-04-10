
async function view(){
    const [,idx] = location.href.split('=') // []
    const intIdx = parseInt(idx) 
    const [,nickname] = location.href.split('?')
    const subjectBox = document.querySelector('#subject')
    const nicknameBox = document.querySelector('#nickname')
    const contentBox = document.querySelector('#content')
    const updateBtn = document.querySelector('#update_link')
  
    const response = await axios.post(`http://localhost:4001/api/notice/view?idx=${intIdx}&nickname=${nickname}`,{
      withCredentials:true,
    })
  
    if ( response.data.errno === 0) {
      const [{subject,nickname,content,idx}] = response.data.result
      console.log(response.data)
      subjectBox.innerHTML = subject
      nicknameBox.innerHTML = nickname
      contentBox.innerHTML = content
      updateBtn.href = `/notice/update?idx=${idx}&nickname=${nickname}`
    } else {
  
    }
  }
  view()
  
  document.querySelector('#delete_btn').addEventListener('click', async(e)=>{
  
    const [,idx] = location.href.split('=') // []
    const intIdx = parseInt(idx)
    // console.log(intIdx)
  
    const idx_delete = document.querySelector('#idx_hidden')
    idx_delete.value = intIdx
  
    const body = {
      idx:intIdx
    }
  
    const response = await axios.post(`http://localhost:4001/api/notice/delete`, body,{
      withCredentials:true,
    })
    location.href = `http://localhost:3000/notice/board`
  })
  
  
  
  document.addEventListener('DOMContentLoaded', async (req,res)=>{
    const response = await axios.post('http://localhost:4001/api/notice/board',{
      withCredentials:true,
    })
  })
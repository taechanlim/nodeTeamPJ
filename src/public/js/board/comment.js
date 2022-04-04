document.addEventListener('DOMContentLoaded',async (e)=>{

  const response = await axios.post('http://localhost:4001/api/comment/list', {
    withCredentials:true,
  })

  console.log(response.data)
})

const commentFrm = document.querySelector('#write_comment_board_form')
commentFrm.addEventListener('submit',async (e)=>{
  e.preventDefault()
  const url = new URL(window.location)
  const urlParams = url.searchParams
  const input_comment = document.querySelector('#input_comment').value

  const body = {
    idx:urlParams.get('idx'),
    comment:input_comment
  }

  const response = await axios.post('http://localhost:4001/api/comment/write', body, {
    withCredentials:true,
  })

  console.log(response.data)
})
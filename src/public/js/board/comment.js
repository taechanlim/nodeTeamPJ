document.addEventListener('DOMContentLoaded',async (e)=>{
  const [,idx] = location.href.split('=') // []
  const intIdx = parseInt(idx)
  const body={intIdx}
  const response = await axios.post('http://localhost:4001/api/comment/list',body, {
    withCredentials:true,
  })

  console.log(response.data.result)

  const Nodes =  response.data.result
  const comment_row = document.querySelector('#comment_board')
  const tbody = document.querySelector('#board_view tbody')

  Nodes.forEach(v => {
    const clone = document.importNode(comment_row.content,true)
    const td = clone.querySelectorAll('td')

    td[0].innerHTML = v.nickname
    td[1].innerHTML = v.comment
    td[2].innerHTML = v.recommend
    td[3].innerHTML = v.date

    tbody.appendChild(clone)
  })
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
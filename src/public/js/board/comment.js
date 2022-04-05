document.addEventListener('DOMContentLoaded', abc)

async function abc(e) {
  const url = new URL(window.location)
  const urlParams = url.searchParams

  console.log(parseInt(urlParams.get('idx')))

  const body = {
    intIdx:urlParams.get('idx')
  }

  const response = await axios.post('http://localhost:4001/api/comment/list', body, {
    withCredentials:true,
  })
  // console.log(response.data.result)
  

  let template = ''
  const Nodes =  response.data.result
  const comment_board = document.querySelector('#comment_board')
  const tbody = document.querySelector('#board_view tbody')
  tbody.innerHTML = template

  Nodes.forEach(v => {
    const clone = document.importNode(comment_board.content,true)

    const col = clone.querySelectorAll('td')

    const url = new URL(window.location)
    const urlParams = url.searchParams

    console.log(parseInt(urlParams.get('idx')))


    col[0].innerHTML = v.nickname
    col[1].innerHTML = v.comment
    col[2].innerHTML = v.recommend
    col[3].innerHTML = v.date
    col[4].querySelector('input').value = v.comment_idx

    col[5].addEventListener('click', async (e)=>{
      
      
      console.log(col[4].querySelector('input').value)
      const body = {
        idx:urlParams.get('idx'),
        comment_idx:col[4].querySelector('input').value
      }
      const response = await axios.post('http://localhost:4001/api/comment/delete', body, {
        withCredentials:true,
      })
      await abc()
      // console.log(response.data.result)
    })

    tbody.appendChild(clone)
  })
}

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

  await abc()
})

// window.onload = () => {
//   document.querySelector('.comment_delete_btn').addEventListener('click', (e)=> {
//     // const comment_idx = e.target.parentNode.querySelector('.comment_idx').value
//     // console.log(comment_idx)
//     console.log(e.target)
//   })
// }

// document.querySelector('table').addEventListener('click', (e)=>{
//   const comment_idx = e.target.parentNode.querySelector('.comment_idx')
//   console.log(comment_idx)
//   console.log(e.target)
// })


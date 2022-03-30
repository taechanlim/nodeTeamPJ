console.log('헤더에서 나오는 board')

addEventListener('DOMContentLoaded',async (e)=>{
  const response = await axios.post('http://localhost:4001/api/board/pop',{
    withCredentials:true,
  })
  console.log(response.data.result)

  const Nodes =  response.data.result.slice(5);

  const board_row = document.querySelector('#header_board_row')
  const tbody = document.querySelector('#header_board tbody')
  console.log(board_row.content)
  Nodes.forEach(v => {
    const clone = document.importNode(board_row.content,true)
    const td = clone.querySelectorAll('td')
    const aElement = document.createElement('a')
    aElement.href = '/board/view?idx='+v.idx
    aElement.innerHTML = v.subject

    td[0].innerHTML = v.thumbnail
    td[1].appendChild(aElement)
    td[2].innerHTML = v.content

    tbody.appendChild(clone)
  })
})
console.log('헤더에서 나오는 board')

const inputTag = document.querySelector('#input_tag_search')

addEventListener('DOMContentLoaded',async (e)=>{
  const response = await axios.post('http://localhost:4001/api/board/pop',{
    withCredentials:true,
  })
  boardOutput(response)
})

if (inputTag.value !== undefined) {
  inputTag.addEventListener('keydown', inputBoardHeader)
  inputTag.addEventListener('keyup', inputBoardHeader)
} else {
  let template = ''
  const tbody = document.querySelector('#header_board tbody')
  tbody.innerHTML = template
}

async function inputBoardHeader(e) {
    const key = e.key
    switch(key) {
      case 'Enter':
        location.href = 'http://localhost:3000/board/list'
        break;

      default:
        const inputValue = e.target.value
        // console.log(inputValue)
        const body = {
          input:inputValue
        }
        const response = await axios.post('http://localhost:4001/api/board/search',body,{
          withCredentials:true,
        })
        // console.log('axios 응답: ',response.data.result)

        if (inputValue !== undefined) {
          boardOutput(response)
        }
    }
}

function boardOutput(axiosRes) {
  // const Nodes =  response.data.result.slice(5);
  const Nodes = axiosRes.data.result
  console.log(Nodes)
  let template = ''
  const board_row = document.querySelector('#header_board_row')
  const tbody = document.querySelector('#header_board tbody')
  tbody.innerHTML = template
  console.log(board_row.content)

  Nodes.forEach(v => {
    const clone = document.importNode(board_row.content, true)
    const td = clone.querySelectorAll('td')
    const aElement = document.createElement('a')
    aElement.href = '/board/view?idx=' + v.idx
    aElement.innerHTML = v.subject

    td[0].innerHTML = v.thumbnail
    td[1].appendChild(aElement)
    td[2].innerHTML = v.content

    tbody.appendChild(clone)
  })
}
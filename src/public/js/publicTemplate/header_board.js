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
        console.log(inputValue)
        const body = {
          input:inputValue
        }
        const response = await axios.post('http://localhost:4001/api/board/search',body,{
          withCredentials:true,
        })
        console.log('axios 응답: ',response.data.result)

        if (inputValue !== undefined) {
          boardOutput(response)
        }
    }
}

function writeElapsed(writtenDate) {
  let start = new Date(writtenDate)
  console.log('start : ',writtenDate)
  let end = new Date()
  console.log('end : ',new Date())
  let elapsed = end.getTime() - start.getTime()

  let date = (elapsed/(1000*60*60*24))
  let time = ((elapsed/(1000*60*60))%24)
  let min = ((elapsed/(1000*60))%60)
  let sec = ((elapsed/(1000))%60)

  let $date = parseInt(date)
  let $time = parseInt(time)
  let $min = parseInt(min)
  let $sec = parseInt(sec)

  // console.log($date)
  // console.log($time)
  // console.log($min)
  // console.log($sec)

  let timeMsg = ''
  if (date >= 1) {
    timeMsg = `${$date}일`
    return timeMsg
  } else if (time >= 1 && date < 1) {
    timeMsg = `${$time}시간`
    return timeMsg
  } else if (min >= 1 && time < 1 && date < 1) {
    timeMsg = `${$min}분`
    return timeMsg
  } else if (min < 1 && time < 1 && date < 1) {
    timeMsg = `${$sec}초`
    return timeMsg
  }
}

function boardOutput(axiosRes) {
  // const Nodes =  response.data.result.slice(5);
  const Nodes = axiosRes.data.result
  console.log(Nodes)
  let template = ''
  const board_row = document.querySelector('#header_board_row')
  const tbody = document.querySelector('#header_board')
  tbody.innerHTML = template
  console.log(board_row.content)

  Nodes.forEach(v => {
    const clone = document.importNode(board_row.content, true)
    const span = clone.querySelectorAll('span')
    const aElement = document.createElement('a')
    aElement.href = '/board/view?idx=' + v.idx
    aElement.innerHTML = v.subject

    span[1].appendChild(aElement)
    span[2].innerHTML = v.cate_name
    span[3].innerHTML = writeElapsed(v.date)+' 전'
    span[4].innerHTML = '조회수 '+v.hit+', ❤ '+v.likes

    tbody.appendChild(clone)
  })
}
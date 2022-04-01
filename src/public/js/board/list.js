console.log('보드리스트 확인')

let list = {}
document.addEventListener('DOMContentLoaded',async ()=>{
  // 요청에대한 코드를 작성해서 결과물을 받아와야합니다.
  const response = await axios.post('http://localhost:4001/api/board/list',{
    withCredentials:true,
  })

  // code
  const trElement = document.querySelector('#board_list > #board_row').innerHTML // String .. replace()
  list = {
    ...response
  }
  // const Nodes = response.data.result

  const { total_record } = response.data // 288
  const view_article = 10 // 한 화면에 보일 갯수
  const block_article = 10 // 한 블럭당 보일 갯수

  const total_page = Math.ceil(total_record/view_article) // 29 page
  const total_block = Math.ceil(total_page/block_article) // 3 block

  // total_page 29 1~29개
  // total_block 3묶임
  // current_page = 1 -> 1~10  1block
  // current_page = 5 -> 1~10  1block
  // current_page = 7 -> 1~10  1block
  // current_page = 12 -> 11~20 2block
  // current_page = 21 -> 21~29 3block
  // current_page = 25 -> 21~29 3block

  // page
  let page = 1; // 나의 현 페이지번호를 저장하는 변수
  const current_block = Math.ceil(page/block_article) // 1

  /*
      [1,2,3,4,5,6,7,8,9,10]          1 block
      [11,12,13,14,15,16,17,18,19,20] 2 block
      [21,22,23,24,25,26,27,28,29]    3 block
  */
  const block = ((current_block-1) * block_article )
  /*
      page = 7 current_block = 3
      0 * 10 = 0 + 10 -> 0~9 -> 1~10
      1 * 10 = 10 + 10 -> 10~19 -> 11~20
      2 * 10 = 20 + 10 -> 30
  */
  let end_block = block + block_article
  if (end_block > total_page) end_block = total_page


  const pageing = document.querySelector('#paging > ul')
  // 페이징 만들기
  for(let i=block+1; i<=end_block; i++){
    const liElement = document.createElement('li')
    const aElement = document.createElement('a')
    // aElement.setAttribute('href',`/board/list?page=${i}`)
    aElement.setAttribute('onClick',`pagemove(${i})`)
    aElement.innerHTML = `[${i}]`
    liElement.appendChild(aElement)
    pageing.appendChild(liElement)
  }

  // 게시물 자르기
  const Nodes =  response.data.result.slice((page - 1) * view_article,page * view_article);
  // splice(0,10)
  const board_row = document.querySelector('#board_list > #board_row')
  const tbody = document.querySelector('#board tbody')
  console.log(board_row.content)
  Nodes.forEach(v => {
    const clone = document.importNode(board_row.content,true)
    const td = clone.querySelectorAll('td')
    const aElement = document.createElement('a')
    
    aElement.href = '/board/view?idx='+v.idx+'?'+v.nickname
    aElement.innerHTML = v.subject

    td[0].innerHTML = v.idx
    td[1].appendChild(aElement)
    td[2].innerHTML = v.nickname
    td[3].innerHTML = v.date
    td[4].innerHTML = v.hit

    tbody.appendChild(clone)
  })
  // splice(0,10)
  // let template = ''
  // Nodes.forEach(v=>{
  //     template += trElement.replace('{idx}',v.idx)
  //                    .replace('{subject}',v.subject)
  //                    .replace('{nickname}',v.nickname)
  //                    .replace('{date}',v.date)
  //                    .replace('{hit}',v.hit)
  // })

  // const tbody = document.querySelector('#board tbody')
  // tbody.innerHTML = template;
})

function pagemove(num){
  const trElement = document.querySelector('#board_list > #board_row').innerHTML
  const view_article = 10;
  const Nodes =  list.data.result.slice((num - 1) * view_article,num * view_article);

  let template = ''
  const board_row = document.querySelector('#board_list > #board_row')
  let tbody = document.querySelector('#board tbody')
  tbody.innerHTML = template

  Nodes.forEach(v => {
    const clone = document.importNode(board_row.content,true)
    const td = clone.querySelectorAll('td')
    const aElement = document.createElement('a')
    aElement.href = '/board/view?idx='+v.idx+'?'+v.nickname
    aElement.innerHTML = v.subject

    td[0].innerHTML = v.idx
    td[1].appendChild(aElement)
    td[2].innerHTML = v.nickname
    td[3].innerHTML = v.date
    td[4].innerHTML = v.hit

    tbody.appendChild(clone)
  })

  // const tbody = document.querySelector('#board tbody')
  // tbody.innerHTML = template;
}
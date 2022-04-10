console.log('보드리스트 확인')



let list = {}
document.addEventListener('DOMContentLoaded',async (e)=>{
  
  const response = await axios.post('http://localhost:4001/api/notice/board',{
    withCredentials:true,
  })
  // console.log(response.data.result2)


  // code
  const trElement = document.querySelector('#board_list > #board_row').innerHTML // String .. replace()
  list = {
    ...response
  }
  

  const { total_record } = response.data // 288
  const view_article = 10 // 한 화면에 보일 갯수
  const block_article = 10 // 한 블럭당 보일 갯수

  const total_page = Math.ceil(total_record/view_article) // 29 page
  const total_block = Math.ceil(total_page/block_article) // 3 block



  // page
  let page = 1; // 나의 현 페이지번호를 저장하는 변수
  const current_block = Math.ceil(page/block_article) // 1

  
  const block = ((current_block-1) * block_article )
  
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
  // console.log(board_row.content)
  Nodes.forEach(v => {
    const clone = document.importNode(board_row.content,true)
    const td = clone.querySelectorAll('td')
    const aElement = document.createElement('a')

    aElement.href = '/notice/view?idx='+v.idx+'&'+'nickname='+v.nickname
    // console.log(v.nickname)
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
    aElement.href = '/notice/view?idx='+v.idx+'&'+'nickname='+v.nickname
    aElement.innerHTML = v.subject

    td[0].innerHTML = v.idx
    td[1].appendChild(aElement)
    td[2].innerHTML = v.nickname
    td[3].innerHTML = v.date
    td[4].innerHTML = v.hit
    

    tbody.appendChild(clone)
  })

}
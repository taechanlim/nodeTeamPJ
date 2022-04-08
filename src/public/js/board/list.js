console.log('보드리스트 확인')
const showValue = (target) => {
  const t = target.value
  location = `http://localhost:3000/board/list?${t}`
}


let list = {}
document.addEventListener('DOMContentLoaded',async (e)=>{

  const rank1 = document.querySelector('#ranking1')
  const rank2 = document.querySelector('#ranking2')
  const rank3 = document.querySelector('#ranking3')
  const rank4 = document.querySelector('#ranking4')
  const rank5 = document.querySelector('#ranking5')


  const response_rank = await axios.post('http://localhost:4001/api/board/list_ranking',{
    withCredentials:true,
  })
  const userrank = response_rank.data.result
  console.log('나다',userrank[1].point)
  rank1.innerHTML = '1위 :'+ userrank[0].nickname + ' ,포인트 :'+ userrank[0].point
  rank2.innerHTML = '2위 :'+ userrank[1].nickname + ' ,포인트 :'+ userrank[1].point
  rank3.innerHTML = '3위 :'+ userrank[2].nickname + ' ,포인트 :'+userrank[2].point
  rank4.innerHTML = '4위 :'+ userrank[3].nickname + ' ,포인트 :'+userrank[3].point
  rank5.innerHTML = '5위 :'+ userrank[4].nickname + ' ,포인트 :'+userrank[4].point
  // 요청에대한 코드를 작성해서 결과물을 받아와야합니다.
  const cate_name = document.querySelector('#board_cate_name')
  const category = location.href.split('?')[1]
  const body = {
    cate_name:decodeURIComponent(category)
  }
  const response = await axios.post('http://localhost:4001/api/board/list',body,{
    withCredentials:true,
  })
  // console.log(response.data.result2)

  const cate_select = document.querySelector('#board_cate_name')
  console.log(cate_select)
  cate_select.addEventListener('click',async ()=>{
  const response = await axios.post('http://localhost:4001/api/board/category',{
      'Content-type':'application/json',
      withCredentials:true,
    })
    // console.log(response.data.result)
    const optgroup = cate_select.querySelector('optgroup')
    const opt = cate_select.querySelectorAll('optgroup>option')
    const optlist = response.data.result
    
    for(let i=0; i<optlist.length;i++){
      opt[i+1].innerHTML = optlist[i].cate_name
    }
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
  // console.log(board_row.content)
  Nodes.forEach(v => {
    const clone = document.importNode(board_row.content,true)
    const td = clone.querySelectorAll('td')
    const aElement = document.createElement('a')

    aElement.href = '/board/view?idx='+v.idx+'&'+'nickname='+v.nickname
    // console.log(v.nickname)
    aElement.innerHTML = v.subject

    td[0].innerHTML = v.idx
    td[1].appendChild(aElement)
    td[2].innerHTML = v.nickname
    td[3].innerHTML = v.date
    td[4].innerHTML = v.hit
    td[5].innerHTML = v.likes

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
    aElement.href = '/board/view?idx='+v.idx+'&'+'nickname='+v.nickname
    aElement.innerHTML = v.subject

    td[0].innerHTML = v.idx
    td[1].appendChild(aElement)
    td[2].innerHTML = v.nickname
    td[3].innerHTML = v.date
    td[4].innerHTML = v.hit
    td[5].innerHTML = v.likes

    tbody.appendChild(clone)
  })

  // const tbody = document.querySelector('#board tbody')
  // tbody.innerHTML = template;
}
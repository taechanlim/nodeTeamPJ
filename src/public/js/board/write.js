const board_Frm = document.querySelector('#board_write_Frm')
board_Frm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  // 이쪽코드가 실행된다!
  const { category, subject, content} = e.target

  console.log(e.target.category.value)
  const body = {
    main_category:category.value,
    subject:subject.value,
    content:content.value
  }

  try {
    const response = await axios.post('http://localhost:4001/api/board/write',body,{
      'Content-type':'application/json',
      withCredentials:true,
    })

    if (response.data.errno !== 0) throw new Error('Error')

    location.href = 'http://localhost:3000/board/list'
  } catch (e) {
    alert('기다려보셈; 해결해드림')
  }
  // response.data 담기는내용.
  // {
  // "result": [
  //         {
  //             "userid": "admin",
  //             "name": "aa",
  //             "nickname": "qweq",
  //             "userlevel": 1
  //         }
  //     ],
  // "errno": 0
  // }
})
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
      
      opt[i].innerHTML = optlist[i].cate_name
    }
})
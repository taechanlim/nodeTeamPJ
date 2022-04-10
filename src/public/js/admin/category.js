
// let list = {}

document.addEventListener('DOMContentLoaded',async (e)=>{
    const cate_list = document.querySelectorAll('#cate_list')
    console.log(cate_list)
  const response = await axios.post('http://localhost:4001/api/admin/MainList',{
    withCredentials:true,
    })
    const data = response.data.result
    // console.log(data[0].cate_name)
    
        cate_list[0].innerHTML = data[0].cate_name
        cate_list[1].innerHTML = data[1].cate_name
        cate_list[2].innerHTML = data[2].cate_name
        cate_list[3].innerHTML = data[3].cate_name
        cate_list[4].innerHTML = data[4].cate_name
        cate_list[5].innerHTML = data[5].cate_name
        cate_list[6].innerHTML = data[6].cate_name
})
const category_plus_frm = document.querySelector('#category_plus_form')
category_plus_frm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const plus_input = category_plus_frm.querySelector('#plus_input')
    const cate_name = plus_input.value
    const body = {
        cate_name:cate_name
    }
    const response = await axios.post('http://localhost:4001/api/admin/MainPlus',body,{
      'Content-type':'application/json',
      withCredentials:true,
    })
})
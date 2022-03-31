console.log('test JS')

addEventListener('DOMContentLoaded',async (e)=>{

  // const key = e.key
  // const Value = query.imgId
  // console.log(Value)
  
  const nickname = '관리'
  const body = {
    nickname:nickname
  }
  const response = await axios.post('http://localhost:4001/api/user/profileimg',body,{
    withCredentials:true,
  })
  console.log('axios 응답: ',response.data.result)

})
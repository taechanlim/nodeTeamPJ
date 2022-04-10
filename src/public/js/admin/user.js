document.addEventListener('DOMContentLoaded', user)
async function user(e){
    const user_list = document.querySelectorAll('#user_list')
    console.log(user_list);


    const response = await axios.post('http://localhost:4001/api/user/mypageuser',{
    withCredentials:true,
    })
    const data = response.data.result;
    console.log('data')
}

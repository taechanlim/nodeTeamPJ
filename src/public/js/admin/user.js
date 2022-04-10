document.addEventListener('DOMContentLoaded', user)
async function user(e){
    const user_list = document.querySelectorAll('#nickname')
    console.log(nickname);


    const response = await axios.post('http://localhost:4001/api/admin/userinfo',{
    withCredentials:true,
    })
    const data = response.data.result;
    console.log('data')
}

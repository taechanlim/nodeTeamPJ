const header_input_search = document.querySelector('#input_tag_search')
const frmSearch = document.querySelector('#tag_search')
const content = document.querySelector('#content')
const fbWrap = document.querySelector('#free_board_wrap')
const fbWrap_margin = window.getComputedStyle(document.querySelector('#free_board_wrap')).marginTop
const fbWrap_height = window.getComputedStyle(document.querySelector('#free_board_wrap')).height
const closeBtn = document.querySelector('.close_board')
const header = document.querySelector('#header_wrap')
const header_height = window.getComputedStyle(document.querySelector('#header_wrap')).height
const header_paddingTop = window.getComputedStyle(document.querySelector('#header_wrap')).paddingTop
const root_header_height = (px) => {
  document.documentElement.style.setProperty('--header-height',`${px}px`)
}

// #content의 paddingTop 조절
const content_paddingTop = (px) => {
  console.log(px)
  document.documentElement.style.setProperty('--main-toppadding',`${px}px`)
  // console.log(`#content 윗 padding '${px}' 만큼 조절`)
}

document.addEventListener('DOMContentLoaded',(e)=>{
  const px = floatPx(fbWrap_height)+floatPx(header_height)
  document.documentElement.style.setProperty('--free-board-transY',`-${px}px`)
})

header_input_search.addEventListener('click',(e) => {
  fbWrap.style.opacity = '1'
  fbWrap.style.visibility = 'visible'
  const px = floatPx(header_paddingTop)
  document.documentElement.style.setProperty('--free-board-transY',`-${px}px`)
  content_paddingTop(floatPx(header_height)+floatPx(fbWrap_margin)+floatPx(fbWrap_height))
})

frmSearch.addEventListener('submit',(e) => {
  e.preventDefault()
})

// 닫기버튼 누를시 태그검색에 내용이 들어가 있어도 강제로 닫음
closeBtn.addEventListener('click',(e) => {
  if (header_input_search.style.opacity !== '0') {
    fbWrap.style.opacity = '0'
    fbWrap.style.visibility = 'hidden'
    const px = floatPx(fbWrap_height)+floatPx(header_height)-floatPx(header_paddingTop)
    document.documentElement.style.setProperty('--free-board-transY',`-${px}px`)
    content_paddingTop(floatPx(header_height)+floatPx(fbWrap_margin))
  }
})

// 태그검색에 내용이 하나라도 적히면 board 보임


// 태그검색에 내용이 비워져있을때 다른 곳을 클릭하면 위로 올라감
// content.addEventListener('click',(e) => {
//   if (header_input_search.value === '' && fbWrap.style.opacity !== '0') {
//     fbWrap.style.opacity = '0'
//     fbWrap.style.visibility = 'hidden'
//     fbWrap.style.transform =`translateY( 0px )`
//     content.style.transform =`translateY( 0px )`
//   }
// })

// document.addEventListener('',(e)=>{
//   // document.querySelector('#header_wrap')
//   console.log('hihihi')
//   const header_height = window.getComputedStyle(document.querySelector('#header_wrap')).height
//   console.log(header_height)
//   document.documentElement.style.setProperty('--main-toppadding',`${header_height}`)
// })

function floatPx(px) {
  const [v] = px.split('px',1)
  let intV = parseFloat(v)

  return intV
}

// main.js 참조시 기본실행
const init = () => {
  content_paddingTop(floatPx(header_height))
  root_header_height(floatPx(header_height))
}
init()


let socket; // 소켓
// 웹소켓 연결
function connectWS() {
  if(socket != undefined){
    socket.close();
  }
  socket = new WebSocket("wss://api.upbit.com/websocket/v1");
  socket.binaryType = 'arraybuffer';
  socket.onopen   = function(e){
    filterRequest('[{"ticket":"UNIQUE_TICKET"},{"type":"ticker","codes":["KRW-BTC"]},{"type":"orderbook","codes":["KRW-BTC"]},{"type":"trade","codes":["KRW-BTC"]}]'); }
    //filterRequest -> 데이터 필드값(현재가,거래가,종가,호가 등등)
  socket.onclose  = function(e){
    socket = undefined;
  }
  socket.onmessage= function(e){
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(e.data);
    let str_d = enc.decode(arr);
    let d = JSON.parse(str_d);
    // console.log(d) //->filterRequest에서 거른 데이터들이 d라는 변수에 들어가있는데 객체형태이므로 뽑아서 사용
    if(d.type == "ticker") { // 현재가 데이터
    // TODO
    }
    if(d.type == "orderbook") { // 호가 데이터
    // TODO
    }
    if(d.type == "trade") { // 체결 데이터
    // TODO
    }
  }
}
// 웹소켓 연결 해제
function closeWS() {
  if(socket != undefined){
    socket.close();
    socket = undefined;
  }
}
// 웹소켓 요청
function filterRequest(filter) {
  if(socket == undefined){
    alert('no connect exists');
    return;
  }
  socket.send(filter);
}
connectWS();


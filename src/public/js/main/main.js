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
  document.documentElement.style.setProperty('--main-toppadding',`${px+20}px`)
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

function insertTable(cate,price,change,rate) {
  document.querySelector(`#${cate} > .price > span`).innerHTML = price
  document.querySelector(`#${cate} > .change_price > span`).innerHTML = change
  document.querySelector(`#${cate} > .change_price`).style.paddingLeft = '14px'
  document.querySelector(`#${cate} > .percent > span`).innerHTML = '%'
  if ( rate > 0) {
    const plusRate = rate
    document.querySelector(`#${cate} > .plusMinus > span`).innerHTML = '+'
    document.querySelector(`#${cate} > .rate > span`).innerHTML = plusRate
    document.querySelector(`#${cate} > .price`).style.color = '#c84a31'
    document.querySelector(`#${cate} > .change_price`).style.background = 'url(https://cdn.upbit.com/images/ico_up.dd56022.png) 0 no-repeat'
    document.querySelector(`#${cate} > .change_price`).style.color = '#c84a31'
    document.querySelector(`#${cate} > .plusMinus`).style.color = '#c84a31'
    document.querySelector(`#${cate} > .rate`).style.color = '#c84a31'
    document.querySelector(`#${cate} > .percent`).style.color = '#c84a31'
  } else if (rate < 0) {
    const minusRate = rate * -1
    document.querySelector(`#${cate} > .plusMinus > span`).innerHTML = '-'
    document.querySelector(`#${cate} > .rate > span`).innerHTML = minusRate
    document.querySelector(`#${cate} > .price`).style.color = '#1261c4'
    document.querySelector(`#${cate} > .change_price`).style.background = 'url(https://cdn.upbit.com/images/ico_down.3beaa54.png) 0 no-repeat'
    document.querySelector(`#${cate} > .change_price`).style.color = '#1261c4'
    document.querySelector(`#${cate} > .plusMinus`).style.color = '#1261c4'
    document.querySelector(`#${cate} > .rate`).style.color = '#1261c4'
    document.querySelector(`#${cate} > .percent`).style.color = '#1261c4'
  }
}

let socket; // 소켓
// 웹소켓 연결
function connectWS() {
  if(socket != undefined){
    socket.close();
  }
  socket = new WebSocket("wss://api.upbit.com/websocket/v1");
  socket.binaryType = 'arraybuffer';
  socket.onopen   = function(e){
    filterRequest(`[
                          {"ticket":"UNIQUE_TICKET"},
                          {"type":"ticker","codes":["KRW-BTC"]},
                          {"type":"ticker","codes":["KRW-XRP"]},
                          {"type":"ticker","codes":["KRW-ADA"]},
                          {"type":"ticker","codes":["KRW-AQT"]},
                          {"type":"ticker","codes":["KRW-ETH"]},
                          {"type":"ticker","codes":["KRW-SOL"]},
                          {"type":"ticker","codes":["KRW-KNC"]},
                          {"type":"orderbook","codes":["KRW-BTC"]},
                          {"type":"trade","codes":["KRW-BTC"]}
                        ]`
    );
  }
    //filterRequest -> 데이터 필드값(현재가,거래가,종가,호가 등등)
  socket.onclose  = function(e){
    socket = undefined;
  }
  socket.onmessage= function(e){
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(e.data);
    let str_d = enc.decode(arr);
    let responseData = JSON.parse(str_d);
    //console.log(responseData) //->filterRequest에서 거른 데이터들이 d라는 변수에 들어가있는데 객체형태이므로 뽑아서 사용
    if(responseData.type === "ticker") { // 현재가 데이터
      switch (responseData.code) {
        case "KRW-BTC" :
          insertTable('btc',
            responseData.trade_price.toLocaleString()
            ,responseData.signed_change_price.toLocaleString(),
            (responseData.signed_change_rate * 100).toFixed(2)
          )
          break;
        case "KRW-XRP" :
          insertTable('xrp'
            ,responseData.trade_price.toLocaleString(),
            responseData.signed_change_price.toLocaleString(),
            (responseData.signed_change_rate * 100).toFixed(2)
          )
          break;
        case "KRW-ADA" :
          insertTable('ada',
            responseData.trade_price.toLocaleString(),
            responseData.signed_change_price.toLocaleString(),
            (responseData.signed_change_rate * 100).toFixed(2)
          )
          break;
        case "KRW-AQT" :
          insertTable('aqt',
            responseData.trade_price.toLocaleString(),
            responseData.signed_change_price.toLocaleString(),
            (responseData.signed_change_rate * 100).toFixed(2)
          )
          break;
        case "KRW-ETH" :
          insertTable('eth',
            responseData.trade_price.toLocaleString(),
            responseData.signed_change_price.toLocaleString(),
            (responseData.signed_change_rate * 100).toFixed(2)
          )
          break;
        case "KRW-SOL" :
          insertTable('sol',
            responseData.trade_price.toLocaleString(),
            responseData.signed_change_price.toLocaleString(),
            (responseData.signed_change_rate * 100).toFixed(2)
          )
          break;
        case "KRW-KNC" :
          insertTable('knc',
            responseData.trade_price.toLocaleString(),
            responseData.signed_change_price.toLocaleString(),
            (responseData.signed_change_rate * 100).toFixed(2)
          )
          break;
      }
    }
    // if(d.type == "orderbook") { // 호가 데이터
    // // TODO
    // }
    // if(d.type == "trade") { // 체결 데이터

    // }
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


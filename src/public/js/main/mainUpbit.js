function popUpFullChart(cate,price) {
  document.querySelector(`#${cate} > .cate > span`).addEventListener('click',(e)=>{
    window.open(`https://upbit.com/full_chart?code=CRIX.UPBIT.KRW-${cate}`,``,
      'width=600, height=600, loaction=no, status=no, scrollbars=yes'
    )
  })
}

function insertTable(cate,price,change,rate) {
  document.querySelector(`#${cate} > .price > span`).innerHTML = price
  document.querySelector(`#${cate} > .change_price > span`).innerHTML = change
  document.querySelector(`#${cate} > .change_price`).style.paddingLeft = '14px'
  document.querySelector(`#${cate} > .percent > span`).innerHTML = '%'
  if ( rate > 0) {``
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
    // console.log(responseData) //->filterRequest에서 거른 데이터들이 d라는 변수에 들어가있는데 객체형태이므로 뽑아서 사용
    let coin = ''
    if(responseData.type === "ticker") { // 현재가 데이터
      let price = responseData.trade_price.toLocaleString()
      let changePrice = responseData.signed_change_price.toLocaleString()
      let changeRate = (responseData.signed_change_rate * 100).toFixed(2)
      switch (responseData.code) {
        case "KRW-BTC" :
          coin = 'BTC'
          insertTable(coin,
            price,
            changePrice,
            changeRate
          )
          popUpFullChart(coin,price)
          break;
        case "KRW-XRP" :
          coin = 'XRP'
          insertTable(coin,
            price,
            changePrice,
            changeRate
          )
          popUpFullChart(coin,price)
          break;
        case "KRW-ADA" :
          coin = 'ADA'
          insertTable(coin,
            price,
            changePrice,
            changeRate
          )
          popUpFullChart(coin,price)
          break;
        case "KRW-AQT" :
          coin = 'AQT'
          insertTable(coin,
            price,
            changePrice,
            changeRate
          )
          popUpFullChart(coin,price)
          break;
        case "KRW-ETH" :
          coin = 'ETH'
          insertTable(coin,
            price,
            changePrice,
            changeRate
          )
          popUpFullChart(coin,price)
          break;
        case "KRW-SOL" :
          coin = 'SOL'
          insertTable(coin,
            price,
            changePrice,
            changeRate
          )
          popUpFullChart(coin,price)
          break;
        case "KRW-KNC" :
          coin = 'KNC'
          insertTable(coin,
            responseData.trade_price.toLocaleString(),
            responseData.signed_change_price.toLocaleString(),
            (responseData.signed_change_rate * 100).toFixed(2)
          )
          popUpFullChart(coin,price)
          break;
      }
    }
    // if(d.type == "orderbook") { // 호가 데이터
    //
    // }
    // if(d.type == "trade") { // 체결 데이터
    //
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
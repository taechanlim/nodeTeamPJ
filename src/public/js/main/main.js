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

// 메인 접속시 헤더-보더 위로 이동
document.addEventListener('DOMContentLoaded',(e)=>{
  const px = floatPx(fbWrap_height)+floatPx(header_height)
  document.documentElement.style.setProperty('--free-board-transY',`-${px}px`)
})

// #content의 paddingTop 조절
const content_marginTop = (px) => {
  console.log(px)
  document.documentElement.style.setProperty('--main-topmargin',`${px+20}px`)
  // console.log(`#content 윗 padding '${px}' 만큼 조절`)
}

header_input_search.addEventListener('click',(e) => {
  fbWrap.style.opacity = '1'
  fbWrap.style.visibility = 'visible'
  closeBtn.style.opacity = '1'
  const px = floatPx(header_paddingTop)
  document.documentElement.style.setProperty('--free-board-transY',`-${px}px`)
  content_marginTop(floatPx(header_height)+floatPx(fbWrap_margin)+floatPx(fbWrap_height))
})

frmSearch.addEventListener('submit',(e) => {
  e.preventDefault()
  closeBtn.style.opacity = '1'
})

// 닫기버튼 누를시 태그검색에 내용이 들어가 있어도 강제로 닫음
closeBtn.addEventListener('click',(e) => {
  if (header_input_search.style.opacity !== '0') {
    fbWrap.style.opacity = '0'
    fbWrap.style.visibility = 'hidden'
    closeBtn.style.opacity = '0'
    const px = floatPx(fbWrap_height)+floatPx(header_height)-floatPx(header_paddingTop)
    document.documentElement.style.setProperty('--free-board-transY',`-${px}px`)
    content_marginTop(floatPx(header_height)+floatPx(fbWrap_margin))
  }
})

function floatPx(px) {
  const [v] = px.split('px',1)
  let intV = parseFloat(v)

  return intV
}

// main.js 참조시 기본실행
const init = () => {
  content_marginTop(floatPx(header_height))
  root_header_height(floatPx(header_height))
}
init()
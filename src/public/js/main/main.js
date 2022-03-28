  const inputTagSearch = document.querySelector('#input_tag_search')
  const frmSearch = document.querySelector('#tag_search')
  const content = document.querySelector('#content')
  const fbWrap = document.querySelector('#free_board_wrap')
  const fbWrap_height = window.getComputedStyle(document.querySelector('#free_board_wrap')).height
  const closeBtn = document.querySelector('.close_board')
  const header = document.querySelector('#header_wrap')
  const header_height = window.getComputedStyle(document.querySelector('#header_wrap')).height

  // #content의 paddingTop 조절
  const content_paddingTop = (px) => {
    document.documentElement.style.setProperty('--main-toppadding',`${px}`)
    // console.log(`#content 윗 padding '${px}' 만큼 조절`)
  }

  frmSearch.addEventListener('submit',(e)=>{
    e.preventDefault()
    inputTagSearch.addEventListener('keyup',(e) => {
      if (e.keyCode === 13  ) {
        fbWrap.style.opacity = '1'
        fbWrap.style.visibility = 'visible'
        fbWrap.style.transform = `translateY( 0px )`
        document.documentElement.style.setProperty('--main-toppadding','var(--free-board-height)')
        fbWrap.style.paddingTop = `${header.height}px`
      }
    })
    // code
  })

  // 닫기버튼 누를시 태그검색에 내용이 들어가 있어도 강제로 닫음
  closeBtn.addEventListener('click',(e) => {
    if (inputTagSearch.style.opacity !== '0') {
      fbWrap.style.opacity = '0'
      fbWrap.style.visibility = 'hidden'
      fbWrap.style.transform =`translateY( -200px )`
      content_paddingTop(header_height)
    }
  })

  // 태그검색에 내용이 하나라도 적히면 board 보임


  // 태그검색에 내용이 비워져있을때 다른 곳을 클릭하면 위로 올라감
  // content.addEventListener('click',(e) => {
  //   if (inputTagSearch.value === '' && fbWrap.style.opacity !== '0') {
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

  // main.js 참조시 기본실행
  const init = () => {
    content_paddingTop(header_height)
  }
  init()

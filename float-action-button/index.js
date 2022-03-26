const fab = document.querySelector('.fab')
const wrapper = document.querySelector('.wrapper')
const largeButton = document.querySelector('.btn-large')

largeButton.addEventListener('click', () => {
  fab.classList.toggle('active')
})
// allow drop
document.body.addEventListener('dragover', (ev) => {
  ev.preventDefault()
})

let start = { x: 0, y: 0 }
largeButton.addEventListener('dragstart', (ev) => {
  start.x = ev.clientX
  start.y = ev.clientY
  // here we reset the transition of fab
  fab.style.transition = 'auto'
})

largeButton.addEventListener('dragend', (ev) => {
  fab.style.left = parseInt(getComputedStyle(fab).left) + ev.clientX - start.x;
  fab.style.top = parseInt(getComputedStyle(fab).top) + ev.clientY - start.y;
  // try to find a proper position for fab
  // cosidering it should attach to side, so we need to find which side it is closer to: left or right?
  if (ev.clientX > document.body.clientWidth / 2) {
    // right
    // set up the direction of the fab
    wrapper.style.flexDirection = "row-reverse"
    wrapper.style.right = 0
    wrapper.style.left = 'auto'
    fab.style.transition = 'left 0.5s'
    fab.style.left = document.body.clientWidth - 70
  } else {
    wrapper.style.flexDirection = "row"
    wrapper.style.left = 0
    wrapper.style.right = 'auto'
    fab.style.transition = 'left 0.5s'
    fab.style.right = 'auto'
    fab.style.left = 0
  }
})

document.querySelectorAll('ul li a img').forEach((a) => {
  a.addEventListener('click', (ev) => {
    if (fab.classList.contains('active')) {
      alert(ev.target.getAttribute('src'))
    }
  })
})
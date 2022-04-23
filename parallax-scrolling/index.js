var splash = document.querySelector(".splash")
var imgBg = document.querySelector(".bg")
var imgMoon = document.querySelector(".moon")
var imgMountain = document.querySelector(".mountain")
var imgRoad = document.querySelector(".road")
var title = document.querySelector(".title")

window.addEventListener("load", () => {
  splash.style.height = document.body.clientWidth * 0.56
})

window.addEventListener("resize", () => {
  splash.style.height = document.body.clientWidth * 0.56
})

window.addEventListener("scroll", () => {
  var offset = window.scrollY
  imgBg.style.top = offset * 0.1
  imgMoon.style.top = offset * 0.2
  imgMoon.style.left = -offset * 0.2
  imgMountain.style.top = offset * 0.3
  imgRoad.style.top = offset * 0.1
  title.style.top = offset * 0.8
})
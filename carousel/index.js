var imgBannerContainer = document.querySelector(".banner-container");
var imgBox = document.querySelector('ul.img-box');
var lisForImgs = document.querySelectorAll('ul.img-box li');
var imgs = document.querySelectorAll('img');
var selBox = document.querySelector('ul.sel-box');
var selDots = selBox.querySelectorAll('li');
var btnLeft = document.querySelector('.btn-left');
var btnRight = document.querySelector('.btn-right');

var classForSelectedDot = 'cur';

// index for currently shown img
// from 0(the felt first) to `numOfImgsFelt -1` (the felt last one)
// actually index could be -1 and numOfImgsFelt, but the picture 
// corresponding to these numbers will be replaced INSTANTLY by the same
// picture but corresponding to other numbers, after the previous animation 
// is done.
var index = 0;

// the number of imgs
var numOfImgsFelt = imgs.length - 2;

var timer = null;
var timerForInstantAdjustment = null;
var switchIntervalMs = 3000;
var switchAnimationDurationMs = 1000;
var instantAdjustmentIntervalMs = 1000;

// default to rotate the carousel from left to right
var defaultCarouselAction = switchToRight;


function init(){
    // set up the selecting dots
    selDots[0].classList.add(classForSelectedDot);

    // set up the width for imgBox
    imgBox.style.width = 100*imgs.length+'%';

    // set up the transform(translation) of imgBox
    imgBox.style.transform = 'translate(' + -100/imgs.length +'%, 0px)';

    // set up the width for each image
    lisForImgs.forEach((e)=>e.style.width = imgBannerContainer.offsetWidth + 'px');

    // start the timer
    timer = setInterval(defaultCarouselAction, switchIntervalMs);
}

function switchImgByIndex(){
    imgBox.style.left = -index*imgBannerContainer.offsetWidth +"px";
    selDots.forEach((e)=>e.className='');
    selDots[index].classList.add(classForSelectedDot);
}

function switchToRight() {
    // to the next img
    index++;
    // if this is the last img
    if (index >= numOfImgsFelt) {
        // for preventing multiple clicking in a while
        index = numOfImgsFelt;

        // `transition` works on the `left` attribute
        imgBox.style.transition = 'left ' + switchAnimationDurationMs/1000+ 's ease';
        imgBox.style.left = -index * imgBannerContainer.offsetWidth + 'px';
        selDots.forEach((e)=>e.className = '');
        selDots[0].classList.add(classForSelectedDot);
    
        // switch the image to the begining of the imgBox
        // here the transition animation is removed, because
        // it should pretend that nothing happens for the user
        timerForInstantAdjustment = setTimeout(function() {
            index = 0;
            imgBox.style.transition = '';
            switchImgByIndex();
        }, instantAdjustmentIntervalMs);
    } else {
        imgBox.style.transition = 'left 1s ease';
        switchImgByIndex();
    }
}

function switchToLeft() {
    // to the next img
    index--;
    // if this is the first img
    if (index <= -1) {
        // for preventing multiple clicking in a while
        index = -1;

        // `transition` works on the `left` attribute
        imgBox.style.transition = 'left ' + switchAnimationDurationMs/1000+ 's ease';
        imgBox.style.left = -index * imgBannerContainer.offsetWidth + 'px';
        selDots.forEach((e)=>e.className = '');
        selDots[numOfImgsFelt-1].classList.add(classForSelectedDot);
    
        // switch the image to the end of the imgBox
        // here the transition animation is removed, because
        // it should pretend that nothing happens for the user
        timerForInstantAdjustment = setTimeout(function() {
            index = numOfImgsFelt-1;
            imgBox.style.transition = '';
            switchImgByIndex();
        }, instantAdjustmentIntervalMs);
    } else {
        imgBox.style.transition = 'left 1s ease';
        switchImgByIndex();
    }
}

btnLeft.addEventListener('click', function() {
    if(index === -1){
        clearTimeout(timerForInstantAdjustment);
        index = numOfImgsFelt-1;
        imgBox.style.transition = '';
        switchImgByIndex();

        // this line of code is for avoiding set up `imgBox.style.transition` instantly
        // in `switchToRight`
        window.requestIdleCallback(switchToLeft);
    }else{
        switchToLeft();
    }
})


btnRight.addEventListener('click', function() {
    // When clicking the right arrow button for switching 
    // from last one to the first one, and instantly clicking again for switching to the second one,
    // then timeout occurs, it automatically switches back to the first
    // one, which may make the UI weired.
    // So, we solve this with the following code block:
    if(index === numOfImgsFelt){
        clearTimeout(timerForInstantAdjustment);
        index = 0;
        imgBox.style.transition = '';
        switchImgByIndex();

        // this line of code is for avoiding set up `imgBox.style.transition` instantly
        // in `switchToRight`
        window.requestIdleCallback(switchToRight);
    }else{
        switchToRight();
    }
})

// update the width for each li of images when resizing the window
window.addEventListener('resize', ()=>lisForImgs.forEach((e)=>e.style.width = imgBannerContainer.offsetWidth + 'px'));

imgBox.addEventListener('mouseover', function() {
    clearInterval(timer)
})

btnRight.addEventListener('mouseover', function() {
    clearInterval(timer)
})

btnLeft.addEventListener('mouseover', function() {
    clearInterval(timer)
})

imgBox.addEventListener('mouseout', function() {
    timer = setInterval(defaultCarouselAction, switchIntervalMs)
})

btnLeft.addEventListener('mouseout', function() {
    timer = setInterval(defaultCarouselAction, switchIntervalMs)
})

btnRight.addEventListener('mouseout', function() {
    timer = setInterval(defaultCarouselAction, switchIntervalMs)
})

init();

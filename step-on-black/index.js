function creatediv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}

function $(id) {
    return document.getElementById(id);
}

function creatcell() {
    var temp = ['cell', 'cell', 'cell', 'cell',];
    var i = Math.floor(Math.random() * 4);//随机生成黑块的位置
    temp[i] = 'cell black';
    return temp;
}

var con = $('con');
var btn = $('btn-start');
var scoreElement = document.querySelector("div[id='score'] > span");
var score = 0;
var clock = 0;
var speed = 10;

function updateScore(newScore){
    score = newScore;
    scoreElement.innerHTML = newScore;
}

function createrow() {
    var row = creatediv('row');
    var arr = creatcell();

    // create the four blocks in one row
    for (var i = 0; i < 4; i++) {
        var blk = creatediv(arr[i]);
        if(arr[i].indexOf("black")>0){
            blk.addEventListener("click", judge);
        }
        row.appendChild(blk);
    }

    if (con.firstChild == null) {
        con.appendChild(row);
    } else {
        con.insertBefore(row, con.firstChild);
    }
}

function init(){
    updateScore(0);
    // clear all existing blocks
    var rows = document.querySelectorAll("div.row");
    rows.forEach(e => {
        e.remove();
    });

    // hide the start button
    btn.style.display = "none";

    createrow();
    clock = setInterval(move, 40);
}

function delrow() {
    if (con.children.length == 6) {
        con.removeChild(con.lastElementChild);
    }
}

function fail() {
    clearInterval(clock);
    alert('Your final score: ' + score);

    // remove event listener for all black blocks
    var blks = document.querySelectorAll("div.black");
    blks.forEach((blk)=>{
        blk.removeEventListener("click", judge);
    });

    // show the start button again
    btn.style.display = "block";
}

function move() {
    
    var top = parseInt(window.getComputedStyle(con, null)['top']);

    if (speed + top > 0) {
        // which means no blocks exist in the top
        top = 0;
    } else {
        // move
        top += speed;
    }
    con.style.top = top + 'px';

    if (top == 0) {
        createrow();
        con.style.top = '-100px';
        delrow();
    } else if (top == (-100 + speed)) {
        var rows = con.children;
        if ((rows.length == 5) && (rows[rows.length - 1].pass !== 1)) {
            // the reason for using `window.requestIdleCallback` is for
            // preventing any motion of the blocks after dismissing the 
            // alert dialog.
            window.requestIdleCallback(fail);
        }
    }
}

// whether clicking on the black block
function judge(e){
    if (e.target.className.indexOf('black') != -1) {
        e.target.className = 'cell';
        e.target.parentNode.pass = 1;
        updateScore(score+1);
    }
}

$("btn-start").addEventListener("click", init);

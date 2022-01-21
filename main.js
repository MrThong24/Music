const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const song = document.getElementById('song');
const btnPlay = $('.play-inner');
const playSong = $('.play-song');
const nextBtn = $('.play-forward');
const prevBtn = $('.play-backward');
const durationTime = $('.timer__right');
const remainingTime = $('.timer__left');
const rangeBar = $('.range');
const playList = $('.link-playlist');
const playRepeat = $('.play-repeat');
const shuffle = $('.shuffle-song');
const volume = $('.volume')
const musics = [
        {
            id:0,
            stt:"1",
            name: "Ít nhưng dài lâu",
            playing: "3502  ",
            path: "./music/song1.mp3",
            time: "6:42",
            album: "2019"
        },
        {
            id:1,
            stt:"2",
            name: "Biệt tri kỷ",
            playing: "1000",
            path: "./music/song2.mp3",
            time: "4:23",
            album: "2021"
        },
        {
            id:2,
            stt:"3",
            name: "Anh nhớ em",
            playing: "3000",
            path: "./music/song3.mp3",
            time: "4:17",
            album: "2021"
        },
        {
            id:3,
            stt:"4",
            name: "Quan Sơn Tửu",
            playing: "8000",
            path: "./music/song4.mp3",
            time: "3:37",
            album: "2022"
        },
        {
            id:4,
            stt:"5",
            name: "Khúc Cửu Môn Hồi Ức",
            playing: "1000",
            path: "./music/song5.mp3",
            time: "4:31",
            album: "2021"
        }, 
        {
            id:5,
            stt:"6",
            name: "Dancin",
            playing: "1000",
            path: "./music/song6.mp3",
            time: "4:16",
            album: "20021"
        }, 
    ];

let indexSong = 0;
song.setAttribute('src',`${musics[indexSong].path}`);
/*  */
for (var i = 0 ;i< musics.length; i++) {
    playList.insertAdjacentHTML( 'beforeend',
       `<div class="playlist list--hover-total ${i === indexSong ? 'active' : ''}" data-index=${musics[i].id}>
            <p class=" playlist_number">${i === indexSong? '<i class="fas fa-volume-up"></i>' : `${musics[i].stt}`}</p>
            <p class=" playlist_title">${musics[i].name}</p>
            <p class=" playlist_playing">${musics[i].playing}</p>
            <p class=" playlist_time">${musics[i].time}</p>
            <p class=" playlist_album">${musics[i].album}</p>
        </div>`)
}
/*  */
function resetSong(dir) {
    dir = Number (dir); 
    playList.innerHTML =``;
    for (var j = 0 ;j< musics.length; j++) {
        playList.insertAdjacentHTML( 'beforeend',
        `<div class="playlist list--hover-total ${j === dir ? 'active' : ''}" data-index=${musics[j].id}>
            <p class=" playlist_number">${j === dir? '<i class="fas fa-volume-up"></i>' : `${musics[j].stt}`}</p>
            <p class=" playlist_title">${musics[j].name}</p>
            <p class=" playlist_playing">${musics[j].playing}</p>
            <p class=" playlist_time">${musics[j].time}</p>
            <p class=" playlist_album">${musics[j].album}</p>
        </div>`)
    }
}
//Phát-dừng bài hát
let isPlaying = true;
btnPlay.addEventListener('click',playPause);
function playPause(){
    if(isPlaying){
        song.play();
        isPlaying = false;
        btnPlay.innerHTML = '<i class="fas fa-pause-circle"></i>';
    }
    else{
        song.pause();
        isPlaying = true;
        btnPlay.innerHTML = '<i class="fas fa-play-circle"></i>';
    }
}
nextBtn.addEventListener('click',function(){
    if (isShuffle == true) changeSong(3);
    else changeSong(1);
})
prevBtn.addEventListener('click',function(){
    if (isShuffle == true) changeSong(3);
    else changeSong(-1);
})

/* Next vs Prev Song */
function changeSong(dir){
    if(dir === 1){
        indexSong++;
        if(indexSong >= musics.length){
            indexSong = 0;
        }
        isPlaying = true;
    }
    else if(dir === -1){
        indexSong--;
        if(indexSong < 0){
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }else if(dir === 3) {
        indexSong =  Math.floor(Math.random() * 5);  
    }
    resetSong(indexSong);
    song.setAttribute('src',`${musics[indexSong].path}`);
    btnPlay.innerHTML = '<i class="fas fa-pause-circle"></i>';
    song.play();
    isPlaying = false;
}
/*  set thoi gian phat nhac */
displayTime();
const timer = setInterval(displayTime,500)
function displayTime(){
    const {duration,currentTime} = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.innerText = formatTime(currentTime);
    if(!duration){
        durationTime.innerText = "00:00";
    }
    else{
        durationTime.innerText = formatTime(duration);
    }
}
/* format time */
function formatTime(number){
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    if(seconds < 10){
        return `${minutes}:0${seconds}`
    }
    else{
        return `${minutes}:${seconds}`
    }
}
/* Thay đổi khúc nhạc khi click chọn rangeBar  */
rangeBar.addEventListener("change", handleChangeSong);
function handleChangeSong(){
    song.currentTime = rangeBar.value;
}
let isRepeat = false;
playRepeat.addEventListener("click", function(){
    if(isRepeat){
        isRepeat = false;
        playRepeat.removeAttribute("style")
    }
    else{
        isRepeat = true;
        playRepeat.style.color = "red";
    }
})
/* tự phát bài tiếp khi kết thúc */
song.addEventListener("ended", function(){
    if(isRepeat == true){
        isPlaying = true;
        playPause()
    }
    else{   
        changeSong(1);
    }
})
/* ramdom song */
shuffle.addEventListener("click", shuffleSong);
var isShuffle = false;
function shuffleSong() {
    if (isShuffle == false) {
        isShuffle = true;
        shuffle.style.color = 'red';
        changeSong();
    }
    else{
        isShuffle = false;
        shuffle.removeAttribute("style");
    }
}
/* Khi chọn bài hát */
playList.onclick = function(e) {
    const songNote = e.target.closest('.list--hover-total:not(.active)'); 
    let songNoteindex = songNote.getAttribute('data-index'); // lấy data-index
    indexSong = songNoteindex ;
    isPlaying = false;
    btnPlay.innerHTML = '<i class="fas fa-pause-circle"></i>';
    song.setAttribute('src', `${musics[indexSong].path}`); 
    song.play();
    resetSong(songNoteindex);
};
/*  */

const check = document.getElementById('light-dark');
const container = $('.container')
check.addEventListener("click", function(){
    container.classList.toggle('dark-theme');
})

const leftBar = $('.left-icon');
const rightBar = $('.right-icon');
const navBar = $('.nav-bar');
const sidebar = $('.sidebar');
const hideNavBar = $('.left-icon-header');
const hideSideBar = $('.right-icon-header');


function toggleBtn(){
    navBar.classList.toggle('active');
}
hideNavBar.addEventListener("click", function(){
    toggleBtn()
});
leftBar.addEventListener("click", function(){
    toggleBtn()
});

function toggleBtn2(){
    sidebar.classList.toggle('active2');
}
hideSideBar.addEventListener("click", function(){
    toggleBtn2()
});
rightBar.addEventListener("click", function(){
    toggleBtn2()
});

function changeVolume(amount) {
    var audioObject = document.getElementsByTagName("audio")[0];
    audioObject.volume = amount;
}


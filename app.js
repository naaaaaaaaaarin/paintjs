const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const colorPicker = document.getElementById("jsColorPicker");
const picColor = document.getElementById("picColor");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height); // 맨 처음에 캔버스를 흰색으로 채움(초기 배경색 transparent 방지)
ctx.strokeStyle = INITIAL_COLOR;  // 이 색상으로 처음에 시작함
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
/* ctx.fillStyle = "green";  // 사각형을 채우는 색상
ctx.fillRect(50, 20, 100, 49); */  // x, y, width, height

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
};

function startPainting(){
    painting = true;
};

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();  // 출발점을 초기화
        ctx.moveTo(x, y); // 출발점을 좌표로 옮김
    } else {
        // console.log("creating line in ", x, y);
        ctx.lineTo(x, y);  // 도착점을 좌표로 옮김
        ctx.stroke();  // 선으로 그리기
    }
};

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    picColor.style.backgroundColor = color;
    /* if(event){
        classes.add("border");
    }else {
        for(i=0 ; i<colors.length ;i++){
            colors[i].classList.remove("border");
        }
    } */
};

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
};

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }else {
        filling = true;
        mode.innerText = "Paint";
    };
};

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
};

function handleCM(event){
    event.preventDefault();  // 우클릭 방지
};

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintjs";
    link.click();
};

function handleCPic(){
    const cPic = colorPicker.value;
    ctx.strokeStyle = cPic;
    ctx.fillStyle = cPic;
    picColor.style.backgroundColor = cPic;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
};

if(colors){
    Array.from(colors).forEach(color =>  // Array.form() : object -> array
    color.addEventListener("click", handleColorClick)
);
};

if(range){
    range.addEventListener("input", handleRangeChange);
};

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

if(colorPicker){
    colorPicker.addEventListener("input", handleCPic);
}
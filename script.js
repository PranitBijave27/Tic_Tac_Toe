let body=document.querySelector("body");


//Accessing all buttons present
let btns=document.querySelectorAll(".inner");
let resetbtn=document.querySelector("#reset-btn");
let msg=document.querySelector("#msg");
let msg_container=document.querySelector(".msg-container");
let audoBtn1=document.querySelector("#music1");
let winPopUp=document.querySelector("#music2");
let turnX=true; //player-x player-y;



// mode toggler
let currMode="light";
mode=document.querySelector("#mode");
mode.addEventListener("click",()=>{
    if(currMode==="light"){
        mode.innerText="🌙 Dark Mode";
        body.style.background="black";
        body.style.color="white";
        mode.style.color="white";
        currMode="dark";
        btns.forEach((box)=>{
        box.style.border="3px solid white";
    });
    }else{
        mode.innerText="☀️ Light Mode";
        body.style.background="linear-gradient(270deg, #ff7eb3, #65d6ce, #fce38a, #ff9a9e)";
        body.style.backgroundSize="500%";
        body.style.color="black";
        mode.style.color="black";
        currMode="light";
        btns.forEach((box)=>{
        box.style.border="2px solid black";
    });
    }
});


//all winning combinations
const winningCombos=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [6,7,8],
    [1,4,7],    
    [2,4,6],
    [2,5,8],
];

let counter=0;
//each button working on game
let disable=false;
let play=false;
btns.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(play==false){
            audoBtn1.play();
            play=true;
        }
        if(turnX &&box.innerText===""){ //player-X
            box.innerText="X"
            box.style.backgroundColor="#fcbf49"
            turnX=false;
            counter++;
        }else{
            if(box.innerText===""){ //Player-O
                box.innerText="O";
                box.style.backgroundColor="#60d394";
                turnX=true;
                counter++;
            }    
        }
        if(disable===false){
            checkWinner();
        }
        if(counter==9){
            counter=0;
            showWinner(-1);
        }
    });
});

//reset button working
let reset=false;
resetbtn.addEventListener("click",()=>{
    if(play){
        audoBtn1.pause();
        audoBtn1.currentTime=0;
        play=false;
    }
    btns.forEach((box)=>{
        box.innerText="";
        box.style.backgroundColor="#F0F3BD";
    });
    turnX=true;
    btns.forEach((btn)=>{
        btn.disabled=false;
        disable=false;
    });
    if(reset==true){
        msg_container.classList.add("afterReset");
    }
    reset=false;
    counter=0;
});

//after winning combo occurs it shows winner on display
const showWinner=(winner)=>{
    audoBtn1.pause();
    audoBtn1.currentTime=0;

    msg_container.classList.remove("afterReset");
    if(winner==-1){
        msg.innerText="Game Draw Restart !";
    }else{
        msg.innerText=`Winner is ${winner}`;
    }
    msg_container.classList.add("afterwin");
    reset=true;
    winPopUp.play();
};

//winner checking logic
const checkWinner=()=>{
    for (let pattern of winningCombos) {
        let p1=btns[pattern[0]].innerText;
        let p2=btns[pattern[1]].innerText;
        let p3=btns[pattern[2]].innerText;
        if(p1 !="" && p2!="" && p3 !=""){
            if(p1===p2 && p2===p3 && p1===p3){
            console.log("Winner",p1);
            disable=true;
            counter=0;
            showWinner(p1);
            btns.forEach((btn)=>{
                btn.disabled=true;
            });
            break;
        }
        
        }
    }
}
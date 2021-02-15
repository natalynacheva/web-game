document.addEventListener('DOMContentLoaded', function () {

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height= 500;
//arr to store the keys
const keys =[];
//keep track of scor
var score = 0;
//loading imgs

const image = {};
image.player = new Image();
image.player.src = "https://i.ibb.co/Tc6mLck/Flying-dragon-red-RGB.png";
const background = new Image();
background.src="https://i.ibb.co/cLrZCVk/MAP.png";
const imgEgg = new Image();
imgEgg.src="https://i.ibb.co/DrZwLQD/Red-Yoshi-Egg.webp";
const msg=new Image();
msg.src="https://i.ibb.co/YB5gj7y/Book-scroll-png-removebg-preview.png";
/// sX,sy,sw,sh - mqstoto ot snimkata koeto shte rejem
///d-tata sa kude na canvasa shte postavim chovecheto
function drawSprite(img,sX,sY,sW,sH,dX,dY,dW,dH){
    ctx.drawImage(img,sX,sY,sW,sH,dX,dY,dW,dH); 
}
const player ={
    
    //width of single pose of player=32 ,height= 48;
    width: 133 ,//small 32,chewie-40
    height: 112 ,//amall 48,chewie-72
    ///x,y kordinati v samiq sprite sheet
    frameX: 0,
    frameY: 0,
    ///where to draw the player on canvas
    x: canvas.height/2,
    y: canvas.width/2,
    speed: 4,
    moving: false,
    radius: 56,
};
const map = {
    background:background,
    //sphererad - 220    
    width:  800,
    height:  444,
    
    ///x,y kordinati v samiq sprite sheet
    frameX: 0,
    frameY: 0,
    
    x: canvas.width/2 - 220, //- this.width/2,
    y: canvas.height/2 - 220,// - this.height/2,
    speed: 4,
    moving: false
}
const arrEggs=[];
class egg{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width=30;
        this.height=36;
        this.moving = false;
        this.speed = 4;
        this.distance;
        this.radus = 15;
        this.counted=false;
    }
    
    update(){        
        
        const dx = (this.x+15) - (player.x+70);
        const dy = (this.y+15) - (player.y+70);
        this.distance = Math.sqrt(dx * dx + dy * dy);
        
    }
    draw(){
        drawSprite(imgEgg,
            0,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height);
            
        }
        
    }
    window.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
        console.log(keys); 
        player.moving= true;
        map.moving=true;
        for (let i = 0; i < arrEggs.length; i++) {
            arrEggs[i].moving=true;
        }   
    });
    window.addEventListener("keyup",function(e) {
        delete keys[e.keyCode];
        player.moving=false;
        map.moving=false;
        for (let j = 0; j < arrEggs.length; j++) {
            arrEggs[j].moving=false;
        }
    });


        
    function movePlayerAndMap() {
        if(keys[38]&&player.y>10){//&&player.y>100
            player.y -= player.speed;
            player.frameY=0;
            player.moving=true;
            
        }
        if (keys[37]&&player.x>5) {
            
            player.frameY=3;
            player.moving=true;
            
            map.x+=map.speed;
            map.moving=true;
            
            for (let k = 0; k < arrEggs.length; k++) {
                arrEggs[k].x+=arrEggs[k].speed;
                arrEggs[k].moving=true;
            }
        }
        if (keys[40]&&player.y<400) {
            player.y +=player.speed;
            player.frameY=2;
            player.moving=true;
        }
        if (keys[39]) {
            player.frameY=1;
            player.moving=true;
            
            map.x-=map.speed;
            map.moving=true;
            
            for (let l = 0; l < arrEggs.length; l++) {
                arrEggs[l].x-=arrEggs[l].speed;
                arrEggs[l].moving=true;
            }       
        }    
    }
    
    let egg1,egg2,egg3,egg4,egg5,egg6;
egg1 = new egg(340,300);
egg2 = new egg(315,150);
egg3= new egg(550,100);
egg4 = new egg(600,200);
egg5 = new egg(720,100);
egg6= new egg(825,350);
arrEggs.push(egg1,egg2,egg3,egg4,egg5,egg6);

function handleEggs() {
    
    for (let m = 0; m < arrEggs.length; m++) {
        if (arrEggs[m].distance < 71) {
          
            if(arrEggs[m].counted == false){
               
                arrEggs[m].counted=true;
                arrEggs.splice(m,1);
                
                score++;
                
                handleCV();

            }
        }
    }

    for (let m = 0; m < arrEggs.length; m++) {
        arrEggs[m].update();
        arrEggs[m].draw();
        
    }
    
}
function drawScore() {
    ctx.font = '20px monospace';
    ctx.fillText("Eggs collected: "+ score + " out of " + arrEggs.length,3,30);
}


const cv1=new Image();
cv1.src="https://i.ibb.co/BjRPVr8/Part1-og-removebg-preview.png";
const cv2=new Image();
cv2.src="https://i.ibb.co/4KVfSXv/Part2-og-removebg-preview-1.png";
const cv3=new Image();
cv3.src="https://i.ibb.co/0cNrbsV/Part3-removebg-preview.png";
const cv4=new Image();
cv4.src="https://i.ibb.co/HdT7287/Part4-removebg-preview.png";
const cv5=new Image();
cv5.src="https://i.ibb.co/5WwPpxP/Part5-removebg-preview.png";

let clicked1 = false;
let clicked2 = false;
let clicked3 = false;
let clicked4 = false;
let clicked5 = false;
let clicked6 = false;

function createCV(sc,click,imageCV,cvW,cvH,cvPlaceX,cvPlaceY) {
            
    if(score==sc&&click==false){
       
         window.addEventListener("keypress", function() {
       if (sc==1) {
           clicked1=true;
       }
       if (sc==2) {
        clicked2=true;
       }
       if (sc==3) {
        clicked3=true;
    }
    if (sc==4) {
        clicked4=true;
    }
    if (sc==5) {
        clicked5=true;
    }
    if (sc==6) {
        clicked6=true;
    }
        
        });
        drawSprite(msg,0,0,380,351,160,80,380,351);
 
        drawSprite(imageCV,0,0,cvW,cvH,cvPlaceX,cvPlaceY,cvW,cvH);
        ctx.font = '15px monospace';
        ctx.fillStyle = "black";
        ctx.fillText("Press any key to continue ",250,330);
       
    }
}
var link = "https://docs.google.com/document/d/1A2BUERVfDU4EBv4O-476CZmw_LOuWtFVv5Ey-HP5V-Y/edit?usp=sharing";
var element = document.createElement("a");
element.setAttribute("href", link);
element.innerHTML = " here";

function handleCV(){
    ctx.shadowBlur=0;
    ctx.shadowOffsetX= 0;
    ctx.shadowOffsetY= 0;
   
    createCV(1,clicked1,cv1,270,155,220,150);
    createCV(2,clicked2,cv2,300,150,220,150);
    createCV(3,clicked3,cv3,300,150,200,200);
    createCV(4,clicked4,cv4,330,172,200,150);
    createCV(5,clicked5,cv5,330,172,210,150);
    createCV(6,clicked6,imgEgg,0,0,0,0);

    if(score==6){
       ctx.fillText("Congrats! You have collected",230,200); 
       ctx.fillText("all eggs!",230,215);
       ctx.fillText("Now you can download my whole",230,230);
       ctx.fillText("CV from",230,245);
       //ctx.fillText(,330,200);
       document.body.appendChild(element);
        
    }
    if (score == 7){
        alert("GAME OVER");
       document.location.reload();
        clearInterval(interval);
    }
}



    function handlePlayeFrames() {
        if (player.frameX < 2 && player.moving==true){
            player.frameX++;
            
 }else{ 
     player.frameX=0;
    
     }
};

function createMap() {
    ctx.beginPath();
    
    ctx.arc(canvas.width/2,canvas.height/2,220,0,Math.PI*2);
    ctx.clip(); //call the clip method so the next render is clipped in last path
    
 var pattern = ctx.createPattern(map.background, "repeat");
    //ctx.fillStyle = pattern;
    // restore ctx back to before the translate()
    ctx.fill();
    ctx.stroke();
    ctx.restore();
   ctx.closePath();

}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    drawScore();
    createMap();
    
    drawSprite(map.background,
        map.width * map.frameX,
        map.height*map.frameY,
        map.width,
        map.height,
        map.x,
        map.y,
        map.width,
        map.height);
        
        drawSprite(map.background,
            map.width * map.frameX,
            map.height*map.frameY,
            map.width,
            map.height,
            map.x+800,
            map.y,
            map.width,
            map.height);
            
            
            drawSprite(map.background,
                map.width * map.frameX,
                map.height*map.frameY,
                map.width,
                map.height,
                map.x-800,
                map.y,
                map.width,
                map.height);
                if (map.x>=800) {
                    map.x=0;
                }
                if (map.x<=-800) {
                    map.x=0;
                }
            
    ctx.shadowBlur=10;
    ctx.shadowColor="black";
    ctx.shadowOffsetX=-10;
    ctx.shadowOffsetY= 10;    
                handleEggs();
   
                drawSprite(image.player,
                    player.width * player.frameX, 
                    player.height * player.frameY,
                    player.width,
                    player.height,
                    player.x,
                    player.y,
                    player.width,
                    player.height);
                    
                    handlePlayeFrames();
                    movePlayerAndMap();
                    handleCV();  
                 
               
                
                    requestAnimationFrame(animate);
                    
                }
                animate();
            });
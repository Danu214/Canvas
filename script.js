let canvas = document.getElementById("canvas");


const ctx = canvas.getContext("2d");
let coords = [];
const x = 50
ctx.fillStyle = "red";
// ctx.fillRect(x, 100, 200, 150);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// setInterval(function () {
//     ctx.fillRect(x++, 100, 200, 150);
// },10)

// ctx.arc(canvas.width / 2 , canvas.height / 2 , 100 , 0 , Math.PI * 2)
// ctx.fill();

// ctx.strokeStyle = 'blue';
// ctx.lineWidth = 8;
// ctx.scale(2,2)
// ctx.rotate(.1)
// ctx.beginPath();
// ctx.moveTo(50,50);
// ctx.lineTo(25,100);
// ctx.lineTo(75,100);
// ctx.closePath();
// ctx.stroke()

// const grad = ctx.createLinearGradient(0,0,500,0)
// grad.addColorStop('0' , 'magenta')
// grad.addColorStop('.50' , 'blue')
// grad.addColorStop('1' , 'red')
// ctx.fillStyle = grad
// ctx.font = '20px Georgia'
// ctx.textAlign = 'center'
// ctx.fillText('Hello World' , canvas.width / 2 , canvas.height / 2 )
// ctx.fillText('Hello World' , 50 ,70  )

let isMouseDown = false;

canvas.addEventListener('mousedown' , () => {
    isMouseDown = true
})
canvas.addEventListener('mouseup' , () => {
    isMouseDown = false
    ctx.beginPath()
    coords.push('mouseup')
})
ctx.lineWidth = 10 * 2;
canvas.addEventListener('mousemove' , (e) => {
    if (isMouseDown){
        coords.push([e.clientX , e.clientY]);
        ctx.lineTo(e.clientX , e.clientY);
        ctx.stroke();
        // ctx.fillStyle = 'blue'
        ctx.beginPath();
        ctx.arc(e.clientX , e.clientY , 10 , 0 , Math.PI * 2);
        ctx.fill()

        ctx.beginPath();
        ctx.moveTo(e.clientX , e.clientY)
    }
})

const save = () => {
    localStorage.setItem('coords' , JSON.stringify(coords))
}
const clear = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width , canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
}

const replay = () => {
        let timer = setInterval(function (){
            if (!coords.length) {
                clearInterval(timer);
                ctx.beginPath();
                return;
            }

            let crd = coords.shift(),
                e = {
                    clientX: crd['0'],
                    clientY: crd['1']
                };
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            // ctx.fillStyle = 'blue'
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
            ctx.fill()

            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY)
        }, 10)

}

document.addEventListener('keydown' , (e) => {
    if (e.keyCode === 83){
    //     save
        save();
        console.log('Saved')
    }
    if(e.keyCode === 82){
    //     replay
        console.log('Replaying ...')
        coords = JSON.parse(localStorage.getItem('coords'));
        clear()
        replay()
    }
    if(e.keyCode === 67){
    //     clear
        clear()
        console.log('Cleared')
    }
} )
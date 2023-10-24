let canvas = document.getElementById("canvas");


const context = canvas.getContext("2d");
let coords = [];
const x = 50
context.fillStyle = "red";
// context.fillRect(x, 100, 200, 150);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// setInterval(function () {
//     context.fillRect(x++, 100, 200, 150);
// },10)

// context.arc(canvas.width / 2 , canvas.height / 2 , 100 , 0 , Math.PI * 2)
// context.fill();

// context.strokeStyle = 'blue';
// context.lineWidth = 8;
// context.scale(2,2)
// context.rotate(.1)
// context.beginPath();
// context.moveTo(50,50);
// context.lineTo(25,100);
// context.lineTo(75,100);
// context.closePath();
// context.stroke()

// const grad = context.createLinearGradient(0,0,500,0)
// grad.addColorStop('0' , 'magenta')
// grad.addColorStop('.50' , 'blue')
// grad.addColorStop('1' , 'red')
// context.fillStyle = grad
// context.font = '20px Georgia'
// context.textAlign = 'center'
// context.fillText('Hello World' , canvas.width / 2 , canvas.height / 2 )
// context.fillText('Hello World' , 50 ,70  )

let isMouseDown = false;

canvas.addEventListener('mousedown' , () => {
    isMouseDown = true
})
canvas.addEventListener('mouseup' , () => {
    isMouseDown = false
    context.beginPath()
    coords.push('mouseup')
})
context.lineWidth = 10 * 2;
canvas.addEventListener('mousemove' , (e) => {
    if (isMouseDown){
        coords.push([e.clientX , e.clientY]);
        context.lineTo(e.clientX , e.clientY);
        context.stroke();
        // context.fillStyle = 'blue'
        context.beginPath();
        context.arc(e.clientX , e.clientY , 10 , 0 , Math.PI * 2);
        context.fill()

        context.beginPath();
        context.moveTo(e.clientX , e.clientY)
    }
})

const save = () => {
    localStorage.setItem('coords' , JSON.stringify(coords))
}
const clear = () => {
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width , canvas.height);
    context.beginPath();
    context.fillStyle = 'black';
}

const replay = () => {
        let timer = setInterval(function (){
            if (!coords.length) {
                clearInterval(timer);
                context.beginPath();
                return;
            }

            let crd = coords.shift(),
                e = {
                    clientX: crd['0'],
                    clientY: crd['1']
                };
            context.lineTo(e.clientX, e.clientY);
            context.stroke();
            // context.fillStyle = 'blue'
            context.beginPath();
            context.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
            context.fill()

            context.beginPath();
            context.moveTo(e.clientX, e.clientY)
        }, 10)

}

document.addEventListener('keydown' , (e) => {
    if (e.keyCode === 83){
        save();
        console.log('Saved')
    }
    if(e.keyCode === 82){
        console.log('Replaying ...')
        coords = JSON.parse(localStorage.getItem('coords'));
        clear()
        replay()
    }
    if(e.keyCode === 67){
        clear()
        console.log('Cleared')
    }
} )
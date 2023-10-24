const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let shadowBlur = 0
let shadowOffsetX = 0
let shadowOffsetY = 0
const timeScale = 0.001

// animation({
//     clear () {
//         canvas.width |= 0;
//     },
//     update ({timestamp}) {
//         shadowBlur = 10 + 10 * Math.cos(timestamp * timeScale)
//         shadowOffsetX = 10 * Math.sin(timestamp * timeScale )
//         shadowOffsetY = 10 * Math.cos(timestamp * timeScale)
//     },
//     render () {
//         context.beginPath()
//         context.rect(100 , 100 , 250 , 250);
//         context.shadowColor = 'red';
//         context.shadowBlur = shadowBlur;
//         context.shadowOffsetX = shadowOffsetX
//         context.shadowOffsetY = shadowOffsetY
//         context.strokeStyle = 'blue'
//         context.stroke();
//     }
// })

// animation({
//     clear () {
//         canvas.width |= 0;
//     },
//     update ({timestamp}) {
//         shadowBlur = 10 + 10 * Math.cos(timestamp * timeScale)
//         shadowOffsetX = 10 * Math.sin(timestamp * timeScale )
//         shadowOffsetY = 10 * Math.cos(timestamp * timeScale)
//     },
//     render () {
//         context.beginPath()
//         context.moveTo(100 , 100);
//         context.lineTo(200, 200);
//         context.lineTo(300, 100)
//         context.shadowColor = 'red';
//         context.shadowBlur = shadowBlur;
//         context.shadowOffsetX = shadowOffsetX
//         context.shadowOffsetY = shadowOffsetY
//         context.strokeStyle = 'blue'
//         context.stroke();
//     }
// })

animation({
    clear () {
        canvas.width |= 0;
    },
    update () {

    },
    render () {
        drawLine(20)

        context.setLineDash([ 10 , 10])
        drawLine(30)
        context.setLineDash([ 50 , 50])
        drawLine(40)
        context.setLineDash([ 5 , 5])
        drawLine(50)

    }
})
const drawLine = (y) => {
    context.beginPath();
    context.moveTo(0 ,y);
    context.lineTo(500 , y);
    context.stroke();
}
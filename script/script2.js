

const canvas = document.getElementById('canvas')

const context = canvas.getContext('2d')

canvas.width = 500;
canvas.height = 500;

// setInterval(() => {
//     console.log('fired')
// },1000);

// let angle = 0;
const triangle = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    radius: 200,
    angle: 0,
    angleSpeed: Math.PI * 0.01

}


animation({
    clear () {
        context.clearRect(0,0,canvas.width , canvas.height);
    },

    update () {
        triangle.angle += triangle.angleSpeed
    },

    render () {
        // context.beginPath()
        // context.arc(canvas.width / 2 + 150 * Math.cos(angle) ,
        //     canvas.height / 2 + 150 * Math.sin(angle),
        //     5,
        //     0 ,
        //     Math.PI * 2
        // );
        // context.fillStyle = 'green'
        // context.fill();


        const dAngle = (Math.PI * 2) / 3;
        context.beginPath();
        context.moveTo(
            triangle.centerX + triangle.radius * Math.cos(triangle.angle),
            triangle.centerY + triangle.radius * Math.sin(triangle.angle)
        );
        context.lineTo(
            triangle.centerX + triangle.radius * Math.cos(triangle.angle + dAngle),
            triangle.centerY + triangle.radius * Math.sin(triangle.angle + dAngle)
        );
        context.lineTo(
            triangle.centerX + triangle.radius * Math.cos(triangle.angle + 2 * dAngle),
            triangle.centerY + triangle.radius * Math.sin(triangle.angle + 2 * dAngle)
        );
        context.closePath();
        context.fillStyle = 'red';
        context.fill();
    }

})
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = 600;

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const variants = [
    "top" ,
    "hanging" ,
    "middle" ,
    "alphabetic" ,
    "ideographic" ,
    "bottom"
];

context.font = '50px mono'
const middle = canvas.height / 2;


context.beginPath();
context.moveTo(0, middle);
context.lineTo(canvas.width , middle);
context.strokeStyle = 'red'
context.stroke();

let offsetX = 0
for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    context.textBaseline = variant
    context.fillText(capitalize(variant) , offsetX, middle);

    offsetX += context.measureText(capitalize(variant)).width + 50
}
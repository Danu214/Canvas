const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;


const drawRectWithRadius = (x,y,width,height,r) => {
    context.beginPath();
    context.moveTo(x + r, y);
    context.lineTo(x + width - r, y);
    context.arc(x + width - r, y + r, r, -Math.PI / 2, 0);
    context.lineTo(x + width, y + height - r);
    context.arc(x + width - r, y + height - r, r, 0, Math.PI / 2);
    context.lineTo(x + r, y + height);
    context.arc(x + r, y + height - r, r, Math.PI / 2, Math.PI);
    context.lineTo(x, y + r);
    context.arc(x + r, y + r, r, Math.PI, (Math.PI * 3) / 2);
    context.closePath();

}
drawRectWithRadius(50,50,500,350,50)
const rgb = context.createLinearGradient(50, 350, 400, 400);
context.strokeStyle = rgb;
rgb.addColorStop(0, "red");
rgb.addColorStop(0.5, "green");
rgb.addColorStop(1, "blue");
context.lineWidth = 5;
context.stroke();
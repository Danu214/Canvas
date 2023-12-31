
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

const main = async () => {
    const city = await loadImage('assets/bg_homepage.jpg')
    console.log(city);
    context.drawImage(city , 0 , 0 , canvas.width , canvas.height)
}


const loadImage = (src) => {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = src
        image.onload = () => resolve(image);
    })
}
main()

// const canvas = document.querySelector("canvas");
// const context = canvas.getContext("2d");
//
// canvas.width = 500;
// canvas.height = 500;
//
// const CELL_SIZE = 100;
//
// main();
//
// async function main() {
//     const city = await loadImage("assets/bg_homepage.jpg");
//
//     canvas.width = city.width;
//     canvas.height = city.height;
//
//     for (let y = 0; y < city.height / CELL_SIZE; y++) {
//         for (let x = 0; x < city.width / CELL_SIZE; x++) {
//             if ((x + y) % 2 === 0) {
//                 continue;
//             }
//
//             context.drawImage(
//                 city,
//                 x * CELL_SIZE,
//                 y * CELL_SIZE,
//                 CELL_SIZE,
//                 CELL_SIZE,
//                 x * CELL_SIZE,
//                 y * CELL_SIZE,
//                 CELL_SIZE,
//                 CELL_SIZE
//             );
//         }
//     }
// }
//
// function loadImage(src) {
//     return new Promise((resolve) => {
//         const image = new Image();
//         image.src = src;
//         image.onload = () => resolve(image);
//     });
// }
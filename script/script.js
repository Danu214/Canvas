let canvas = document.getElementById("canvas");


const context = canvas.getContext("2d");
let coords = []; // O listă pentru a stoca coordonatele pentru desenare
const x = 50
context.fillStyle = "red";
// context.fillRect(x, 100, 200, 150);

// selectam latimea si lungimea canvas-ului sa fie pe intregul ecran al browserului
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// setInterval(function () {
//     context.fillRect(x++, 100, 200, 150);
// },10)

// context.arc(canvas.width / 2 , canvas.height / 2 , 100 , 0 , Math.PI * 2)
// context.fill();
//
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
//
// const grad = context.createLinearGradient(0,0,500,0)
// grad.addColorStop('0' , 'magenta')
// grad.addColorStop('.50' , 'blue')
// grad.addColorStop('1' , 'red')
// context.fillStyle = grad
// context.font = '20px Georgia'
// context.textAlign = 'center'
// context.fillText('Hello World' , canvas.width / 2 , canvas.height / 2 )
// context.fillText('Hello World' , 50 ,70  )

let isMouseDown = false; // // Indicator pentru a ști dacă butonul mouse-ului este apăsat sau nu

canvas.addEventListener('mousedown', () => {
    isMouseDown = true;  //  butonul mouse-ului este apăsat
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;  //  butonul mouse-ului nu  este apăsat
    context.beginPath();
    coords.push('mouseup');
});
context.lineWidth = 20; // grosimea liniei in px
canvas.addEventListener('mousemove' , (e) => {
    if (isMouseDown) {  // Verific dacă butonul mouse-ului este apăsat
        coords.push([e.clientX, e.clientY]);  // Adaugă coordonatele la lista de coordonate
        context.lineTo(e.clientX, e.clientY);  // Desenează o linie către noile coordonate
        context.stroke();
        context.beginPath();
        context.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
        context.fill();  // Umple cercul cu culoarea curentă
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }
})

const save = () => {
    localStorage.setItem('coords' , JSON.stringify(coords)) // salvez lista de coordonate in localStorage
}
const clear = () => {
    context.fillStyle = 'white'; // cand stergem desenul care lam facut  se coloreaza tot in alb
    context.fillRect(0,0,canvas.width , canvas.height);
    context.beginPath();
    context.fillStyle = 'black'; // Setează culoarea de umplere la negru
}

const replay = () => {
        let timer = setInterval( () => {
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

    // cand apas pe tasta 'S' cu unicodul 83 atunci se salveaza datele in localStorage
    if (e.keyCode === 83){
        save();
        console.log('Saved')
    }
    if(e.keyCode === 82){
        // cand apas pe tasta 'R' cu unicodul 82 atunci se sterge desenul si care l-am desenat eu si trage datele din localStorage  si reda desenul care a fost salvat
        console.log('Replaying ...')
        coords = JSON.parse(localStorage.getItem('coords'));
        clear()
        replay()
    }

    // cand apas pe 'C' cu unicodul 67 se sterge desenul
    if(e.keyCode === 67){
        clear()
        console.log('Cleared')
    }
} )
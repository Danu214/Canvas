// Scoatem elementul canvas prin id.
const canvas = document.getElementById('canvas');
// Prin getContext setam contextul de desenare 2d sau 3d , in cazul meu eu am nevoie de 2d
const context = canvas.getContext('2d');
canvas.width = 500; // Setează lățimea canvas-ului la 500px.
canvas.height = 500; // Setează înălțimea canvas-ului la 500px.

// Definim un obiect numit `triangle` care reprezintă un cerc animat.
const triangle = {
    centerX: canvas.width / 2, // Coordonata x a centrului cercului.
    centerY: canvas.height / 2, // Coordonata y a centrului cercului.
    radius: 200, // Raza cercului.
    angle: 0,
    angleSpeed: Math.PI * 0.01 // Viteza de rotație a cercului.
}

// Am facut o functie de tip arrow care am numito 'animation' si care primeste un parametru 'callback'
const animation = (callback) => {
    function animate() {
        callback.clear(); // Funcția `clear` șterge canvas-ul în fiecare cadru.
        callback.update(); // Funcția `update` actualizeaza starea animației.
        callback.render(); // Funcția `render` deseana animația pe canvas.
        requestAnimationFrame(animate);
    }
    // Am apelat functia 'animate'
    animate();
}

animation({
    clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    },

    update() {
        triangle.angle += triangle.angleSpeed;
    },

    render() {
        context.beginPath();
        context.arc(
            triangle.centerX + triangle.radius * Math.cos(triangle.angle),
            triangle.centerY + triangle.radius * Math.sin(triangle.angle),
            5,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'green';
        context.fill();
    }
});

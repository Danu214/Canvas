const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Setăm dimensiunile canvasului pentru a ocupa întreaga fereastră a browser-ului.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const properties = {
    bgColor: `rgba(17,17,19,1)`,        // Culoarea fundalului canvas-ului.
    particleColor: `rgba(255,40,40,1)`, // Culoarea particulelor.
    particleRadius: 3,                 // Raza particulelor.
    particleCount: 60,                 // Numărul de particule.
    particleMaxVelocity: 0.5,          // Viteza maximă a particulelor.
    lineLength: 150,                   // Lungimea maximă a liniilor dintre particule.
    particleLife: 6,                  // Durata de viață in secunde a particulelor.
};

document.querySelector('body').appendChild(canvas);

// window.onresize = () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
    }

    position() {
        // Reflectăm particulele de la marginile canvas-ului.
        this.x + this.velocityX > canvas.width && this.velocityX > 0 ||
        this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;

        this.y + this.velocityY > canvas.height && this.velocityY > 0 ||
        this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;

        // Actualizăm poziția particulei.
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    // Metodă pentru redesenarea particulei.
    reDraw() {
        context.beginPath();
        context.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = properties.particleColor;
        context.fill();
    }

    // Metodă pentru calcularea vieții particulei și regenerarea ei când moare.
    reCalculateLife() {
        if (this.life < 1) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.life = Math.random() * properties.particleLife * 60;
        }
        this.life--;
    }
}

// Funcție pentru redesenarea fundalului.
const reDrawBackground = () => {
    context.fillStyle = properties.bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Funcție pentru desenarea liniilor dintre particule.
const drawLines = () => {
    let x1, y1, x2, y2, length, opacity;

    for (const i in particles) {
        for (const j in particles) {
            x1 = particles[i].x;
            y1 = particles[i].y;
            x2 = particles[j].x;
            y2 = particles[j].y;
            length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

            if (length < properties.lineLength) {
                opacity = 1 - length / properties.lineLength;
                context.lineWidth = '0.5';
                context.strokeStyle = 'rgba(255,40,40,' + opacity + ')';
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.closePath();
                context.stroke();
            }
        }
    }
}

// Funcție pentru redesenarea particulelor, actualizarea pozițiilor și vieții lor.
const reDrawParticles = () => {
    for (const i in particles) {
        particles[i].position();
        particles[i].reDraw();
        particles[i].reCalculateLife();
    }
}

// Funcție pentru bucla principală de animație.
const loop = () => {
    reDrawBackground();
    reDrawParticles();
    drawLines();
    requestAnimationFrame(loop);
}

const init = () => {
    for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle);
    }
    loop(); // Apelăm bucla principală pentru a începe animația.
}
init();

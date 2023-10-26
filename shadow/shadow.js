const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// dimensiunile canvas-ului la 500x500 px
canvas.width = 500;
canvas.height = 500;

// Declar variabile pentru umbra și scalarea timpului
let shadowBlur = 0;
let shadowOffsetX = 0;
let shadowOffsetY = 0;
const timeScale = 0.001;

function animation(callback) {
    function animate(timestamp) {
        // Șterge conținutul canvas-ului (păstrează dimensiunile)
        callback.clear();

        // Actualizează variabilele pentru umbră
        callback.update({ timestamp });

        // Desenează pe canvas
        callback.render();

        // Planifică următorul cadru de animație
        requestAnimationFrame(animate);
    }

    // Începe animația cu timestamp 0
    animate(0);
}

// Apelează funcția "animation" cu un obiect care conține 3 metode
animation({
    // Metodă pentru ștergerea conținutului canvas-ului
    clear() {
        // Șterge canvas-ul menținând dimensiunile
        canvas.width |= 0;
    },
    // Metodă pentru actualizarea variabilelor de umbră
    update({ timestamp }) {
        shadowBlur = 10 + 10 * Math.cos(timestamp * timeScale);
        shadowOffsetX = 10 * Math.sin(timestamp * timeScale);
        shadowOffsetY = 10 * Math.cos(timestamp * timeScale);
    },
    // Metodă pentru desenarea formei și umbrei
    render() {
        context.beginPath();

        // am format un dreptunghi
        context.rect(100, 100, 250, 250);

        //  culoarea umbrei este roșie
        context.shadowColor = 'red';

        // Setează raza umbrei în funcție de variabila "shadowBlur"
        context.shadowBlur = shadowBlur;

        // Setează offset-ul umbrei pe axa X în funcție de variabila "shadowOffsetX"
        context.shadowOffsetX = shadowOffsetX;

        // Setează offset-ul umbrei pe axa Y în funcție de variabila "shadowOffsetY"
        context.shadowOffsetY = shadowOffsetY;

        // Setează culoarea conturului la albastru
        context.strokeStyle = 'blue';

        // Desenează conturul dreptunghiului
        context.stroke();
    }
});

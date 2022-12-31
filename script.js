// https://www.youtube.com/watch?v=Yvz_axxWG4Y
// Particles - 40
// Size of the circles? 
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0; // for color

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
});


//Drawinginteractive

const mouse = {
    x: undefined,
    y: undefined,
}

//click

canvas.addEventListener("click", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 20; i++) { //For loop, creating 10 add. particles
    particlesArray.push(new Particle());
    }

});

// // mousemove
canvas.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++) { //For loop, creating additonal particles . particles
        particlesArray.push(new Particle());
        }
    
    
});


class Particle { // properties
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1; //? change the number
        this.speedX = Math.random() * 1.5 - 1.5; //in order to move to different directions= positive and negative
        this.speedY = Math.random() * 1.5 - 1.5; // (-) movement up and down
        this.color = "hsl(" + hue + ", 100%, 50%)";
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY; // 2D vector
        if (this.size > .2) this.size -= 0.1; // decrease in size
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // starting point to draw
        ctx.fill();
    }
}


function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++) { //Pythagorean theoremn = particle j and particle i
            const dx = particlesArray[i].x - particlesArray[j].x; // distance between particles on horizontal axis 
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2;// or "particlesArray[i].size/10;" or 1
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            console.log(particlesArray.length);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // instead of crear the canvas we add trial on the particles as they move
    // ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=3; // the speed of color changes
    requestAnimationFrame(animate);
}
animate();

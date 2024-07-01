const canvas = document.getElementById('dnaCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dnaColor = 'rgba(26, 35, 126, 0.5)';
const backgroundColor = 'rgba(0, 0, 0, 0.1)';

class Nucleotide {
    constructor(x, y, z, character) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.character = character;
    }

    project(angle) {
        const rotatedX = this.x * Math.cos(angle) - this.z * Math.sin(angle);
        const rotatedZ = this.x * Math.sin(angle) + this.z * Math.cos(angle);
        const scale = 1000 / (1000 + rotatedZ);
        return {
            x: rotatedX * scale + canvas.width / 2,
            y: this.y * scale + canvas.height / 2,
            scale: scale
        };
    }

    draw(angle) {
        const projected = this.project(angle);
        ctx.fillStyle = dnaColor;
        ctx.font = `${14 * projected.scale}px "Source Code Pro"`;
        ctx.fillText(this.character, projected.x, projected.y);
    }
}

const dnaStrand1 = [];
const dnaStrand2 = [];
const strandLength = 100;
const radius = 200;
const verticalSpacing = 15;

for (let i = 0; i < strandLength; i++) {
    const angle = (i / strandLength) * Math.PI * 4;
    const y = i * verticalSpacing - (strandLength * verticalSpacing) / 2;
    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;

    dnaStrand1.push(new Nucleotide(x1, y, z1, Math.random() < 0.5 ? '1' : '0'));
    dnaStrand2.push(new Nucleotide(x2, y, z2, Math.random() < 0.5 ? '1' : '0'));
}

let angle = 0;
let lastScrollTop = 0;

function animate() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const nucleotide of [...dnaStrand1, ...dnaStrand2]) {
        nucleotide.draw(angle);
    }

    requestAnimationFrame(animate);
}

function handleScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        angle += 0.05;
    } else {
        angle -= 0.05;
    }
    lastScrollTop = st <= 0 ? 0 : st;
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();

const canvas = document.getElementById('dnaCanvas');
const ctx = canvas.getContext('2d');

// Add scanline effect
const scanlineDiv = document.createElement('div');
scanlineDiv.className = 'scanline';
document.body.appendChild(scanlineDiv);

// Add progress bar
const progressBar = document.createElement('div');
progressBar.className = 'eva-progress-bar';
document.body.appendChild(progressBar);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

// NGE-inspired palette
const dnaColors = ['rgba(0, 161, 228, 0.8)', 'rgba(252, 63, 124, 0.8)', 'rgba(121, 242, 117, 0.8)', 'rgba(247, 173, 25, 0.8)'];
const backgroundColor = 'rgba(13, 14, 24, 0.2)';

class Nucleotide {
    constructor(x, y, z, character, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.character = character;
        this.color = color;
        this.pulse = 0;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
    }

    project(angle) {
        const rotatedX = this.x * Math.cos(angle) - this.z * Math.sin(angle);
        const rotatedZ = this.x * Math.sin(angle) + this.z * Math.cos(angle);
        const scale = 1000 / (1000 + rotatedZ);
        return {
            x: rotatedX * scale + canvas.width / 2,
            y: this.y * scale + canvas.height / 2,
            scale: scale,
            depth: rotatedZ
        };
    }

    draw(angle) {
        const projected = this.project(angle);
        
        // Only draw if it's in front
        if (projected.depth < 200) {
            this.pulse += this.pulseSpeed;
            const pulseFactor = 0.5 + Math.sin(this.pulse) * 0.5;
            
            // Create a glowing effect
            const glowSize = 2 + pulseFactor * 3;
            ctx.shadowBlur = glowSize;
            ctx.shadowColor = this.color.replace('0.8', '1');
            
            ctx.fillStyle = this.color;
            const fontSize = (14 + pulseFactor * 4) * projected.scale;
            ctx.font = `${fontSize}px "Roboto Mono"`;
            ctx.fillText(this.character, projected.x, projected.y);
            
            // Draw connecting lines for DNA backbone with gradient
            if (this.paired) {
                const pairedProjected = this.paired.project(angle);
                const gradient = ctx.createLinearGradient(
                    projected.x, projected.y,
                    pairedProjected.x, pairedProjected.y
                );
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, this.paired.color);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1 * projected.scale;
                ctx.beginPath();
                ctx.moveTo(projected.x, projected.y);
                ctx.lineTo(pairedProjected.x, pairedProjected.y);
                ctx.stroke();
            }
        }
    }
}

const dnaStrand1 = [];
const dnaStrand2 = [];
const strandLength = 100;
const radius = 200;
const verticalSpacing = 15;

// NERV/SEELE symbols to occasionally replace nucleotides
const specialSymbols = ['♱', '∞', '♦', '△', '☥', '⚠'];

// More NGE-inspired DNA sequence
const baseMap = {
    'A': 'T',
    'T': 'A',
    'C': 'G',
    'G': 'C'
};

for (let i = 0; i < strandLength; i++) {
    const angle = (i / strandLength) * Math.PI * 4;
    const y = i * verticalSpacing - (strandLength * verticalSpacing) / 2;
    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;
    
    // Randomly choose a special symbol occasionally
    let char1, char2;
    if (Math.random() < 0.05) {
        // Use special symbol
        char1 = specialSymbols[Math.floor(Math.random() * specialSymbols.length)];
        char2 = specialSymbols[Math.floor(Math.random() * specialSymbols.length)];
    } else {
        // Use DNA base pairs
        char1 = Math.random() < 0.5 ? 'A' : (Math.random() < 0.5 ? 'T' : (Math.random() < 0.5 ? 'C' : 'G'));
        char2 = baseMap[char1];
    }
    
    const colorIndex1 = Math.floor(Math.random() * dnaColors.length);
    const colorIndex2 = (colorIndex1 + 2) % dnaColors.length; // Complementary color
    
    const nucleotide1 = new Nucleotide(x1, y, z1, char1, dnaColors[colorIndex1]);
    const nucleotide2 = new Nucleotide(x2, y, z2, char2, dnaColors[colorIndex2]);
    
    // Create pairing between complementary nucleotides
    nucleotide1.paired = nucleotide2;
    nucleotide2.paired = nucleotide1;
    
    dnaStrand1.push(nucleotide1);
    dnaStrand2.push(nucleotide2);
}

let angle = 0;
let targetAngle = 0;
let rotationSpeed = 0.005;

// For scroll animation of sections
const sections = document.querySelectorAll('main section');
let lastScrollY = window.scrollY;
let ticking = false;

function animate() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Sort nucleotides by depth for proper z-index rendering
    const allNucleotides = [...dnaStrand1, ...dnaStrand2].sort((a, b) => {
        const projA = a.project(angle);
        const projB = b.project(angle);
        return projB.depth - projA.depth;
    });
    
    // Draw nucleotides in sorted order
    for (const nucleotide of allNucleotides) {
        nucleotide.draw(angle);
    }
    
    // Smooth rotation towards target angle
    angle += (targetAngle - angle) * 0.05 + rotationSpeed;
    
    // Keep rotation within bounds to prevent floating point issues
    if (angle > Math.PI * 2) {
        angle -= Math.PI * 2;
        targetAngle -= Math.PI * 2;
    }
    
    requestAnimationFrame(animate);
}

// Scroll event handling
function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY;
            
            // Adjust DNA rotation based on scroll direction and speed
            targetAngle += scrollDelta * 0.001;
            
            // Update progress bar
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrollPercent}%`;
            
            // Check which sections are in viewport and apply active class
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const inView = (
                    rect.top <= window.innerHeight * 0.75 &&
                    rect.bottom >= window.innerHeight * 0.25
                );
                
                if (inView) {
                    section.classList.add('active');
                }
            });
            
            lastScrollY = currentScrollY;
            ticking = false;
        });
        
        ticking = true;
    }
}

// Apply glitch text effect to heading
function setupGlitchEffect() {
    const heading = document.querySelector('h1');
    if (heading) {
        heading.classList.add('glitch-text');
        heading.setAttribute('data-text', heading.textContent);
    }
    
    // Add terminal cursor to heading
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    if (heading) heading.appendChild(cursor);
    
    // Apply animations to sections on load
    setTimeout(() => {
        handleScroll(); // Initialize section visibility
    }, 500);
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', handleScroll);
window.addEventListener('DOMContentLoaded', setupGlitchEffect);

animate();

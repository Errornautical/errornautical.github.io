// Get the canvas and set up context
const canvas = document.getElementById('dnaCanvas');
canvas.id = 'brainCanvas'; // Change the ID to match our new theme
const ctx = canvas.getContext('2d');

// Add scanline effect
const scanlineDiv = document.createElement('div');
scanlineDiv.className = 'scanline';
document.body.appendChild(scanlineDiv);

// Add progress bar
const progressBar = document.createElement('div');
progressBar.className = 'ai-progress-bar';
document.body.appendChild(progressBar);

// Resize canvas to fill window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

// Initialize brain parameters
const brain = {
    x: canvas.width / 2,
    y: canvas.height / 2 - 50, // Slightly above center
    radius: 150,
    segments: 30,
    details: 30,
    openingState: 0, // 0: fully closed, 1: fully open
    targetOpeningState: 0,
    connectionPoints: [],
    neurons: [],
    dataSegments: [],
    codeParticles: []
};

// Set up colors - blue theme
const brainColors = {
    outline: 'rgba(0, 161, 228, 0.8)',
    fill: 'rgba(7, 25, 40, 0.6)',
    connections: 'rgba(0, 228, 255, 0.5)',
    pulses: 'rgba(0, 228, 255, 0.8)',
    text: 'rgba(0, 255, 157, 0.8)'
};

// Create connection points within the brain
function createConnectionPoints() {
    brain.connectionPoints = [];
    const numPoints = 40;
    
    for (let i = 0; i < numPoints; i++) {
        // Place points within the brain
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * brain.radius * 0.8;
        const x = brain.x + Math.cos(angle) * distance;
        const y = brain.y + Math.sin(angle) * distance;
        
        brain.connectionPoints.push({
            x: x,
            y: y,
            size: Math.random() * 3 + 1,
            pulseSpeed: Math.random() * 0.05 + 0.01,
            pulsePhase: Math.random() * Math.PI * 2,
            connections: []
        });
    }
    
    // Create connections between points
    for (let i = 0; i < brain.connectionPoints.length; i++) {
        const point = brain.connectionPoints[i];
        const numConnections = Math.floor(Math.random() * 3) + 1;
        
        for (let j = 0; j < numConnections; j++) {
            // Find a point to connect to
            const targetIndex = Math.floor(Math.random() * brain.connectionPoints.length);
            if (targetIndex !== i) {
                point.connections.push(targetIndex);
            }
        }
    }
}

// Create neurons (visual elements) inside the brain
function createNeurons() {
    brain.neurons = [];
    const numNeurons = 120;
    
    for (let i = 0; i < numNeurons; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * brain.radius * 0.9;
        
        brain.neurons.push({
            x: brain.x + Math.cos(angle) * distance,
            y: brain.y + Math.sin(angle) * distance,
            size: Math.random() * 4 + 1,
            pulseSpeed: Math.random() * 0.08 + 0.02,
            pulsePhase: Math.random() * Math.PI * 2,
            color: Math.random() < 0.7 ? brainColors.connections : brainColors.pulses,
            type: Math.random() < 0.5 ? 'circle' : 'square',
            visible: true
        });
    }
}

// Function to create code particles that float around
function createCodeParticles() {
    // Binary and code snippets to use
    const codeFragments = [
        "01", "10", "00", "11", 
        "function", "while", "for", "if", "else",
        "const", "let", "var", 
        "<div>", "</div>", "<span>", 
        "0x", "0b", "int", "float", 
        "async", "await", 
        "return", "class", "import"
    ];

    // Remove old particles
    document.querySelectorAll('.code-particle').forEach(p => p.remove());
    brain.codeParticles = [];
    
    // Create new particles
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        
        // Random code fragment or number
        particle.textContent = Math.random() < 0.5 ? 
            codeFragments[Math.floor(Math.random() * codeFragments.length)] : 
            Math.floor(Math.random() * 1000).toString();
        
        // Random position within the brain
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * brain.radius * (brain.openingState > 0.5 ? 1.5 : 0.85);
        const x = brain.x + Math.cos(angle) * distance;
        const y = brain.y + Math.sin(angle) * distance;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = brain.openingState > 0.3 ? '0.7' : '0';
        
        // Add movement data
        const particleData = {
            element: particle,
            x: x,
            y: y,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 5 + 8
        };
        
        particle.style.fontSize = `${particleData.size}px`;
        brain.codeParticles.push(particleData);
        document.body.appendChild(particle);
    }
}

// Create data segments (floating code/data blocks)
function createDataSegments() {
    // Remove old segments
    document.querySelectorAll('.data-segment').forEach(s => s.remove());
    brain.dataSegments = [];
    
    const dataTypes = [
        "Neural Network",
        "Decision Matrix",
        "RNN Layer",
        "CNN Weights",
        "Training Data",
        "Genetic Algorithm",
        "Binary Tree",
        "Quantum Bit",
        "Hash Function",
        "Logic Gate"
    ];
    
    // Create new segments
    for (let i = 0; i < 8; i++) {
        const segment = document.createElement('div');
        segment.className = 'data-segment';
        
        // Generate some fake data/code content
        const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
        segment.innerHTML = `<strong>${dataType}</strong><br>` + 
            (Math.random().toString(16).substring(2, 10)) + "<br>" +
            (Math.random() < 0.5 ? "0x" : "") + (Math.floor(Math.random() * 10000)).toString(16);
        
        // Position around the brain (more spread out when open)
        const angle = (i / 8) * Math.PI * 2;
        const distance = brain.radius * (1.1 + brain.openingState * 0.5);
        const x = brain.x + Math.cos(angle) * distance;
        const y = brain.y + Math.sin(angle) * distance;
        
        segment.style.left = `${x}px`;
        segment.style.top = `${y}px`;
        segment.style.opacity = brain.openingState > 0.5 ? '1' : '0';
        
        brain.dataSegments.push({
            element: segment,
            angle: angle,
            distance: distance
        });
        
        document.body.appendChild(segment);
    }
}

// Initialize all visual elements
function initializeBrain() {
    createConnectionPoints();
    createNeurons();
    createCodeParticles();
    createDataSegments();
}

// Function to draw the brain outline
function drawBrainOutline() {
    // Draw the overall brain shape
    ctx.strokeStyle = brainColors.outline;
    ctx.fillStyle = brainColors.fill;
    ctx.lineWidth = 2;
    
    // Draw main brain outline (slightly squashed circle)
    ctx.beginPath();
    
    // The brain shape changes as it "opens"
    for (let i = 0; i <= brain.segments; i++) {
        const angle = (i / brain.segments) * Math.PI * 2;
        let radius = brain.radius;
        
        // Make the brain oval-shaped
        radius *= (1 - 0.2 * Math.abs(Math.sin(angle)));
        
        // Create the opening effect in the top of the brain
        if (angle > Math.PI * 0.2 && angle < Math.PI * 0.8) {
            // Top part of the brain, where it opens
            const openingFactor = Math.sin((angle - Math.PI * 0.2) / (Math.PI * 0.6) * Math.PI);
            radius *= (1 + openingFactor * brain.openingState * 0.5);
        }
        
        const x = brain.x + Math.cos(angle) * radius;
        const y = brain.y + Math.sin(angle) * radius;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Add details to the brain surface
    for (let i = 0; i < brain.details; i++) {
        const angle = (i / brain.details) * Math.PI * 2;
        const startRadius = brain.radius * (1 - 0.2 * Math.abs(Math.sin(angle)));
        const foldDepth = Math.random() * 15 + 5;
        
        // Don't draw folds in the opening part when brain is open
        if (brain.openingState > 0.3 && angle > Math.PI * 0.1 && angle < Math.PI * 0.9) {
            continue;
        }
        
        ctx.beginPath();
        ctx.moveTo(
            brain.x + Math.cos(angle) * (startRadius - foldDepth),
            brain.y + Math.sin(angle) * (startRadius - foldDepth)
        );
        
        // Create a curved fold
        const foldWidth = Math.PI * (Math.random() * 0.1 + 0.05);
        const foldPoints = 5;
        
        for (let j = 0; j <= foldPoints; j++) {
            const foldAngle = angle + (j / foldPoints - 0.5) * foldWidth;
            const foldRadius = startRadius - foldDepth * Math.sin(j * Math.PI / foldPoints);
            
            ctx.lineTo(
                brain.x + Math.cos(foldAngle) * foldRadius,
                brain.y + Math.sin(foldAngle) * foldRadius
            );
        }
        
        ctx.strokeStyle = brainColors.outline;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Function to draw a pulsing connection between two points
function drawConnection(p1, p2, time) {
    // Calculate the distance between the points
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Only draw if within the brain radius when closed
    if (distance > brain.radius * 2 && brain.openingState < 0.3) {
        return;
    }
    
    // Create a pulsing effect along the connection
    const pulseSpeed = 0.05;
    const pulseWavelength = 50;
    const pulseCount = Math.floor(distance / pulseWavelength) + 1;
    
    // Draw the base connection line
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = brainColors.connections;
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    // Draw pulses along the line
    for (let i = 0; i < pulseCount; i++) {
        const pulseFraction = (i / pulseCount) + (time * pulseSpeed % 1);
        if (pulseFraction > 1) continue;
        
        const pulseX = p1.x + dx * pulseFraction;
        const pulseY = p1.y + dy * pulseFraction;
        const pulseSize = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = brainColors.pulses;
        ctx.fill();
    }
}

// Function to update code particles
function updateCodeParticles(time) {
    brain.codeParticles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Keep particles within/around the brain
        const distanceFromCenter = Math.sqrt(
            Math.pow(particle.x - brain.x, 2) + 
            Math.pow(particle.y - brain.y, 2)
        );
        
        // If particle is too far from brain, push it back
        const maxDistance = brain.radius * (1 + brain.openingState);
        if (distanceFromCenter > maxDistance) {
            const angle = Math.atan2(particle.y - brain.y, particle.x - brain.x);
            particle.speedX -= Math.cos(angle) * 0.01;
            particle.speedY -= Math.sin(angle) * 0.01;
        }
        
        // Set the new position
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        
        // Adjust visibility based on brain opening
        particle.element.style.opacity = brain.openingState > 0.3 ? '0.7' : '0';
    });
}

// Function to update data segments
function updateDataSegments() {
    brain.dataSegments.forEach((segment, i) => {
        // Update position based on brain opening state
        const angle = segment.angle;
        const distance = brain.radius * (1.1 + brain.openingState * 0.5);
        const x = brain.x + Math.cos(angle) * distance;
        const y = brain.y + Math.sin(angle) * distance;
        
        segment.element.style.left = `${x}px`;
        segment.element.style.top = `${y}px`;
        
        // Update visibility based on opening state
        segment.element.style.opacity = brain.openingState > 0.5 ? '1' : '0';
        
        // Add slight rotation animation
        segment.element.style.transform = `rotate(${Math.sin(Date.now() / 2000 + i) * 5}deg)`;
    });
}

// Draw connection points and their connections
function drawConnectionPoints(time) {
    // Draw connections between points first (underneath)
    brain.connectionPoints.forEach(point => {
        point.connections.forEach(targetIndex => {
            const targetPoint = brain.connectionPoints[targetIndex];
            drawConnection(point, targetPoint, time);
        });
    });
    
    // Then draw the points themselves
    brain.connectionPoints.forEach(point => {
        // Create a pulsing effect
        const pulse = Math.sin(time * point.pulseSpeed + point.pulsePhase) * 0.5 + 0.5;
        const size = point.size * (1 + pulse * 0.5);
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = brainColors.connections;
        ctx.fill();
    });
}

// Draw neurons inside the brain
function drawNeurons(time) {
    brain.neurons.forEach(neuron => {
        // Skip if not visible
        if (!neuron.visible) return;
        
        // Calculate pulsing effect
        const pulse = Math.sin(time * neuron.pulseSpeed + neuron.pulsePhase) * 0.5 + 0.5;
        const size = neuron.size * (1 + pulse * 0.5);
        
        // Draw based on neuron type
        if (neuron.type === 'circle') {
            ctx.beginPath();
            ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
            ctx.fillStyle = neuron.color;
            ctx.fill();
        } else {
            // Square type
            ctx.fillStyle = neuron.color;
            ctx.fillRect(neuron.x - size/2, neuron.y - size/2, size, size);
        }
    });
}

// Update brain opening animation
function updateBrainState() {
    // Smoothly animate between states
    const openingSpeed = 0.02;
    if (brain.openingState < brain.targetOpeningState) {
        brain.openingState = Math.min(brain.openingState + openingSpeed, brain.targetOpeningState);
    } else if (brain.openingState > brain.targetOpeningState) {
        brain.openingState = Math.max(brain.openingState - openingSpeed, brain.targetOpeningState);
    }
    
    // Update visible neurons based on opening state
    brain.neurons.forEach(neuron => {
        // Calculate distance from center
        const dx = neuron.x - brain.x;
        const dy = neuron.y - brain.y;
        const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
        
        // Hide neurons near the top when brain is opening
        const angle = Math.atan2(dy, dx);
        if (angle > -Math.PI * 0.8 && angle < Math.PI * 0.2 && 
            distanceFromCenter > brain.radius * 0.7) {
            neuron.visible = brain.openingState < 0.3;
        } else {
            neuron.visible = true;
        }
    });
    
    // Update progress bar width
    progressBar.style.width = `${brain.openingState * 100}%`;
}

// Main animation function
function animateBrain() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get current time in seconds
    const time = Date.now() / 1000;
    
    // Update brain state
    updateBrainState();
    
    // Draw brain components
    drawBrainOutline();
    drawConnectionPoints(time);
    drawNeurons(time);
    
    // Update floating elements
    updateCodeParticles(time);
    updateDataSegments();
    
    // Continue animation
    requestAnimationFrame(animateBrain);
}

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    
    // Update brain position
    brain.x = canvas.width / 2;
    brain.y = canvas.height / 2 - 50;
    
    // Recreate brain elements
    initializeBrain();
});

// Toggle brain opening on click
canvas.addEventListener('click', () => {
    brain.targetOpeningState = brain.targetOpeningState > 0.5 ? 0 : 1;
});

// Add hover effect for code particles
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Make nearby particles avoid the mouse
    brain.codeParticles.forEach(particle => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < 100) {
            // Push particles away from cursor
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) * 0.01;
            particle.speedX += Math.cos(angle) * force;
            particle.speedY += Math.sin(angle) * force;
        }
    });
});

// Initialize and start animation
function init() {
    resizeCanvas();
    initializeBrain();
    animateBrain();
    
    // Add some custom text
    const titleDiv = document.createElement('div');
    titleDiv.className = 'brain-title';
    titleDiv.textContent = 'NEURAL INTERFACE';
    document.body.appendChild(titleDiv);
    
    // Add a status indicator
    const statusDiv = document.createElement('div');
    statusDiv.className = 'brain-status';
    statusDiv.innerHTML = '<span class="status-dot"></span> SYSTEM ONLINE';
    document.body.appendChild(statusDiv);
}

// Add CSS for the additional elements
function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        body {
            margin: 0;
            overflow: hidden;
            background-color: #070c14;
            font-family: 'Consolas', 'Courier New', monospace;
            color: #00e4ff;
        }
        
        #brainCanvas {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        
        .scanline {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(0, 255, 255, 0.1);
            opacity: 0.7;
            z-index: 10;
            animation: scanline 6s linear infinite;
            pointer-events: none;
        }
        
        @keyframes scanline {
            0% { top: 0%; }
            100% { top: 100%; }
        }
        
        .ai-progress-bar {
            position: fixed;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            width: 0%;
            height: 5px;
            background: linear-gradient(to right, #00a1e4, #00ffcb);
            z-index: 10;
            transition: width 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 0 10px #00a1e4;
        }
        
        .code-particle {
            position: absolute;
            color: #00e4ff;
            opacity: 0;
            transition: opacity 0.5s;
            z-index: 2;
            pointer-events: none;
            text-shadow: 0 0 5px #00a1e4;
        }
        
        .data-segment {
            position: absolute;
            background-color: rgba(7, 25, 40, 0.7);
            border: 1px solid rgba(0, 161, 228, 0.8);
            padding: 8px;
            border-radius: 5px;
            font-size: 10px;
            color: #00ffcb;
            opacity: 0;
            transition: opacity 0.5s, transform 0.5s;
            z-index: 2;
            width: 120px;
            box-shadow: 0 0 15px rgba(0, 161, 228, 0.4);
            pointer-events: none;
        }
        
        .brain-title {
            position: fixed;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 3px;
            color: #00ffcb;
            text-shadow: 0 0 10px #00a1e4;
            z-index: 5;
        }
        
        .brain-status {
            position: fixed;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            color: #00e4ff;
            z-index: 5;
        }
        
        .status-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #00ffcb;
            border-radius: 50%;
            margin-right: 5px;
            box-shadow: 0 0 5px #00ffcb;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(styleElement);
}

// Call init when page loads
window.onload = function() {
    addStyles();
    init();
};

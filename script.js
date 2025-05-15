// Simple fade-in folder animation for sections using Intersection Observer

document.addEventListener('DOMContentLoaded', () => {
    // Set up Intersection Observer for folder animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section.folder').forEach(section => {
        observer.observe(section);
    });

    // Set up smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Set up card click handlers
    const cardContent = {
        about: {
            title: "About Me",
            content: `
                <p>I am a Bioinformatics Engineer with a passion for blending computational biology with cutting-edge technology. 
                My expertise lies in developing innovative solutions for biological data analysis and machine learning applications.</p>
            `
        },
        education: {
            title: "Education",
            content: `
                <div class="education-item">
                    <h4>Master's in Systems Biology Bioinformatics & Computational Biology</h4>
                    <p>Panjab University, Chandigarh | 2022 - 2024 | 75%</p>
                </div>
                <div class="education-item">
                    <h4>B.Sc. (Hons) in Agriculture</h4>
                    <p>Baddi University of Emerging Sciences and Technology, Solan | 2018 – 2022 | 82.9%</p>
                </div>
            `
        },
        skills: {
            title: "Technical Skills",
            content: `
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4>Programming Languages</h4>
                        <p>Python, R</p>
                    </div>
                    <div class="skill-category">
                        <h4>DevOps & Cloud</h4>
                        <p>Docker, Linux, AWS</p>
                    </div>
                    <div class="skill-category">
                        <h4>AI & ML</h4>
                        <p>LLMs, API Integration</p>
                    </div>
                </div>
            `
        },
        work: {
            title: "Work Experience",
            content: `
                <div class="experience-item">
                    <h4>Bioinformatics Engineer at Shire Bio</h4>
                    <p class="period">Aug 2024 - Present</p>
                    <ul>
                        <li>Optimized Docker containers for bioinformatics tools</li>
                        <li>Managed deployments with rigorous testing</li>
                        <li>Developed AI-generated pipelines for user acquisition</li>
                        <li>Enhanced cloud infrastructure with live testing</li>
                    </ul>
                </div>
            `
        },
        research: {
            title: "Research Experience",
            content: `
                <div class="research-item">
                    <h4>Master's Thesis</h4>
                    <p>Mapping genetic associations between neurodegenerative and neurodevelopmental disorders</p>
                </div>
            `
        },
        project1: {
            title: "ML Model for Molecular Descriptor",
            content: `
                <p>Developed a machine learning model for predicting molecular solubility using scikit-learn and pandas.</p>
                <div class="project-details">
                    <h4>Key Features:</h4>
                    <ul>
                        <li>Implemented advanced molecular descriptor calculations</li>
                        <li>Utilized machine learning algorithms for prediction</li>
                        <li>Integrated with existing bioinformatics pipelines</li>
                    </ul>
                </div>
            `
        },
        project2: {
            title: "Mistral LLM Fine-Tuning",
            content: `
                <p>Fine-tuned Mistral LLM on Indian Agriculture Dataset using Hugging Face and PyTorch.</p>
                <div class="project-details">
                    <h4>Key Features:</h4>
                    <ul>
                        <li>Custom dataset preparation and preprocessing</li>
                        <li>Model fine-tuning and optimization</li>
                        <li>Performance evaluation and validation</li>
                    </ul>
                </div>
            `
        }
    };

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const cardType = card.getAttribute('data-card');
            if (cardContent[cardType]) {
                showModal(cardContent[cardType]);
            }
        });
    });

    // Set up modal close button
    document.querySelector('.close-modal').addEventListener('click', () => {
        hideModal();
    });

    // Close modal when clicking outside
    document.getElementById('cardModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            hideModal();
        }
    });

    // Initialize animation immediately
    init();
    animate();
});

// Modal functions
function showModal(content) {
    const modal = document.getElementById('cardModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <h3>${content.title}</h3>
        ${content.content}
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    const modal = document.getElementById('cardModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Three.js Neural Network Animation
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

let camera, scene, renderer;
let particles, lines;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f7ff); // Light blue background

    // Create particles (nodes)
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Create a more dynamic structure for particles
    const gridSize = Math.sqrt(particleCount);
    const spacing = 12;
    let index = 0;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            // Add some randomness to the z-position
            const z = Math.random() * 10 - 5;
            positions[index * 3] = (i - gridSize / 2) * spacing;
            positions[index * 3 + 1] = (j - gridSize / 2) * spacing;
            positions[index * 3 + 2] = z;

            // Add blue color variation based on position
            const hue = 0.6 + (i / gridSize + j / gridSize) * 0.1; // Blue hue range
            const saturation = 0.7;
            const lightness = 0.5 + Math.random() * 0.2;
            
            // Convert HSL to RGB
            const rgb = hslToRgb(hue, saturation, lightness);
            colors[index * 3] = rgb[0];
            colors[index * 3 + 1] = rgb[1];
            colors[index * 3 + 2] = rgb[2];

            index++;
        }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 2.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create lines (connections)
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const lineColors = [];

    // Create connections between nearby particles
    const particlePositions = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            const dx = particlePositions[i * 3] - particlePositions[j * 3];
            const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
            const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            // Connect particles that are close to each other
            if (distance < spacing * 1.8) {
                linePositions.push(
                    particlePositions[i * 3], particlePositions[i * 3 + 1], particlePositions[i * 3 + 2],
                    particlePositions[j * 3], particlePositions[j * 3 + 1], particlePositions[j * 3 + 2]
                );

                // Add color for the line based on the connected particles
                const color1 = new THREE.Color(
                    colors[i * 3],
                    colors[i * 3 + 1],
                    colors[i * 3 + 2]
                );
                const color2 = new THREE.Color(
                    colors[j * 3],
                    colors[j * 3 + 1],
                    colors[j * 3 + 2]
                );

                lineColors.push(
                    color1.r, color1.g, color1.b,
                    color2.r, color2.g, color2.b
                );
            }
        }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.4
    });

    lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Setup renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        canvasContainer.appendChild(renderer.domElement);
    } else {
        console.error('Canvas container not found!');
    }

    // Event listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

function animate() {
    requestAnimationFrame(animate);

    // More dynamic rotation based on mouse position
    const rotationSpeed = 0.0005;
    particles.rotation.x += rotationSpeed + (mouseX * 0.0001);
    particles.rotation.y += rotationSpeed + (mouseY * 0.0001);
    lines.rotation.x = particles.rotation.x;
    lines.rotation.y = particles.rotation.y;

    // Move camera based on mouse position with smoother interpolation
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Helper function to convert HSL to RGB
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r, g, b];
}
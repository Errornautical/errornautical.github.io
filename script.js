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
    scene.background = new THREE.Color(0x000000);

    // Create particles (nodes)
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Create a grid-like structure for particles
    const gridSize = Math.sqrt(particleCount);
    const spacing = 10;
    let index = 0;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            positions[index * 3] = (i - gridSize / 2) * spacing;
            positions[index * 3 + 1] = (j - gridSize / 2) * spacing;
            positions[index * 3 + 2] = 0;

            // Grey color with slight variation
            const grey = 0.3 + Math.random() * 0.2;
            colors[index * 3] = grey;
            colors[index * 3 + 1] = grey;
            colors[index * 3 + 2] = grey;

            index++;
        }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 2,
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
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Connect particles that are close to each other
            if (distance < spacing * 1.5) {
                linePositions.push(
                    particlePositions[i * 3], particlePositions[i * 3 + 1], particlePositions[i * 3 + 2],
                    particlePositions[j * 3], particlePositions[j * 3 + 1], particlePositions[j * 3 + 2]
                );

                // Add grey color for the line
                const grey = 0.2 + Math.random() * 0.1;
                lineColors.push(grey, grey, grey, grey, grey, grey);
            }
        }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3
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

    // Rotate the entire network
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.001;
    lines.rotation.x += 0.001;
    lines.rotation.y += 0.001;

    // Move camera based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
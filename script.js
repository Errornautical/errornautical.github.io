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

// Three.js ASCII Animation
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { AsciiEffect } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/effects/AsciiEffect.js';

let camera, scene, renderer, effect;
let torus, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const characters = '01AI/ML<>[]{}()*&^%$#@!~+-=';
const asciiCharacters = characters.split('');

function init() {
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    // Create torus with more visible geometry
    const geometry = new THREE.TorusGeometry(12, 4, 24, 100);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x2563eb,
        shininess: 100,
        specular: 0x444444
    });
    torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Add particles with more density
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;

        colors[i] = 0.3 + Math.random() * 0.7;
        colors[i + 1] = 0.3 + Math.random() * 0.7;
        colors[i + 2] = 0.3 + Math.random() * 0.7;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Enhanced lighting
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0, 1);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(ambientLight);

    // Setup renderer with better quality
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Setup ASCII effect with better contrast
    effect = new AsciiEffect(renderer, asciiCharacters, { 
        invert: true,
        resolution: 0.15,
        strResolution: 0.5
    });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = '#2563eb';
    effect.domElement.style.backgroundColor = 'transparent';
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0';
    effect.domElement.style.left = '0';
    effect.domElement.style.pointerEvents = 'none';
    effect.domElement.style.zIndex = '-1';
    effect.domElement.style.fontFamily = 'monospace';
    effect.domElement.style.fontSize = '8px';
    effect.domElement.style.lineHeight = '8px';
    effect.domElement.style.opacity = '0.2';

    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        canvasContainer.appendChild(effect.domElement);
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
    effect.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

function animate() {
    requestAnimationFrame(animate);

    // Smoother rotation
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.005;

    // Slower particle rotation
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0003;

    // Smoother camera movement
    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    effect.render(scene, camera);
}
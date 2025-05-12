// Three.js setup
let scene, camera, renderer;
let particles = [];

// Initialize Three.js
function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Create particles
    createParticles();

    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x2563eb,
        size: 0.02,
        transparent: true,
        opacity: 0.5
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

// GSAP Scroll Animations
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('.section.folder').forEach((section, i) => {
        gsap.fromTo(section, 
            {
                opacity: 0,
                y: 100,
                rotateX: -15
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Animate cards
    gsap.utils.toArray('.card').forEach((card, i) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 50,
                rotateX: -10
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom center",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// Card content data
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js
    initThreeJS();

    // Initialize scroll animations
    initScrollAnimations();

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
});

// Handle window resize
window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 
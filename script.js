// Get the canvas and set up context
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fill window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

// Background particle system
const particles = [];
const PARTICLE_COUNT = 70;
const PARTICLE_SIZE_MIN = 1;
const PARTICLE_SIZE_MAX = 3;
const CONNECTION_DISTANCE = 120;

// Color theme based on edh.dev
const colors = {
    primary: '#5E35B1', // Purple
    secondary: '#7E57C2', // Lighter purple
    accent: '#FF9800', // Orange
    background: '#111111', // Very dark gray almost black
    lightText: '#E0E0E0', // Off-white
    darkText: '#757575', // Medium gray
    particles: '#5E35B1' // Purple for particles
};

// Initialize particles
function initParticles() {
    particles.length = 0;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: colors.particles
        });
    }
}

// Draw a single particle
function drawParticle(particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
}

// Draw connections between particles
function drawConnections() {
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < CONNECTION_DISTANCE) {
                // Fade opacity based on distance
                const opacity = 1 - (distance / CONNECTION_DISTANCE);
                ctx.strokeStyle = `rgba(94, 53, 177, ${opacity * 0.5})`;
                
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Update particle positions
function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around screen edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    }
}

// Main animation loop
function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update particles
    updateParticles();
    
    // Draw connections and particles
    drawConnections();
    particles.forEach(drawParticle);
    
    // Continue animation
    requestAnimationFrame(animate);
}

// Initialize the page
function init() {
    // Create header elements
    const header = document.createElement('header');
    const name = document.createElement('h1');
    name.textContent = 'Your Name';
    name.classList.add('glitch-text');
    name.setAttribute('data-text', 'Your Name');
    
    const title = document.createElement('p');
    title.textContent = 'Software Engineer / Developer / Designer';
    
    header.appendChild(name);
    header.appendChild(title);
    document.body.appendChild(header);
    
    // Create nav
    const nav = document.createElement('nav');
    const navItems = ['About', 'Projects', 'Experience', 'Contact'];
    
    navItems.forEach(item => {
        const link = document.createElement('a');
        link.textContent = item;
        link.href = `#${item.toLowerCase()}`;
        nav.appendChild(link);
    });
    
    document.body.appendChild(nav);
    
    // Create main content
    const main = document.createElement('main');
    
    // About section
    const aboutSection = document.createElement('section');
    aboutSection.id = 'about';
    aboutSection.classList.add('section');
    
    const aboutHeading = document.createElement('h2');
    aboutHeading.textContent = 'About Me';
    
    const aboutContent = document.createElement('div');
    aboutContent.classList.add('content');
    aboutContent.innerHTML = `
        <p>Hi, I'm a software developer with a passion for creating elegant solutions to complex problems. 
        I specialize in web development, machine learning, and building applications that make a difference.</p>
        
        <p>With over 5 years of experience in the industry, I've worked on projects ranging from 
        small business websites to enterprise-level applications.</p>
    `;
    
    aboutSection.appendChild(aboutHeading);
    aboutSection.appendChild(aboutContent);
    main.appendChild(aboutSection);
    
    // Projects section
    const projectsSection = document.createElement('section');
    projectsSection.id = 'projects';
    projectsSection.classList.add('section');
    
    const projectsHeading = document.createElement('h2');
    projectsHeading.textContent = 'Projects';
    
    const projectsContent = document.createElement('div');
    projectsContent.classList.add('content', 'projects-grid');
    
    // Create project cards
    const projects = [
        {
            title: 'Project One',
            description: 'A web application for tracking personal finances.',
            technologies: ['React', 'Node.js', 'MongoDB'],
            link: '#'
        },
        {
            title: 'Project Two',
            description: 'Machine learning model for predicting market trends.',
            technologies: ['Python', 'TensorFlow', 'Pandas'],
            link: '#'
        },
        {
            title: 'Project Three',
            description: 'Mobile app for fitness tracking with social features.',
            technologies: ['Flutter', 'Firebase', 'REST APIs'],
            link: '#'
        }
    ];
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        
        const cardTitle = document.createElement('h3');
        cardTitle.textContent = project.title;
        
        const cardDesc = document.createElement('p');
        cardDesc.textContent = project.description;
        
        const techList = document.createElement('div');
        techList.classList.add('tech-list');
        
        project.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.classList.add('tech-tag');
            techTag.textContent = tech;
            techList.appendChild(techTag);
        });
        
        const cardLink = document.createElement('a');
        cardLink.href = project.link;
        cardLink.textContent = 'View Project';
        cardLink.classList.add('project-link');
        
        card.appendChild(cardTitle);
        card.appendChild(cardDesc);
        card.appendChild(techList);
        card.appendChild(cardLink);
        
        projectsContent.appendChild(card);
    });
    
    projectsSection.appendChild(projectsHeading);
    projectsSection.appendChild(projectsContent);
    main.appendChild(projectsSection);
    
    // Experience section
    const experienceSection = document.createElement('section');
    experienceSection.id = 'experience';
    experienceSection.classList.add('section');
    
    const experienceHeading = document.createElement('h2');
    experienceHeading.textContent = 'Experience';
    
    const experienceContent = document.createElement('div');
    experienceContent.classList.add('content', 'timeline');
    
    const experiences = [
        {
            role: 'Senior Developer',
            company: 'Tech Company',
            period: '2020 - Present',
            description: 'Leading development of web applications and mentoring junior developers.'
        },
        {
            role: 'Web Developer',
            company: 'Digital Agency',
            period: '2018 - 2020',
            description: 'Developed and maintained websites for various clients using modern frameworks.'
        },
        {
            role: 'Junior Developer',
            company: 'Startup Inc.',
            period: '2016 - 2018',
            description: 'Worked on frontend development and gained experience with various technologies.'
        }
    ];
    
    experiences.forEach(exp => {
        const item = document.createElement('div');
        item.classList.add('timeline-item');
        
        const itemHeader = document.createElement('div');
        itemHeader.classList.add('timeline-header');
        
        const role = document.createElement('h3');
        role.textContent = exp.role;
        
        const company = document.createElement('span');
        company.classList.add('company');
        company.textContent = exp.company;
        
        const period = document.createElement('span');
        period.classList.add('period');
        period.textContent = exp.period;
        
        const description = document.createElement('p');
        description.textContent = exp.description;
        
        itemHeader.appendChild(role);
        itemHeader.appendChild(company);
        item.appendChild(itemHeader);
        item.appendChild(period);
        item.appendChild(description);
        
        experienceContent.appendChild(item);
    });
    
    experienceSection.appendChild(experienceHeading);
    experienceSection.appendChild(experienceContent);
    main.appendChild(experienceSection);
    
    // Contact section
    const contactSection = document.createElement('section');
    contactSection.id = 'contact';
    contactSection.classList.add('section');
    
    const contactHeading = document.createElement('h2');
    contactHeading.textContent = 'Contact';
    
    const contactContent = document.createElement('div');
    contactContent.classList.add('content');
    contactContent.innerHTML = `
        <p>Interested in working together? Feel free to reach out through any of the platforms below.</p>
        
        <div class="contact-links">
            <a href="mailto:your.email@example.com" class="contact-link">
                <span class="icon">✉️</span>
                <span>Email</span>
            </a>
            <a href="https://github.com/yourusername" class="contact-link">
                <span class="icon">&#xf09b;</span>
                <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/yourusername" class="contact-link">
                <span class="icon">&#xf08c;</span>
                <span>LinkedIn</span>
            </a>
            <a href="https://twitter.com/yourusername" class="contact-link">
                <span class="icon">&#xf099;</span>
                <span>Twitter</span>
            </a>
        </div>
    `;
    
    contactSection.appendChild(contactHeading);
    contactSection.appendChild(contactContent);
    main.appendChild(contactSection);
    
    document.body.appendChild(main);
    
    // Create footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <p>© ${new Date().getFullYear()} Your Name. All rights reserved.</p>
        <p class="footer-note">Built with <span class="heart">♥</span> and a lot of coffee</p>
    `;
    document.body.appendChild(footer);
    
    // Initialize particles
    initParticles();
    
    // Animate particles
    animate();
    
    // Set up scroll animations
    setupScrollAnimations();
    
    // Show each section as it comes into view
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('active');
    });
}

// Setup animations for elements as they scroll into view
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupSmoothScrolling();
});

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

// ==========================================
// 1. LANGUAGE DICTIONARY (i18n)
// ==========================================
const translations = {
    en: {
        "hero-greeting": "Hi, my name is",
        "hero-subtitle": "AI Researcher & Software Engineer.",
        "hero-bio": "I build intelligent systems. From programming IoT microcontrollers to designing cloud-based Deep Learning predictive models. Currently pursuing a Ph.D. in Generative AI for embedded physical systems.",
        "cta-email": "Let's Talk",
        "section-experience": "Experience & Projects",
        
        "exp-1-title": "Ph.D. Researcher & Software Engineer (CDI)",
        "exp-1-date": "Oct 2025 - Present",
        "exp-1-desc": "Leading the PolluGuard smart-city ecosystem. Researching adaptive control policies using generative AI for constrained physical systems. Successfully deployed and managed the native mobile applications on the Apple App Store and Google Play Store.",
        
        "exp-2-title": "Software Developer & AI Apprentice",
        "exp-2-date": "Sept 2023 - Sept 2025",
        "exp-2-desc": "Developed cross-platform apps (Delphi) for real-time sensor data. Designed, trained, and deployed CNN-LSTM models for air quality prediction and integrated robust cloud APIs."
    },
    fr: {
        "hero-greeting": "Bonjour, je m'appelle",
        "hero-subtitle": "Chercheur en IA & Ingénieur Logiciel.",
        "hero-bio": "Je conçois des systèmes intelligents. De la programmation de microcontrôleurs IoT au déploiement de modèles prédictifs Deep Learning dans le Cloud. Actuellement en Doctorat sur l'IA générative pour les systèmes physiques embarqués.",
        "cta-email": "Me Contacter",
        "section-experience": "Expériences & Projets",
        
        "exp-1-title": "Doctorant Chercheur & Ingénieur Logiciel (CDI)",
        "exp-1-date": "Oct 2025 - Présent",
        "exp-1-desc": "Direction technique de l'écosystème Smart-City PolluGuard. Recherche sur l'IA générative pour le contrôle de systèmes physiques. Déploiement et gestion de l'application mobile en production sur l'App Store (Apple) et le Google Play Store.",
        
        "exp-2-title": "Développeur Logiciel & Apprenti IA",
        "exp-2-date": "Sept 2023 - Sept 2025",
        "exp-2-desc": "Développement d'applications multiplateformes (Delphi) pour les capteurs temps réel. Entraînement et déploiement de modèles CNN-LSTM pour la prédiction de la qualité de l'air."
    }
};


let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    document.getElementById('lang-btn').innerText = currentLang === 'en' ? 'FR' : 'EN';
    
    // Update all text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = translations[currentLang][key];
    });
}

// ==========================================
// 2. THEME TOGGLE (Dark/Light Mode)
// ==========================================
function toggleTheme() {
    const htmlEl = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (htmlEl.getAttribute('data-theme') === 'dark') {
        htmlEl.setAttribute('data-theme', 'light');
        themeIcon.className = 'bi bi-moon-fill';
        update3DColor(0x1abc9c); // Teal for light mode
    } else {
        htmlEl.setAttribute('data-theme', 'dark');
        themeIcon.className = 'bi bi-sun-fill';
        update3DColor(0x8b5cf6); // Purple for dark mode
    }
}

// ==========================================
// 3. THREE.JS 3D PARTICLE NETWORK
// ==========================================
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles (Nodes)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 300; // Number of dots
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles randomly in 3D space
    posArray[i] = (Math.random() - 0.5) * 100;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material (Color starts Purple for Dark Mode)
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: 0x8b5cf6, 
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Function to change 3D color from Theme Toggle
function update3DColor(hexColor) {
    particlesMaterial.color.setHex(hexColor);
}

// Mouse Interactivity
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Auto slow rotation
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Mouse movement parallax effect
    particlesMesh.position.x += (mouseX * 10 - particlesMesh.position.x) * 0.05;
    particlesMesh.position.y += (-mouseY * 10 - particlesMesh.position.y) * 0.05;

    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

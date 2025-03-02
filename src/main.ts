import * as THREE from 'three';
import Stats from 'stats.js';
import GUI from 'lil-gui';

// Set up renderer using the canvas element
const canvas = document.getElementById('bg') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create a scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

// Create a wireframe cube with neon color
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x33ff33, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set up Stats.js to monitor performance
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Set up lil-gui for interactive controls
const gui = new GUI();
const controls = {
  rotationSpeed: 0.01
};
gui.add(controls, 'rotationSpeed', 0, 0.1).name('Cube Speed');

// Animation loop
function animate() {
  stats.begin();

  cube.rotation.x += controls.rotationSpeed;
  cube.rotation.y += controls.rotationSpeed;

  renderer.render(scene, camera);
  stats.end();
  requestAnimationFrame(animate);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

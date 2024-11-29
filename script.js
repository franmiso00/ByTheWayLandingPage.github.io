import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, model;

function init() {
  // Create scene
  scene = new THREE.Scene();

  // Create camera
  camera = new THREE.PerspectiveCamera(60, (window.innerWidth / window.innerHeight), 0.1, 1000);
  camera.position.z = 10;
  camera.position.y = -2;

  // Create renderer
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  const headerBackground = document.getElementById('header-background');
  if (headerBackground) {
    headerBackground.appendChild(renderer.domElement);
  } else {
    console.error('Header background element not found');
    return;
  }

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  // Load 3D model
  const loader = new GLTFLoader();
  loader.load('/models/ducks.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(4, 4, 4); // Adjust scale as needed
    scene.add(model);
  }, undefined, (error) => {
    console.error('An error occurred while loading the 3D model:', error);
  });

  // Add event listener for mouse movement
  document.addEventListener('mousemove', onMouseMove);

  // Start animation loop
  animate();
}

function onMouseMove(event) {
  if (model) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    model.rotation.y = mouseX * 0.1;
    model.rotation.x = mouseY * 0.1;
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Initialize the 3D scene when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

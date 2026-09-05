// ============================================
// Section Navigation System
// ============================================
let currentSection = 0;
const totalSections = 7;
const sectionIds = ['home', 'about', 'skills', 'experience', 'projects', '3d-portfolio', 'contact'];
const sectionNames = ['INICIO', 'SOBRE MI', 'HABILIDADES', 'EXPERIENCIA', 'PROYECTOS', '3D', 'CONTACTO'];
let isTransitioning = false;

function goToSection(index) {
    if (isTransitioning || index === currentSection || index < 0 || index >= totalSections) return;
    
    isTransitioning = true;
    
    const sections = document.querySelectorAll('.screen-section');
    const navItems = document.querySelectorAll('.nav-item');
    const statusSection = document.getElementById('status-section');
    const navCurrentIndex = document.getElementById('nav-current-index');
    const navCurrentName = document.getElementById('nav-current-name');
    const goingRight = index > currentSection;
    
    // Exit current section
    sections[currentSection].classList.remove('active');
    sections[currentSection].classList.add(goingRight ? 'exit-left' : 'exit-right');
    navItems[currentSection].classList.remove('active');
    
    // Prepare new section
    const newSection = sections[index];
    newSection.classList.remove('exit-left', 'exit-right');
    newSection.classList.add(goingRight ? 'enter-right' : 'enter-left');
    
    // Force reflow
    void newSection.offsetWidth;
    
    // Remove enter class and add active
    newSection.classList.remove('enter-right', 'enter-left');
    newSection.classList.add('active');
    
    // Update state
    currentSection = index;
    navItems[currentSection].classList.add('active');
    statusSection.textContent = 'SECCION: ' + sectionNames[currentSection];
    
    // Update mobile nav indicator
    if (navCurrentIndex) navCurrentIndex.textContent = String(currentSection + 1).padStart(2, '0');
    if (navCurrentName) navCurrentName.textContent = sectionNames[currentSection];
    
    // Update mobile nav buttons
    updateMobileNavButtons();
    
    // Disable 3D controls on mobile when in 3D section
    if (controls) {
        var isMobile = window.innerWidth <= 1000;
        if (currentSection === 5 && isMobile) {
            controls.enableRotate = false;
            controls.enableZoom = false;
            controls.enablePan = false;
        } else {
            controls.enableRotate = true;
            controls.enableZoom = true;
            controls.enablePan = true;
        }
    }
    
    // Update URL hash
    history.replaceState(null, null, '#' + sectionIds[currentSection]);
    
    // Cleanup after animation
    setTimeout(function() {
        sections.forEach(function(section, i) {
            if (i !== currentSection) {
                section.classList.remove('exit-left', 'exit-right');
            }
        });
        isTransitioning = false;
    }, 700);
}

// ============================================
// Mobile Nav Buttons State
// ============================================
function updateMobileNavButtons() {
    var prevBtn = document.getElementById('mobile-prev');
    var nextBtn = document.getElementById('mobile-next');
    if (prevBtn) {
        prevBtn.classList.toggle('disabled', currentSection === 0);
    }
    if (nextBtn) {
        nextBtn.classList.toggle('disabled', currentSection === totalSections - 1);
    }
}

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', function(e) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) !== -1) {
        e.preventDefault();
    }
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToSection(currentSection + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToSection(currentSection - 1);
    } else if (e.key === 'Home') {
        goToSection(0);
    } else if (e.key === 'End') {
        goToSection(totalSections - 1);
    } else if (e.key >= '1' && e.key <= '7') {
        goToSection(parseInt(e.key) - 1);
    }
});

// ============================================
// Touch/Swipe Navigation (Mobile)
// ============================================
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    const minSwipeDistance = 50;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
            goToSection(currentSection + 1);
        } else {
            goToSection(currentSection - 1);
        }
    }
}

// ============================================
// Nav Items Click
// ============================================
document.querySelectorAll('.nav-item').forEach(function(item) {
    item.addEventListener('click', function() {
        var index = parseInt(this.getAttribute('data-index'));
        goToSection(index);
    });
});

// ============================================
// Time Display
// ============================================
function updateTime() {
    var now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var seconds = String(now.getSeconds()).padStart(2, '0');
    var el = document.getElementById('status-time');
    if (el) el.textContent = hours + ':' + minutes + ':' + seconds;
}

setInterval(updateTime, 1000);
updateTime();

// ============================================
// Particles Background
// ============================================
function createParticles() {
    var container = document.getElementById('particles');
    if (!container) return;
    
    for (var i = 0; i < 30; i++) {
        var particle = document.createElement('div');
        particle.style.cssText = 'position:absolute;width:' + (Math.random() * 4 + 1) + 'px;height:' + (Math.random() * 4 + 1) + 'px;background:rgba(16,185,129,' + (Math.random() * 0.4 + 0.1) + ');border-radius:50%;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;animation:particleFloat ' + (Math.random() * 15 + 15) + 's linear infinite;animation-delay:' + (Math.random() * 5) + 's;';
        container.appendChild(particle);
    }
}

// ============================================
// Projects Filter
// ============================================
document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        
        var filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.project-card').forEach(function(card) {
            if (filter === 'all' || card.getAttribute('data-category').indexOf(filter) !== -1) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ============================================
// Three.js 3D Viewer
// ============================================
var scene, camera, renderer, controls, currentMesh, currentModel;
var autoRotate = true;
var isWireframe = false;
var currentColor = 0xffffff;

function initThreeJS() {
    var canvas = document.getElementById('canvas-3d');
    if (!canvas) return;
    
    var container = canvas.parentElement;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e14);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    // Disable manual rotation on mobile/tablet
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        controls.enableRotate = false;
        controls.enableZoom = false;
        controls.enablePan = false;
    }

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    var gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0x1e2430);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    window.addEventListener('resize', function() {
        var c = document.getElementById('canvas-3d');
        if (!c) return;
        var cont = c.parentElement;
        camera.aspect = cont.clientWidth / cont.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(cont.clientWidth, cont.clientHeight);
    });

    function animate() {
        requestAnimationFrame(animate);
        if (controls) controls.update();
        if (renderer && scene && camera) renderer.render(scene, camera);
    }
    animate();
}

function createPrimitiveModel(primitive) {
    switch (primitive) {
        case 'cube': return new THREE.BoxGeometry(2, 2, 2);
        case 'sphere': return new THREE.SphereGeometry(1.5, 32, 32);
        case 'torus': return new THREE.TorusGeometry(1, 0.4, 16, 100);
        case 'icosa': return new THREE.IcosahedronGeometry(1.5, 0);
        default: return new THREE.BoxGeometry(2, 2, 2);
    }
}

function loadModel(modelData) {
    var loading = document.getElementById('viewer-loading');
    if (loading) loading.classList.add('active');
    
    if (currentMesh) {
        scene.remove(currentMesh);
        if (currentMesh.geometry) currentMesh.geometry.dispose();
        if (currentMesh.material) currentMesh.material.dispose();
    }

    currentModel = modelData;
    currentColor = modelData.color || 0xffffff;
    
    document.getElementById('model-name').textContent = modelData.name;
    document.getElementById('model-title').textContent = modelData.name;
    document.getElementById('model-description-text').textContent = modelData.description;
    document.getElementById('detail-format').textContent = modelData.format;
    document.getElementById('detail-size').textContent = modelData.size;

    if (modelData.primitive) {
        var geometry = createPrimitiveModel(modelData.primitive);
        var material = new THREE.MeshPhongMaterial({ color: modelData.color, shininess: 100, wireframe: isWireframe });
        currentMesh = new THREE.Mesh(geometry, material);
        if (modelData.rotation) {
            currentMesh.rotation.set(modelData.rotation.x, modelData.rotation.y, modelData.rotation.z);
        }
        scene.add(currentMesh);
        if (loading) loading.classList.remove('active');
    } else if (modelData.file) {
        var fileName = modelData.file.toLowerCase();
        
        if (fileName.endsWith('.glb') || fileName.endsWith('.gltf')) {
            var loader = new THREE.GLTFLoader();
            loader.load('models/' + modelData.file, function(gltf) {
                currentMesh = gltf.scene;
                var box = new THREE.Box3().setFromObject(currentMesh);
                var center = box.getCenter(new THREE.Vector3());
                var size = box.getSize(new THREE.Vector3());
                var maxDim = Math.max(size.x, size.y, size.z);
                var scale = 4 / maxDim;
                currentMesh.scale.multiplyScalar(scale);
                currentMesh.position.sub(center.multiplyScalar(scale));
                if (modelData.rotation) currentMesh.rotation.set(modelData.rotation.x, modelData.rotation.y, modelData.rotation.z);
                currentMesh.updateMatrixWorld(true);
                var newBox = new THREE.Box3().setFromObject(currentMesh);
                var newCenter = newBox.getCenter(new THREE.Vector3());
                currentMesh.position.x -= newCenter.x;
                currentMesh.position.z -= newCenter.z;
                currentMesh.position.y -= (newBox.min.y + 2);
                currentMesh.traverse(function(child) {
                    if (child.isMesh) {
                        child.material.color.setHex(modelData.color || 0xffffff);
                        child.material.wireframe = isWireframe;
                    }
                });
                scene.add(currentMesh);
                if (loading) loading.classList.remove('active');
            }, undefined, function(error) {
                console.error('Error loading GLTF:', error);
                if (loading) loading.classList.remove('active');
            });
        } else if (fileName.endsWith('.stl')) {
            var stlLoader = new THREE.STLLoader();
            stlLoader.load('models/' + modelData.file, function(geometry) {
                var material = new THREE.MeshPhongMaterial({ color: modelData.color || 0xffffff, shininess: 100, wireframe: isWireframe });
                currentMesh = new THREE.Mesh(geometry, material);
                geometry.computeBoundingBox();
                var box = geometry.boundingBox;
                var center = box.getCenter(new THREE.Vector3());
                var size = box.getSize(new THREE.Vector3());
                var maxDim = Math.max(size.x, size.y, size.z);
                var scale = 4 / maxDim;
                currentMesh.scale.multiplyScalar(scale);
                currentMesh.position.sub(center.multiplyScalar(scale));
                if (modelData.rotation) currentMesh.rotation.set(modelData.rotation.x, modelData.rotation.y, modelData.rotation.z);
                currentMesh.updateMatrixWorld(true);
                var newBox = new THREE.Box3().setFromObject(currentMesh);
                var newCenter = newBox.getCenter(new THREE.Vector3());
                currentMesh.position.x -= newCenter.x;
                currentMesh.position.z -= newCenter.z;
                currentMesh.position.y -= (newBox.min.y + 2);
                scene.add(currentMesh);
                if (loading) loading.classList.remove('active');
            }, undefined, function(error) {
                console.error('Error loading STL:', error);
                if (loading) loading.classList.remove('active');
            });
        }
    }
}

function loadModelGrid() {
    var grid = document.getElementById('model-grid');
    if (!grid || typeof models === 'undefined') return;
    grid.innerHTML = '';
    
    models.forEach(function(model, index) {
        var card = document.createElement('div');
        card.className = 'model-card';
        card.setAttribute('data-model-id', model.id);
        card.setAttribute('data-category', model.category);
        
        var iconClass = 'fa-cube';
        if (model.primitive === 'sphere') iconClass = 'fa-circle';
        else if (model.primitive === 'torus') iconClass = 'fa-ring';
        else if (model.primitive === 'icosa') iconClass = 'fa-gem';
        else if (model.format === 'GLB' || model.format === 'GLTF') iconClass = 'fa-file-3d';
        else if (model.format === 'STL') iconClass = 'fa-shapes';
        
        card.innerHTML = '<div class="model-card-icon"><i class="fas ' + iconClass + '"></i></div><div class="model-card-name">' + model.name + '</div><div class="model-card-format">' + model.format + '</div>';
        
        card.addEventListener('click', function() {
            document.querySelectorAll('.model-card').forEach(function(c) { c.classList.remove('active'); });
            card.classList.add('active');
            loadModel(model);
        });
        
        grid.appendChild(card);
        if (index === 0) {
            card.classList.add('active');
            loadModel(model);
        }
    });
}

// Viewer controls
var resetBtn = document.getElementById('reset-view');
if (resetBtn) resetBtn.addEventListener('click', function() {
    camera.position.set(0, 0, 5);
    controls.reset();
});

var wireBtn = document.getElementById('toggle-wireframe');
if (wireBtn) wireBtn.addEventListener('click', function() {
    isWireframe = !isWireframe;
    this.classList.toggle('active');
    if (currentMesh) {
        currentMesh.traverse(function(child) {
            if (child.isMesh) child.material.wireframe = isWireframe;
        });
    }
});

var rotateBtn = document.getElementById('toggle-auto-rotate');
if (rotateBtn) rotateBtn.addEventListener('click', function() {
    autoRotate = !autoRotate;
    controls.autoRotate = autoRotate;
    this.classList.toggle('active');
});

var colorBtn = document.getElementById('toggle-color');
if (colorBtn) colorBtn.addEventListener('click', function() {
    var colors = [0xffffff, 0x10B981, 0x06B6D4, 0x34D399, 0xA7F3D0, 0x059669];
    var currentIndex = colors.indexOf(currentColor);
    currentColor = colors[(currentIndex + 1) % colors.length];
    if (currentMesh) {
        currentMesh.traverse(function(child) {
            if (child.isMesh) child.material.color.setHex(currentColor);
        });
    }
});

// ============================================
// Contact Form
// ============================================
var contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        var data = Object.fromEntries(formData);
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        var btn = this.querySelector('.btn-submit');
        var originalText = btn.innerHTML;
        btn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        setTimeout(function() {
            btn.innerHTML = '<span>Mensaje Enviado!</span><i class="fas fa-check"></i>';
            contactForm.reset();
            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// ============================================
// Intro Animation
// ============================================
function runIntroAnimation() {
    var introScreen = document.getElementById('intro-screen');
    var introTypewriter = document.getElementById('intro-typewriter');
    var introCursor = document.getElementById('intro-cursor');
    if (!introScreen || !introTypewriter) return;
    
    var text = '> Hola, soy Carlos';
    var index = 0;
    var speed = 60;
    
    // Hide cursor initially
    if (introCursor) introCursor.style.visibility = 'hidden';
    
    function typeChar() {
        if (index < text.length) {
            introTypewriter.textContent += text.charAt(index);
            index++;
            
            var nextSpeed = speed + Math.random() * 40 - 20;
            
            if (text.charAt(index - 1) === ',' || text.charAt(index - 1) === '>') {
                nextSpeed = 200;
            }
            
            setTimeout(typeChar, nextSpeed);
        } else {
            // Typing done - show cursor blinking, then fade
            if (introCursor) introCursor.style.visibility = 'visible';
            
            setTimeout(function() {
                introScreen.style.opacity = '0';
                introScreen.style.transition = 'opacity 0.6s ease';
                setTimeout(function() {
                    introScreen.style.display = 'none';
                }, 600);
            }, 1500);
        }
    }
    
    setTimeout(function() {
        if (introCursor) introCursor.style.visibility = 'visible';
        typeChar();
    }, 400);
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initThreeJS();
    loadModelGrid();
    runIntroAnimation();
    updateMobileNavButtons();
    
    var autoBtn = document.getElementById('toggle-auto-rotate');
    if (autoBtn) autoBtn.classList.add('active');
});

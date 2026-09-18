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
    
    sections[currentSection].classList.remove('active');
    sections[currentSection].classList.add(goingRight ? 'exit-left' : 'exit-right');
    navItems[currentSection].classList.remove('active');
    
    const newSection = sections[index];
    newSection.classList.remove('exit-left', 'exit-right');
    newSection.classList.add(goingRight ? 'enter-right' : 'enter-left');
    
    void newSection.offsetWidth;
    
    newSection.classList.remove('enter-right', 'enter-left');
    newSection.classList.add('active');
    
    currentSection = index;
    navItems[currentSection].classList.add('active');
    if (statusSection) statusSection.textContent = 'SECCION: ' + sectionNames[currentSection];
    
    if (navCurrentIndex) navCurrentIndex.textContent = String(currentSection + 1).padStart(2, '0');
    if (navCurrentName) navCurrentName.textContent = sectionNames[currentSection];
    
    updateMobileNavButtons();
    
    if (controls) {
        const isMobile = window.innerWidth <= 1000;
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
    
    history.replaceState(null, null, '#' + sectionIds[currentSection]);
    
    setTimeout(function() {
        sections.forEach(function(section, i) {
            if (i !== currentSection) {
                section.classList.remove('exit-left', 'exit-right');
            }
        });
        isTransitioning = false;
    }, goingRight ? 700 : 450);
}

// ============================================
// Mobile Nav Buttons State
// ============================================
function updateMobileNavButtons() {
    const prevBtn = document.getElementById('mobile-prev');
    const nextBtn = document.getElementById('mobile-next');
    if (prevBtn) prevBtn.classList.toggle('disabled', currentSection === 0);
    if (nextBtn) nextBtn.classList.toggle('disabled', currentSection === totalSections - 1);
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
        const index = parseInt(this.getAttribute('data-index'));
        goToSection(index);
    });
});

// ============================================
// Button Click Handlers (replaces inline onclick)
// ============================================
document.querySelectorAll('[data-goto]').forEach(function(btn) {
    btn.addEventListener('click', function() {
        goToSection(parseInt(this.getAttribute('data-goto')));
    });
});

const mobilePrev = document.getElementById('mobile-prev');
const mobileNext = document.getElementById('mobile-next');
if (mobilePrev) mobilePrev.addEventListener('click', function() { goToSection(currentSection - 1); });
if (mobileNext) mobileNext.addEventListener('click', function() { goToSection(currentSection + 1); });

// ============================================
// Time Display
// ============================================
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const el = document.getElementById('status-time');
    if (el) el.textContent = hours + ':' + minutes + ':' + seconds;
}

setInterval(updateTime, 1000);
updateTime();

// ============================================
// Particles Background
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
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
        
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.project-card').forEach(function(card) {
            const category = card.getAttribute('data-category');
            if (!category) return;
            if (filter === 'all' || category.indexOf(filter) !== -1) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ============================================
// Project Modal
// ============================================
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalTitlebarName = document.getElementById('modal-titlebar-name');
const modalProjectName = document.getElementById('modal-project-name');
const modalProjectDesc = document.getElementById('modal-project-desc');
const modalProjectTags = document.getElementById('modal-project-tags');
const modalBtnLive = document.getElementById('modal-btn-live');
const modalBtnBehance = document.getElementById('modal-btn-behance');

function openProjectModal(card) {
    const name = card.querySelector('h3').textContent;
    const desc = card.getAttribute('data-long-desc') || card.querySelector('p').textContent;
    const liveUrl = card.getAttribute('data-live');
    const behanceUrl = card.getAttribute('data-behance');
    const tags = card.querySelectorAll('.project-tags span');

    modalTitlebarName.textContent = name;
    modalProjectName.textContent = name;
    modalProjectDesc.textContent = desc;

    modalProjectTags.innerHTML = '';
    tags.forEach(function(tag) {
        const span = document.createElement('span');
        span.textContent = tag.textContent;
        modalProjectTags.appendChild(span);
    });

    if (liveUrl) {
        modalBtnLive.href = liveUrl;
        modalBtnLive.classList.remove('hidden');
    } else {
        modalBtnLive.classList.add('hidden');
    }

    if (behanceUrl) {
        modalBtnBehance.href = behanceUrl;
        modalBtnBehance.classList.remove('hidden');
    } else {
        modalBtnBehance.classList.add('hidden');
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('click', function() {
        openProjectModal(card);
    });
});

if (modalClose) modalClose.addEventListener('click', closeProjectModal);

const modalDotClose = document.querySelector('.modal-dot-close');
if (modalDotClose) modalDotClose.addEventListener('click', closeProjectModal);

projectModal.addEventListener('click', function(e) {
    if (e.target === projectModal) closeProjectModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// ============================================
// Three.js 3D Viewer
// ============================================
let scene, camera, renderer, controls, currentMesh, currentModel;
let autoRotate = true;
let isWireframe = false;
let currentColor = 0xffb000;
let animationId = null;

function initThreeJS() {
    const canvas = document.getElementById('canvas-3d');
    if (!canvas) return;
    
    const container = canvas.parentElement;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e14);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        controls.enableRotate = false;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotateSpeed = 10;
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffd89c, 0x1a1610, 0.6);
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xfff5e0, 1.2);
    directionalLight.position.set(5, 8, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xc8e0ff, 0.4);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffb000, 0.5);
    rimLight.position.set(0, -3, 5);
    scene.add(rimLight);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x1a1610);
    const envLight1 = new THREE.DirectionalLight(0xfff5e0, 0.5);
    envLight1.position.set(1, 1, 1);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0xc8e0ff, 0.3);
    envLight2.position.set(-1, 0.5, -1);
    envScene.add(envLight2);
    scene.environment = pmremGenerator.fromScene(envScene).texture;
    pmremGenerator.dispose();

    const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0x1e2430);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    scene.add(ground);

    window.addEventListener('resize', function() {
        const c = document.getElementById('canvas-3d');
        if (!c) return;
        const cont = c.parentElement;
        camera.aspect = cont.clientWidth / cont.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(cont.clientWidth, cont.clientHeight);
    });

    function animate() {
        animationId = requestAnimationFrame(animate);
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
    const loading = document.getElementById('viewer-loading');
    if (loading) loading.classList.add('active');
    
    const errorEl = document.getElementById('viewer-error');
    if (errorEl) errorEl.style.display = 'none';
    
    if (currentMesh) {
        scene.remove(currentMesh);
        if (currentMesh.geometry) currentMesh.geometry.dispose();
        if (currentMesh.material) currentMesh.material.dispose();
    }

    currentModel = modelData;
    currentColor = modelData.color || 0xffb000;
    
    const nameEl = document.getElementById('model-name');
    const titleEl = document.getElementById('model-title');
    const descEl = document.getElementById('model-description-text');
    const formatEl = document.getElementById('detail-format');
    const sizeEl = document.getElementById('detail-size');
    
    if (nameEl) nameEl.textContent = modelData.name;
    if (titleEl) titleEl.textContent = modelData.name;
    if (descEl) descEl.textContent = modelData.description;
    if (formatEl) formatEl.textContent = modelData.format;
    if (sizeEl) sizeEl.textContent = modelData.size;

    if (modelData.primitive) {
        const geometry = createPrimitiveModel(modelData.primitive);
        const material = new THREE.MeshStandardMaterial({ 
            color: modelData.color, 
            roughness: 0.4,
            metalness: 0.3,
            wireframe: isWireframe 
        });
        currentMesh = new THREE.Mesh(geometry, material);
        currentMesh.castShadow = true;
        currentMesh.receiveShadow = true;
        if (modelData.rotation) {
            currentMesh.rotation.set(modelData.rotation.x, modelData.rotation.y, modelData.rotation.z);
        }
        scene.add(currentMesh);
        if (loading) loading.classList.remove('active');
    } else if (modelData.file) {
        const fileName = modelData.file.toLowerCase();
        
        if (fileName.endsWith('.glb') || fileName.endsWith('.gltf')) {
            const loader = new THREE.GLTFLoader();
            loader.load('models/' + modelData.file, function(gltf) {
                currentMesh = gltf.scene;
                const box = new THREE.Box3().setFromObject(currentMesh);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 4 / maxDim;
                currentMesh.scale.multiplyScalar(scale);
                currentMesh.position.sub(center.multiplyScalar(scale));
                if (modelData.rotation) currentMesh.rotation.set(modelData.rotation.x, modelData.rotation.y, modelData.rotation.z);
                currentMesh.updateMatrixWorld(true);
                const newBox = new THREE.Box3().setFromObject(currentMesh);
                const newCenter = newBox.getCenter(new THREE.Vector3());
                currentMesh.position.x -= newCenter.x;
                currentMesh.position.z -= newCenter.z;
                currentMesh.position.y -= (newBox.min.y + 2);
                currentMesh.traverse(function(child) {
                    if (child.isMesh) {
                        child.material.wireframe = isWireframe;
                        child.material.roughness = 0.4;
                        child.material.metalness = 0.3;
                        child.material.envMapIntensity = 0.5;
                        child.castShadow = true;
                        child.receiveShadow = true;
                        if (child.material.color) {
                            const originalColor = child.material.color.clone();
                            const amberColor = new THREE.Color(modelData.color || 0xffb000);
                            child.material.color.copy(originalColor).lerp(amberColor, 0.3);
                        }
                    }
                });
                scene.add(currentMesh);
                if (loading) loading.classList.remove('active');
            }, undefined, function(error) {
                console.error('Error loading GLTF:', error);
                if (loading) loading.classList.remove('active');
                if (errorEl) {
                    errorEl.style.display = 'flex';
                    errorEl.querySelector('span').textContent = 'Error al cargar el modelo';
                }
            });
        } else if (fileName.endsWith('.stl')) {
            const stlLoader = new THREE.STLLoader();
            stlLoader.load('models/' + modelData.file, function(geometry) {
                const material = new THREE.MeshStandardMaterial({ 
                    color: modelData.color || 0xffb000, 
                    roughness: 0.4,
                    metalness: 0.3,
                    wireframe: isWireframe 
                });
                currentMesh = new THREE.Mesh(geometry, material);
                currentMesh.castShadow = true;
                currentMesh.receiveShadow = true;
                geometry.computeBoundingBox();
                const box = geometry.boundingBox;
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 4 / maxDim;
                currentMesh.scale.multiplyScalar(scale);
                currentMesh.position.sub(center.multiplyScalar(scale));
                if (modelData.rotation) currentMesh.rotation.set(modelData.rotation.x, modelData.rotation.y, modelData.rotation.z);
                currentMesh.updateMatrixWorld(true);
                const newBox = new THREE.Box3().setFromObject(currentMesh);
                const newCenter = newBox.getCenter(new THREE.Vector3());
                currentMesh.position.x -= newCenter.x;
                currentMesh.position.z -= newCenter.z;
                currentMesh.position.y -= (newBox.min.y + 2);
                scene.add(currentMesh);
                if (loading) loading.classList.remove('active');
            }, undefined, function(error) {
                console.error('Error loading STL:', error);
                if (loading) loading.classList.remove('active');
                if (errorEl) {
                    errorEl.style.display = 'flex';
                    errorEl.querySelector('span').textContent = 'Error al cargar el modelo';
                }
            });
        }
    }
}

function loadModelGrid() {
    const grid = document.getElementById('model-grid');
    if (!grid || typeof models === 'undefined') return;
    grid.innerHTML = '';
    
    models.forEach(function(model, index) {
        const card = document.createElement('div');
        card.className = 'model-card';
        card.setAttribute('data-model-id', model.id);
        card.setAttribute('data-category', model.category);
        
        card.innerHTML = '<div class="model-card-name">' + model.name + '</div><div class="model-card-format">' + model.format + '</div>';
        
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
const resetBtn = document.getElementById('reset-view');
if (resetBtn) resetBtn.addEventListener('click', function() {
    if (camera) camera.position.set(0, 0, 5);
    if (controls && controls.reset) controls.reset();
});

const wireBtn = document.getElementById('toggle-wireframe');
if (wireBtn) wireBtn.addEventListener('click', function() {
    isWireframe = !isWireframe;
    this.classList.toggle('active');
    if (currentMesh) {
        currentMesh.traverse(function(child) {
            if (child.isMesh) child.material.wireframe = isWireframe;
        });
    }
});

const rotateBtn = document.getElementById('toggle-auto-rotate');
if (rotateBtn) rotateBtn.addEventListener('click', function() {
    autoRotate = !autoRotate;
    if (controls) controls.autoRotate = autoRotate;
    this.classList.toggle('active');
});

const colorBtn = document.getElementById('toggle-color');
if (colorBtn) colorBtn.addEventListener('click', function() {
    const colors = [0xffb000, 0xffffff, 0x10B981, 0x06B6D4, 0x34D399, 0xA7F3D0, 0x059669];
    const currentIndex = colors.indexOf(currentColor);
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
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const btn = this.querySelector('.btn-submit');
        const status = document.getElementById('form-status');
        const originalText = btn.innerHTML;

        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const subject = this.querySelector('#subject').value.trim();
        const message = this.querySelector('#message').value.trim();

        if (!name || !email || !subject || !message) {
            status.textContent = 'Por favor, completa todos los campos.';
            status.className = 'form-status error';
            return;
        }

        var lastSubmit = localStorage.getItem('formSubmitTime');
        if (lastSubmit && Date.now() - lastSubmit < 30000) {
            status.textContent = 'Espera 30 segundos antes de enviar otro mensaje.';
            status.className = 'form-status error';
            return;
        }

        var sanitize = function(str) { return str.replace(/[<>&"']/g, ''); };

        btn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        status.className = 'form-status';

        try {
            var response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: '1e8f7d71-b5c6-4204-b084-9f187ec02703',
                    name: sanitize(name),
                    email: sanitize(email),
                    subject: sanitize(subject),
                    message: sanitize(message),
                    botcheck: this.querySelector('[name="botcheck"]').checked ? 'true' : ''
                })
            });

            var result = await response.json();

            if (result.success) {
                btn.innerHTML = '<span>Enviado!</span><i class="fas fa-check"></i>';
                status.textContent = 'Mensaje enviado correctamente. Te responderé pronto.';
                status.className = 'form-status success';
                contactForm.reset();
                localStorage.setItem('formSubmitTime', Date.now());
            } else {
                throw new Error('Error del servidor');
            }
        } catch (error) {
            btn.innerHTML = '<span>Error</span><i class="fas fa-times"></i>';
            status.textContent = 'Hubo un error. Intenta de nuevo o contáctame por email.';
            status.className = 'form-status error';
        }

        setTimeout(function() {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 3000);
    });
}

// ============================================
// Intro Animation
// ============================================
function runIntroAnimation() {
    const introScreen = document.getElementById('intro-screen');
    const introTypewriter = document.getElementById('intro-typewriter');
    const introCursor = document.getElementById('intro-cursor');
    if (!introScreen || !introTypewriter) return;
    
    const text = '> Hola, soy Carlos';
    let index = 0;
    const speed = 60;
    
    if (introCursor) introCursor.style.visibility = 'hidden';
    
    function typeChar() {
        if (index < text.length) {
            introTypewriter.textContent += text.charAt(index);
            index++;
            
            let nextSpeed = speed + Math.random() * 40 - 20;
            
            if (text.charAt(index - 1) === ',' || text.charAt(index - 1) === '>') {
                nextSpeed = 200;
            }
            
            setTimeout(typeChar, nextSpeed);
        } else {
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
    
    const autoBtn = document.getElementById('toggle-auto-rotate');
    if (autoBtn) autoBtn.classList.add('active');
});

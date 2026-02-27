// ========================================
// CINEMATIC ACCESS SEQUENCE
// ========================================

// --- Background noise canvas ---
function initCinematicNoise() {
    var canvas = document.getElementById('cinematic-noise');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawNoise() {
        var imageData = ctx.createImageData(canvas.width, canvas.height);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            var v = Math.random() > 0.5 ? 255 : 0;
            data[i] = 0;
            data[i + 1] = v * 0.4;
            data[i + 2] = 0;
            data[i + 3] = Math.random() * 20;
        }
        ctx.putImageData(imageData, 0, 0);
    }
    setInterval(drawNoise, 80);
}

// --- Utility: animate element ---
function animateEl(el, styles, duration) {
    return new Promise(function (resolve) {
        el.style.transition = 'all ' + duration + 'ms ease';
        for (var key in styles) {
            el.style[key] = styles[key];
        }
        setTimeout(resolve, duration);
    });
}

// --- Utility: wait (GLOBAL) ---
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

// --- Utility: type text ---
function typeText(el, text, speed) {
    speed = speed || 30;
    return new Promise(function (resolve) {
        el.textContent = '';
        var i = 0;
        function type() {
            if (i < text.length) {
                el.textContent += text[i];
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// ========================================
// PHASE 1: SYSTEM INITIATION
// ========================================
async function phase1() {
    var overlay = document.getElementById('cinematic-overlay');
    var phase = document.getElementById('phase-initiation');
    var scanLine = phase.querySelector('.scan-line');
    var textEl = document.getElementById('init-text');

    phase.style.opacity = '1';

    overlay.style.animation = 'screenFlicker 0.4s ease';
    await wait(400);
    overlay.style.animation = '';

    scanLine.style.opacity = '1';
    scanLine.style.animation = 'scanSweep 0.8s ease-out forwards';
    await wait(300);

    await typeText(textEl, 'INITIALIZING ACCESS PROTOCOL', 25);
    await wait(300);

    textEl.style.animation = 'cinematicGlitch 0.15s ease 3';
    await wait(450);
    textEl.style.animation = '';

    phase.style.transition = 'opacity 0.4s ease';
    phase.style.opacity = '0';
    await wait(400);
}

// ========================================
// PHASE 2: ACCESS GRANTED
// ========================================
async function phase2() {
    var phase = document.getElementById('phase-granted');
    var textEl = document.getElementById('granted-text');

    phase.style.opacity = '1';

    textEl.style.transition = 'none';
    textEl.style.transform = 'scale(0.3)';
    textEl.style.opacity = '0';

    await wait(50);

    textEl.style.transition = 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)';
    textEl.style.transform = 'scale(1)';
    textEl.style.opacity = '1';

    await wait(400);

    textEl.style.transition = 'text-shadow 0.3s ease';
    textEl.style.textShadow = '0 0 40px rgba(0,255,65,1), 0 0 80px rgba(0,255,65,0.6), 0 0 120px rgba(0,255,65,0.3)';
    await wait(300);
    textEl.style.textShadow = '0 0 20px rgba(0,255,65,0.8), 0 0 40px rgba(0,255,65,0.4), 0 0 80px rgba(0,255,65,0.2)';
    await wait(400);

    await dissolveIntoParticles(textEl);
    phase.style.opacity = '0';
}

// --- Particle dissolve ---
async function dissolveIntoParticles(sourceEl) {
    var rect = sourceEl.getBoundingClientRect();
    var canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById('cinematic-overlay').appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var particles = [];
    for (var p = 0; p < 120; p++) {
        particles.push({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            size: 1 + Math.random() * 3,
            alpha: 0.8 + Math.random() * 0.2,
            decay: 0.015 + Math.random() * 0.02
        });
    }

    sourceEl.style.opacity = '0';

    var frame = 0;
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var alive = false;
        for (var i = 0; i < particles.length; i++) {
            var pt = particles[i];
            if (pt.alpha <= 0) continue;
            alive = true;
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.alpha -= pt.decay;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 65, ' + Math.max(0, pt.alpha) + ')';
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = 8;
            ctx.fill();
        }
        ctx.shadowBlur = 0;
        frame++;
        if (alive && frame < 45) {
            requestAnimationFrame(drawParticles);
        } else {
            canvas.remove();
        }
    }
    drawParticles();
    await wait(600);
}

// ========================================
// PHASE 3: WELCOME TO OUR WORLD
// ========================================
async function phase3() {
    var phase = document.getElementById('phase-welcome');
    var textEl = document.getElementById('welcome-text');
    var text = 'WELCOME TO OUR WORLD';

    textEl.innerHTML = '';
    for (var c = 0; c < text.length; c++) {
        if (text[c] === ' ') {
            var space = document.createElement('span');
            space.className = 'letter-space';
            textEl.appendChild(space);
        } else {
            var span = document.createElement('span');
            span.className = 'letter';
            span.textContent = text[c];
            textEl.appendChild(span);
        }
    }

    phase.style.opacity = '1';
    phase.style.transition = 'none';
    phase.style.transform = 'scale(0.97)';
    await wait(50);
    phase.style.transition = 'transform 2.5s ease-out';
    phase.style.transform = 'scale(1.03)';

    var letters = textEl.querySelectorAll('.letter');
    for (var i = 0; i < letters.length; i++) {
        letters[i].classList.add('visible');
        await wait(50);
    }

    await wait(1000);

    phase.style.transition = 'opacity 0.6s ease';
    phase.style.opacity = '0';
    await wait(600);
    phase.style.transform = '';
}

// ========================================
// PHASE 4: MEN OF CULTURE
// ========================================
async function phase4() {
    var phase = document.getElementById('phase-identity');
    var textEl = document.getElementById('identity-text');
    var subEl = document.getElementById('identity-sub');

    phase.style.opacity = '1';

    textEl.style.transition = 'none';
    textEl.style.opacity = '0';
    textEl.style.transform = 'scale(0.95)';
    await wait(50);

    textEl.style.transition = 'all 0.8s ease-out';
    textEl.style.opacity = '1';
    textEl.style.transform = 'scale(1)';
    await wait(900);

    textEl.style.transition = 'text-shadow 0.5s ease';
    textEl.style.textShadow = '0 0 30px rgba(0,255,65,1), 0 0 60px rgba(0,255,65,0.5), 0 0 120px rgba(0,255,65,0.2)';
    await wait(300);

    subEl.style.transition = 'opacity 0.6s ease';
    subEl.style.opacity = '1';
    await wait(1200);

    textEl.style.transition = 'all 0.8s ease';
    textEl.style.opacity = '0';
    textEl.style.textShadow = '0 0 60px rgba(0,255,65,0.8), 0 0 120px rgba(0,255,65,0.3)';
    subEl.style.transition = 'opacity 0.6s ease 0.1s';
    subEl.style.opacity = '0';

    await wait(800);
    phase.style.opacity = '0';
}

// ========================================
// PHASE 5: SYSTEM READY + TRANSITION
// ========================================
async function phase5() {
    var phase = document.getElementById('phase-ready');
    var textEl = document.getElementById('ready-text');

    phase.style.opacity = '1';
    textEl.style.transition = 'opacity 0.5s ease';
    textEl.style.opacity = '1';
    await wait(1200);

    var overlay = document.getElementById('cinematic-overlay');
    overlay.style.transition = 'opacity 0.8s ease';
    overlay.style.opacity = '0';
    await wait(800);

    overlay.style.display = 'none';
    overlay.style.opacity = '1';
    overlay.style.transition = '';
}

// ========================================
// MAIN: Launch cinematic sequence
// ========================================
async function launchCinematic() {
    var overlay = document.getElementById('cinematic-overlay');
    overlay.classList.add('active');

    initCinematicNoise();

    await wait(200);
    await phase1();
    await wait(100);
    await phase2();
    await wait(200);
    await phase3();
    await wait(100);
    await phase4();
    await wait(300);

    // MODE SELECTION — waits for user click
    var chosenColor = await showModeSelection();
    await wait(200);

    // CONFIRMATION
    await showConfirmation(chosenColor);
    await wait(200);

    // SYSTEM READY
    await phase5();

    // LAUNCH MEMBER GRID
    await showDashboard(chosenColor);
}

// ===== TERMINAL COMMANDS SEQUENCE =====
const terminalSequence = [
    { type: 'title', text: 'MEN OF CULTURE INTELLIGENCE SYSTEM v4.2' },
    { type: 'sep', text: '════════════════════════════════════════' },
    { type: 'output', text: 'Initializing kernel modules...' },
    { type: 'success', text: '[OK] Kernel loaded.' },
    { type: 'output', text: 'Connecting to network...' },
    { type: 'success', text: '[OK] 47 nodes connected.' },
    { type: 'output', text: 'Verifying AES-256 encryption...' },
    { type: 'success', text: '[OK] Encryption active.' },
    { type: 'output', text: 'Deploying firewall rules...' },
    { type: 'success', text: '[OK] Firewall active.' },
    { type: 'warning', text: '[!] IDS armed.' },
    { type: 'output', text: 'Compiling access portal...' },
    { type: 'success', text: '[OK] Portal ready.' },
    { type: 'sep', text: '════════════════════════════════════════' },
    { type: 'success', text: '[✓] ALL SYSTEMS OPERATIONAL' },
    { type: 'info', text: '[→] Launching access portal...' },
];

// ===== TERMINAL TYPING ENGINE =====
const terminalBody = document.getElementById('terminal-body');
let lineIndex = 0;

function getClass(type) {
    const map = { cmd: 'command', output: 'output', success: 'success', error: 'error', warning: 'warning', info: 'info', title: 'title-text', sep: 'separator' };
    return map[type] || 'output';
}

function processNextLine() {
    if (lineIndex >= terminalSequence.length) {
        setTimeout(transitionToLogin, 400);
        return;
    }

    const item = terminalSequence[lineIndex];
    lineIndex++;

    const lineEl = document.createElement('div');
    lineEl.className = 'terminal-line';
    terminalBody.appendChild(lineEl);
    requestAnimationFrame(() => lineEl.classList.add('visible'));

    if (item.type === 'blank') {
        lineEl.innerHTML = '&nbsp;';
        setTimeout(processNextLine, 20);
    } else {
        const span = document.createElement('span');
        span.className = getClass(item.type);
        lineEl.appendChild(span);

        let i = 0;
        const text = item.text;
        const speed = item.type === 'title' || item.type === 'sep' ? 3 : (item.type === 'success' ? 5 : 4);

        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        lineEl.appendChild(cursor);

        function typeChar() {
            if (i < text.length) {
                span.textContent += text[i];
                i++;
                terminalBody.scrollTop = terminalBody.scrollHeight;
                setTimeout(typeChar, speed);
            } else {
                cursor.remove();
                const delay = item.type === 'success' ? 50 : 30;
                setTimeout(processNextLine, delay);
            }
        }
        typeChar();
    }
}

// Start terminal
processNextLine();

// ===== TRANSITION: SPLASH → LOGIN =====
function transitionToLogin() {
    const splash = document.getElementById('splash-page');
    const login = document.getElementById('login-page');

    splash.classList.add('fade-out');
    setTimeout(() => {
        splash.style.display = 'none';
        login.classList.add('active');
        initMatrix();
        initCursorGlow();
    }, 800);
}

// ===== BINARY MATRIX RAIN (cursor-interactive) =====
let mouseX = -1000;
let mouseY = -1000;

// Track mouse globally for matrix interaction
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const baseFontSize = 16;
    const columns = Math.floor(canvas.width / baseFontSize);
    const drops = new Array(columns).fill(0);

    // Stagger initial drops
    for (let i = 0; i < drops.length; i++) {
        drops[i] = Math.floor(Math.random() * -40);
    }

    const INTERACTION_RADIUS = 150; // pixels around cursor

    function draw() {
        // Fade out previous frame
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i++) {
            if (drops[i] < 0) { drops[i]++; continue; }

            const char = Math.random() > 0.5 ? '1' : '0';
            const x = i * baseFontSize;
            const y = drops[i] * baseFontSize;

            // Calculate distance from cursor to this character
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < INTERACTION_RADIUS) {
                // ===== CURSOR NEARBY — COLOR EFFECT ONLY =====
                const proximity = 1 - (dist / INTERACTION_RADIUS); // 0 to 1

                // Same font size, just brighter color
                ctx.font = baseFontSize + 'px Share Tech Mono, monospace';
                const alpha = 0.15 + proximity * 0.75;
                ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
                ctx.fillText(char, x, y);
            } else {
                // ===== NORMAL FALLING CHARACTER =====
                ctx.font = baseFontSize + 'px Share Tech Mono, monospace';

                // Faint head
                ctx.fillStyle = 'rgba(0, 255, 65, 0.15)';
                ctx.fillText(char, x, y);

                // Even dimmer trail character
                ctx.fillStyle = 'rgba(0, 255, 65, 0.07)';
                if (drops[i] > 1) {
                    const trailChar = Math.random() > 0.5 ? '1' : '0';
                    ctx.fillText(trailChar, x, (drops[i] - 1) * baseFontSize);
                }
            }

            if (y > canvas.height && Math.random() > 0.97) drops[i] = 0;
            drops[i]++;
        }
    }

    setInterval(draw, 40);
}

// ===== CURSOR GLOW + PARTICLE TRAIL + RIPPLE =====
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    let lastParticleTime = 0;
    let lastRippleTime = 0;

    document.addEventListener('mousemove', (e) => {
        // Move glow orb
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        if (!glow.classList.contains('active')) glow.classList.add('active');

        const now = Date.now();

        // Green particles with random scatter
        if (now - lastParticleTime > 30) {
            lastParticleTime = now;
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            const ox = (Math.random() - 0.5) * 12;
            const oy = (Math.random() - 0.5) * 12;
            particle.style.left = (e.clientX - 2 + ox) + 'px';
            particle.style.top = (e.clientY - 2 + oy) + 'px';
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }

        // Ripple rings
        if (now - lastRippleTime > 200) {
            lastRippleTime = now;
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });
}

// ===== LOGIN BUTTON — TRIGGERS CINEMATIC =====
function handleLogin() {
    const btn = document.getElementById('login-btn');
    btn.textContent = '⟳ AUTHENTICATING...';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        btn.textContent = '✓ VERIFIED';
        btn.style.borderColor = '#00ff41';
        btn.style.boxShadow = '0 0 30px rgba(0,255,65,0.4)';

        setTimeout(() => {
            // Hide login page and launch cinematic
            const loginPage = document.getElementById('login-page');
            loginPage.style.transition = 'opacity 0.5s ease';
            loginPage.style.opacity = '0';

            setTimeout(() => {
                loginPage.style.display = 'none';
                launchCinematic();
            }, 500);
        }, 800);
    }, 1500);
}

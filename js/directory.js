// ========================================
// MEMBER DIRECTORY — Grid + Detail Pages
// ========================================

let currentPath = null; // 'blue' or 'red'
let gridMatrixInterval = null;

// ===== SHOW MEMBER GRID =====
function showMemberGrid(color) {
    currentPath = color;
    applyTheme(color);

    const page = document.getElementById('member-grid-page');
    const pathLabel = document.getElementById('grid-path-label');
    const gridContainer = document.getElementById('members-grid');

    // Set path label
    pathLabel.textContent = color === 'blue' ? '// BLUE PATH — INTEL' : '// RED PATH — DOMINANCE';

    // Clear previous cards
    gridContainer.innerHTML = '';

    // Build member cards
    MEMBERS.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.style.animationDelay = (index * 0.06) + 's';

        const img = document.createElement('img');
        img.className = 'member-card-img';
        img.src = getMemberImagePath(member.nickname, color);
        img.alt = member.nickname;
        // Fallback for missing images
        img.onerror = function () {
            this.style.background = 'linear-gradient(135deg, #0a0a0a, #111)';
            this.style.display = 'flex';
            this.alt = member.nickname[0].toUpperCase();
        };

        const name = document.createElement('div');
        name.className = 'member-card-name';
        name.textContent = member.nickname;

        card.appendChild(img);
        card.appendChild(name);
        card.addEventListener('click', () => showMemberDetail(member.nickname));

        gridContainer.appendChild(card);
    });

    // Show page
    page.style.display = 'flex';
    requestAnimationFrame(() => {
        page.style.opacity = '1';
        page.classList.add('active');
    });

    // Start themed matrix rain
    startGridMatrix(color);
}

// ===== SHOW MEMBER DETAIL =====
function showMemberDetail(nickname) {
    const member = getMemberByNickname(nickname);
    if (!member) return;

    const page = document.getElementById('member-detail-page');

    // Fill in details
    document.getElementById('detail-portrait').src = getMemberImagePath(member.nickname, currentPath);
    document.getElementById('detail-portrait').alt = member.nickname;
    document.getElementById('detail-nickname').textContent = member.nickname;
    document.getElementById('detail-realname').textContent = 'Real Name: ' + member.realName;

    // Build sections
    const sectionsContainer = document.getElementById('detail-sections');
    sectionsContainer.innerHTML = '';

    const sections = [
        { label: 'About', value: member.about },
        { label: 'Role', value: member.role },
        { label: 'Hobbies', value: member.hobbies },
        { label: 'Personality', value: member.personality }
    ];

    sections.forEach(s => {
        const div = document.createElement('div');
        div.className = 'detail-section';
        div.innerHTML = `
            <div class="detail-label">${s.label}</div>
            <div class="detail-value">${s.value}</div>
        `;
        sectionsContainer.appendChild(div);
    });

    // Quote
    const quoteEl = document.getElementById('detail-quote-block');
    if (member.quote) {
        quoteEl.style.display = 'block';
        quoteEl.textContent = '"' + member.quote + '"';
    } else {
        quoteEl.style.display = 'none';
    }

    // Show detail page
    page.style.display = 'flex';
    page.scrollTop = 0;
    requestAnimationFrame(() => {
        page.style.opacity = '1';
        page.classList.add('active');
    });
}

// ===== BACK TO GRID =====
function backToGrid() {
    const page = document.getElementById('member-detail-page');
    page.style.opacity = '0';
    setTimeout(() => {
        page.style.display = 'none';
        page.classList.remove('active');
    }, 500);
}

// ===== GRID MATRIX RAIN =====
function startGridMatrix(color) {
    const canvas = document.getElementById('grid-matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);
    for (let i = 0; i < drops.length; i++) {
        drops[i] = Math.floor(Math.random() * -30);
    }

    const colors = {
        red: { main: 'rgba(255, 34, 34, 0.10)', dim: 'rgba(255, 34, 34, 0.04)' },
        blue: { main: 'rgba(34, 102, 255, 0.10)', dim: 'rgba(34, 102, 255, 0.04)' }
    };
    const col = colors[color] || colors.blue;

    if (gridMatrixInterval) clearInterval(gridMatrixInterval);

    gridMatrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + 'px Share Tech Mono, monospace';

        for (let i = 0; i < drops.length; i++) {
            if (drops[i] < 0) { drops[i]++; continue; }
            const char = Math.random() > 0.5 ? '1' : '0';
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillStyle = col.main;
            ctx.fillText(char, x, y);
            if (drops[i] > 1) {
                ctx.fillStyle = col.dim;
                ctx.fillText(Math.random() > 0.5 ? '1' : '0', x, (drops[i] - 1) * fontSize);
            }
            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }, 50);
}

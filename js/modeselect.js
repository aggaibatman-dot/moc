// ========================================
// MODE SELECTION + THEME SYSTEM
// ========================================

let selectedMode = null;
let modeResolve = null;

// ===== MODE SELECTION PHASE =====
function showModeSelection() {
    return new Promise(resolve => {
        modeResolve = resolve;
        const phase = document.getElementById('phase-modeselect');
        const title = document.getElementById('mode-title');
        const handLeft = document.getElementById('hand-left');
        const handRight = document.getElementById('hand-right');

        // Make phase visible AND clickable
        phase.style.opacity = '1';
        phase.style.pointerEvents = 'all';
        phase.style.zIndex = '100';

        // Fade in title
        setTimeout(() => {
            title.style.transition = 'opacity 0.6s ease';
            title.style.opacity = '1';
        }, 300);

        // Slide in hands — make them clickable too
        setTimeout(() => {
            handLeft.classList.add('visible');
            handLeft.style.pointerEvents = 'all';
            handRight.classList.add('visible');
            handRight.style.pointerEvents = 'all';
        }, 600);
    });
}

// ===== SELECT MODE (onclick) =====
function selectMode(color) {
    if (selectedMode) return;
    selectedMode = color;

    const handLeft = document.getElementById('hand-left');
    const handRight = document.getElementById('hand-right');
    const title = document.getElementById('mode-title');
    const phase = document.getElementById('phase-modeselect');

    // Disable further clicks
    phase.style.pointerEvents = 'none';

    const selected = color === 'blue' ? handLeft : handRight;
    const other = color === 'blue' ? handRight : handLeft;

    // Pulse selected
    selected.classList.add('selected');

    // Dim the other + hide title
    setTimeout(() => {
        other.classList.add('dimmed');
        title.style.transition = 'opacity 0.4s ease';
        title.style.opacity = '0';
    }, 300);

    // Fade out phase and resolve
    setTimeout(() => {
        phase.style.transition = 'opacity 0.5s ease';
        phase.style.opacity = '0';

        setTimeout(() => {
            if (modeResolve) modeResolve(color);
        }, 500);
    }, 1000);
}

// ===== CONFIRMATION PHASE =====
async function showConfirmation(color) {
    const phase = document.getElementById('phase-confirm');
    const mainText = document.getElementById('confirm-main');
    const subText = document.getElementById('confirm-sub');

    const colorName = color === 'red' ? 'RED' : 'BLUE';
    const themeColor = color === 'red' ? '#ff2222' : '#2266ff';
    const glowColor = color === 'red' ? 'rgba(255,34,34,0.6)' : 'rgba(34,102,255,0.6)';

    mainText.style.color = themeColor;
    mainText.style.textShadow = '0 0 20px ' + glowColor + ', 0 0 40px ' + glowColor;
    subText.style.color = themeColor;
    subText.style.textShadow = '0 0 10px ' + glowColor;
    subText.textContent = 'WELCOME TO THE ' + colorName + ' WORLD';

    phase.style.opacity = '1';

    // Slam in
    mainText.style.transition = 'none';
    mainText.style.transform = 'scale(0.5)';
    mainText.style.opacity = '0';

    await wait(50);
    mainText.style.transition = 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
    mainText.style.transform = 'scale(1)';
    mainText.style.opacity = '1';

    await wait(600);

    subText.style.transition = 'opacity 0.5s ease';
    subText.style.opacity = '1';

    await wait(1200);

    mainText.style.transition = 'opacity 0.5s ease';
    mainText.style.opacity = '0';
    subText.style.transition = 'opacity 0.4s ease 0.1s';
    subText.style.opacity = '0';

    await wait(600);
    phase.style.opacity = '0';
}

// ===== APPLY COLOR THEME =====
function applyTheme(color) {
    document.body.classList.remove('theme-red', 'theme-blue', 'theme-green');
    document.body.classList.add('theme-' + color);
}

// ===== SHOW MEMBER DIRECTORY =====
async function showDashboard(color) {
    applyTheme(color);
    showMemberGrid(color);
}

// ===== RETURN TO PATH SELECTION =====
async function returnToPathSelection() {
    // 1. Fade out the grid page
    const gridPage = document.getElementById('member-grid-page');
    // Also fade out detail page if it's open
    const detailPage = document.getElementById('member-detail-page');

    if (detailPage.classList.contains('active')) {
        detailPage.style.opacity = '0';
        setTimeout(() => {
            detailPage.style.display = 'none';
            detailPage.classList.remove('active');
        }, 500);
    }

    gridPage.style.opacity = '0';

    // 2. Reset theme to green so cursor is hacker green by default
    document.body.classList.remove('theme-red', 'theme-blue', 'theme-neutral');
    document.body.classList.add('theme-green');

    // Stop grid matrix
    if (typeof gridMatrixInterval !== 'undefined' && gridMatrixInterval) {
        clearInterval(gridMatrixInterval);
    }

    await wait(600);
    gridPage.style.display = 'none';
    gridPage.classList.remove('active');

    // 3. Reset mode selection variables
    selectedMode = null;
    modeResolve = null;

    // 4. Reset DOM elements for mode selection phase
    const overlay = document.getElementById('cinematic-overlay');
    const phaseModeselect = document.getElementById('phase-modeselect');
    const title = document.getElementById('mode-title');
    const handLeft = document.getElementById('hand-left');
    const handRight = document.getElementById('hand-right');

    // Hide all other phases just in case
    document.querySelectorAll('.phase').forEach(p => p.style.opacity = '0');

    // Reset hands: remove selection states and ensure they are visible
    handLeft.classList.remove('dimmed', 'selected');
    handLeft.classList.add('visible');
    handRight.classList.remove('dimmed', 'selected');
    handRight.classList.add('visible');

    // Show overlay and phase
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';

    phaseModeselect.style.opacity = '1';
    phaseModeselect.style.pointerEvents = 'all';

    // Fade title back in
    setTimeout(() => {
        title.style.transition = 'opacity 0.6s ease';
        title.style.opacity = '1';
    }, 100);

    // Wait for the user to select again...
    const chosenColor = await new Promise(resolve => {
        modeResolve = resolve;
    });

    await wait(200);
    await showConfirmation(chosenColor);
    await wait(200);

    // Fade out the overlay since we skipped phase 5
    overlay.style.transition = 'opacity 0.8s ease';
    overlay.style.opacity = '0';
    await wait(800);

    overlay.style.display = 'none';
    overlay.style.opacity = '1';
    overlay.style.transition = '';

    // Just go straight back to the dashboard
    await showDashboard(chosenColor);
}

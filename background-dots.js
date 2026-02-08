// 創建背景漂浮圓點（CSS 動畫，密度與遊戲框 960x540 內 15 點相近）
function createBackgroundDots() {
  const container = document.getElementById('background-dots');
  if (!container) return;

  // 遊戲框內：960*540 約 15 點 → 每 34560 px² 一顆。全畫面用相同密度計算數量
  const gameArea = 960 * 540;
  const gameDots = 15;
  const viewportArea = window.innerWidth * window.innerHeight;
  const dotCount = Math.max(40, Math.floor((viewportArea / gameArea) * gameDots));

  const colors = ['#64748b', '#475569', '#52616b', '#4b5563', '#5c6b7a', '#6b7280'];

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';

    const size = Math.random() * 5 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const alpha = Math.random() * 0.25 + 0.35;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    dot.style.setProperty('--x', x + 'px');
    dot.style.setProperty('--y', y + 'px');
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.backgroundColor = color;
    dot.style.opacity = alpha;

    // 每顆圓點不同動畫時長與延遲，避免同步
    const duration = 8 + Math.random() * 8;
    const delay = -Math.random() * 10;
    dot.style.animationDuration = duration + 's';
    dot.style.animationDelay = delay + 's';

    container.appendChild(dot);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createBackgroundDots);
} else {
  createBackgroundDots();
}

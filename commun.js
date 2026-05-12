// === BANDEAU ALERTE ===
async function chargerAlerte() {
  try {
    const r = await fetch('alerte.json?t=' + Date.now());
    if (!r.ok) return;
    const data = await r.json();
    if (data.active && data.message) {
      const ICONES = { warning: '⚠️', danger: '🚨', info: 'ℹ️' };
      const band = document.getElementById('alerte-bandeau');
      band.className = data.type || 'warning';
      document.getElementById('alerte-icone').textContent = ICONES[data.type] || '⚠️';
      document.getElementById('alerte-texte').textContent = data.message;
      band.style.display = 'flex';
    }
  } catch(e) { /* pas de fichier = pas d'alerte */ }
}

// === MARQUER LE LIEN ACTIF DANS LA NAV ===
function marquerNavActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  chargerAlerte();
  marquerNavActive();
});

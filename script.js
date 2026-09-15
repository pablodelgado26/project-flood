const scene = document.querySelector('.sensor-scene');
const toast = document.getElementById('toast');
const simulateBtn = document.getElementById('simulate-btn');
const sensorDots = document.querySelectorAll('.sensor-dot');
const locationEl = document.getElementById('map-location');
const levelEl = document.getElementById('map-level');
const statusEl = document.getElementById('map-status');
const updatedEl = document.getElementById('map-updated');
const conditionEl = document.getElementById('map-condition');

function revealOnScroll() {
  const revealItems = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2600);
}

function updateMapPanel(button) {
  const location = button.dataset.location;
  const level = button.dataset.level;
  const status = button.dataset.status;
  const updated = button.dataset.updated;
  const condition = button.dataset.condition;

  locationEl.textContent = location;
  levelEl.textContent = level;
  statusEl.textContent = status;
  statusEl.className = '';

  if (status === 'NORMAL') {
    statusEl.classList.add('status-normal');
  }

  if (status === 'ATENÇÃO') {
    statusEl.classList.add('status-warning');
  }

  if (status === 'RISCO DE INUNDAÇÃO') {
    statusEl.classList.add('status-danger');
  }

  updatedEl.textContent = updated;
  conditionEl.textContent = condition;
}

sensorDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    sensorDots.forEach((item) => item.classList.remove('active'));
    dot.classList.add('active');
    updateMapPanel(dot);
  });
});

simulateBtn.addEventListener('click', () => {
  scene.classList.add('is-alert');
  const targetDot = document.querySelector('.sensor-dot.warning, .sensor-dot.danger');

  if (targetDot) {
    sensorDots.forEach((dot) => dot.classList.remove('active'));
    targetDot.classList.add('active');
    updateMapPanel(targetDot);
  }

  const dangerMessage = 'Alerta ativado: risco de inundação detectado na região da Avenida Central.';
  showToast(dangerMessage);
});

window.addEventListener('load', () => {
  revealOnScroll();
  updateMapPanel(document.querySelector('.sensor-dot.warning'));
});

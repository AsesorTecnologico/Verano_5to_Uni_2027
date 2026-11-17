/* Enlaces independientes por año. Los 12 enlaces de cursos fueron proporcionados.
 * Coloca las dos URL de Introductorio en el objeto introductorio, al final de cursos.
 */
const cursos = [
  { id: 'algebra', nombre: 'Álgebra', simbolo: 'x²', tema: 'Expresiones, ecuaciones y funciones', color: 'coral', enlaces: { 2026: 'https://drive.google.com/drive/folders/1iucrdNS1-nr5v7Fxx3224QYqUhj9pmte?usp=drive_link', 2027: 'https://drive.google.com/drive/folders/1WAzr6piL4aZMJ3dEOvB9geJyAZ5o1OPP?usp=drive_link' } },
  { id: 'aritmetica', nombre: 'Aritmética', simbolo: '÷', tema: 'Números, operaciones y problemas', color: 'gold', enlaces: { 2026: 'https://drive.google.com/drive/folders/1aGAi7bFRKUxHzNVoHCoFatX8i9WOYTfV?usp=drive_link', 2027: 'https://drive.google.com/drive/folders/1Zb2ApNbGeS-n83-Tmq2uAXiXbtSR91w9?usp=drive_link' } },
  { id: 'fisica', nombre: 'Física', simbolo: '<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>', tema: 'Magnitudes, movimiento y energía', color: 'blue', enlaces: { 2026: 'https://drive.google.com/drive/folders/1CWhyhd56HU8fGPMJrqYdsfAE-WCjvztX?usp=drive_link', 2027: 'https://drive.google.com/drive/folders/1N2Gx4ghxw88MW7HPFOLEjuzFDrFLwbce?usp=drive_link' } },
  { id: 'geometria', nombre: 'Geometría', simbolo: '△', tema: 'Figuras, propiedades y relaciones', color: 'mint', enlaces: { 2026: 'https://drive.google.com/drive/folders/1igEy7sLMAE11bfcG-2m3mNgHbwhOypRI?usp=drive_link', 2027: 'https://drive.google.com/drive/folders/1qYMerSGZe2InXusD9L6Rhpyshy4tAWcj?usp=drive_link' } },
  { id: 'quimica', nombre: 'Química', simbolo: 'H₂', tema: 'Materia, estructura y transformaciones', color: 'lilac', enlaces: { 2026: 'https://drive.google.com/drive/folders/1uMDjRYr1pwjf0lyb3_xAeQ6i_f9TTLV7?usp=drive_link', 2027: 'https://drive.google.com/drive/folders/1hXKq32790JEUzgWVVnhNDh9aROt9MKgI?usp=drive_link' } },
  { id: 'trigonometria', nombre: 'Trigonometría', simbolo: 'sin θ', tema: 'Ángulos y relaciones trigonométricas', color: 'peach', enlaces: { 2026: 'https://drive.google.com/drive/folders/19Wn6FnNNhOgW2H3RIqDs4UFcJmbP0PZv?usp=drive_link', 2027: 'https://drive.google.com/drive/folders/1z0o8QMfxyJSGf5O5MA9ILZQ2s0qS6dOd?usp=drive_link' } }
];
// INTRODUCTORIO: reemplaza las cadenas vacías por las carpetas reales de cada año.
const introductorio = {
  id: 'introductorio', nombre: 'Introductorio', simbolo: 'I',
  tema: 'Material de introducción al Ciclo Especial de Verano · 5.° UNI',
  color: 'introductorio', enlaces: {
    2026: '', // Pega aquí el enlace de Drive de Introductorio 2026.
    2027: ''  // Pega aquí el enlace de Drive de Introductorio 2027.
  }
};
let selectedYear = 2026;
const cursoSeleccionadoPorAnio = {};
const grid = document.querySelector('#course-grid');
const searchInput = document.querySelector('#course-search');
const tabs = [...document.querySelectorAll('[data-year]')];
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function validDriveLink(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && ['drive.google.com', 'docs.google.com'].includes(url.hostname); } catch { return false; }
}
function renderCourses() {
  const filtered = cursos.filter(course => normalize(course.nombre).includes(normalize(searchInput.value.trim())));
  grid.replaceChildren();
  const introGrid = document.querySelector('#intro-grid');
  introGrid.replaceChildren();
  [introductorio, ...filtered].forEach(course => {
    const card = document.createElement('article');
    card.className = `course-card ${course.color}`;
    const index = cursos.indexOf(course) + 1;
    card.innerHTML = `<div class="card-top"><span class="course-symbol" aria-hidden="true">${course.simbolo}</span><span class="course-index">${course.id === 'introductorio' ? 'MATERIAL INICIAL' : `0${index} / UNI`}</span></div><p class="course-year">5.° UNI · VERANO ${selectedYear}</p><h4>${course.nombre}</h4><p class="course-description">${course.tema}</p>`;
    const url = course.enlaces[selectedYear];
    const esEjemplo = url.includes("search?q=EJEMPLO_");
    if (validDriveLink(url)) {
      const link = document.createElement('a');
      link.className = 'course-link';
      if (cursoSeleccionadoPorAnio[selectedYear] === course.id) {
        link.classList.add('is-selected');
        link.setAttribute('aria-current', 'true');
      }
      link.addEventListener('click', () => {
        cursoSeleccionadoPorAnio[selectedYear] = course.id;
        document.querySelectorAll('.course-link').forEach(button => {
          button.classList.remove('is-selected');
          button.removeAttribute('aria-current');
        });
        link.classList.add('is-selected');
        link.setAttribute('aria-current', 'true');
      }); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${esEjemplo ? "Ver enlace de prueba" : "Abrir material"} de ${course.nombre}, ${selectedYear}, en Google Drive (nueva pestaña)`);
      link.innerHTML = (esEjemplo ? 'Ver enlace de prueba' : 'Abrir material') + ' <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span>';
      card.append(link);
    } else {
      const status = document.createElement('div'); status.className = 'course-link pending';
      status.innerHTML = (course.id === 'introductorio' ? 'Enlace por configurar' : 'Material pendiente') + ' <span aria-hidden="true">◷</span>';
      card.append(status);
    }
    if (course.id === 'introductorio') introGrid.append(card);
    else grid.append(card);
  });
  document.querySelector('#course-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'curso' : 'cursos'}`;
  document.querySelector('#empty-state').hidden = filtered.length !== 0;
}
function selectYear(year, focus = false) {
  selectedYear = Number(year);
  tabs.forEach(tab => { const active = Number(tab.dataset.year) === selectedYear; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if (active && focus) tab.focus(); });
  document.querySelector('#selected-year').textContent = selectedYear;
  document.querySelector('#footer-year').textContent = selectedYear;
  document.querySelector('#course-panel').setAttribute('aria-labelledby', `tab-${selectedYear}`);
  renderCourses();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectYear(tab.dataset.year));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowRight','ArrowLeft'].includes(event.key)) next = tabs[(index + 1) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (next) { event.preventDefault(); selectYear(next.dataset.year, true); }
  });
});
searchInput.addEventListener('input', renderCourses);
renderCourses();

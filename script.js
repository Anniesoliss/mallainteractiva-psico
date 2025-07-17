console.log("script.js cargado y funcionando");
document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll('.curso');
  const barraAvance = document.querySelector('#barra-progreso .avance');

  function actualizarProgreso() {
    const total = cursos.length;
    const completados = document.querySelectorAll('.curso.completado').length;
    const porcentaje = Math.round((completados / total) * 100);
    barraAvance.style.width = porcentaje + '%';
    barraAvance.textContent = porcentaje + '%';
  }

  function guardarProgreso() {
    const estadoCursos = [];
    cursos.forEach((curso, index) => {
      estadoCursos[index] = curso.classList.contains('completado');
    });
    localStorage.setItem('progresoCursos', JSON.stringify(estadoCursos));
  }

  function cargarProgreso() {
    const estadoCursos = JSON.parse(localStorage.getItem('progresoCursos'));
    if (estadoCursos) {
      cursos.forEach((curso, index) => {
        if (estadoCursos[index]) {
          curso.classList.add('completado');
        } else {
          curso.classList.remove('completado');
        }
      });
      actualizarProgreso();
    }
  }

  cursos.forEach((curso, index) => {
    curso.addEventListener('click', () => {
      curso.classList.toggle('completado');
      actualizarProgreso();
      guardarProgreso();
    });
  });

  cargarProgreso();
});

document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");
  const totalCursos = cursos.length;

  cursos.forEach(curso => {
    curso.addEventListener("click", () => {
      curso.classList.toggle("completado");
      actualizarProgreso();
    });
  });

  function actualizarProgreso() {
    const completados = document.querySelectorAll(".curso.completado").length;
    const porcentaje = Math.round((completados / totalCursos) * 100);
    const barra = document.querySelector("#barra-progreso .avance");
    barra.style.width = porcentaje + "%";
    barra.textContent = porcentaje + "%";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll('.curso');
  const barraAvance = document.querySelector('#barra-progreso .avance');

  // Función para actualizar la barra según cursos completados
  function actualizarProgreso() {
    const total = cursos.length;
    const completados = document.querySelectorAll('.curso.completado').length;
    const porcentaje = Math.round((completados / total) * 100);
    barraAvance.style.width = porcentaje + '%';
    barraAvance.textContent = porcentaje + '%';
  }

  // Guardar progreso en localStorage
  function guardarProgreso() {
    const estadoCursos = [];
    cursos.forEach((curso, index) => {
      estadoCursos[index] = curso.classList.contains('completado');
    });
    localStorage.setItem('progresoCursos', JSON.stringify(estadoCursos));
  }

  // Cargar progreso guardado al iniciar
  function cargarProgreso() {
    const estadoCursos = JSON.parse(localStorage.getItem('progresoCursos'));
    if (estadoCursos) {
      cursos.forEach((curso, index) => {
        if (estadoCursos[index]) {
          curso.classList.add('completado');
        }
      });
      actualizarProgreso();
    }
  }

  cursos.forEach(curso => {
    curso.addEventListener('click', () => {
      curso.classList.toggle('completado');
      actualizarProgreso();
      guardarProgreso();
    });
  });

  cargarProgreso();
});

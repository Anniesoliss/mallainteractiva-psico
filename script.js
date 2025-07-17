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
        }
      });
      actualizarProgreso();
    }
  }

  // Agregar event listener a cada curso
  cursos.forEach(curso => {
    curso.addEventListener('click', () => {
      curso.classList.toggle('completado');
      actualizarProgreso();
      guardarProgreso();
    });
  });

  cargarProgreso();
});

document.addEventListener("DOMContentLoaded", () => {
  const cursos = Array.from(document.querySelectorAll('.curso'));
  const barraAvance = document.querySelector('#barra-progreso .avance');

  // Mapear código a elemento curso
  const mapaCursos = new Map();

  cursos.forEach(curso => {
    const codigo = curso.dataset.codigo?.trim() || '';
    mapaCursos.set(codigo, curso);
  });

  // Función para chequear si los requisitos están cumplidos
  function requisitosCumplidos(curso) {
    const requisitosStr = curso.dataset.requisitos || '';
    if (!requisitosStr) return true; // Sin requisitos, desbloqueado

    const requisitos = requisitosStr.split(',').map(r => r.trim()).filter(r => r.length > 0);
    return requisitos.every(codReq => {
      const cursoReq = mapaCursos.get(codReq);
      return cursoReq && cursoReq.classList.contains('completado');
    });
  }

  // Actualizar si un curso está bloqueado o desbloqueado
  function actualizarEstadoCursos() {
    cursos.forEach(curso => {
      if (curso.classList.contains('completado')) {
        curso.classList.remove('bloqueado');
        curso.style.pointerEvents = 'auto';
        curso.style.opacity = '1';
      } else if (requisitosCumplidos(curso)) {
        curso.classList.remove('bloqueado');
        curso.style.pointerEvents = 'auto';
        curso.style.opacity = '1';
      } else {
        curso.classList.add('bloqueado');
        curso.style.pointerEvents = 'none'; // No clickeable
        curso.style.opacity = '0.4'; // Visualmente bloqueado
      }
    });
  }

  function actualizarProgreso() {
    const total = cursos.length;
    const completados = cursos.filter(curso => curso.classList.contains('completado')).length;
    const porcentaje = Math.round((completados / total) * 100);
    barraAvance.style.width = porcentaje + '%';
    barraAvance.textContent = porcentaje + '%';
  }

  function guardarProgreso() {
    const estadoCursos = cursos.map(curso => curso.classList.contains('completado'));
    localStorage.setItem('progresoCursos', JSON.stringify(estadoCursos));
  }

  function cargarProgreso() {
    const estadoCursos = JSON.parse(localStorage.getItem('progresoCursos'));
    if (estadoCursos && estadoCursos.length === cursos.length) {
      cursos.forEach((curso, index) => {
        if (estadoCursos[index]) {
          curso.classList.add('completado');
        } else {
          curso.classList.remove('completado');
        }
      });
    }
  }

  // Al hacer click en curso
  cursos.forEach(curso => {
    curso.addEventListener('click', () => {
      if (curso.classList.contains('bloqueado')) return; // Ignorar click si bloqueado
      curso.classList.toggle('completado');
      actualizarProgreso();
      guardarProgreso();
      actualizarEstadoCursos();
    });
  });

  // Inicializar
  cargarProgreso();
  actualizarEstadoCursos();
  actualizarProgreso();
});

console.log("script.js cargado y funcionando");

document.addEventListener("DOMContentLoaded", () => {
  const cursos = Array.from(document.querySelectorAll('.curso'));
  const barraAvance = document.querySelector('#barra-progreso .avance');

  function actualizarProgreso() {
    const total = cursos.length;
    const completados = cursos.filter(c => c.classList.contains('completado')).length;
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
      cursos.forEach((curso, i) => {
        if (estadoCursos[i]) {
          curso.classList.add('completado');
        } else {
          curso.classList.remove('completado');
        }
      });
    }
  }

  // Esta función bloquea o desbloquea cursos según si se cumplen sus requisitos
  function actualizarBloqueos() {
    cursos.forEach(curso => {
      const requisitosRaw = curso.dataset.requisitos || "";
      if (!requisitosRaw) {
        // Si no tiene requisitos, está desbloqueado
        curso.classList.remove('bloqueado');
        return;
      }

      // Separar requisitos por coma, limpiar espacios
      const requisitos = requisitosRaw.split(',').map(r => r.trim());

      // Verificar si todos los requisitos están completados
      const todosRequisitosCompletos = requisitos.every(reqCodigo => {
        const cursoReq = cursos.find(c => c.dataset.codigo === reqCodigo);
        return cursoReq && cursoReq.classList.contains('completado');
      });

      if (todosRequisitosCompletos) {
        curso.classList.remove('bloqueado');
      } else {
        curso.classList.add('bloqueado');
        // Si está bloqueado, quitar completado para evitar inconsistencia
        if (curso.classList.contains('completado')) {
          curso.classList.remove('completado');
        }
      }
    });
  }

  // Evento click para marcar/desmarcar solo si no está bloqueado
  cursos.forEach(curso => {
    curso.addEventListener('click', () => {
      if (curso.classList.contains('bloqueado')) return; // ignorar si bloqueado
      curso.classList.toggle('completado');
      actualizarBloqueos();
      actualizarProgreso();
      guardarProgreso();
    });
  });

  // Al cargar: cargar progreso y actualizar bloqueos y barra
  cargarProgreso();
  actualizarBloqueos();
  actualizarProgreso();
});

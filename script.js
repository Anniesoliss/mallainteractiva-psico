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

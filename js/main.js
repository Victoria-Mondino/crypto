document.getElementById("simulatorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Capturar entradas del formulario
    let cantidad = parseFloat(document.getElementById("cantidad").value);
    let activo = document.getElementById("activo").value;

    // Objeto que guarda las tasas de crecimiento de diferentes activos
    let activos = {
        "acciones": {min: 0.05, max: 0.15},
        "criptomonedas": {min: -0.20, max: 0.30},
        "fondos": {min: 0.02, max: 0.10}
    };

    // Función para obtener una tasa de crecimiento aleatoria
    function obtenerCrecimiento(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Función para simular la inversión
    function simularInversion(cantidad, activo) {
        if (activos[activo]) {
            let crecimiento = obtenerCrecimiento(activos[activo].min, activos[activo].max);
            let valorFinal = cantidad * (1 + crecimiento);
            return {valorFinal, crecimiento};
        } else {
            alert("Activo no válido.");
            return null;
        }
    }

    // Función para buscar activos por nombre
    function buscarActivo(nombre) {
        return activos[nombre] ? {nombre: nombre, ...activos[nombre]} : null;
    }

    // Función para filtrar activos por tasa de crecimiento
    function filtrarActivos(minCrecimiento, maxCrecimiento) {
        return Object.entries(activos).filter(([key, value]) => {
            return value.min >= minCrecimiento && value.max <= maxCrecimiento;
        }).map(([key]) => key);
    }

    // Ejecutar la simulación
    let resultado = simularInversion(cantidad, activo);

    // Mostrar el resultado en la página
    if (resultado) {
        let gananciaPerdida = resultado.valorFinal - cantidad;
        let mensajeGananciaPerdida = gananciaPerdida >= 0 ? "Ganancia" : "Pérdida";

        document.getElementById("resultado").innerHTML =
            `<p>Inversión inicial: $${cantidad.toFixed(2)}</p>
            <p>Activo seleccionado: ${activo}</p>
             <p>Crecimiento estimado: ${(resultado.crecimiento * 100).toFixed(2)}%</p>
            <p>Valor final: $${resultado.valorFinal.toFixed(2)}</p>
            <p>${mensajeGananciaPerdida}: $${gananciaPerdida.toFixed(2)}</p>`;
    }

    // Búsqueda y filtrado
    let activoBuscado = buscarActivo("acciones");
    console.log("Resultado de búsqueda:", activoBuscado);

    let activosFiltrados = filtrarActivos(0.01, 0.15);
    console.log("Activos filtrados:", activosFiltrados);
});

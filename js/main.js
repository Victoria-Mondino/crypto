document.getElementById("simulatorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Capturar entradas del formulario
    let cantidad = parseFloat(document.getElementById("cantidad").value);
    let activo = document.getElementById("activo").value;
    let plazo = parseInt(document.getElementById("plazo").value);

    // Array que guarda los activos con tasas de crecimiento por plazo
    let activos = [
        { nombre: "acciones", plazos: { "30": {min: 0.02, max: 0.05}, "90": {min: 0.05, max: 0.10}, "120": {min: 0.10, max: 0.15} }},
        { nombre: "criptomonedas", plazos: { "30": {min: -0.10, max: 0.10}, "90": {min: -0.15, max: 0.20}, "120": {min: -0.20, max: 0.30} }},
        { nombre: "fondos", plazos: { "30": {min: 0.01, max: 0.03}, "90": {min: 0.03, max: 0.06}, "120": {min: 0.06, max: 0.10} }}
    ];

    // Función para obtener una tasa de crecimiento aleatoria
    function obtenerCrecimiento(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Función para buscar un activo en el array
    function buscarActivo(activo) {
        return activos.find(a => a.nombre === activo);
    }

    // Función para simular la inversión
    function simularInversion(cantidad, activo, plazo) {
        let activoEncontrado = buscarActivo(activo);
        if (activoEncontrado && activoEncontrado.plazos[plazo]) {
            let crecimiento = obtenerCrecimiento(activoEncontrado.plazos[plazo].min, activoEncontrado.plazos[plazo].max);
            let valorFinal = cantidad * (1 + crecimiento);
            return { valorFinal, crecimiento };
        } else {
            alert("Activo o plazo no válido.");
            return null;
        }
    }

    // Ejecutar la simulación
    let resultado = simularInversion(cantidad, activo, plazo);

    // Mostrar el resultado en la página
    if (resultado) {
        let gananciaPerdida = resultado.valorFinal - cantidad;
        let mensajeGananciaPerdida = gananciaPerdida >= 0 ? "Ganancia" : "Pérdida";

        document.getElementById("resultado").innerHTML =
            `<p>Inversión inicial: $${cantidad.toFixed(2)}</p>
            <p>Activo seleccionado: ${activo}</p>
            <p>Plazo seleccionado: ${plazo} días</p>
            <p>Crecimiento estimado: ${(resultado.crecimiento * 100).toFixed(2)}%</p>
            <p>Valor final: $${resultado.valorFinal.toFixed(2)}</p>
            <p>${mensajeGananciaPerdida}: $${gananciaPerdida.toFixed(2)}</p>`;
    }
});
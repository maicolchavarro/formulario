const agregarBtn = document.getElementById('agregar');
const tablaActividades = document.querySelector('#actividades tbody');

const inputActividad = document.getElementById('actividad');
const inputNota = document.getElementById('nota');
const inputPromedio = document.getElementById('promedio');
const inputEstado = document.getElementById('estado');
let notas = [];

function agregarActividad() {
    const actividad = inputActividad.value;
    const nota = parseFloat(inputNota.value);

    if (actividad && (nota) && nota >= 0 && nota <= 5) {
        const nuevaFila = crearFila(actividad, nota);

        tablaActividades.appendChild(nuevaFila);

        notas.push(nota);
        limpiarCampos();
        actualizarPromedioYEstado();
    } else {
        alert("Por favor, ingresa una actividad válida y una nota entre 0.0 y 5.0.");
    }
}

function crearFila(actividad, nota) {
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td><button class="eliminar">Eliminar</button></td>
        <td><button class="modificar">Modificar</button></td>
        <td>${actividad}</td>
        <td>${nota}</td>
    `;
    
    nuevaFila.querySelector('.eliminar').addEventListener('click', () => eliminarActividad(nuevaFila, nota));
    nuevaFila.querySelector('.modificar').addEventListener('click', () => modificarActividad(nuevaFila, nota));

    return nuevaFila;
}

function limpiarCampos() {
    inputActividad.value = '';
    inputNota.value = '';
}

function eliminarActividad(fila, nota) {
    if (confirm("¿Está seguro de eliminar esta actividad?")) {

        fila.remove();
        actualizarPromedioYEstado();
    }
}

function modificarActividad(fila, notaAntigua) {
    const nuevaActividad = prompt("Modificar actividad:", fila.cells[2].textContent);
    const nuevaNota = parseFloat(prompt("Modificar nota:", fila.cells[3].textContent));

    if (nuevaActividad && (nuevaNota) && nuevaNota >= 0 && nuevaNota <= 5) {
        fila.cells[2].textContent = nuevaActividad;
        fila.cells[3].textContent = nuevaNota;

        const index = notas.indexOf(notaAntigua);
            notas[index] = nuevaNota;
        }

        actualizarPromedioYEstado();
    } 


    function actualizarPromedioYEstado() {
        let sumaNotas = 0;
    
        for (let i = 0; i < notas.length; i++) {
            sumaNotas += notas[i];  // Sumar cada nota al acumulador
        }
    
        const promedio = (sumaNotas / notas.length).toFixed(2); 
    
        inputPromedio.value = promedio;  
        inputEstado.value = promedio >= 3 ? 'Aprobado' : 'Reprobado';   
    }
    


agregarBtn.addEventListener('click', agregarActividad);

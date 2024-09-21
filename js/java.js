const agregarBtn = document.getElementById('agregar');
const tablaActividades = document.querySelector('#actividades tbody');

function agregarActividad() {
    const actividad = document.getElementById('actividad').value;
    const nota = document.getElementById('nota').value;

    if (actividad && nota) {
        const nuevaFila = document.createElement('tr');
        
        nuevaFila.innerHTML = `
            <td><button class="eliminar">Eliminar</button></td>
            <td><button class="modificar">Modificar</button></td>
            <td>${actividad}</td>
            <td>${nota}</td>
        `;
        
        tablaActividades.appendChild(nuevaFila);

        document.getElementById('actividad').value = '';
        document.getElementById('nota').value = '';
        
        nuevaFila.querySelector('.eliminar').addEventListener('click', eliminarActividad);
        nuevaFila.querySelector('.modificar').addEventListener('click', modificarActividad);
    } else {
        alert("Por favor, ingresa una actividad y una nota.");
    }
}

function eliminarActividad(event) {
    var confirmacion = confirm("¿Esta seguro de eliminar este elemento?");

    if(confirmacion) {
        const fila = event.target.parentElement.parentElement;
        fila.remove();
    }
}


function  modificarActividad (event){
    const fila = event.target.parentElement.parentElement;

    const actividad = prompt("Modificar actividad:", fila.cells[2].textContent);
    const nota = prompt("Modificar nota:", fila.cells[3].textContent);
    if(actividad &&  nota){
        fila.cells[2].textContent= actividad;
        fila.cells[3].textContent= nota;

    }
    
    
}
agregarBtn.addEventListener('click', agregarActividad);

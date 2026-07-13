// Espera a que todo el contenido del HTML esté cargado antes de ejecutar el script.

document.addEventListener('DOMContentLoaded', () => {



    // --- BASE DE DATOS DE RAMOS ---

    // Extraído del PDF. El 'id' es el código del ramo y se usa para las dependencias.

    // Los requisitos son un array de 'id' de los ramos que se deben aprobar primero.

    const ramos_data = [

        // Año 1

        { id: 'ODO103', nombre: 'Introducción a la Odontología', semestre: 1, requisitos: [] },

        { id: 'MED103O', nombre: 'Anatomía Topográfica y Embriología I', semestre: 1, requisitos: [] },

        { id: 'QIM201D', nombre: 'Química', semestre: 1, requisitos: [] },

        { id: 'BIO214O', nombre: 'Biología Celular I', semestre: 1, requisitos: [] },

        { id: 'ODO104', nombre: 'Bioestadística', semestre: 1, requisitos: [] },

        { id: 'ODO105', nombre: 'Histología', semestre: 2, requisitos: ['MED103O'] },

        { id: 'MED104O', nombre: 'Anatomía Topográfica y Embriología II', semestre: 2, requisitos: ['MED103O'] },

        { id: 'FIS109O', nombre: 'Física para Odontología', semestre: 2, requisitos: [] },

        { id: 'BIO216O', nombre: 'Biología Celular II', semestre: 2, requisitos: ['BIO214O'] },

        { id: 'FILOSO', nombre: 'Filosofía: ¿Para qué?', semestre: 2, requisitos: [] },



        // Año 2

        { id: 'ODO205', nombre: 'Neurociencias, Dolor y Oclusión', semestre: 3, requisitos: ['ODO105', 'MED104O'] },

        { id: 'ODO206', nombre: 'Preclínico de Odontología Restauradora I', semestre: 3, requisitos: ['MED104O', 'ODO105', 'QIM201D'] },

        { id: 'BIO254O', nombre: 'Fisiología para Odontología', semestre: 3, requisitos: ['BIO216O', 'QIM201D', 'ODO105'] },

        { id: 'ODO207', nombre: 'Epidemiología', semestre: 3, requisitos: ['ODO104'] },

        { id: 'TEOLOG', nombre: 'Electivo Formación Teológica', semestre: 3, requisitos: [] },

        { id: 'ODO211', nombre: 'Introducción a la Clínica Odontológica', semestre: 4, requisitos: ['ODO103', 'MED104O'] },

        { id: 'ODO210', nombre: 'Preclínico de Odontología Restauradora II', semestre: 4, requisitos: ['FIS109O', 'ODO206'] },

        { id: 'ODO208', nombre: 'Microbiología', semestre: 4, requisitos: ['BIO216O', 'ODO105'] },

        { id: 'ODO212', nombre: 'Imagenología Diagnóstica I', semestre: 4, requisitos: ['MED104O', 'FIS109O'] },

        { id: 'ODO209', nombre: 'Patología General', semestre: 4, requisitos: ['BIO254O', 'BIO216O', 'MED104O'] },

        { id: 'ELECT1', nombre: 'Electivo Formación General', semestre: 4, requisitos: [] },

        

        // Año 3

        { id: 'ODO309', nombre: 'Odontología Clínica I', semestre: 5, requisitos: ['ODO211', 'ODO210', 'ODO212', 'ODO209', 'ODO208'] },

        { id: 'ODO310', nombre: 'Preclínico de Rehabilitación Oral I', semestre: 5, requisitos: ['ODO211', 'ODO210'] },

        { id: 'ODO311', nombre: 'Preclínico de Periodoncia', semestre: 5, requisitos: ['ODO208', 'ODO209', 'ODO211', 'ODO212'] },

        { id: 'ODO314', nombre: 'Farmacología', semestre: 5, requisitos: ['ODO209', 'ODO208'] },

        { id: 'ODO312', nombre: 'Fisiopatología y Semiología', semestre: 5, requisitos: ['ODO209'] },

        { id: 'ODO313', nombre: 'Patología Bucomaxilofacial I', semestre: 5, requisitos: ['ODO209'] },

        { id: 'ELECT2', nombre: 'Electivo Formación General', semestre: 5, requisitos: [] },

        { id: 'ODO315', nombre: 'Odontología Clínica II', semestre: 6, requisitos: ['ODO309', 'ODO314', 'ODO310', 'ODO313'] },

        { id: 'ODO316', nombre: 'Preclínico de Rehabilitación Oral II', semestre: 6, requisitos: ['ODO310'] },

        { id: 'ODO319', nombre: 'Preclínico de Endodoncia', semestre: 6, requisitos: ['ODO314', 'ODO313'] },

        { id: 'ODO317', nombre: 'Salud Pública', semestre: 6, requisitos: ['ODO207'] },

        { id: 'ODO318', nombre: 'Ética Clínica', semestre: 6, requisitos: ['ODO309'] },

        { id: 'ELECT3', nombre: 'Electivo Formación General', semestre: 6, requisitos: [] },

        { id: 'ELECT4', nombre: 'Electivo Formación General', semestre: 6, requisitos: [] },

        

        // Año 4

        { id: 'ODO418', nombre: 'Clínica Integral del Niño I', semestre: 7, requisitos: ['ODO315', 'ODO317', 'ODO318', 'ODO319'] },

        { id: 'ODO419', nombre: 'Clínica Integral del Adulto I', semestre: 7, requisitos: ['ODO315', 'ODO316', 'ODO317', 'ODO318', 'ODO319'] },

        { id: 'ODO420', nombre: 'Cirugía Bucal I', semestre: 7, requisitos: ['ODO312', 'ODO313', 'ODO315', 'ODO318'] },

        { id: 'ODO421', nombre: 'Imaginología Diagnóstica II', semestre: 7, requisitos: ['ODO313', 'ODO312'] },

        { id: 'ELECT5', nombre: 'Electivo Formación General', semestre: 7, requisitos: [] },

        { id: 'ODO423', nombre: 'Clínica Integral del Niño II', semestre: 8, requisitos: ['ODO403A'] },

        { id: 'ODO424', nombre: 'Clínica Integral del Adulto II', semestre: 8, requisitos: ['ODO405A'] },

        { id: 'ODO425', nombre: 'Cirugía Bucal II', semestre: 8, requisitos: ['ODO414A'] },

        { id: 'ODO422', nombre: 'Patología Bucal y Maxilofacial II', semestre: 8, requisitos: [] },

        { id: 'ELECT6', nombre: 'Electivo Formación General', semestre: 8, requisitos: [] },



        // Año 5

        { id: 'ODO518', nombre: 'Clínica Integral del Niño III', semestre: 9, requisitos: ['ODO407A'] },

        { id: 'ODO519', nombre: 'Clínica Integral del Adulto III', semestre: 9, requisitos: ['ODO409A'] },

        { id: 'ODO520', nombre: 'Cirugía Bucal III', semestre: 9, requisitos: ['ODO416A'] },

        { id: 'ODO521', nombre: 'Odontología Geriátrica I', semestre: 9, requisitos: ['ODO409A', 'ODO416A'] },

        { id: 'ODO522', nombre: 'Odontología Legal', semestre: 9, requisitos: [] },

        { id: 'ODO525', nombre: 'Clínica Integral del Niño IV', semestre: 10, requisitos: ['ODO502A'] },

        { id: 'ODO523', nombre: 'Clínica Integral de Adulto IV', semestre: 10, requisitos: ['ODO510A'] },

        { id: 'ODO524', nombre: 'Cirugía Bucal IV', semestre: 10, requisitos: ['ODO509A'] },

        { id: 'ODO526', nombre: 'Odontología Geriátrica II', semestre: 10, requisitos: ['ODO514A'] },

        { id: 'ODO527', nombre: 'Administración y Gestión en Salud', semestre: 10, requisitos: [] },

        

        // Año 6

        { id: 'ODO619', nombre: 'Internado', semestre: 11, requisitos: [] }, // Requisitos complejos, se dejan abiertos

        { id: 'ODO620', nombre: 'Cuidados Especiales en Odontología', semestre: 12, requisitos: [] },

        { id: 'ODO621', nombre: 'Clínica Práctica Avanzada', semestre: 12, requisitos: [] },

        { id: 'ODO330X', nombre: 'Optativo de Profundización', semestre: 12, requisitos: [] },

    ];

    

    const mallaContainer = document.getElementById('malla-container');

    const notificacion = document.getElementById('notificacion');

    let aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

    

    // Función para generar la malla curricular en el HTML

    function generarMalla() {

        const mallaGrid = document.createElement('div');

        mallaGrid.className = 'malla-grid';

        

        const maxSemestre = Math.max(...ramos_data.map(r => r.semestre));



        for (let i = 1; i <= maxSemestre; i++) {

            const semestreColumna = document.createElement('div');

            semestreColumna.className = 'semestre-columna';

            

            const tituloSemestre = document.createElement('div');

            tituloSemestre.className = 'semestre-titulo';

            tituloSemestre.innerText = `Semestre ${i}`;

            semestreColumna.appendChild(tituloSemestre);



            const ramosDelSemestre = ramos_data.filter(ramo => ramo.semestre === i);



            ramosDelSemestre.forEach(ramo => {

                const ramoDiv = document.createElement('div');

                ramoDiv.className = 'ramo';

                ramoDiv.dataset.id = ramo.id;

                ramoDiv.dataset.requisitos = JSON.stringify(ramo.requisitos);



                ramoDiv.innerHTML = `

                    <div class="ramo-nombre">${ramo.nombre}</div>

                    <div class="ramo-codigo">${ramo.id}</div>

                `;

                

                ramoDiv.addEventListener('click', () => manejarClickRamo(ramo));

                semestreColumna.appendChild(ramoDiv);

            });

            mallaGrid.appendChild(semestreColumna);

        }

        mallaContainer.appendChild(mallaGrid);

    }



    // NUEVA FUNCIÓN AGREGADA AQUÍ: Elimina en cadena los ramos dependientes

    function eliminarDependientes(ramoId) {

        const dependientes = ramos_data.filter(ramo => ramo.requisitos.includes(ramoId));

        dependientes.forEach(dep => {

            if (aprobados.includes(dep.id)) {

                aprobados = aprobados.filter(id => id !== dep.id);

                eliminarDependientes(dep.id); // Borrado en cadena recursivo

            }

        });

    }



    // Función para manejar el clic en un ramo (MODIFICADA)

    function manejarClickRamo(ramo) {

        const { id, requisitos } = ramo;

        const yaAprobado = aprobados.includes(id);



        if (yaAprobado) {

            // Permitir "des-aprobar" un ramo

            aprobados = aprobados.filter(ramoId => ramoId !== id);

            eliminarDependientes(id); // <--- Llama a la limpieza en cadena

        } else {

            // Verificar si los requisitos están cumplidos

            const requisitosFaltantes = verificarRequisitos(requisitos);



            if (requisitosFaltantes.length > 0) {

                const nombresRamosFaltantes = requisitosFaltantes.map(reqId => {

                    const ramoFaltante = ramos_data.find(r => r.id === reqId);

                    return ramoFaltante ? ramoFaltante.nombre : reqId;

                }).join(', ');

                mostrarNotificacion(`Requisitos pendientes: ${nombresRamosFaltantes}`);

                return; // Detiene la ejecución si faltan requisitos

            }

            // Si no faltan requisitos, se aprueba el ramo

            aprobados.push(id);

        }

        

        // Guardar el estado y actualizar la visualización

        guardarProgreso();

        actualizarVisualizacion();

    }



    // Verifica si todos los requisitos de un ramo están en la lista de aprobados (MODIFICADA)

    function verificarRequisitos(requisitos) {

        if (!requisitos || requisitos.length === 0) return [];

        return requisitos.filter(req => !aprobados.includes(req));

    }



    // Actualiza las clases CSS de todos los ramos según su estado (MODIFICADA)

    function actualizarVisualizacion() {

        const todosLosRamos = document.querySelectorAll('.ramo');

        todosLosRamos.forEach(ramoDiv => {

            const id = ramoDiv.dataset.id;

            const requisitos = JSON.parse(ramoDiv.dataset.requisitos);



            // Limpiar clases de estado

            ramoDiv.classList.remove('aprobado', 'bloqueado');



            if (aprobados.includes(id)) {

                ramoDiv.classList.add('aprobado');

            } else {

                const requisitosFaltantes = verificarRequisitos(requisitos);

                if (requisitosFaltantes.length > 0) {

                    ramoDiv.classList.add('bloqueado');

                }

            }

        });

    }



    // Guarda la lista de ramos aprobados en el LocalStorage del navegador

    function guardarProgreso() {

        localStorage.setItem('ramosAprobados', JSON.stringify(aprobados));

    }



    // Muestra una notificación temporal en pantalla

    function mostrarNotificacion(mensaje) {

        notificacion.innerText = mensaje;

        notificacion.style.display = 'block';

        if (window.notifTimeout) clearTimeout(window.notifTimeout);

        window.notifTimeout = setTimeout(() => {

            notificacion.style.display = 'none';

        }, 3000); // La notificación desaparece después de 3 segundos

    }



    // --- INICIALIZACIÓN ---

    generarMalla();

    actualizarVisualizacion();

});

    generarMalla();

    actualizarVisualizacion();

}); 


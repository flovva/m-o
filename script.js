// Espera a que todo el contenido del HTML esté cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // --- BASE DE DATOS DE RAMOS ---
    // Extraído del PDF. El 'id' es el código del ramo y se usa para las dependencias.
    // Los requisitos son un array de 'id' de los ramos que se deben aprobar primero.
    const ramos_data = [
        // Año 1
        { id: 'ODO103', nombre: 'Introducción a la Odontología', semestre: 1, requisitos: [] },
        { id: 'MED1030', nombre: 'Anatomía Topográfica y Embriología I', semestre: 1, requisitos: [] },
        { id: 'QIM201D', nombre: 'Química', semestre: 1, requisitos: [] },
        { id: 'BIO2140', nombre: 'Biología Celular I', semestre: 1, requisitos: [] },
        { id: 'ODO104', nombre: 'Bioestadística', semestre: 1, requisitos: [] },
        { id: 'ODO105', nombre: 'Histología', semestre: 2, requisitos: ['MED1030'] },
        { id: 'MED1040', nombre: 'Anatomía Topográfica y Embriología II', semestre: 2, requisitos: ['MED1030'] },
        { id: 'FIS1090', nombre: 'Física para Odontología', semestre: 2, requisitos: [] },
        { id: 'BIO2160', nombre: 'Biología Celular II', semestre: 2, requisitos: ['BIO2140'] },
        { id: 'FILOSO', nombre: 'Filosofía: ¿Para qué?', semestre: 2, requisitos: [] },

        // Año 2
        { id: 'ODO205', nombre: 'Neurociencias, Dolor y Oclusión', semestre: 3, requisitos: ['ODO105', 'MED1040'] },
        { id: 'ODO206', nombre: 'Preclínico de Odontología Restauradora I', semestre: 3, requisitos: ['MED1040', 'ODO105', 'QIM201D'] },
        { id: 'BIO2540', nombre: 'Fisiología para Odontología', semestre: 3, requisitos: ['BIO2160', 'QIM201D', 'ODO105'] },
        { id: 'ODO207', nombre: 'Epidemiología', semestre: 3, requisitos: ['ODO104'] },
        { id: 'TEOLOG', nombre: 'Electivo Formación Teológica', semestre: 3, requisitos: [] },
        { id: 'ODO211', nombre: 'Introducción a la Clínica Odontológica', semestre: 4, requisitos: [] },
        { id: 'ODO210', nombre: 'Preclínico de Odontología Restauradora II', semestre: 4, requisitos: ['FIS1090', 'ODO206'] },
        { id: 'ODO208', nombre: 'Microbiología', semestre: 4, requisitos: ['BIO2160', 'ODO105'] },
        { id: 'ODO212', nombre: 'Imagenología Diagnóstica I', semestre: 4, requisitos: ['MED1040', 'FIS1090'] },
        { id: 'ODO209', nombre: 'Patología General', semestre: 4, requisitos: ['BIO2540', 'BIO2160', 'MED1040'] },
        { id: 'ELECT1', nombre: 'Electivo Formación General', semestre: 4, requisitos: [] },
        
        // Año 3
        { id: 'ODO309', nombre: 'Odontología Clínica I', semestre: 5, requisitos: ['ODO211', 'ODO210'] },
        { id: 'ODO310', nombre: 'Preclínico de Rehabilitación Oral I', semestre: 5, requisitos: ['ODO211', 'ODO210'] },
        { id: 'ODO311', nombre: 'Preclínico de Periodoncia', semestre: 5, requisitos: ['ODO208', 'ODO209', 'ODO211'] },
        { id: 'ODO314', nombre: 'Farmacología', semestre: 5, requisitos: ['ODO209', 'ODO208'] },
        { id: 'ODO312', nombre: 'Fisiopatología y Semiología', semestre: 5, requisitos: [] },
        { id: 'ODO313', nombre: 'Patología Bucomaxilofacial I', semestre: 5, requisitos: [] },
        { id: 'ELECT2', nombre: 'Electivo Formación General', semestre: 5, requisitos: [] },
        { id: 'ODO315', nombre: 'Odontología Clínica II', semestre: 6, requisitos: ['ODO309', 'ODO314', 'ODO310'] },
        { id: 'ODO316', nombre: 'Preclínico de Rehabilitación Oral II', semestre: 6, requisitos: ['ODO310'] },
        { id: 'ODO319', nombre: 'Preclínico de Endodoncia', semestre: 6, requisitos: ['ODO314', 'ODO313'] },
        { id: 'ODO317', nombre: 'Salud Pública', semestre: 6, requisitos: ['ODO207'] },
        { id: 'ODO318', nombre: 'Ética Clínica', semestre: 6, requisitos: [] },
        { id: 'ELECT3', nombre: 'Electivo Formación General', semestre: 6, requisitos: [] },
        { id: 'ELECT4', nombre: 'Electivo Formación General', semestre: 6, requisitos: [] },
        
        // Año 4
        { id: 'ODO403A', nombre: 'Clínica Integral del Niño I', semestre: 7, requisitos: [] },
        { id: 'ODO405A', nombre: 'Clínica Integral del Adulto I', semestre: 7, requisitos: [] },
        { id: 'ODO414A', nombre: 'Cirugía Bucal I', semestre: 7, requisitos: [] },
        { id: 'ODO417A', nombre: 'Imaginología Diagnóstica II', semestre: 7, requisitos: [] },
        { id: 'ELECT5', nombre: 'Electivo Formación General', semestre: 7, requisitos: [] },
        { id: 'ODO407A', nombre: 'Clínica Integral del Niño II', semestre: 8, requisitos: ['ODO403A'] },
        { id: 'ODO409A', nombre: 'Clínica Integral del Adulto II', semestre: 8, requisitos: ['ODO405A'] },
        { id: 'ODO416A', nombre: 'Cirugía Bucal II', semestre: 8, requisitos: ['ODO414A'] },
        { id: 'ODO415A', nombre: 'Patología Bucal y Maxilofacial II', semestre: 8, requisitos: [] },
        { id: 'ELECT6', nombre: 'Electivo Formación General', semestre: 8, requisitos: [] },

        // Año 5
        { id: 'ODO502A', nombre: 'Clínica Integral del Niño III', semestre: 9, requisitos: ['ODO407A'] },
        { id: 'ODO510A', nombre: 'Clínica Integral del Adulto III', semestre: 9, requisitos: ['ODO409A'] },
        { id: 'ODO509A', nombre: 'Cirugía Bucal III', semestre: 9, requisitos: ['ODO416A'] },
        { id: 'ODO514A', nombre: 'Odontología Geriátrica I', semestre: 9, requisitos: ['ODO409A', 'ODO416A'] },
        { id: 'ODO601A', nombre: 'Odontología Legal', semestre: 9, requisitos: [] },
        { id: 'ODO505A', nombre: 'Clínica Integral del Niño IV', semestre: 10, requisitos: ['ODO502A'] },
        { id: 'ODO507A', nombre: 'Clínica Integral de Adulto IV', semestre: 10, requisitos: ['ODO510A'] },
        { id: 'ODO512A', nombre: 'Cirugía Bucal IV', semestre: 10, requisitos: ['ODO509A'] },
        { id: 'ODO516A', nombre: 'Odontología Geriátrica II', semestre: 10, requisitos: ['ODO514A'] },
        { id: 'ODO604A', nombre: 'Administración y Gestión en Salud', semestre: 10, requisitos: [] },
        
        // Año 6
        { id: 'INTERN', nombre: 'Internado', semestre: 11, requisitos: [] }, // Requisitos complejos, se dejan abiertos
        { id: 'CUIDAD', nombre: 'Cuidados Especiales en Odontología', semestre: 12, requisitos: [] },
        { id: 'CLINAV', nombre: 'Clínica Práctica Avanzada', semestre: 12, requisitos: [] },
        { id: 'OPTAPRO', nombre: 'Optativo de Profundización', semestre: 12, requisitos: [] },
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

    // Función para manejar el clic en un ramo
    function manejarClickRamo(ramo) {
        const { id, requisitos } = ramo;
        const yaAprobado = aprobados.includes(id);

        if (yaAprobado) {
            // Permitir "des-aprobar" un ramo
            aprobados = aprobados.filter(ramoId => ramoId !== id);
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

    // Verifica si todos los requisitos de un ramo están en la lista de aprobados
    function verificarRequisitos(requisitos) {
        return requisitos.filter(req => !aprobados.includes(req));
    }

    // Actualiza las clases CSS de todos los ramos según su estado
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
        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 3000); // La notificación desaparece después de 3 segundos
    }

    // --- INICIALIZACIÓN ---
    generarMalla();
    actualizarVisualizacion();
});

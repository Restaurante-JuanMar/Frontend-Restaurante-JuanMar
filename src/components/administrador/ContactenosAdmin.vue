<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStoreContactar } from '../../stores/contactenos.js';

const useContactenos = useStoreContactar();
const solicitudes = ref([]);
const solicitudesFiltradas = ref([]);
const loading = ref(false);
const filter = ref('');
const solicitudSeleccionada = ref(null);
const limit = ref(1);

async function getSolicitud() {
    loading.value = true;
    try {
        const response = await useContactenos.getAll();
        if (useContactenos.estatus === 200) {
            solicitudes.value = [...response].reverse()
            solicitudesFiltradas.value = [...response].reverse()
        }
        console.log("solicitudes", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}


// Computed para limitar las filas mostradas
const solicitudesLimitadas = computed(() => {
    return solicitudes.value.slice(0, limit.value);
});

function verDetalles(solicitud) {
    solicitudSeleccionada.value = solicitud;
}

function verMas() {
    limit.value += 5;
}

function formatFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const year = fecha.getFullYear();
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} a las ${hours}:${minutes}`;
}



onMounted(() => {
    getSolicitud();
})

</script>

<template>
    <div>
        <div class="container">
            <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Información de
                Contactenos</h4>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                            <th scope="col" style="color: #734a4a;">Telefono</th>
                            <th scope="col" style="color: #734a4a;">Comentario</th>
                            <th scope="col" style="color: #734a4a;">Detalles</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="solicitud in solicitudesLimitadas" :key="solicitud._id">
                            <td style="color: #734a4a;">{{ solicitud.nombre }}</td>
                            <td style="color: #734a4a;">{{ solicitud.apellido }}</td>
                            <td style="color: #734a4a;">{{ solicitud.correo }}</td>
                            <td style="color: #734a4a;">{{ solicitud.telefono }}</td>
                            <td class="mensaje">
                                <VMenu v-if="solicitud.mensaje" class="vmenu">
                                    <span class="mensaje" style="color: #734a4a;">
                                        {{ solicitud.mensaje.slice(0, 40) }}...
                                    </span>
                                    <template #popper>
                                        <div class="mensajeVmenu">{{ solicitud.mensaje }}</div>
                                    </template>
                                </VMenu>
                                <span v-else style="color: #734a4a;">No aplica</span>
                            </td>
                            <td>
                                <button type="button" id="imprimir" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                    data-bs-toggle="modal" data-bs-target="#modalDetalle"
                                    @click="verDetalles(solicitud)"><i class="bi bi-eye"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="limit < solicitudes.length" class="text-center my-3">
                    <button @click="verMas" class="btn fw-bold" style="background-color: #fe6f61; color: white;">Ver más
                        solicitudes</button>
                </div>

                <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Información de PQR
                </h4>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">#</th>
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Tipo de Documento</th>
                            <th scope="col" style="color: #734a4a;">Numero de Documento</th>
                            <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                            <th scope="col" style="color: #734a4a;">Telefono</th>
                            <th scope="col" style="color: #734a4a;">Tipo PQR</th>
                            <th scope="col" style="color: #734a4a;">Asunto</th>
                            <th scope="col" style="color: #734a4a;">Comentario</th>
                            <th scope="col" style="color: #734a4a;">Archivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" style="color: #734a4a;">1</th>
                            <td style="color: #734a4a;">Andres David</td>
                            <td style="color: #734a4a;">Salgado Cala</td>
                            <td style="color: #734a4a;">Cédula de Ciudadanía</td>
                            <td style="color: #734a4a;">1100789456</td>
                            <td style="color: #734a4a;">andres@gmail.com</td>
                            <td style="color: #734a4a;">3128794564</td>
                            <td style="color: #734a4a;">Felicitaciones</td>
                            <td style="color: #734a4a;">Felicitaciones</td>
                            <td style="color: #734a4a;">Escelente el servicio y la presentación de la comida</td>
                            <td style="color: #734a4a;">
                                <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">2</th>
                            <td style="color: #734a4a;">Brayan</td>
                            <td style="color: #734a4a;">Rodriguez Jaimes</td>
                            <td style="color: #734a4a;">Cédula de Ciudadanía</td>
                            <td style="color: #734a4a;">1110321765</td>
                            <td style="color: #734a4a;">brayanrj@gmail.com</td>
                            <td style="color: #734a4a;">3018792560</td>
                            <td style="color: #734a4a;">Queja</td>
                            <td style="color: #734a4a;">Prestación del servicio</td>
                            <td style="color: #734a4a;">El personal que atiende y los meseros no tiene una buena actitud
                            </td>
                            <td style="color: #734a4a;">
                                <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">3</th>
                            <td style="color: #734a4a;">Johanna Maritza</td>
                            <td style="color: #734a4a;">Arias Sanchez</td>
                            <td style="color: #734a4a;">Cédula de Ciudadanía</td>
                            <td style="color: #734a4a;">1010145789</td>
                            <td style="color: #734a4a;">johanaarias@gmail.com</td>
                            <td style="color: #734a4a;">3164107896</td>
                            <td style="color: #734a4a;">Petición</td>
                            <td style="color: #734a4a;">Carta del menu</td>
                            <td style="color: #734a4a;"></td>
                            <td style="color: #734a4a;">
                                <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" id="modalDetalle" tabindex="-1" aria-labelledby="modalDetalleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #fe6f61;">
                        <h4 class="fw-bold" style="color: white;">Detalles de la Solicitud</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div v-if="solicitudSeleccionada" class="modal-body text-start">
                        <p><strong style="color: #734a4a;">Nombre:</strong> {{ solicitudSeleccionada.nombre }}</p>
                        <p><strong style="color: #734a4a;">Apellidos:</strong> {{ solicitudSeleccionada.apellido }}</p>
                        <p><strong style="color: #734a4a;">Correo Electrónico:</strong> {{ solicitudSeleccionada.correo
                            }}</p>
                        <p><strong style="color: #734a4a;">Teléfono:</strong> {{ solicitudSeleccionada.telefono }}</p>
                        <p><strong style="color: #734a4a;">Enviada el:</strong> {{
                            formatFecha(solicitudSeleccionada.createAT)
                        }}</p>
                        <p><strong style="color: #734a4a;">Comentario:</strong> {{ solicitudSeleccionada.mensaje }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mensaje {
    max-width: 200px;
    height: 22px;
    word-wrap: break-word;
    overflow: hidden;
}

.vmenu {
    max-height: 20px;
}

.mensajeVmenu {
    padding: 1rem;
    word-wrap: break-word;
    height: fit-content;
    max-height: 300px;
    max-width: 300px;
}
</style>
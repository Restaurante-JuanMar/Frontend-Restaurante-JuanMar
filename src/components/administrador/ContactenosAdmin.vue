<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStoreContactar } from '../../stores/contactenos.js';
import { useStorePqr } from '../../stores/pqr.js';

const useContactenos = useStoreContactar();
const usePqr = useStorePqr();
const solicitudes = ref([]);
const solicitudesFiltradas = ref([]);
const solicitudesPqr = ref([]);
const solicitudesFiltradasPqr = ref([]);
const loading = ref(false);
const loadingPqr = ref(false);
const solicitudSeleccionada = ref(null);
const solicitudPqrSeleccionada = ref(null);
const limit = ref(5);
const limitPqr = ref(5);

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

async function getSolicitudPqr() {
    loadingPqr.value = true;
    try {
        const response = await usePqr.getAll();
        if (usePqr.estatus === 200) {
            solicitudesPqr.value = [...response].reverse()
            solicitudesFiltradasPqr.value = [...response].reverse()
        }
        console.log("solicitudes pqr", response)
    } catch (error) {
        console.log(error);
    } finally {
        loadingPqr.value = false;
    }
}


// Computed para limitar las filas mostradas
const solicitudesLimitadas = computed(() => {
    return solicitudes.value.slice(0, limit.value);
});

const solicitudesPqrLimitadas = computed(() => {
    return solicitudesPqr.value.slice(0, limitPqr.value);
});

function verDetalles(solicitud) {
    solicitudSeleccionada.value = solicitud;
}

function verDetallesPqr(solicitudpqr) {
    solicitudPqrSeleccionada.value = solicitudpqr;
}

function verMas() {
    limit.value += 5;
}

function verMasPqr() {
    limitPqr.value += 5;
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
    getSolicitudPqr();
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
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Tipo de Documento</th>
                            <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                            <th scope="col" style="color: #734a4a;">Telefono</th>
                            <th scope="col" style="color: #734a4a;">Tipo PQR</th>
                            <th scope="col" style="color: #734a4a;">Comentario</th>
                            <th scope="col" style="color: #734a4a;">Archivo</th>
                            <th scope="col" style="color: #734a4a;">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="solicitud in solicitudesPqrLimitadas" :key="solicitud._id">
                            <td style="color: #734a4a;">{{ solicitud.nombre }}</td>
                            <td style="color: #734a4a;">{{ solicitud.apellido }}</td>
                            <td style="color: #734a4a;">{{ solicitud.tipoDocumento }}</td>
                            <td style="color: #734a4a;">{{ solicitud.correo }}</td>
                            <td style="color: #734a4a;">{{ solicitud.telefono }}</td>
                            <td style="color: #734a4a;">{{ solicitud.tipoPqr }}</td>
                            <td class="mensaje">
                                <VMenu v-if="solicitud.descripcion" class="vmenu">
                                    <span class="mensaje" style="color: #734a4a;">
                                        {{ solicitud.descripcion.slice(0, 40) }}...
                                    </span>
                                    <template #popper>
                                        <div class="mensajeVmenu">{{ solicitud.descripcion }}</div>
                                    </template>
                                </VMenu>
                                <span v-else style="color: #734a4a;">No aplica</span>
                            </td>
                            <td style="color: #734a4a;">
                                <a style="color: #734a4a; font-weight: bold;" :href="solicitud.archivoUrl.url"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                            <td>
                                <button type="button" id="imprimir" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                    data-bs-toggle="modal" data-bs-target="#modalDetallePqr"
                                    @click="verDetallesPqr(solicitud)"><i class="bi bi-eye"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="limitPqr < solicitudesPqr.length" class="text-center my-3">
                    <button @click="verMasPqr" class="btn fw-bold" style="background-color: #fe6f61; color: white;">Ver más
                        solicitudes pqr</button>
                </div>
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
                        <p><strong style="color: #734a4a;">Comentario:</strong> {{ solicitudSeleccionada.mensaje }}</p>
                        <p><strong style="color: #734a4a;">Enviada el:</strong> {{
                            formatFecha(solicitudSeleccionada.createAT)
                        }}</p>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="modal fade" id="modalDetallePqr" tabindex="-1" aria-labelledby="modalDetalleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #fe6f61;">
                        <h4 class="fw-bold" style="color: white;">Detalles de la Solicitud</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div v-if="solicitudPqrSeleccionada" class="modal-body text-start">
                        <p><strong style="color: #734a4a;">Nombre:</strong> {{ solicitudPqrSeleccionada.nombre }}</p>
                        <p><strong style="color: #734a4a;">Apellidos:</strong> {{ solicitudPqrSeleccionada.apellido }}</p>
                        <p><strong style="color: #734a4a;">Tipo Documento:</strong> {{ solicitudPqrSeleccionada.tipoDocumento }}</p>
                        <p><strong style="color: #734a4a;">Número Documento:</strong> {{ solicitudPqrSeleccionada.numDocumento }}</p>
                        <p><strong style="color: #734a4a;">Correo Electrónico:</strong> {{ solicitudPqrSeleccionada.correo
                            }}</p>
                        <p><strong style="color: #734a4a;">Teléfono:</strong> {{ solicitudPqrSeleccionada.telefono }}</p>
                        <p><strong style="color: #734a4a;">Tipo PQR:</strong> {{ solicitudPqrSeleccionada.tipoPqr }}</p>
                        <p><strong style="color: #734a4a;">Asunto:</strong> {{ solicitudPqrSeleccionada.telefono }}</p>
                        <p><strong style="color: #734a4a;">Comentario:</strong> {{ solicitudPqrSeleccionada.descripcion }}</p>
                        <p><strong style="color: #734a4a;">Enviada el:</strong> {{
                            formatFecha(solicitudPqrSeleccionada.createdAt)
                        }}</p>
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
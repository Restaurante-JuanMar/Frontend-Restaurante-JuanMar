<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStoreReservas } from '../../stores/reserva';
import { useStoreListadoPlatos } from '../../stores/listado_plato.js';

const useReserva = useStoreReservas();
const useListadoPlato = useStoreListadoPlatos();
const reservas = ref([]);
const reservasFiltradas = ref([]);
const reservasConfirmadas = ref([]);
const listadoPlato = ref([])
const reservaSeleccionada = ref();
const limit = ref(5);
const limitConf = ref(5);
const limitLisP = ref(5);
const filter = ref('');
const filterConf = ref('');
const filterListP = ref('');
const loading = ref(false);
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');

// Aceptar la reserva
async function aprobarReserva(id) {

    notificacionCargando.value = true;
    mensajeCargando.value = 'Aprobando reserva...';

    try {
        const response = await useReserva.aprobarReserva(id);
        if (useReserva.estatus === 200) {
            await getReserva(); // Actualizar la lista después de aprobar
            mensajeCargando.value = '¡Reserva aprobada!';
        }
    } catch (error) {
        console.error("Error al aprobar la reserva:", error);
        notificacionValidacion.value = true;
        mensajeValidacion.value = 'Error al aprobar la reserva';
        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);

    } finally {
        setTimeout(() => {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
        }, 3000);
    }
}

// Rechazar la reserva
async function inactivarReserva(id) {

    notificacionCargando.value = true;
    mensajeCargando.value = 'Eliminando reserva...';

    try {
        const response = await useReserva.inactivarReserva(id);
        if (useReserva.estatus === 200) {
            await getReserva(); // Actualizar la lista después de inactivar
            await getListadoPlato();
            mensajeCargando.value = 'Reserva eliminada';
        }
    } catch (error) {
        console.error("Error al inactivar la reserva:", error);
        notificacionValidacion.value = true;
        mensajeValidacion.value = 'Error al eliminar la reserva';
        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
    } finally {
        setTimeout(() => {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
        }, 3000);
    }
}

// Desactivar listado de platos
async function inactivarListadoPlato(id) {

    notificacionCargando.value = true;
    mensajeCargando.value = 'Eliminando listado de plato...';

    try {
        const response = await useListadoPlato.inactivarListadoPlato(id);
        if (useListadoPlato.estatus === 200) {
            await getListadoPlato();
            await getReserva(); // Actualizar la lista después de inactivar
            mensajeCargando.value = 'Listado de plato y reserva eliminada';
        }
    } catch (error) {
        console.error("Error al inactivar el listado de plato:", error);
        notificacionValidacion.value = true;
        mensajeValidacion.value = 'Error al eliminar el listado de plato';
        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
    } finally {
        setTimeout(() => {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
        }, 3000);
    }
}

const reservasFiltradasLimitadas = computed(() => {
    // Filtrar las reservas en base al nombre y apellido
    const filtroAplicado = reservasFiltradas.value.filter((reserva) => {
        const nombreCompleto = `${reserva.nombre_cliente} ${reserva.apellido_cliente}`.toLowerCase();
        const filterText = filter.value.toLowerCase();
        return (
            reserva.nombre_cliente.toLowerCase().includes(filterText) ||
            reserva.apellido_cliente.toLowerCase().includes(filterText) ||
            nombreCompleto.includes(filterText)
        );
    });
    // Aplicar el límite de visualización
    return filtroAplicado.slice(0, limit.value);
});

const reservasConfirmadasLimitadas = computed(() => {
    // Filtrar las reservas en base al nombre y apellido
    const filtroAplicado = reservasConfirmadas.value.filter((reserva) => {
        const nombreCompleto = `${reserva.nombre_cliente} ${reserva.apellido_cliente}`.toLowerCase();
        const filterText = filterConf.value.toLowerCase();
        return (
            reserva.nombre_cliente.toLowerCase().includes(filterText) ||
            reserva.apellido_cliente.toLowerCase().includes(filterText) ||
            nombreCompleto.includes(filterText)
        );
    });
    // Aplicar el límite de visualización
    return filtroAplicado.slice(0, limitConf.value);
});

const listadoPlatoFiltradoLimitado = computed(() => {
    // Filtrar las reservas en base al nombre y apellido
    const filtroAplicado = listadoPlato.value.filter((lp) => {
        const nombreCompleto = `${lp.idReserva.nombre_cliente} ${lp.idReserva.apellido_cliente}`.toLowerCase();
        const filterText = filterListP.value.toLowerCase();
        return (
            lp.idReserva.nombre_cliente.toLowerCase().includes(filterText) ||
            lp.idReserva.apellido_cliente.toLowerCase().includes(filterText) ||
            nombreCompleto.includes(filterText)
        );
    });
    // Aplicar el límite de visualización
    return filtroAplicado.slice(0, limitLisP.value);
});

function verMas() {
    limit.value += 5;
}

function verMasConf() {
    limitConf.value += 5;
}

function verMasLisP() {
    limitLisP.value += 5;
}

function verDetalles(reserva) {
    reservaSeleccionada.value = reserva;
}

function formatFecha(fechaISO) {
    const [year, month, day] = fechaISO.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
}

function formatFechaDetalle(fechaISO) {
    const fecha = new Date(fechaISO);
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const year = fecha.getFullYear();
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} a las ${hours}:${minutes}`;
}

async function getReserva() {
    loading.value = true;
    try {
        const response = await useReserva.getAll();
        if (useReserva.estatus === 200) {
            reservas.value = [...response].reverse()
            reservasFiltradas.value = [...response].reverse().filter(reserva => reserva.aprobado === false && reserva.estado === true)
            reservasConfirmadas.value = [...response].reverse().filter(reserva => reserva.aprobado === true && reserva.estado === true)
        }
        console.log("reservas", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

async function getListadoPlato() {
    loading.value = true;
    try {
        const response = await useListadoPlato.getAll();
        if (useListadoPlato.estatus === 200) {
            listadoPlato.value = [...response].reverse().filter(lp => lp.estado === true)
        }
        console.log("listado platos", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    getReserva();
    getListadoPlato();
})
</script>

<template>
    <div>
        <div class="container">
            <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Información de Reservas
            </h4>
            <form class="d-flex mb-3" role="search">
                <input class="form-control me-2" style="border: 1px solid #734a4a;" type="search" v-model="filter"
                    placeholder="Buscar por nombre" aria-label="Search">
                <button class="btn" type="submit"
                    style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Buscar</button>
            </form>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">Fecha</th>
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                            <th scope="col" style="color: #734a4a;">Telefono</th>
                            <th scope="col" style="color: #734a4a;">Numero de Personas</th>
                            <th scope="col" style="color: #734a4a;">Descripción</th>
                            <th scope="col" style="color: #734a4a;">Detalles</th>
                            <th scope="col" style="color: #734a4a;">Aceptar</th>
                            <th scope="col" style="color: #734a4a;">Rechazar</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="reserva in reservasFiltradasLimitadas" :key="reserva._id">
                            <td style="color: #734a4a;">{{ formatFecha(reserva.fecha_res) }}</td>
                            <td style="color: #734a4a;">{{ reserva.nombre_cliente }}</td>
                            <td style="color: #734a4a;">{{ reserva.apellido_cliente }}</td>
                            <td style="color: #734a4a;">{{ reserva.correo_cliente }}</td>
                            <td style="color: #734a4a;">{{ reserva.telefono_cliente }}</td>
                            <td style="color: #734a4a;">{{ reserva.num_personas }}</td>
                            <td class="mensaje">
                                <VMenu v-if="reserva.mensaje_res" class="vmenu">
                                    <span class="mensaje" style="color: #734a4a;">
                                        {{ reserva.mensaje_res.slice(0, 40) }}...
                                    </span>
                                    <template #popper>
                                        <div class="mensajeVmenu">{{ reserva.mensaje_res }}</div>
                                    </template>
                                </VMenu>
                                <span v-else style="color: #734a4a;">No aplica</span>
                            </td>
                            <td>
                                <button type="button" id="imprimir" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                    data-bs-toggle="modal" data-bs-target="#modalDetalle"
                                    @click="verDetalles(reserva)"><i class="bi bi-eye"></i></button>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn" @click="aprobarReserva(reserva._id)"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-check-circle-fill"></i></button>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn" @click="inactivarReserva(reserva._id)"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="limit < reservas.length" class="text-center my-3">
                <button @click="verMas" class="btn fw-bold" style="background-color: #fe6f61; color: white;">Ver más
                    reservas</button>
            </div>
            <!--Reservas aceptadas-->
            <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Reservas
                Confirmadas</h4>
            <form class="d-flex mb-3" role="search">
                <input class="form-control me-2" style="border: 1px solid #734a4a;" type="search" v-model="filterConf"
                    placeholder="Buscar por nombre" aria-label="Search">
                <button class="btn" type="submit"
                    style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Buscar</button>
            </form>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">Fecha</th>
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                            <th scope="col" style="color: #734a4a;">Telefono</th>
                            <th scope="col" style="color: #734a4a;">Numero de Personas</th>
                            <th scope="col" style="color: #734a4a;">Descripción</th>
                            <th scope="col" style="color: #734a4a;">Detalles</th>
                            <th scope="col" style="color: #734a4a;">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="reserva in reservasConfirmadasLimitadas" :key="reserva._id">
                            <td style="color: #734a4a;">{{ formatFecha(reserva.fecha_res) }}</td>
                            <td style="color: #734a4a;">{{ reserva.nombre_cliente }}</td>
                            <td style="color: #734a4a;">{{ reserva.apellido_cliente }}</td>
                            <td style="color: #734a4a;">{{ reserva.correo_cliente }}</td>
                            <td style="color: #734a4a;">{{ reserva.telefono_cliente }}</td>
                            <td style="color: #734a4a;">{{ reserva.num_personas }}</td>
                            <td class="mensaje">
                                <VMenu v-if="reserva.mensaje_res" class="vmenu">
                                    <span class="mensaje" style="color: #734a4a;">
                                        {{ reserva.mensaje_res.slice(0, 40) }}...
                                    </span>
                                    <template #popper>
                                        <div class="mensajeVmenu">{{ reserva.mensaje_res }}</div>
                                    </template>
                                </VMenu>
                                <span v-else style="color: #734a4a;">No aplica</span>
                            </td>
                            <td>
                                <button type="button" id="imprimir" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                    data-bs-toggle="modal" data-bs-target="#modalDetalle"
                                    @click="verDetalles(reserva)"><i class="bi bi-eye"></i></button>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn" @click="inactivarReserva(reserva._id)"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="limitConf < reservasConfirmadas.length" class="text-center my-3">
                <button @click="verMasConf" class="btn fw-bold" style="background-color: #fe6f61; color: white;">Ver
                    más
                    reservas confirmadas</button>
            </div>
            <!--Listado de Platos-->
            <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Listado de Platos
            </h4>
            <form class="d-flex mb-3" role="search">
                <input class="form-control me-2" style="border: 1px solid #734a4a;" type="search" v-model="filterListP"
                    placeholder="Buscar por nombre" aria-label="Search">
                <button class="btn" type="submit"
                    style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Buscar</button>
            </form>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                <thead>
                    <tr style="text-align: center;">
                        <th scope="col" style="color: #734a4a;">Numero de Ticket</th>
                        <th scope="col" style="color: #734a4a;">Nombre</th>
                        <th scope="col" style="color: #734a4a;">Apellidos</th>
                        <th scope="col" style="color: #734a4a;">Archivo</th>
                        <th scope="col" style="color: #734a4a;">Eliminar</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="lp in listadoPlatoFiltradoLimitado" :key="lp._id">
                        <td style="color: #734a4a;">{{ lp.idReserva.identificador }}</td>
                        <td style="color: #734a4a;">{{ lp.idReserva.nombre_cliente }}</td>
                        <td style="color: #734a4a;">{{ lp.idReserva.apellido_cliente }}</td>
                        <td>
                            <a style="color: #734a4a; font-weight: bold;" :href="lp.archivoUrl" target="_blank"
                                download="CARTA_Juanmar_2024.pdf">
                                Archivo.pdf
                            </a>
                        </td>
                        <td>
                            <button type="button" id="aceptar" class="btn" @click="inactivarListadoPlato(lp._id)"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                    class="bi bi-x-circle-fill"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

            <div v-if="limitLisP < listadoPlato.length" class="text-center my-3">
                <button @click="verMasLisP" class="btn fw-bold" style="background-color: #fe6f61; color: white;">Ver
                    más
                    listados</button>
            </div>

        </div>
        <div class="modal fade" id="modalDetalle" tabindex="-1" aria-labelledby="modalDetalleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #fe6f61;">
                        <h4 class="fw-bold" style="color: white;">Detalles de la Reserva</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div v-if="reservaSeleccionada" class="modal-body text-start">
                        <p><strong style="color: #734a4a;">Nombre:</strong> {{ reservaSeleccionada.nombre_cliente }}</p>
                        <p><strong style="color: #734a4a;">Apellidos:</strong> {{ reservaSeleccionada.apellido_cliente
                            }}</p>
                        <p><strong style="color: #734a4a;">Correo Electrónico:</strong> {{
                            reservaSeleccionada.correo_cliente }}
                        </p>
                        <p><strong style="color: #734a4a;">Teléfono:</strong> {{ reservaSeleccionada.telefono_cliente }}
                        </p>
                        <p v-if="reservaSeleccionada.telefono_cliente2"><strong style="color: #734a4a;">Teléfono
                                2:</strong> {{
                                    reservaSeleccionada.telefono_cliente2 }}</p>
                        <p><strong style="color: #734a4a;">Fecha Reserva:</strong> {{
                            formatFecha(reservaSeleccionada.fecha_res)
                        }}
                        </p>
                        <p v-if="reservaSeleccionada.identificador"><strong style="color: #734a4a;">Número
                                Ticket:</strong> {{
                                    reservaSeleccionada.identificador }}
                        </p>
                        <p><strong style="color: #734a4a;">Descripción Reserva:</strong> {{
                            reservaSeleccionada.mensaje_res }}
                        </p>
                        <p><strong style="color: #734a4a;">Enviada el:</strong> {{
                            formatFechaDetalle(reservaSeleccionada.createdAt)
                        }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="notificacionVisible" class="custom-notify alert alert-success alert-dismissible fade show"
            role="alert">
            {{ mensajeNotificacion }}
        </div>
        <div v-if="notificacionValidacion" class="custom-notify alert alert-danger alert-dismissible fade show"
            role="alert">
            {{ mensajeValidacion }}
        </div>
        <div v-if="notificacionCargando" class="custom-notify alert alert-info alert-dismissible fade show"
            role="alert">
            {{ mensajeCargando }}
        </div>
    </div>
</template>

<style scoped>
.custom-notify {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    width: 300px;
    text-align: center;
    padding: 15px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 16px;
}

.custom-notify .close:hover {
    opacity: 1;
}

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
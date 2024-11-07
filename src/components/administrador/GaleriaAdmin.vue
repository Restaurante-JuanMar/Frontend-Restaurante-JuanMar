<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStoreGaleria } from '../../stores/galeria';
import Evento from "../../assets/evento1.jpeg";

const useGaleria = useStoreGaleria();
const eventoSeleccionado = ref('');
const imagenSeleccionada = ref('');
const galerias = ref([]);
const galeriasFiltradas = ref([]);
const filter = ref(''); // Campo de filtro en tiempo real
const nombre = ref('');
const posicion = ref();
const descripcion = ref();
const fecha = ref();
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const loadingFotos = ref(false);
const loading = ref(false);
const guardando = ref(false);
const data = ref({
    nombre_gal: '',
    descrip_gal: '',
    fecha_gal: '',
    posicion: '',
    imagen: []
});

function cargarDatosGaleria(galeria) {
    nombre.value = galeria.nombre_gal;
    descripcion.value = galeria.descrip_gal;
    fecha.value = formatFechaISO(galeria.fecha_gal)
    posicion.value = galeria.posicion;

    if (galeria.imagen && galeria.imagen.length > 0) {
        data.value.imagen = [{ url: galeria.imagen[0].url }];
    } else {
        data.value.imagen = [];
    }
}

async function guardarCambios() {
    if (data.value.imagen.length === 0) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = 'Por favor, sube una imagen antes de guardar los cambios';

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        return;
    }


    guardando.value = true;

    console.log("data antes", data)

    data.value.nombre_gal = nombre.value
    data.value.descrip_gal = descripcion.value
    data.value.fecha_gal = fecha.value
    data.value.posicion = posicion.value

    try {
        const response = await useGaleria.crearOActualizarGaleria(data.value);

        if (useGaleria.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Galeria modificada exitosamente';

            console.log("data despues", data)


            data.value.imagen = [];
            getGaleria();
            limpiar();

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useGaleria.estatus === 400) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useGaleria.validacion;

            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useGaleriaf.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardando.value = false;
    }
}

async function subirFotoGaleria(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    loadingFotos.value = true;
    notificacionCargando.value = true;
    mensajeCargando.value = 'Subiendo imagen...';

    try {
        const file = files[0];
        const imageUrl = await useGaleria.subirFotosGaleria(data.value._id, file);

        console.log("URL de la imagen subida:", imageUrl);

        if (data.value.imagen.length > 0) {
            data.value.imagen.splice(0, 1, { url: imageUrl });
        } else {
            data.value.imagen.push({ url: imageUrl });
        }

        mensajeCargando.value = 'Imagen subida exitosamente';
        setTimeout(() => {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
        }, 3000);
    } catch (error) {
        console.error("Error al subir la foto:", error);
        mensajeCargando.value = 'Error al subir la imagen';
        setTimeout(() => {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
        }, 3000);
    } finally {
        loadingFotos.value = false;
    }
}

async function getGaleria() {
    loading.value = true;
    try {
        const response = await useGaleria.getByPosition();
        if (useGaleria.estatus === 200) {
            galerias.value = [...response]
            galeriasFiltradas.value = [...response]
        }
        console.log("galerias", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

function mostrarImagenEnModal(galeria) {
    eventoSeleccionado.value = galeria.nombre_gal;
    imagenSeleccionada.value = galeria.imagen[0].url;
    const modal = new bootstrap.Modal(document.getElementById('modalImagen'));
    modal.show();
}

// Función para formatear la fecha a dd/mm/yyyy sin convertirla a un objeto Date
function formatFecha(fechaISO) {
    const [year, month, day] = fechaISO.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
}

function formatFechaISO(isoDate) {
    return isoDate.split('T')[0];
}

function filtrarFecha() {
    const normalizedFilter = filter.value.toLowerCase();
    galeriasFiltradas.value = galerias.value.filter(galeria => {
        const [year, month, day] = galeria.fecha_gal.split('T')[0].split('-');
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate.includes(normalizedFilter);
    });
}


watch(filter, (newFilter) => {
    const normalizedFilter = newFilter.toLowerCase();
    galeriasFiltradas.value = galerias.value.filter(galeria => {
        const [year, month, day] = galeria.fecha_gal.split('T')[0].split('-');
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate.includes(normalizedFilter);
    });
});


function limpiar() {
    nombre.value = '';
    descripcion.value = '';
    fecha.value = '';
    posicion.value = '';
    data.value.nombre_gal = '';
    data.value.descrip_gal = '';
    data.value.posicion = '';
    data.value.fecha_gal = '';
}


onMounted(() => {
    getGaleria();
})
</script>

<template>
    <div>
        <div class="container d-flex justify-content-center">
            <div class="col-md-6">
                <div class="col mb-5 mt-5">
                    <h4 style="color: #734a4a; font-weight:bold; text-align:center">Actualizar la Galeria de Eventos
                        Especiales</h4>
                </div>
                <form action="" class="row" method="post" @submit.prevent="guardarCambios">
                    <div class="mb-3">
                        <label for="Tipoevento" style="font-weight: bold; color:#734a4a" class="form-label">Tipo de
                            Evento</label>
                        <input type="text" class="form-control" id="TipoEvento" v-model="nombre" required
                            style="border-color:#734a4a; color:#734a4a" placeholder="Digite el nombre del evento">
                    </div>
                    <div class="mb-3">
                        <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                            class="form-label">Posición</label>
                        <select class="form-select" style="border-color:#734a4a; color:#734a4a; font-weight:bold"
                            aria-label="Default select example" v-model="posicion" required>
                            <option value="1">Posición 1</option>
                            <option value="2">Posición 2</option>
                            <option value="3">Posición 3</option>
                            <option value="4">Posición 4</option>
                            <option value="5">Posición 5</option>
                            <option value="6">Posición 6</option>
                            <option value="7">Posición 7</option>
                            <option value="8">Posición 8</option>
                            <option value="9">Posición 9</option>
                            <option value="10">Posición 10</option>
                            <option value="11">Posición 11</option>
                            <option value="12">Posición 12</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="Descripcion" style="font-weight: bold; color:#734a4a"
                            class="form-label">Descripción</label>
                        <textarea type="text" class="form-control" id="Descripcion" v-model="descripcion"
                            style="border-color:#734a4a; color:#734a4a"
                            placeholder="Digite una breve descripción del evento (máximo 100 carácteres)"
                            maxlength="100" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="FechaEvento" style="font-weight: bold; color:#734a4a" class="form-label">Fecha del
                            Evento</label>
                        <input type="date" class="form-control" id="FechaEvento" v-model="fecha"
                            style="border-color:#734a4a; color:#734a4a" required>
                    </div>
                    <div class="mb-3">
                        <label for="ImagenMenu" class="form-label"
                            style="border: #734a4a; color:#734a4a; font-weight:bold">Cargue la Imagen</label>
                        <input class="form-control" type="file" id="ImagenMenu" @change="subirFotoGaleria"
                            accept="image/*" style="border: 1px solid #734a4a; color:#734a4a;">
                        <span id="NotaExtensionImg" style="font-weight: bold; color:#734a4a; font-size:small">La imagen
                            debe pesar como máximo 10MB</span>
                    </div>
                    <div class="mt-2 mb-3">
                        <button type="submit" class="btn"
                            style="background-color: #734a4a; color:#fdfefe; font-weight:bold" :disabled="loadingFotos">
                            <span v-if="guardando" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-if="!guardando">Actualizar</span></button>
                    </div>
                </form>
                <div class="input-group mt-5 mb-3">
                    <input type="text" class="form-control" placeholder="Buscar por fecha (dd/mm/aaaa)" v-model="filter"
                        aria-label="Buscar" style="border: 1px solid #734a4a; color:#734a4a;">
                    <button type="button" class="input-group-text" style="background-color: #734a4a; color: #fdfefe;"
                        @click="filtrarFecha()">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">Posición</th>
                            <th scope="col" style="color: #734a4a;">Tipo Evento</th>
                            <th scope="col" style="color: #734a4a;">Descripción</th>
                            <th scope="col" style="color: #734a4a;">Fecha</th>
                            <th scope="col" style="color: #734a4a;">Imagen</th>
                            <th scope="col" style="color: #734a4a;">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="galeria in galeriasFiltradas" :key="galeria._id">
                            <td class="fw-bold" style="color: #734a4a;">{{ galeria.posicion }}</td>
                            <td style="color: #734a4a;">{{ galeria.nombre_gal }}</td>

                            <td class="descripcion">
                                <VMenu class="vmenu">
                                    <span class="descripcion" style="color: #734a4a;">{{ galeria.descrip_gal.slice(0,
                                        30) }} ...</span>
                                    <template #popper>
                                        <div class="descripVmenu">{{ galeria.descrip_gal }}</div>
                                    </template>
                                </VMenu>
                            </td>
                            <td style="color: #734a4a;">{{ formatFecha(galeria.fecha_gal) }}</td>
                            <td>
                                <img :src="galeria.imagen[0].url" width="100%" height="100px" alt="Evento especial"
                                    style="cursor: pointer;" @click="mostrarImagenEnModal(galeria)">
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn" @click="cargarDatosGaleria(galeria)"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-pencil-square"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" id="modalImagen" tabindex="-1" aria-labelledby="modalImagenLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalImagenLabel" style="color: #734a4a;">{{ eventoSeleccionado }}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img :src="imagenSeleccionada" class="img-fluid" alt="Vista previa de la imagen">
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

.descripcion {
    max-width: 150px;
    height: 20px;
    word-wrap: break-word;
    overflow: hidden;
}

.vmenu {
    max-height: 20px;
}

.descripVmenu {
    padding: 1rem;
    word-wrap: break-word;
    height: fit-content;
    max-height: 300px;
    max-width: 300px;
}
</style>
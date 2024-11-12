<script setup>
import { ref, onMounted } from 'vue';
import { useStorePlatosEspeciales } from '../../stores/plato_especial.js';

const usePlatoEspecial = useStorePlatosEspeciales();
const nombre = ref('');
const descripcion = ref('');
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const loadingFotos = ref(false);
const guardando = ref(false);
const loading = ref(false)
const platosEspeciales = ref([]);
const platoSelecionado = ref('');
const imagenSeleccionada = ref();
const data = ref({
    nombre_plat: '',
    descrip_plat: '',
    imagen: [],
});

async function guardarCambios() {
    if (!data.value.imagen || data.value.imagen.length === 0) {
        mensajeValidacion.value = 'Debe subir al menos una imagen';
        notificacionValidacion.value = true;
        setTimeout(() => {
            notificacionValidacion.value = false;
        }, 3000);
        return;
    }

    guardando.value = true;
    data.value.nombre_plat = nombre.value;
    data.value.descrip_plat = descripcion.value;

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await usePlatoEspecial.crearPlato(data.value);

        if (usePlatoEspecial.estatus === 200) {
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Plato especial modificado exitosamente';

            data.value.imagen = [];
            limpiar();
            getPlatosEspeciales();

            setTimeout(() => {
                notificacionVisible.value = false;
            }, 3000);
        } else if (usePlatoEspecial.estatus === 400) {
            notificacionValidacion.value = true;
            mensajeValidacion.value = usePlatoEspecial.validacion;

            setTimeout(() => {
                notificacionValidacion.value = false;
            }, 3000);
        }
    } catch (error) {
        console.log(error);
    } finally {
        guardando.value = false;
    }
}

async function subirFotoPlatoEspecial(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    loadingFotos.value = true;
    notificacionCargando.value = true;
    mensajeCargando.value = 'Subiendo imagen...';

    try {
        const file = files[0];
        const imageUrl = await usePlatoEspecial.subirGrupoFotos(data.value._id, file);

        console.log("URL de la imagen subida:", imageUrl);

        if (data.value.imagen.length > 0) {
            data.value.imagen.splice(0, 1, { url: imageUrl });
        } else {
            data.value.imagen.push({ url: imageUrl });
        }

        console.log("soy data imagen", data)

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

function cargarDatosPE(pe) {
    nombre.value = pe.nombre;
    descripcion.value = pe.descripcion;

    if (pe.imagen && pe.imagen.length > 0) {
        data.value.imagen = [{ url: pe.imagen[0].url }];
    } else {
        data.value.imagen = [];
    }
}

function limpiar() {
    nombre.value = '';
    descripcion.value = '';
    data.value.nombre_plat = '';
    data.value.descrip_plat = '';
}

async function getPlatosEspeciales() {
    loading.value = true;
    try {
        const response = await usePlatoEspecial.getAll();
        if (usePlatoEspecial.estatus === 200) {
            platosEspeciales.value = response
        }
        console.log("platos especiales", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

function mostrarImagenEnModal(pe) {
    platoSelecionado.value = pe.nombre_plat;
    imagenSeleccionada.value = pe.imagen[0].url;
    const modal = new bootstrap.Modal(document.getElementById('modalImagen'));
    modal.show();
}

onMounted(()=>{
    getPlatosEspeciales();
})

</script>


<template>
    <div>
        <div class="container d-flex justify-content-center">
            <div class="col-md-6">
                <div class="col mb-5 mt-5">
                    <h4 style="color: #734a4a; font-weight:bold; text-align:center">Actualizar Platos Especiales</h4>
                </div>
                <form action="" class="row" method="post" @submit.prevent="guardarCambios">
                    <div class="mb-3">
                        <div class="mb-3">
                            <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                                class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="TipoEvento" v-model="nombre" required
                                style="border-color:#734a4a; color:#734a4a"
                                placeholder="Digite el nombre del plato especial">
                        </div>
                        <div class="mb-2">
                            <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                                class="form-label">Descripción</label>
                            <textarea type="text" class="form-control" id="Descripcion" v-model="descripcion"
                                style="border-color:#734a4a; color:#734a4a;"
                                placeholder="Digite la descripción del plato especial..." required></textarea>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="ImagenMenu" class="form-label"
                            style="border: #734a4a; color:#734a4a; font-weight:bold">Cargue la Imagen</label>
                        <input class="form-control" type="file" id="ImagenMenu" @change="subirFotoPlatoEspecial" accept="image/*"
                            style="border: 1px solid #734a4a; color:#734a4a;" aria-describedby="NotaExtensionImg"
                            required>
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

                <table class="table table-striped table-hover mt-4">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Descripción</th>
                            <th scope="col" style="color: #734a4a;">Imagen</th>
                            <th scope="col" style="color: #734a4a;">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="pe in platosEspeciales" :key="pe._id">
                            <td>{{ pe.nombre_plat }}</td>
                            <td class="mensaje">
                                <VMenu v-if="pe.descrip_plat" class="vmenu">
                                    <span class="mensaje" style="color: #734a4a;">
                                        {{ pe.descrip_plat.slice(0, 40) }}...
                                    </span>
                                    <template #popper>
                                        <div class="mensajeVmenu">{{ pe.descrip_plat }}</div>
                                    </template>
                                </VMenu>
                                <span v-else style="color: #734a4a;">No aplica</span>
                            </td>
                            <td>
                                <img :src="pe.imagen[0].url" width="100%" height="100px" alt="Evento especial"
                                    style="cursor: pointer;" @click="mostrarImagenEnModal(galeria)">
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn" @click="cargarDatosPE(pe)"
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
                        <h5 class="modal-title" id="modalImagenLabel" style="color: #734a4a;">{{ platoSelecionado }}
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
<script setup>
import { ref, watch } from 'vue';
import { useStoreMenu } from '../../stores/menu.js';
import { useStoreCarta } from '../../stores/carta_menu.js';

const useMenu = useStoreMenu();
const useCartaMenu = useStoreCarta();
const posicion = ref('');
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const loadingFotos = ref(false);
const loadingArchivo = ref(false);
const guardando = ref(false);
const guardandoArchivo = ref(false);
const data = ref({
    imagen: [],
});
const dataCarta = ref({
    archivoUrl: [],
});

async function guardarCambios() {
    guardando.value = true;

    // Solo actualizamos el campo `posicion` en `data.value`
    data.value.posicion = posicion.value;

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useMenu.crearOActualizarMenu(data.value);

        if (useMenu.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Menú modificado exitosamente';

            // Limpiar la imagen del array después de una actualización exitosa
            data.value.imagen = [];
            limpiar();  // Restablece la posición y otros campos necesarios

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useMenu.estatus === 400 || useMenu.estatus === 404 || useMenu.estatus === 500) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useMenu.validacion;

            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useMenu.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardando.value = false;
    }
}

async function subirFotoMenu(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    loadingFotos.value = true;
    notificacionCargando.value = true;
    mensajeCargando.value = 'Subiendo imagen...';

    try {
        // Bucle a través de cada archivo y sube uno a la vez
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageUrl = await useMenu.subirGrupoFotos(data.value._id, file);  // Ajustado si `data.value._id` no es necesario

            // Agregar la URL de la imagen subida a `data.value.imagen`
            const fotoObj = { url: imageUrl };
            data.value.imagen = [fotoObj];  // Reemplaza cualquier imagen anterior con la nueva
        }

        mensajeCargando.value = 'Imagen subida exitosamente';
        setTimeout(() => {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
        }, 6000);
    } catch (error) {
        console.error("Error al subir las fotos:", error);
        mensajeCargando.value = 'Error al subir las imágenes';
        setTimeout(() => {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
        }, 3000);
    } finally {
        loadingFotos.value = false;
    }
}

function limpiar() {
    // Solo limpia los campos específicos sin sobrescribir todo el objeto
    posicion.value = '';
    data.value.posicion = '';
}

async function guardarCambiosCarta() {
    guardandoArchivo.value = true;

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useCartaMenu.crearCarta(dataCarta.value);

        if (useCartaMenu.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Carta de menú modificada exitosamente';

            // Limpiar la imagen del array después de una actualización exitosa
            dataCarta.value.archivoUrl = [];

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useCartaMenu.estatus === 400 || useCartaMenu.estatus === 404 || useCartaMenu.estatus === 500) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useCartaMenu.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useCartaMenu.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardandoArchivo.value = false;
    }
}

async function subirArchivoCarta(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    loadingArchivo.value = true;
    notificacionCargando.value = true;
    mensajeCargando.value = 'Subiendo PDF...';

    try {
        const file = files[0];  // Asumimos que solo se sube un archivo a la vez
        const fileUrl = await useCartaMenu.subirArchivo(file); // Llamada para subir el archivo y obtener la URL

        // Asigna la URL del archivo subido directamente a archivoUrl
        dataCarta.value.archivoUrl = { url: fileUrl }; // Reemplaza cualquier URL previa con la nueva

        mensajeCargando.value = 'PDF subido exitosamente';
        setTimeout(() => {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
        }, 6000);
    } catch (error) {
        console.error("Error al subir el archivo", error);
        mensajeCargando.value = 'Error al subir el archivo';
        setTimeout(() => {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
        }, 3000);
    } finally {
        loadingArchivo.value = false;
    }
}


watch(posicion, (newValue) => {
    console.log(newValue)
})
</script>


<template>
    <div>
        <div class="container d-flex justify-content-center">
            <div class="col-md-6">
                <div class="col mb-5 mt-5">
                    <h4 style="color: #734a4a; font-weight:bold; text-align:center">Actualizar la Carta del Menú</h4>
                </div>
                <form action="" class="row" method="post" @submit.prevent="guardarCambios">
                    <div class="mb-3">
                        <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                            class="form-label">Posición</label>
                        <select v-model="posicion" class="form-select"
                            style="border-color:#734a4a; color:#734a4a; font-weight:bold"
                            aria-label="Default select example" required>
                            <option value="1">Hoja Carta 1</option>
                            <option value="2">Hoja Carta 2</option>
                            <option value="3">Hoja Carta 3</option>
                            <option value="4">Hoja Carta 4</option>
                            <option value="5">Hoja Carta 5</option>
                            <option value="6">Hoja Carta 6</option>
                        </select>
                        <span id="NotaImg" style="font-weight: bold; color:#734a4a; font-size:small">No se carga la
                            portada ni la ultima hoja</span>
                    </div>
                    <div class="mb-3">
                        <label for="ImagenMenu" class="form-label"
                            style="border: #734a4a; color:#734a4a; font-weight:bold">Cargue la Imagen</label>
                        <input class="form-control" type="file" id="ImagenMenu" @change="subirFotoMenu" accept="image/*"
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
                <div class="col mb-3 mt-3">
                    <h4 style="color: #734a4a; font-weight:bold;">Actualizar el Archivo de la Carta del Menú</h4>
                </div>
                <div class="mb-3">
                    <label for="ImagenMenu" class="form-label"
                        style="border: #734a4a; color:#734a4a; font-weight:bold">Cargue el Archivo</label>
                    <input class="form-control" type="file" @change="subirArchivoCarta"
                        style="border: 1px solid #734a4a; color:#734a4a;" aria-describedby="NotaExtensionFile" required>
                    <span id="NotaExtensionFile" style="font-weight: bold; color:#734a4a; font-size:small">El archivo
                        debe ser en pdf</span>
                </div>
                <div class="mt-2 mb-3">
                    <button type="submit" class="btn" style="background-color: #734a4a; color:#fdfefe; font-weight:bold"
                        @click="guardarCambiosCarta" :disabled="loadingArchivo"> <span v-if="guardandoArchivo"
                            class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span v-if="!guardandoArchivo">Actualizar</span></button>
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
</style>
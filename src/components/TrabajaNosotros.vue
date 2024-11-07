<script setup>
import { ref, watch } from 'vue';
import { useStoreTrabajaNosotros } from '../stores/trabaja_con_nosotros.js';

const useTrabajaNosotros = useStoreTrabajaNosotros();
const nombre = ref('');
const apellido = ref('');
const correo = ref('');
const telefono = ref('');
const cargo = ref('');
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const loadingArchivo = ref(false);
const guardandoArchivo = ref(false);
const data = ref({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    cargo: '',
    hoja_vida: [],
});

async function guardarSolicitud() {
    guardandoArchivo.value = true;

    data.value.nombre = nombre.value
    data.value.apellido = apellido.value
    data.value.correo = correo.value
    data.value.telefono = telefono.value
    data.value.cargo = cargo.value

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useTrabajaNosotros.crearSolicitud(data.value);

        if (useTrabajaNosotros.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Solicitud enviada exitosamente, pronto nos estaremos comunicando';

            // Limpiar la imagen del array después de una actualización exitosa
            limpiar();
            data.value.hoja_vida = { url: '' };

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useTrabajaNosotros.estatus === 400) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useTrabajaNosotros.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useTrabajaNosotros.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardandoArchivo.value = false;
    }
}

async function subirHojaVida(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    loadingArchivo.value = true;
    notificacionCargando.value = true;
    mensajeCargando.value = 'Subiendo PDF...';

    try {
        const file = files[0];  // Asumimos que solo se sube un archivo a la vez
        const fileUrl = await useTrabajaNosotros.subirArchivo(file); // Llamada para subir el archivo y obtener la URL

        // Asigna la URL en el formato esperado por el backend
        data.value.hoja_vida = { url: fileUrl };

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

function limpiar() {
    nombre.value = '';
    apellido.value = '';
    correo.value = ''
    telefono.value = '';
    cargo.value = '';
    data.value.nombre = '';
    data.value.apellido = '';
    data.value.correo = '';
    data.value.telefono = '';
    data.value.cargo = '';
}


watch(cargo, (newValue) => {
    console.log(newValue)
})

</script>

<template>
    <div>
        <div class="container d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <form class="rows needs-validation" novalidate id="formularioTrabaja_con_nosotros"
                    @submit.prevent="guardarSolicitud">
                    <div class="col mt-3 mb-5" style="text-align: center;">
                        <h4 style="font-weight: bold; color:#734a4a;">Trabaja con Nosotros</h4>
                    </div>
                    <div class="col mb-4" style="text-align: justify; color: #734a4a; font-weight: 50%;">
                        <p>En Juan Mar, valoramos la pasión por la gastronomía y el deseo de aprender. Si eres una
                            persona proactiva y responsable, te invitamos a unirte a nuestro equipo. Aquí encontrarás un
                            ambiente dinámico y colaborativo donde podrás desarrollar tus habilidades y crecer
                            profesionalmente en el apasionante mundo de la cocina marina. Lleva tu hoja de vida a
                            nuestro restaurante o completa el formulario en línea para comenzar tu viaje con nosotros.
                            ¡Esperamos conocerte pronto!.</p>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputNombre" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Nombres</label>
                        <input type="text" class="form-control" v-model="nombre" id="exampleInputNombre"
                            style="border-color: #734a4a" required placeholder="Digite su nombre">

                    </div>
                    <div class="mb-3">
                        <label for="exampleInputApellidos" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Apellidos</label>
                        <input type="text" class="form-control" v-model="apellido" id="exampleInputApellidos"
                            style="border-color: #734a4a" required placeholder="Digite sus apellidos">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Correo electronico</label>
                        <input type="email" class="form-control" v-model="correo" id="exampleInputEmail"
                            aria-describedby="emailHelp" style="border-color: #734a4a"
                            placeholder="Digite su correo electrónico, ej (correo@gmail.com)" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputTelefono" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Telefono</label>
                        <input type="number" class="form-control" v-model="telefono" id="exampleInputTelefono"
                            style="border-color: #734a4a" placeholder="Digite su número telefónico" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleDataList" class="form-label"
                            style="font-weight: bold; color: #734a4a;">Cargo</label>
                        <select v-model="cargo" class="form-select"
                            style="border-color:#734a4a; color:#734a4a; font-weight:bold; border-color: #734a4a;"
                            aria-label="Default select example" required>
                            <option value="" disabled selected>Selecciona un cargo...</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Contabilidad">Contabilidad</option>
                            <option value="Jefe de mesas">Jefe de mesas</option>
                            <option value="Jefe de cocina">Jefe de cocina</option>
                            <option value="Mesero">Mesero</option>
                            <option value="Bar">Bar</option>
                            <option value="Auxiliar de cocina">Auxiliar de cocina</option>
                            <option value="Steward">Steward</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="formFileLg" class="form-label" style="color: #734a4a; font-weight: bold;">Hoja de
                            Vida</label>
                        <input class="form-control form-control-lg" id="formFileLg" type="file" @change="subirHojaVida"
                            style="border-color: #734a4a; color: #734a4a; font-size: medium;" required>
                        <p style="color: #734a4a; font-size: small; font-weight: bold;">El archivo debe ser en pdf</p>
                        <div class="invalid-feedback">Cargue el archivo</div>
                    </div>

                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <div>
                            <button type="submit" class="btn mb-5" :disabled="loadingArchivo"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">
                                <span v-if="guardandoArchivo" class="spinner-border spinner-border-sm" role="status"
                                    aria-hidden="true"></span>
                                <span v-if="!guardandoArchivo">Enviar Solicitud</span></button>
                        </div>
                    </div>
                </form>
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
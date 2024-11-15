<script setup>
import { ref } from 'vue';
import { useStoreReservas } from '../stores/reserva';
import { useStoreListadoPlatos } from '../stores/listado_plato';

const useReserva = useStoreReservas();
const useListadoPlato = useStoreListadoPlatos();
const mostrar = ref(false);
const fecha = ref('');
const nombre = ref('');
const apellidos = ref('');
const correo = ref('');
const telefono = ref('');
const telefono2 = ref('');
const numPersonas = ref('');
const descripcion = ref('');
const num_tiquete = ref('');
const data = ref({
    nombre_cliente: '',
    apellido_cliente: '',
    correo_cliente: '',
    telefono_cliente: '',
    telefono_cliente2: '',
    num_personas: '',
    fecha_res: '',
    mensaje_res: '',
})
const dataListadoPlato = ref({
    identificador: '',
    archivoUrl: ''
})
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const guardando = ref(false);
const guardandoArchivo = ref(false);
const loadingArchivo = ref(false);
const mensajeCargando = ref('');
const minDate = ref(getCurrentDate());

async function guardarCambios() {
    guardando.value = true;

    data.value = {
        nombre_cliente: nombre.value,
        apellido_cliente: apellidos.value,
        correo_cliente: correo.value,
        telefono_cliente: telefono.value,
        telefono_cliente2: telefono2.value,
        num_personas: numPersonas.value,
        fecha_res: fecha.value,
        mensaje_res: descripcion.value,
    }

    notificacionCargando.value = true;
    mensajeCargando.value = 'Enviando reserva...';

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useReserva.crearReserva(data.value);

        if (useReserva.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Reserva enviada exitosamente, por favor revise su correo';
            limpiar();

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useReserva.estatus === 400 || useReserva.estatus === 404 || useReserva.estatus === 500) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useReserva.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionCargando.value = false;
        mensajeCargando.value = '';
        notificacionValidacion.value = true;
        mensajeValidacion.value = useReserva.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardando.value = false;
    }
}

async function guardarCambiosListadoPlato() {
    guardandoArchivo.value = true;

    dataListadoPlato.value.identificador = num_tiquete.value;

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useListadoPlato.crearListadoPlato(dataListadoPlato.value);

        if (useListadoPlato.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Listado de platos enviado exitosamente';

            num_tiquete.value = '';
            dataListadoPlato.value.archivoUrl = '';
            dataListadoPlato.value.identificador = '';

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useListadoPlato.estatus === 400 || useListadoPlato.estatus === 404 || useListadoPlato.estatus === 500) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useListadoPlato.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useListadoPlato.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardandoArchivo.value = false;
    }
}

async function subirArchivoListadoPlato(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    loadingArchivo.value = true;
    notificacionCargando.value = true;
    mensajeCargando.value = 'Subiendo PDF...';

    try {
        const file = files[0];  // Asumimos que solo se sube un archivo a la vez
        const fileUrl = await useListadoPlato.subirArchivo(file); // Llamada para subir el archivo y obtener la URL

        // Asigna la URL del archivo subido directamente a archivoUrl
        dataListadoPlato.value.archivoUrl = fileUrl; // Reemplaza cualquier URL previa con la nueva

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
    fecha.value = '';
    nombre.value = '';
    apellidos.value = '';
    correo.value = '';
    telefono.value = '';
    telefono2.value = '';
    numPersonas.value = '';
    descripcion.value = '';
    data.value.nombre_cliente = '';
    data.value.apellido_cliente = '';
    data.value.correo_cliente = '';
    data.value.telefono_cliente = '';
    data.value.telefono_cliente2 = '';
    data.value.num_personas = '';
    data.value.fecha_res = '';
    data.value.mensaje_res = '';
}

function mostrarOcultar() {
    mostrar.value = !mostrar.value;
}

function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}
</script>

<template>
    <div>
        <!--Formulario de reserva-->
        <div class="container mt-5 d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <form class="rows needs-validation" novalidate id="formularioReserva" @submit.prevent="guardarCambios">
                    <div class="col mb-3" style="text-align: center;">
                        <h4 style="font-weight: bold; color:#734a4a;">Solicitud de la Reserva</h4>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <p class="rounded-2"
                                style="font-weight: bold; color:#fdfefe; background-color: #fe6f61; border: 3px solid; border-color:#734a4a; ">
                                Aforo Máximo: 160 personas</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputfecha" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Fecha de la reserva <span class="text-danger">*</span></label>
                        <input type="date" v-model="fecha" class="form-control" id="exampleInputfecha" :min="minDate"
                            style="border-color: #734a4a" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputNombre" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Nombres <span class="text-danger">*</span></label>
                        <input type="text" v-model="nombre" class="form-control" id="exampleInputNombre"
                            style="border-color: #734a4a" placeholder="Digite su nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputApellidos" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Apellidos <span class="text-danger">*</span></label>
                        <input type="text" v-model="apellidos" class="form-control" id="exampleInputApellidos"
                            style="border-color: #734a4a" placeholder="Digite sus apellidos" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Correo electronico <span class="text-danger">*</span></label>
                        <input type="email" v-model="correo" class="form-control" id="exampleInputEmail"
                            aria-describedby="emailHelp" style="border-color: #734a4a"
                            placeholder="Digite su correo electrónico, ej (correo@gmail.com)" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputTelefono" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Telefono <span class="text-danger">*</span></label>
                        <input type="number" v-model="telefono" class="form-control" id="exampleInputTelefono"
                            style="border-color: #734a4a" placeholder="Digite su número de celular" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputTelefono" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Telefono 2</label>
                        <input type="number" v-model="telefono2" class="form-control" id="exampleInputTelefono"
                            style="border-color: #734a4a" placeholder="Digite su número de celular">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputNumPersonas" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Numero de personas <span class="text-danger">*</span></label>
                        <input type="number" v-model="numPersonas" class="form-control" id="exampleInputNumPersonas"
                            style="border-color: #734a4a" placeholder="Digite el número de personas para la reserva"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlDescripcion" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Descripción <span class="text-danger">*</span></label>
                        <textarea class="form-control" v-model="descripcion" id="exampleFormControlDescripcion" rows="3"
                            style="border-color: #734a4a" placeholder="Digite la descripción (hora de la reserva si es el caso)"
                            required></textarea>
                    </div>
                    <div class="mb-5">
                        <div>
                            <button type="submit" class="btn"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                :disabled="guardando"><span v-if="guardando" class="spinner-border spinner-border-sm"
                                    role="status" aria-hidden="true"></span>
                                <span v-if="!guardando">Enviar</span></button>
                        </div>
                    </div>
                </form>

                <form class="rows needs-validation" novalidate id="formularioListadoPlatos"
                    @submit.prevent="guardarCambiosListadoPlato">
                    <!--Cargar listado de platos-->
                    <div v-if="!mostrar" style="display: flex;flex-direction: column; justify-content: center;">
                        <p class="fw-bold text-uppercase text-center">¿Ya tienes una reserva confirmada?</p>
                        <div class="text-center">
                            <button type="button" class="btn mb-5"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                @click="mostrarOcultar()">Clic
                                aquí</button>
                        </div>
                    </div>
                    <div v-if="mostrar">
                        <div class="col mt-5 mb-3">
                            <h4 style="font-weight: bold; color:#734a4a;">Listado de Platos</h4>
                        </div>
                        <div class="mb-3">
                            <label for="NumeroTique" style="font-weight: bold; color: #734a4a;"
                                class="form-label">Numero de
                                Ticket</label>
                            <input type="number" class="form-control" id="NumeroTique" v-model="num_tiquete"
                                placeholder="Digite el numero del ticket" style="border-color: #734a4a" required>
                        </div>
                        <div class="mb-3">
                            <label for="formFileLg" class="form-label"
                                style="color: #734a4a; font-weight: bold;">Archivo
                                del Listado</label>
                            <input class="form-control form-control-lg" id="formFileLg" type="file"
                                @change="subirArchivoListadoPlato" accept="application/pdf"
                                style="border-color: #734a4a; color: #734a4a; font-size: medium;" required>
                            <p style="color: #734a4a; font-weight: bold; font-size: small;">El archivo debe ser en pdf
                            </p>
                            <div class="invalid-feedback">Cargue el archivo</div>
                        </div>
                        <button type="submit" class="btn mb-5"
                            style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                            :disabled="loadingArchivo"> <span v-if="guardandoArchivo"
                                class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span v-if="!guardandoArchivo">Enviar</span></button>
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
<script setup>
import { ref } from 'vue';
import { useStoreContactar } from '../stores/contactenos.js';
import { useStorePqr } from '../stores/pqr.js';

const useContactenos = useStoreContactar();
const usePqr = useStorePqr();
const nombre = ref('');
const apellido = ref('');
const correo = ref('');
const telefono = ref('');
const mensaje = ref('');
const guardando = ref(false);
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const data = ref({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    mensaje: '',
});

const nombrepqr = ref('');
const apellidopqr = ref('');
const tipoDocumento = ref('');
const numDocumento = ref();
const correopqr = ref('');
const telefonopqr = ref('');
const tipopqr = ref('');
const asunto = ref('');
const descripcionpqr = ref('');
const loadingArchivo = ref(false);
const guardandoArchivo = ref(false);
const datapqr = ref({
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numDocumento: '',
    correo: '',
    telefono: '',
    tipoPqr: '',
    asunto: '',
    descripcion: '',
    archivoUrl: [],
})

async function guardarSolicitud() {
    guardando.value = true;

    data.value.nombre = nombre.value
    data.value.apellido = apellido.value
    data.value.correo = correo.value
    data.value.telefono = telefono.value
    data.value.mensaje = mensaje.value

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useContactenos.crearSolicitud(data.value);

        if (useContactenos.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Solicitud enviada exitosamente, pronto nos estaremos comunicando';

            // Limpiar la imagen del array después de una actualización exitosa
            limpiar();
            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useContactenos.estatus === 400) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useContactenos.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useContactenos.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardando.value = false;
    }
}

async function guardarSolicitudPqr() {
    guardandoArchivo.value = true;

    datapqr.value.nombre = nombrepqr.value
    datapqr.value.apellido = apellidopqr.value
    datapqr.value.tipoDocumento = tipoDocumento.value
    datapqr.value.numDocumento = numDocumento.value
    datapqr.value.correo = correopqr.value
    datapqr.value.telefono = telefonopqr.value
    datapqr.value.tipoPqr = tipopqr.value
    datapqr.value.asunto = asunto.value
    datapqr.value.descripcion = descripcionpqr.value

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await usePqr.crearPqr(datapqr.value);

        if (usePqr.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Solicitud pqr enviada exitosamente';
            limpiarPqr();
            datapqr.value.archivoUrl = [];

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (usePqr.estatus === 400) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = usePqr.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = usePqr.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardandoArchivo.value = false;
    }
}

async function subirArchivo(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    loadingArchivo.value = true;
    notificacionCargando.value = true;
    mensajeCargando.value = 'Subiendo PDF...';

    try {
        const file = files[0];  // Asumimos que solo se sube un archivo a la vez
        const fileUrl = await usePqr.subirArchivo(file); // Llamada para subir el archivo y obtener la URL

        // Asigna la URL del archivo subido directamente a archivoUrl
        datapqr.value.archivoUrl = { url: fileUrl }; // Reemplaza cualquier URL previa con la nueva

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
    mensaje.value = '';
    data.value.nombre = '';
    data.value.apellido = '';
    data.value.correo = '';
    data.value.telefono = '';
    data.value.mensaje = '';
}

function limpiarPqr() {
    nombrepqr.value = '';
    apellidopqr.value = '';
    tipoDocumento.value = '';
    numDocumento.value = '';
    correopqr.value = '';
    telefonopqr.value = '';
    tipopqr.value = '';
    asunto.value = '';
    descripcionpqr.value
    datapqr.value.nombre = '';
    datapqr.value.apellido = '';
    datapqr.value.tipoDocumento = '';
    datapqr.value.numDocumento = '';
    datapqr.value.correo = '';
    datapqr.value.telefono = '';
    datapqr.value.tipoPqr = '';
    datapqr.value.asunto = '';
    datapqr.value.descripcion = '';
}

</script>

<template>
    <div>
        <div class="container d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <div class="col mt-3 mb-5" style="text-align: center;">
                    <h4 style="font-weight: bold; color:#734a4a;">Contáctenos</h4>
                </div>
                <div class="col mb-4" style="text-align: justify;">
                    <p style="color: #734a4a; font-weight: 50%;">En Juan Mar, valoramos profundamente la opinión de
                        nuestros clientes. Tu experiencia es fundamental para nosotros y nos ayuda a mejorar
                        continuamente. Te invitamos a compartir tus comentarios, sugerencias o cualquier aspecto que
                        hayas disfrutado durante tu visita. Ya sea que
                        hayas saboreado nuestros deliciosos platillos de mar, disfrutado de un ambiente acogedor o
                        recibido un servicio excepcional, queremos saberlo. Cada comentario cuenta y nos motiva a seguir
                        brindándote lo mejor. ¡Gracias por ser parte de nuestra familia! Si necesitas ajustes o un
                        enfoque
                        diferente, no dudes en decírmelo.</p>
                </div>
                <form class="rows needs-validation" novalidate id="formularioContactenos"
                    @submit.prevent="guardarSolicitud">
                    <div class="mb-3">
                        <label for="exampleInputNombre" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Nombres</label>
                        <input type="text" class="form-control" v-model="nombre" id="exampleInputNombre"
                            style="border-color: #734a4a" placeholder="Digite su nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputApellidos" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Apellidos</label>
                        <input type="text" class="form-control" v-model="apellido" id="exampleInputApellidos"
                            style="border-color: #734a4a" placeholder="Digite sus apellidos" required>
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
                        <label for="exampleFormControlDescripcion" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Comentario</label>
                        <textarea class="form-control" id="exampleFormControlDescripcion" v-model="mensaje" rows="3"
                            style="border-color: #734a4a" placeholder="Realice un comentario (opcional)"
                            required></textarea>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <div>
                            <button type="submit" class="btn mb-5"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                :disabled="guardando"> <span v-if="guardando" class="spinner-border spinner-border-sm"
                                    role="status" aria-hidden="true"></span>
                                <span v-if="!guardando">Enviar</span></button>
                        </div>
                    </div>
                </form>
                <div class="col mt-3 mb-3" style="text-align: center;">
                    <h4 style="font-weight: bold; color:#734a4a;">PQR</h4>
                </div>
                <div class="col mb-4" style="text-align: justify;">
                    <p style="color: #734a4a; font-weight: 50%;">En esta sección encuentra nuestro formulario
                        electrónico para enviar tus Peticiones, Quejas, Reclamos, Solicitudes y/o Felicitaciones;
                        presiona el botón «Formulario» e ingresa la información para que podamos brindarte una pronta y
                        efectiva respuesta. Tu opinión es valiosa para nosotros y nos ayudará a mejorar continuamente
                        nuestros servicios.</p>
                </div>
                <form action="" class="needs-validation mb-3" @submit.prevent="guardarSolicitudPqr" novalidate>
                    <div class="col mt-5">
                        <p>
                            <button class="btn" type="button" data-bs-toggle="collapse"
                                data-bs-target="#TableOfertaLaboral"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                aria-expanded="false" aria-controls="TableOfertaLaboral">
                                Formulario
                            </button>
                        </p>
                        <div style="min-height: 120px;">
                            <div class="collapse collapse-horizontal" id="TableOfertaLaboral">
                                <div class="card card-body"
                                    style="background-color: #fcf0ef; border: 1px solid #734a4a;">
                                    <div class="mb-3">
                                        <label for="exampleInputNombre" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Nombres</label>
                                        <input type="text" class="form-control" id="exampleInputNombre"
                                            v-model="nombrepqr" style="border-color: #734a4a"
                                            placeholder="Digite su nombre" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputApellidos" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Apellidos</label>
                                        <input type="text" class="form-control" id="exampleInputApellidos"
                                            v-model="apellidopqr" style="border-color: #734a4a"
                                            placeholder="Digite sus apellidos" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="TipoDocumento" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Tipo de documento</label>
                                        <select v-model="tipoDocumento" class="form-select"
                                            style="border-color:#734a4a; color:#734a4a; font-weight:bold; border-color: #734a4a;"
                                            aria-label="Default select example" required>
                                            <option value="" disabled selected>Seleccione un tipo de documento...
                                            </option>
                                            <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                            <option value="Cédula de Extrajenría">Cédula de Extrajenría</option>
                                            <option value="Pasaporte">Pasaporte</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Número de documento</label>
                                        <input type="number" class="form-control" id="exampleInputEmail"
                                            v-model="numDocumento" aria-describedby="emailHelp"
                                            style="border-color: #734a4a"
                                            placeholder="Digite su número de identificación" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Correo electronico</label>
                                        <input type="email" class="form-control" id="exampleInputEmail"
                                            v-model="correopqr" aria-describedby="emailHelp"
                                            style="border-color: #734a4a"
                                            placeholder="Digite su correo electrónico, ej (correo@gmail.com)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputTelefono" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Teléfono</label>
                                        <input type="number" class="form-control" id="exampleInputTelefono"
                                            v-model="telefonopqr" style="border-color: #734a4a"
                                            placeholder="Digite su número telefónico" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="Tipopqr" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Tipo PQR</label>
                                        <select v-model="tipopqr" class="form-select"
                                            style="border-color:#734a4a; color:#734a4a; font-weight:bold; border-color: #734a4a;"
                                            aria-label="Default select example" required>
                                            <option value="" disabled selected>Seleccione el tipo de PQR
                                            </option>
                                            <option value="Petición">Petición</option>
                                            <option value="Queja">Queja</option>
                                            <option value="Reclamo">Reclamo</option>
                                            <option value="Solicitud">Solicitud</option>
                                            <option value="Felicitaciones">Felicitaciones</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="Asunto" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Asunto</label>
                                        <input type="text" class="form-control" id="Asunto" v-model="asunto"
                                            style="border-color: #734a4a" placeholder="Digite el asunto" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlDescripcion"
                                            style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Descripción</label>
                                        <textarea class="form-control" id="exampleFormControlDescripcion" rows="3"
                                            v-model="descripcionpqr" placeholder="Digite la descripción"
                                            style="border-color: #734a4a"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="formFileSm" class="form-label"
                                            style="font-weight: bold; color: #734a4a;">Cargue Archivo</label>
                                        <input class="form-control form-control-sm" id="formFileSm" type="file"
                                            accept="application/pdf" @change="subirArchivo"
                                            style="border-color: #734a4a; color: #734a4a;" required>
                                        <p style="color:#734a4a; font-size: small; font-weight: bold;">El archivo debe
                                            ser pdf</p>
                                        <div class="invalid-feedback">Cargue el archivo</div>
                                    </div>
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                        <button type="submit" class="btn"
                                            style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                            :disabled="loadingArchivo"> <span v-if="guardandoArchivo"
                                                class="spinner-border spinner-border-sm" role="status"
                                                aria-hidden="true"></span>
                                            <span v-if="!guardandoArchivo">Enviar</span></button>
                                    </div>
                                </div>
                            </div>
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
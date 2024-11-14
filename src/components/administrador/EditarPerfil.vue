<script setup>
import { ref, onMounted } from 'vue';
import { useStoreUsuarios } from '../../stores/usuario.js';
import { useRouter } from 'vue-router';

const useUsuario = useStoreUsuarios();
const router = useRouter();
const nombre = ref('');
const apellido = ref('');
const cedula = ref('');
const correo = ref('');
const telefono = ref('');
const usuario = ref([]);
const data = ref({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    telefono: '',
})
const password = ref('')
const newPassword = ref('');
const confirmPassword = ref('');
const loadingContraseña = ref(false);
const dataContrasena = ref({
    password,
    newPassword, confirmPassword
})
const guardando = ref(false);
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mostrarNuevaPassword = ref(false);
const mostrarConfirmPassword = ref(false);
const mostrarPassword = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const onReset = () => {
    password.value = ''
    newPassword.value = '';
    confirmPassword.value = '';
}


async function guardarCambios() {
    guardando.value = true;

    data.value.nombre = nombre.value;
    data.value.apellido = apellido.value;
    data.value.cedula = cedula.value;
    data.value.correo = correo.value;
    data.value.telefono = telefono.value;

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useUsuario.editar(useUsuario.id, data.value);

        if (useUsuario.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Perfil modificado exitosamente';
            console.log(response);

            limpiar();

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useUsuario.estatus === 400 || useUsuario.estatus === 404) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useUsuario.validacion;

            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useUsuario.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardando.value = false;
    }
}

async function cambiarPassword() {
    loadingContraseña.value = true;

    if (!validarContraseña()) {
        setTimeout(() => {
            notificacionValidacion.value = false;
            loadingContraseña.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        return;
    }

    try {
        const response = await useUsuario.cambiarPassword(dataContrasena.value)
        loadingContraseña.value = false;

        console.log(response);

        if (!response) return
        if (response.error) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = response.error;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
            return
        }

        if (useUsuario.estatus === 200) {
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Contraseña cambiada con éxito, por favor inicie sesión nuevamente';
            useUsuario.usuario = response; // Update user data in store
            useUsuario.token = '';
            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
                router.push('/home');

            }, 2500);
        }
        // Check for estatus 401 (session expired)
        else if (useUsuario.estatus === 401) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = "Contraseña actual incorrecta";
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }

    } catch (error) {
        console.log(error);
    } finally {
        loadingContraseña.value = false;
    }
}

function validarContraseña() {
    if (newPassword.value.length < 8) {
        mensajeValidacion.value = 'La contraseña debe tener al menos 8 caracteres';
        notificacionValidacion.value = true;
        return false;
    }
    if (!/\d/.test(newPassword.value)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos un número';
        notificacionValidacion.value = true;
        return false;
    }
    if (!/[@#\/]/.test(newPassword.value)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos un carácter especial (@, #, /)';
        notificacionValidacion.value = true;
        return false;
    }

    if (!/[A-Z]/.test(newPassword.value)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos una letra mayúscula';
        notificacionValidacion.value = true;
        cerrarNotificacion();
        return false;
    }
    if (!/[a-z]/.test(newPassword.value)) {
        mensajeValidacion.value = 'La contraseña debe contener al menos una letra minúscula';
        notificacionValidacion.value = true;
        cerrarNotificacion();
        return false;
    }
    if (newPassword.value !== confirmPassword.value) {
        mensajeValidacion.value = 'Las contraseñas deben coincidir';
        notificacionValidacion.value = true;
        return false;
    }
    notificacionValidacion.value = false; // No hay errores
    return true;
}

const togglePasswordVisibility = (field) => {
    if (field === 'newPassword') {
        mostrarNuevaPassword.value = !mostrarNuevaPassword.value;
    } else if (field === 'confirmPassword') {
        mostrarConfirmPassword.value = !mostrarConfirmPassword.value;
    } else if (field === 'password') {
        mostrarPassword.value = !mostrarPassword.value;
    }
};

function limpiar() {

    data.value.nombre = '';
    data.value.apellido = '';
    data.value.cedula = '';
    data.value.correo = '';
    data.value.telefono = '';
}

async function getUsuario() {
    try {
        const response = await useUsuario.getById();
        if (useUsuario.estatus === 200) {
            usuario.value = response
            console.log(usuario)
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(async () => {

    await getUsuario();
    nombre.value = usuario.value.nombre;
    apellido.value = usuario.value.apellido;
    cedula.value = usuario.value.cedula;
    correo.value = usuario.value.correo;
    telefono.value = usuario.value.telefono;
})
</script>

<template>
    <div>
        <div class="container d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <div class="col mt-5 mb-3" style="text-align: center;">
                    <h4 style="font-weight: bold; color:#734a4a;">Editar Usuario</h4>
                </div>
                <form class="rows" id="EditarUser" @submit.prevent="guardarCambios">
                    <div class="mb-3">
                        <label for="NombreUser" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Nombres</label>
                        <input type="text" class="form-control" v-model="nombre" id="NombreUser"
                            placeholder="Digite su nombre" style="border-color: #734a4a" required>
                    </div>
                    <div class="mb-3">
                        <label for="ApellidosUser" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Apellidos</label>
                        <input type="text" class="form-control" v-model="apellido" id="ApellidosUser"
                            placeholder="Digite sus apellidos" style="border-color: #734a4a" required>
                    </div>
                    <div class="mb-3">
                        <label for="ApellidosUser" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Cedula</label>
                        <input type="text" class="form-control" v-model="cedula" id="ApellidosUser"
                            placeholder="Digite su cédula" style="border-color: #734a4a" required>
                    </div>
                    <div class="mb-3">
                        <label for="EmailUser" style="font-weight: bold; color: #734a4a;" class="form-label">Correo
                            electronico</label>
                        <input type="email" class="form-control" id="EmailUser" v-model="correo"
                            aria-describedby="emailHelp" style="border-color: #734a4a"
                            placeholder="Digite su correo electrónico, ej (correo@gmail.com)" required>
                    </div>
                    <div class="mb-3">
                        <label for="TelefonoUser" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Telefono</label>
                        <input type="number" class="form-control" v-model="telefono" id="TelefonoUser"
                            placeholder="Digite su número telefónico" style="border-color: #734a4a" required>
                    </div>
                    <button type="submit" class="btn mb-5"
                        style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                        :disabled="guardando"> <span v-if="guardando" class="spinner-border spinner-border-sm"
                            role="status" aria-hidden="true"></span>
                        <span v-if="!guardando">Actualizar</span></button>
                </form>

                <form @reset="onReset" class="rows" @submit.prevent="cambiarPassword">
                    <div class="col mt-5 mb-3">
                        <h4 style="font-weight: bold; color:#734a4a;">Actualizar Contraseña</h4>
                    </div>
                    <div class="mb-3">
                        <label for="ContraseñaActual" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Contraseña Actual</label>
                        <div class="input-group">
                            <input :type="mostrarPassword ? 'text' : 'password'" class="form-control"
                                id="ContraseñaActual" style="border-color: #734a4a" v-model="password" required>
                            <button class="btn btn-outline-secondary" type="button"
                                @click="togglePasswordVisibility('password')">
                                <i :class="mostrarPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="NuevaContraseña" style="font-weight: bold; color: #734a4a;" class="form-label">Nueva
                            Contraseña</label>
                        <div class="input-group">
                            <input :type="mostrarNuevaPassword ? 'text' : 'password'" class="form-control"
                                id="NuevaContraseña" style="border-color: #734a4a" v-model="newPassword" required>
                            <button class="btn btn-outline-secondary" type="button"
                                @click="togglePasswordVisibility('newPassword')">
                                <i :class="mostrarNuevaPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="ConfirmaContraseña" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Confirma Contraseña</label>
                        <div class="input-group">
                            <input :type="mostrarConfirmPassword ? 'text' : 'password'" class="form-control"
                                id="ConfirmaContraseña" style="border-color: #734a4a" v-model="confirmPassword"
                                required>
                            <button class="btn btn-outline-secondary" type="button"
                                @click="togglePasswordVisibility('confirmPassword')">
                                <i :class="mostrarConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="btn mb-5"
                        style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                        :disabled="loadingContraseña">
                        <span v-if="loadingContraseña" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-if="!loadingContraseña">Actualizar</span>
                    </button>
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
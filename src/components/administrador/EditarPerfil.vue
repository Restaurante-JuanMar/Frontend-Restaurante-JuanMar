<script setup>
import { ref, onMounted } from 'vue';
import { useStoreUsuarios } from '../../stores/usuario.js';

const useUsuario = useStoreUsuarios();
const nombre = ref('');
const apellido = ref('');
const cedula = ref('');
const correo = ref('');
const telefono = ref('');
const data = ref({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    telefono: '',
})
const guardando = ref(false);
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');

async function guardarCambios() {
    guardando.value = true;

    // Solo actualizamos el campo `posicion` en `data.value`
    data.value.posicion = posicion.value;

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useUsuario.editar(useUsuario.id, data.value);

        if (useUsuario.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Perfil modificado exitosamente';

            limpiar();  

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useUsuario.estatus === 400) {
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

function limpiar() {

    data.value.nombre = '';
    data.value.apellido = '';
    data.value.cedula = '';
    data.value.correo = '';
    data.value.telefono = '';
}


onMounted(()=>{
    nombre.value = useUsuario.usuario.nombre;
    apellido.value = useUsuario.usuario.apellido;
    cedula.value = useUsuario.usuario.cedula;
    correo.value = useUsuario.usuario.correo;
    telefono.value = useUsuario.usuario.telefono;
})
</script>

<template>
    <div>
        <div class="container d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <div class="col mt-5 mb-3" style="text-align: center;">
                    <h4 style="font-weight: bold; color:#734a4a;">Editar Usuario</h4>
                </div>
                <form class="rows" id="EditarUser">
                    <div class="mb-3">
                        <label for="NombreUser" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Nombres</label>
                        <input type="text" class="form-control" v-model="nombre" id="NombreUser" placeholder="Digite su nombre" style="border-color: #734a4a" required>
                    </div>
                    <div class="mb-3">
                        <label for="ApellidosUser" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Apellidos</label>
                        <input type="text" class="form-control" v-model="apellido" id="ApellidosUser"  placeholder="Digite sus apellidos" style="border-color: #734a4a"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="ApellidosUser" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Cedula</label>
                        <input type="text" class="form-control" v-model="cedula" id="ApellidosUser"  placeholder="Digite su cédula" style="border-color: #734a4a"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="EmailUser" style="font-weight: bold; color: #734a4a;" class="form-label">Correo
                            electronico</label>
                        <input type="email" class="form-control" id="EmailUser" v-model="correo" aria-describedby="emailHelp"
                            style="border-color: #734a4a" placeholder="Digite su correo electrónico, ej (correo@gmail.com)" required>
                    </div>
                    <div class="mb-3">
                        <label for="TelefonoUser" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Telefono</label>
                        <input type="number" class="form-control" v-model="telefono" id="TelefonoUser"  placeholder="Digite su número telefónico" style="border-color: #734a4a"
                            required>
                    </div>
                    <button type="submit" class="btn mb-5"
                        style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Actualizar</button>
                </form>

                <form class="rows">
                    <div class="col mt-5 mb-3">
                        <h4 style="font-weight: bold; color:#734a4a;">Actualizar Contraseña</h4>
                    </div>
                    <div class="mb-3">
                        <label for="ContraseñaActual" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Contraseña Actual</label>
                        <input type="password" class="form-control" id="ContraseñaActual" style="border-color: #734a4a"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="NuevaContraseña" style="font-weight: bold; color: #734a4a;" class="form-label">Nueva
                            Contraseña</label>
                        <input type="password" class="form-control" id="NuevaContraseña" style="border-color: #734a4a"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="ConfirmaContraseña" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Confirma Contraseña</label>
                        <input type="password" class="form-control" id="ConfirmaContraseña"
                            style="border-color: #734a4a" required>
                    </div>
                    <button type="submit" class="btn mb-5"
                        style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Actualizar</button>
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
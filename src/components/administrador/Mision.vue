<script setup>
import { ref, onMounted } from 'vue';
import { useStoreMision } from '../../stores/mision.js';
import { useStoreVision } from '../../stores/vision.js';
import { useStoreValoresCorporativos } from '../../stores/valores_corporativos.js';

const useMision = useStoreMision();
const useVision = useStoreVision();
const useValCorp = useStoreValoresCorporativos();
const descripcionMision = ref('');
const descripcionVision = ref('');
const nombre = ref('');
const descripcion = ref('');
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const guardandoMision = ref(false);
const guardandoVision = ref(false);
const guardandoVC = ref(false);
const loading = ref(false);
const loadingVision = ref(false);
const valoresCorporativos = ref([]);
const dataMision = ref({
    descripcion: '',
});
const dataVision = ref({
    descripcion: '',
});
const dataValCorp = ref({
    nombre: '',
    descripcion: '',
});

async function guardarCambiosMision() {
    guardandoMision.value = true;

    dataMision.value.descripcion = descripcionMision.value;

    try {
        const response = await useMision.agregarOEditarMision(dataMision.value);

        if (useMision.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Misión modificada exitosamente';

            dataMision.value.descripcion = '';
            getMision();
            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useMision.estatus === 400 || useMision.estatus === 404 || useMision.estatus === 500) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useMision.validacion;

            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useMision.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardandoMision.value = false;
    }
}

async function guardarCambiosVision() {
    guardandoVision.value = true;

    dataVision.value.descripcion = descripcionVision.value;

    try {
        // Llamada a la API para crear o actualizar el menú con los datos actuales
        const response = await useVision.agregarOEditarVision(dataVision.value);

        if (useVision.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;
            mensajeNotificacion.value = 'Visión modificada exitosamente';

            // Limpiar la imagen del array después de una actualización exitosa
            dataVision.value.descripcion = '';
            getVision();

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useVision.estatus === 400 || useVision.estatus === 404 || useVision.estatus === 500) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useVision.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useVision.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardandoVision.value = false;
    }
}

async function gurdarCambiosValoresCorporativos() {
    guardandoVC.value = true;

    dataValCorp.value.nombre = nombre.value;
    dataValCorp.value.descripcion = descripcion.value;

    try {
        let response;

        // Verificar si estamos editando o creando un valor corporativo
        if (useValCorp.idValor) {
            // Si idValor tiene un valor, estamos en modo edición
            response = await useValCorp.editarValor(useValCorp.idValor, dataValCorp.value);
            mensajeNotificacion.value = 'Valor corporativo modificado exitosamente';
        } else {
            // Si idValor está vacío, estamos en modo creación
            response = await useValCorp.crearValor(dataValCorp.value);
            mensajeNotificacion.value = 'Valor corporativo creado exitosamente';
        }

        if (useValCorp.estatus === 200) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionVisible.value = true;

            // Limpiar los datos del formulario después de una operación exitosa
            dataValCorp.value.nombre = '';
            dataValCorp.value.descripcion = '';
            nombre.value = '';
            descripcion.value = '';
            useValCorp.idValor = '';
            getValoresCorporativos();

            setTimeout(() => {
                notificacionVisible.value = false;
                mensajeNotificacion.value = '';
            }, 3000);
        } else if (useValCorp.estatus === 400) {
            notificacionCargando.value = false;
            mensajeCargando.value = '';
            notificacionValidacion.value = true;
            mensajeValidacion.value = useValCorp.validacion;
            setTimeout(() => {
                notificacionValidacion.value = false;
                mensajeValidacion.value = '';
            }, 3000);
        }
    } catch (error) {
        notificacionValidacion.value = true;
        mensajeValidacion.value = useValCorp.validacion;

        setTimeout(() => {
            notificacionValidacion.value = false;
            mensajeValidacion.value = '';
        }, 3000);
        console.log(error);
    } finally {
        guardandoVC.value = false;
    }
}


function cargarDatosVC(vc) {
    nombre.value = vc.nombre;
    descripcion.value = vc.descripcion;
    useValCorp.idValor = vc._id; // Asignamos el ID del valor corporativo seleccionado
}

async function getMision() {
    loading.value = true;
    try {
        const response = await useMision.getAll();
        if (useMision.estatus === 200) {
            descripcionMision.value = response[0].descripcion
        }
        console.log("mision", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

async function getVision() {
    loadingVision.value = true;
    try {
        const response = await useVision.getAll();
        if (useVision.estatus === 200) {
            descripcionVision.value = response[0].descripcion
        }
        console.log("vision", response)
    } catch (error) {
        console.log(error);
    } finally {
        loadingVision.value = false;
    }
}

async function getValoresCorporativos() {
    loading.value = true;
    try {
        const response = await useValCorp.getAll();
        if (useValCorp.estatus === 200) {
            valoresCorporativos.value = response
        }
        console.log("valores corporativos", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    dataValCorp.value.nombre = '';
    dataValCorp.value.descripcion = '';
    nombre.value = '';
    descripcion.value = '';
    useValCorp.idValor = '';
    getMision();
    getVision();
    getValoresCorporativos();
})
</script>


<template>
    <div>
        <div class="container d-flex justify-content-center">
            <div class="col-md-6">
                <div class="col mb-5 mt-5">
                    <h4 style="color: #734a4a; font-weight:bold; text-align:center">Actualizar Información del
                        Restaurante</h4>
                </div>
                <form action="" class="row" method="post" @submit.prevent="guardarCambiosMision">
                    <div class="mb-3">
                        <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                            class="form-label">Misión</label>
                        <div class="position-relative">
                            <textarea id="Descripcion" class="form-control" v-model="descripcionMision"
                                placeholder="Digite la misión del restaurante..." required :disabled="loading"
                                style="border-color:#734a4a; color:#734a4a; height: 110px;">
                            </textarea>
                            <!-- Spinner de carga (Bootstrap) -->
                            <div v-if="loading" class="position-absolute top-50 start-50 translate-middle">
                                <div class="spinner-border text-danger" role="status">
                                    <span class="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="mt-2 mb-3">
                        <button type="submit" class="btn"
                            style="background-color: #734a4a; color:#fdfefe; font-weight:bold"
                            :disabled="guardandoMision">
                            <span v-if="guardandoMision" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-if="!guardandoMision">Actualizar Misión</span></button>
                    </div>
                </form>
                <hr>

                <form action="" class="row" method="post" @submit.prevent="guardarCambiosVision">
                    <div class="mb-3 mt-3">
                        <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                            class="form-label">Visión</label>
                        <div class="position-relative">
                            <textarea id="Descripcion" class="form-control" v-model="descripcionVision"
                                placeholder="Digite la visiòn del restaurante..." required :disabled="loadingVision"
                                style="border-color:#734a4a; color:#734a4a; height: 110px;">
                            </textarea>
                            <!-- Spinner de carga (Bootstrap) -->
                            <div v-if="loadingVision" class="position-absolute top-50 start-50 translate-middle">
                                <div class="spinner-border text-danger" role="status">
                                    <span class="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2 mb-3">
                        <button type="submit" class="btn"
                            style="background-color: #734a4a; color:#fdfefe; font-weight:bold"
                            :disabled="guardandoVision">
                            <span v-if="guardandoVision" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-if="!guardandoVision">Actualizar Visión</span></button>
                    </div>
                </form>
                <hr>

                <form action="" class="row" method="post" @submit.prevent="gurdarCambiosValoresCorporativos">
                    <div class="mb-3 mt-3">
                        <label for="Tipoevento" style="font-weight: bold; color:#734a4a" class="form-label">Valores
                            Corporativos</label>
                        <div class="mb-3">
                            <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                                class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="TipoEvento" v-model="nombre" required
                                style="border-color:#734a4a; color:#734a4a"
                                placeholder="Digite el nombre del valor corporativo">
                        </div>
                        <div class="mb-3">
                            <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                                class="form-label">Descripción</label>
                            <textarea type="text" class="form-control" id="Descripcion" v-model="descripcion"
                                style="border-color:#734a4a; color:#734a4a;"
                                placeholder="Digite la descripción del valor corporativo..." required></textarea>
                        </div>
                    </div>
                    <div class="mb-5">
                        <button type="submit" class="btn"
                            style="background-color: #734a4a; color:#fdfefe; font-weight:bold" :disabled="guardandoVC">
                            <span v-if="guardandoVC" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-if="!guardandoVC">Guardar Cambios</span></button>
                    </div>
                </form>

                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Descripción</th>
                            <th scope="col" style="color: #734a4a;">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="vc in valoresCorporativos" :key="vc._id">
                            <td>{{ vc.nombre }}</td>
                            <td class="mensaje">
                                <VMenu v-if="vc.descripcion" class="vmenu">
                                    <span class="mensaje" style="color: #734a4a;">
                                        {{ vc.descripcion.slice(0, 40) }}...
                                    </span>
                                    <template #popper>
                                        <div class="mensajeVmenu">{{ vc.descripcion }}</div>
                                    </template>
                                </VMenu>
                                <span v-else style="color: #734a4a;">No aplica</span>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn" @click="cargarDatosVC(vc)"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-pencil-square"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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

.position-relative {
    position: relative;
}

.position-absolute {
    position: absolute;
}
</style>
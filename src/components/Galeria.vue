<script setup>
import { ref, onMounted } from 'vue';
import { useStoreGaleria } from '../stores/galeria';
import EquipoTrabajo from '../assets/Restaurante/equipo_trabajo.jpg';
import Fachada from '../assets/Restaurante/fachada.jpg';
import Ingreso from '../assets/Restaurante/ingreso.jpg';
import Salon1 from '../assets/Restaurante/salon1.jpg';
import Salon2 from '../assets/Restaurante/salon_2.jpg';
import Recepcion from '../assets/Restaurante/recepción.jpg';
import Salon3 from '../assets/Restaurante/salon_3.jpg';
import Patio from '../assets/Restaurante/patio.jpg';
import Patio2 from '../assets/Restaurante/patio_2.png';
import Salon41 from '../assets/Restaurante/salon_4.1.jpg';
import Salon42 from '../assets/Restaurante/salon_4.2.jpg';
import Salon5 from '../assets/Restaurante/salon_5.jpg';
import Cumpleaños1 from '../assets/Eventos/celebracion_cumpleaños_1.jpg';
import Clausura1 from '../assets/Eventos/celebración_clausura_estudio_1.jpg';
import QuinceAños from '../assets/Eventos/celebrtacion_15_años_1.jpg';

const useGaleria = useStoreGaleria();
const galerias = ref([]);
const loading = ref(false);
const imagenSeleccionada = ref('');
const eventoSeleccionado = ref('');

async function getGaleria() {
    loading.value = true;
    try {
        const response = await useGaleria.getByFecha();
        if (useGaleria.estatus === 200) {
            galerias.value = [...response]
        }
        console.log("galerias", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

function formatFecha(fechaISO) {
    const [year, month, day] = fechaISO.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
}

function mostrarImagenEnModal(galeria) {
    eventoSeleccionado.value = galeria.nombre_gal;
    imagenSeleccionada.value = galeria.imagen[0].url;
    const modal = new bootstrap.Modal(document.getElementById('modalImagen'));
    modal.show();
}

onMounted(() => {
    getGaleria();
})
</script>

<template>
    <div>
        <!--Galeria-->
        <div class="container mt-5 mb-5">
            <div class="col mb-4" style="text-align: center;">
                <h4 style="color: #734a4a; font-weight: bold;">Galeria de Fotos</h4>
            </div>
            <!--Equipo del restaurante-->
            <h4 class="mb-2" style="color: #734a4a; font-weight: bold; text-align: center;">Equipo de Trabajo</h4>
            <div class="row justify-content-center align-items-start">
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3 mb-sm-0">
                    <div class="card card-degradado rounded-4">
                        <img :src="EquipoTrabajo" class="img-fluid rounded-4"
                            style=" border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
            </div>
            <!--Galeria del restaurante-->
            <h4 class="mb-2 mt-3" style="color: #734a4a; font-weight: bold;">Restaurante</h4>
            <div class="row align-items-start">
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3 mb-sm-0">
                    <div class="card card-degradado rounded-4">
                        <img :src="Fachada" class="img-fluid rounded-4"
                            style=" border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Ingreso" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Salon1" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Salon2" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Recepcion" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Salon3" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Patio" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Patio2" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a; height: 310px;"
                            alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Salon41" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Salon42" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="Salon5" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar">
                    </div>
                </div>
            </div>
            <!--Galeria de eventos especiales-->
            <h4 class="mb-2" style="color: #734a4a; font-weight: bold;">Eventos Especiales</h4>
            <div class="row align-items-start">
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3" v-for="galeria in galerias" :key="galeria._id">
                    <div class="card borde rounded-4"
                        style="border-style: solid; border-color: #734a4a; background-color: #fcf0ef;">
                        <img :src="galeria.imagen[0].url" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a; height: 310px; cursor: pointer;"
                            id="imagen3" @click="mostrarImagenEnModal(galeria)" alt="Eventos especiales">
                        <div class="card-body mt-2 ">
                            <p class="descripcion">
                                <VMenu class="vmenu">
                                    <span class="descripcion" style="color: #734a4a;">{{ galeria.nombre_gal.slice(0, 50)
                                        }}</span>
                                    <template #popper>
                                        <div class="descripVmenu">{{ galeria.nombre_gal }}</div>
                                    </template>
                                </VMenu>
                            </p>
                            <p class="card-text mb-1" style="color: #734a4a" id="descripcion3">
                                {{ galeria.descrip_gal }}</p>
                            <p class="card-text" style="font-weight: bold; color: #734a4a" id="fecha3">{{
                                formatFecha(galeria.fecha_gal) }}</p>
                        </div>
                    </div>
                </div>
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
    </div>
</template>

<style scoped>
.gallery-img {
    object-fit: cover;
    width: 100%;
    height: 200px;
}

.section-title {
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
}

.descripcion {
    font-weight: bold;
    color: #734a4a;
    height: 22px;
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

@media (max-width: 768px) {
    .col-sm-3 {
        flex: 0 0 auto !important;
        width: 100% !important;
    }
}
</style>
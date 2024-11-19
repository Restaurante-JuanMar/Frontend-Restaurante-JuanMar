<script setup>
import { ref, onMounted } from 'vue';
import { useStoreGaleria } from '../stores/galeria.js';
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
const imagenesGaleria = ref([
    { url: EquipoTrabajo, titulo: 'Equipo de Trabajo' },
    { url: Fachada, titulo: 'Fachada' },
    { url: Ingreso, titulo: 'Ingreso' },
    { url: Salon1, titulo: 'Salón 1' },
    { url: Salon2, titulo: 'Salón 2' },
    { url: Recepcion, titulo: 'Recepción' },
    { url: Salon3, titulo: 'Salón 3' },
    { url: Patio, titulo: 'Patio' },
    { url: Patio2, titulo: 'Patio 2' },
    { url: Salon41, titulo: 'Salón 4.1' },
    { url: Salon42, titulo: 'Salón 4.2' },
    { url: Salon5, titulo: 'Salón 5' },
]);
const indiceActual = ref(0);


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

function mostrarImagen(index) {
    indiceActual.value = index; // Establece el índice actual
    const modal = new bootstrap.Modal(document.getElementById('modalImagenFijas'));
    modal.show();
}

function siguienteImagen() {
    if (indiceActual.value < imagenesGaleria.value.length - 1) {
        indiceActual.value++;
    } else {
        indiceActual.value = 0; // Vuelve al inicio
    }
}

function anteriorImagen() {
    if (indiceActual.value > 0) {
        indiceActual.value--;
    } else {
        indiceActual.value = imagenesGaleria.value.length - 1; // Va al final
    }
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
                            style="border-style: solid; border-color: #734a4a; cursor: pointer;" alt="Equipo de Trabajo"
                            @click="mostrarImagen(0)">
                    </div>
                </div>
            </div>

            <!-- Galería del Restaurante -->
            <h4 class="mb-2 mt-3" style="color: #734a4a; font-weight: bold;">Restaurante</h4>
            <div class="row align-items-start">
                <div v-for="(imagen, index) in imagenesGaleria.slice(1)" :key="index"
                    class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card card-degradado rounded-4">
                        <img :src="imagen.url" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a; cursor: pointer;" :alt="imagen.titulo"
                            @click="mostrarImagen(index + 1)">
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="modalImagenFijas" tabindex="-1" aria-labelledby="modalImagenLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalImagenLabel" style="color: #734a4a;">
                                {{ imagenesGaleria[indiceActual].titulo }}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center position-relative">
                            <!-- Botón Anterior -->
                            <button class="btn"
                                style="z-index: 1050; position: absolute; top: 50%; left: 3%; font-size: 20px; background-color: #734a4a; color: white;"
                                @click="anteriorImagen">
                                <
                            </button>
                            <!-- Imagen -->
                            <img :src="imagenesGaleria[indiceActual].url" class="img-fluid" alt="Imagen de galería">
                            <!-- Botón Siguiente -->
                            <button class="btn"
                                style="z-index: 1050; position: absolute; top: 50%; right: 3%; font-size: 20px; background-color: #734a4a; color: white;"
                                @click="siguienteImagen">
                                >
                            </button>
                        </div>
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
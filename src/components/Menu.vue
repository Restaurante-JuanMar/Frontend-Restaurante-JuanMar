<script setup>
import { ref, onMounted } from 'vue';
import { useStoreMenu } from '../stores/menu.js';
import { useStoreCarta } from '../stores/carta_menu.js';
import Carta1 from '../assets/carta/Carta1.jpg';
import Carta2 from '../assets/carta/Carta2.jpg';
import Carta3 from '../assets/carta/Carta3.jpg';
import Carta4 from '../assets/carta/Carta4.jpg';
import Carta5 from '../assets/carta/Carta5.jpg';
import Carta6 from '../assets/carta/Carta6.jpg';

const useMenu = useStoreMenu();
const useCartaMenu = useStoreCarta();   
const menus = ref([]);
const cartaMenu = ref();
const loading = ref(false);
const loadingCarta = ref(false);
const imagenSeleccionada = ref(null);

async function getMenu() {
    loading.value = true;
    try {
        const response = await useMenu.getByPosition();
        if (useMenu.estatus === 200) {
            menus.value = [...response]
        }
        console.log("menus", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

async function getCartaMenu() {
    loadingCarta.value = true;
    try {
        const response = await useCartaMenu.getAll();
        if (useCartaMenu.estatus === 200) {
            cartaMenu.value = [...response]
        }
        console.log("cartas", response)
    } catch (error) {
        console.log(error);
    } finally {
        loadingCarta.value = false;
    }
}

function mostrarImagenEnModal(menu) {
    imagenSeleccionada.value = menu.imagen[0].url;
    const modal = new bootstrap.Modal(document.getElementById('modalImagen'));
    modal.show();
}

onMounted(() => {
    getMenu();
    getCartaMenu();
})
</script>

<template>
    <div>
        <div class="container my-5">
            <div class="mb-5">
                <h4 style="color: #734a4a; font-weight: bold; text-align: center;">Especialidad de la Casa</h4>
            </div>
            <div class="row ">
                <div class="col-md-4" v-for="menu in menus" :key="menu._id">
                    <div class="card uniform-card rounded-2 mb-3">
                        <img :src="menu.imagen[0].url" class="card-img-top rounded-2 uniform-image"
                            @click="mostrarImagenEnModal(menu)" alt="Carta Menu Rest. JuanMar" style="cursor: pointer;">
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <a v-for="carta in cartaMenu" :key="carta._id" :href="carta.archivoUrl.url" target="_blank"
                    download="CARTA_Juanmar_2024.pdf" style="color: #734a4a; font-weight: bold;">
                    <i class="bi bi-file-arrow-down fs-4"></i> Carta del Menu
                </a>
            </div>
        </div>

        <div class="modal fade" id="modalImagen" tabindex="-1" aria-labelledby="modalImagenLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <img :src="imagenSeleccionada" class="img-fluid" alt="Vista previa de la imagen">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.uniform-card {
    border: 3px solid #734a4a;
    padding: 3px;
    border-radius: 8px;
}

.uniform-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;

}
</style>
<script setup>
import { ref } from 'vue';
import Carta1 from '../assets/carta/Carta1.jpg';
import Carta2 from '../assets/carta/Carta2.jpg';
import Carta3 from '../assets/carta/Carta3.jpg';
import Carta4 from '../assets/carta/Carta4.jpg';
import Carta5 from '../assets/carta/Carta5.jpg';
import Carta6 from '../assets/carta/Carta6.jpg';



</script>

<template>
    <div>
        <div class="container my-5">
            <div class="mb-5">
                <h4 style="color: #734a4a; font-weight: bold; text-align: center;">Especialidad de la Casa</h4>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="card" style="border: 3px solid; border-color: #734a4a; ">
                        <img :src="Carta1" id="CartaMenu1"
                            class="card-img-top rounded-2" alt="Carta Menu Rest. JUanMar">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card" style="border: 3px solid; border-color: #734a4a; ">
                        <img :src="Carta2" id="CartaMenu2"
                            class="card-img-top rounded-2" alt="Carta Menu Rest. JUanMar">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-3" style="border: 3px solid; border-color: #734a4a; ">
                        <img :src="Carta3" id="CartaMenu3"
                            class="card-img-top rounded-2" alt="Carta Menu Rest. JUanMar">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-3" style="border: 3px solid; border-color: #734a4a; ">
                        <img :src="Carta4" id="CartaMenu4"
                            class="card-img-top rounded-2" alt="Carta Menu Rest. JUanMar">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-3" style="border: 3px solid; border-color: #734a4a; ">
                        <img :src="Carta5" id="CartaMenu5"
                            class="card-img-top rounded-2" alt="Carta Menu Rest. JUanMar">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-3" style="border: 3px solid; border-color: #734a4a; ">
                        <img :src="Carta6" id="CartaMenu6"
                            class="card-img-top rounded-2" alt="Carta Menu Rest. JUanMar">
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <a style="color: #734a4a; font-weight: bold;" href="../assets/carta/Carta_menu/CARTA_Juanmar_2024.pdf" target="_blank"
                    download="CARTA_Juanmar_2024.pdf">
                    <i class="bi bi-file-arrow-down fs-4"></i>Carta del Menu
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
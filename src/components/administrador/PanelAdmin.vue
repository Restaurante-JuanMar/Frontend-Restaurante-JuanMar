<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LogoJuanMar from '../../assets/juanmarlogo1.png';
import Menu from '../../assets/Menú.jpg';
import Reservacion from '../../assets/Reservacion.jpg';
import Galeria from '../../assets/GaleriaFotos.jpg';
import TrabajaNosotros from '../../assets/TrabajaConNosotros.jpg';
import Contactenos from '../../assets/Contacenos.jpg';

const router = useRouter();

function irInicioAdmin(){
    router.push('/panel-admin')
}

function irMenuAdmin(){
    router.push('/menu-admin')
}

function irReservacionAdmin(){
    router.push('/reservacion-admin')
}

function irGaleriaAdmin(){
    router.push('/galeria-admin')
}

function irTrabajaConNosotros(){
    router.push('trabaja-nosotros-admin')
}

function irContactenosAdmin(){
    router.push('/contactenos-admin')
}
</script>

<template>
    <div>
            <!--Contenido-->
    <div class="container mt-5 mb-5">
        <div class="row align-items-start">
            <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3 mb-sm-0">
                <div class="card card-degradado rounded-4">
                    <a @click="irInicioAdmin()" style="cursor: pointer;"><img :src="LogoJuanMar" class="img-fluid rounded-4" style=" border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar"></a>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                <div class="card card-degradado rounded-4">
                    <a @click="irMenuAdmin()" style="cursor: pointer;"><img :src="Menu" class="img-fluid rounded-4" style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar"></a>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                <div class="card card-degradado rounded-4">
                    <a @click="irReservacionAdmin()" style="cursor: pointer;"><img :src="Reservacion" class="img-fluid rounded-4" style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar"></a>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                <div class="card card-degradado rounded-4">
                    <a @click="irGaleriaAdmin()" style="cursor: pointer;"><img :src="Galeria" class="img-fluid rounded-4" style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar"></a>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                <div class="card card-degradado rounded-4">
                    <a @click="irTrabajaConNosotros()" style="cursor: pointer;"><img :src="TrabajaNosotros" class="img-fluid rounded-4" style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar"></a>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                <div class="card card-degradado rounded-4">
                    <a @click="irContactenosAdmin()" style="cursor: pointer;"><img :src="Contactenos" class="img-fluid rounded-4" style="border-style: solid; border-color: #734a4a;" alt="Restaurante JuanMar"></a>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>

</style>
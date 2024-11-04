<script setup>
import { ref } from 'vue';
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
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3 mb-sm-0">
                    <div class="card borde rounded-4"
                        style="border-style: solid; border-color: #734a4a; background-color: #fcf0ef;">
                        <img :src="Cumpleaños1" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a;" id="imagen1" alt="Eventos especiales">
                        <div class="card-body">
                            <p class="card-text mb-1" style="font-weight: bold; color: #734a4a" id="descripcion1">
                                Celebración de cumpleaños de la Ing. Andrea</p>
                            <p class="card-text" style="font-weight: bold; color: #734a4a" id="fecha1">28/10/2024</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card borde rounded-4"
                        style="border-style: solid; border-color: #734a4a; background-color: #fcf0ef;">
                        <img :src="Clausura1" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a; height: 310px;" id="imagen2"
                            alt="Eventos especiales">
                        <div class="card-body">
                            <p class="card-text mb-1" style="font-weight: bold; color: #734a4a" id="descripcion2">
                                Celebración de clausura del programa de turismo UIS</p>
                            <p class="card-text" style="font-weight: bold; color: #734a4a" id="fecha2">30/06/2024</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-3 mt-3 mb-3">
                    <div class="card borde rounded-4"
                        style="border-style: solid; border-color: #734a4a; background-color: #fcf0ef;">
                        <img :src="QuinceAños" class="img-fluid rounded-4"
                            style="border-style: solid; border-color: #734a4a; height: 310px;" id="imagen3"
                            alt="Eventos especiales">
                        <div class="card-body">
                            <p class="card-text mb-1" style="font-weight: bold; color: #734a4a" id="descripcion3">
                                Celebración de 15 años</p>
                            <p class="card-text" style="font-weight: bold; color: #734a4a" id="fecha3">22/10/2024</p>
                        </div>
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
</style>
<script setup>
import { ref } from 'vue';
import Fachada from '../assets/fachada1.jpg';
import Restaurante1 from '../assets/JUANMAR_RESTAURANTE-10-1.png';
import Restaurante2 from '../assets/JUANMAR_RESTAURANTE-12-1.png';
import Restaurante3 from '../assets/JUANMAR_RESTAURANTE-3-1.png';
import Restaurante4 from '../assets/JUANMAR_RESTAURANTE-7-1.png';
import Aniversario from '../assets/aniversario.jpg';
import LogoSinFondo from '../assets/logo_sin_fondo.png';







</script>

<template>
    <div>
        <!--Carrusel-->
        <section id="Carrusel">
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3"
                        aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4"
                        aria-label="Slide 5"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img :src="Fachada" class="d-block w-100" alt="Fachada restaurante">
                        <!--<div class="carousel-caption d-none d-md-block">
                        <a style="font: size 12px;; color: #440606; font-weight: bold;" href="reserva.html">Realizar Reserva</a>
                        <p style="color: #440606; font-weight: bold; font: size 12px;">del 2 al 4 de Noviembre</p>
                    </div>-->
                    </div>
                    <div class="carousel-item">
                        <img :src="Restaurante1" class="d-block w-100"
                            alt="Restaurante JuanMar">
                    </div>
                    <div class="carousel-item">
                        <img :src="Restaurante2" class="d-block w-100"
                            alt="Restaurante JuanMar">
                    </div>
                    <div class="carousel-item">
                        <img :src="Restaurante3" class="d-block w-100" alt="Restaurante JuanMar">
                    </div>
                    <div class="carousel-item">
                        <img :src="Restaurante4" class="d-block w-100" alt="Restaurante JuanMar">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>
        <section id="promocionar">
            <div class="container mt-3">
                <img :src="Aniversario" style="border-color: #734a4a; border-style: 3 solid;"
                    alt="evento promocional">
            </div>
        </section>
        <section id="PlatosEspeciales">

        </section>
        <section id="localizacion" style="background-color: #fae1de;">
            <div class="container mt-5 text-center">
                <h4 class="mb-3" style="color: #734a4a; font-weight: bold;">Nuestra Localización</h4>
                <iframe src="https://www.google.com/maps/d/embed?mid=1hYq40YbNc_hBAuk_XKM_4a6vlOpxL0Y&ehbc=2E312F"
                    width="640" height="480"></iframe>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>
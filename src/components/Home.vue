<script setup>
import { ref } from 'vue';
import Restaurante1 from '../assets/JUANMAR_RESTAURANTE-10-1.png';
import Restaurante2 from '../assets/JUANMAR_RESTAURANTE-12-1.png';
import Restaurante3 from '../assets/JUANMAR_RESTAURANTE-3-1.png';
import Restaurante4 from '../assets/JUANMAR_RESTAURANTE-7-1.png';
import EquipoTrabajo from '../assets/Restaurante_carrusel/equipo_trabajo.png';
import Fachada from '../assets/Restaurante_carrusel/fachada.png';
import Ingreso from '../assets/Restaurante_carrusel/ingreso.png';
import Salon1 from '../assets/Restaurante_carrusel/salon_1.png';
import Salon2 from '../assets/Restaurante_carrusel/salon_2.png';
import Recepcion from '../assets/Restaurante_carrusel/recepción.png';
import Salon3 from '../assets/Restaurante_carrusel/salon_3.png';
import Patio from '../assets/Restaurante_carrusel/patio.png';
import Patio2 from '../assets/Restaurante_carrusel/patio_2.png';
import Salon41 from '../assets/Restaurante_carrusel/salon_4.1.png';
import Salon42 from '../assets/Restaurante_carrusel/salon_4.2.png';
import Salon5 from '../assets/Restaurante_carrusel/salon_5.png';
import Aniversario from '../assets/aniversario.jpg';
import ArrozCamarones from '../assets/Platos/arroz_camarones.png';
import CasuelaCamarones from '../assets/Platos/casuela_camarones.png';
import CasuelaBagre from '../assets/Platos/casuela_magre.png';
import FileteCamarones from '../assets/Platos/filete_camarones.png';
import FileteGratinado from '../assets/Platos/filete_gratinado.png';
import PastasClasico from '../assets/Platos/pastas_clasico.png';
import Mojarra from '../assets/Platos/pescado_mojarra.png';
import PuertoMar from '../assets/Platos/puerto_mar.png';


</script>

<template>
    <div>
        <div>
            <section id="Carrusel">
                <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="3000">
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
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5"
                            aria-label="Slide 6"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="6"
                            aria-label="Slide 7"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="7"
                            aria-label="Slide 8"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="8"
                            aria-label="Slide 9"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="9"
                            aria-label="Slide 10"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="10"
                            aria-label="Slide 11"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="11"
                            aria-label="Slide 12"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img :src="EquipoTrabajo" class="d-block w-100" alt="Fachada restaurante">
                        </div>
                        <div class="carousel-item">
                            <img :src="Fachada" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Ingreso" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Salon1" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Salon2" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Recepcion" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Salon3" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Patio" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Patio2" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Salon41" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Salon42" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                        <div class="carousel-item">
                            <img :src="Salon5" class="d-block w-100" alt="Restaurante JuanMar">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            <section id="promocionar" style="background-color: #fae1de;">
                <div class="container d-flex justify-content-center align-items-center">
                    <img :src="Aniversario" class="mt-3 mb-3" style="border-color: #734a4a; border-style: 3 solid;"
                        alt="evento promocional">
                </div>
            </section>
            <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
                        aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4"
                        aria-label="Slide 5"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5"
                        aria-label="Slide 6"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="6"
                        aria-label="Slide 7"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="7"
                        aria-label="Slide 8"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img :src="ArrozCamarones" class="d-block w-100" alt="Plato arroz con camarones">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Arroz con Camarones 300g</h5>
                            <p>Se sirve con patacones y ensalada de la casa</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img :src="CasuelaCamarones" class="d-block w-100" alt="Plato casuela con camarones">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Casuela con Camarones 300g</h5>
                            <p>Se sirve con arroz blanco y patacones</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img :src="CasuelaBagre" class="d-block w-100" alt="Platos Restaurante JuanMar">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Casuela de Magre 300g</h5>
                            <p>Se sirve con arroz blanco y patacones</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img :src="FileteCamarones" class="d-block w-100" alt="Platos Restaurante JuanMar">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Filete de Camarones 350g</h5>
                            <p>Con salsa de la casa con camarones</p>
                            <p>Se sirve con arroz y patacones</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img :src="FileteGratinado" class="d-block w-100" alt="Platos Restaurante JuanMar">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Filete de Gratinado 300g</h5>
                            <p>En deliciosa salsa Bachamel, gratinado con mozarella y parmesano</p>
                            <p>Se sirve con arroz y patacones</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img :src="PastasClasico" class="d-block w-100" alt="Platos Restaurante JuanMar">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Spagheti Clásico</h5>
                            <p>viene con camarones 300g o con a la marinera 300g</p>
                            <p>Acompñado con patacones</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img :src="Mojarra" class="d-block w-100" alt="Platos Restaurante JuanMar">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Pescado Mojarra Dorada 600g</h5>
                            <p>Servido con patacones y ensalada</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img :src="PuertoMar" class="d-block w-100" alt="Platos Restaurante JuanMar">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Puerto Mar 450g</h5>
                            <p>1/2 casuela de mariscos, 1/2 arroz con camarones, patacones, ensalada y pescado gratinado
                            </p>
                            <p>Pescado: filete de pescado, medallón de mojarra dorada, salmóm o filete róbalo</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <section id="localizacion" style="background-color: #fae1de;">
                <div class="container text-center">
                    <h4 class="mb-3" style="color: #734a4a; font-weight: bold;">Nuestra Localización</h4>
                    <iframe src="https://www.google.com/maps/d/embed?mid=1hYq40YbNc_hBAuk_XKM_4a6vlOpxL0Y&ehbc=2E312F"
                        class="mb-5" width="640" height="480"></iframe>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped></style>
<script setup>
import { ref } from 'vue';
import Restaurante1 from '../assets/JUANMAR_RESTAURANTE-10.png';
import VideoRestaurante from '../assets/videos/video_restaurante.mp4';

</script>


<template>
    <div>
<!--contenido-->
<div class="container">
        <h2 class="mt-3 mb-5" style="text-align: center; color: #734a4a; font-weight: bold;">Restaurante JuanMar</h2>
        <h4 class="mb-3" style="color: #734a4a; font-weight: bold;">Reseña</h4>
        <p style="text-align: justify; color: #734a4a;">El restaurante da inicio a partir del 26 de septiembre de 2022; donde se encuentra ubicado en el corazón del barrio La Chiquinquirá del municipio del Socorro, Santander; el restaurante JuanMar se ha consolidado como un destino imperdible en el Socorro desde su apertura hace dos años. Este establecimiento ofrece un ambiente cálido y familiar, ideal para disfrutar de una experiencia gastronómica memorable. Especializado en cocina marina, JuanMar se enorgullece al ofrecer una variedad de platos de pescados y mariscos, todos preparados con ingredientes frescos que resaltan la calidad y el sabor. La infraestructura rústica del restaurante, complementada por un diseño armonioso, crea un espacio acogedor que invita a los visitantes a relajarse y disfrutar. Además, su división en cinco salones permite adaptar el entorno a diferentes tipos de celebraciones, ya sean familiares, de trabajo o con amigos. Con un menú que incluye opciones para niños y preparaciones especiales, JuanMar se posiciona como el lugar perfecto para celebrar cualquier ocasión, ya sea una cena romántica o una reunión familiar. No esperes más y reserva tu mesa para vivir una experiencia única, donde cada visita es una oportunidad para crear recuerdos inolvidables.</p>
        <p style="text-align: justify; color: #734a4a; font-weight: bold;">¡No esperes más y visítanos!</p>
        <!--<img src="imagenes/JUANMAR RESTAURANTE-10.png" class="mb-3" width="100%" height="100%"  alt="Restaurante JuanMar">-->
        <div class="d-flex justify-content-center mb-3">
            <video controls class="img-fluid" style="max-width: 100%; height: auto;">
                <source :src="VideoRestaurante" type="video/mp4">
            </video>
        </div>
    </div>
    </div>
</template>

<style scoped>

</style>
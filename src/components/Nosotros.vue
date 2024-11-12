<script setup>
import { ref, onMounted } from 'vue';
import Restaurante1 from '../assets/JUANMAR_RESTAURANTE-10.png';
import { useStoreMision } from '../stores/mision.js';
import { useStoreVision } from '../stores/vision.js';
import { useStoreValoresCorporativos } from '../stores/valores_corporativos.js';

const useMision = useStoreMision();
const useVision = useStoreVision();
const useValCorp = useStoreValoresCorporativos();
const descripcionMision = ref('');
const descripcionVision = ref('');
const valoresCorporativos = ref([]);

const loading = ref(false);

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
    loading.value = true;
    try {
        const response = await useVision.getAll();
        if (useVision.estatus === 200) {
            descripcionVision.value = response[0].descripcion
        }
        console.log("vision", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
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
    getMision();
    getVision();
    getValoresCorporativos();
})

</script>


<template>
    <div>
        <!--contenido-->
        <div class="container">
            <h2 class="mt-3 mb-5" style="text-align: center; color: #734a4a; font-weight: bold;">Restaurante JuanMar
            </h2>
            <h4 class="mb-3" style="color: #734a4a; font-weight: bold;">Reseña</h4>
            <p class="fs-5" style="text-align: justify; color: #734a4a;">
                <span style="text-align: justify; color: #734a4a;"> El restaurante da inicio a partir del 26 de
                    septiembre de
                    2022; donde se encuentra ubicado en el corazón del barrio La Chiquinquirá del municipio del Socorro,
                    Santander; el restaurante JuanMar se ha consolidado como un destino imperdible en el Socorro desde
                    su
                    apertura hace dos años. Este establecimiento ofrece un ambiente cálido y familiar, ideal para
                    disfrutar
                    de una experiencia gastronómica memorable. Especializado en cocina marina, JuanMar se enorgullece al
                    ofrecer una variedad de platos de pescados y mariscos, todos preparados con ingredientes frescos que
                    resaltan la calidad y el sabor. La infraestructura rústica del restaurante, complementada por un
                    diseño
                    armonioso, crea un espacio acogedor que invita a los visitantes a relajarse y disfrutar. Además, su
                    división en cinco salones permite adaptar el entorno a diferentes tipos de celebraciones, ya sean
                    familiares, de trabajo o con amigos. Con un menú que incluye opciones para niños y preparaciones
                    especiales, JuanMar se posiciona como el lugar perfecto para celebrar cualquier ocasión, ya sea una
                    cena
                    romántica o una reunión familiar. No esperes más y reserva tu mesa para vivir una experiencia única,
                    donde cada visita es una oportunidad para crear recuerdos inolvidables.</span>
            </p>
            <p style="text-align: justify; color: #734a4a; font-weight: bold;">¡No esperes más y visítanos!</p>
            <!--<img src="imagenes/JUANMAR RESTAURANTE-10.png" class="mb-3" width="100%" height="100%"  alt="Restaurante JuanMar">-->
            <div class="mt-5">
                <h4 class="mb-3" style="color: #734a4a; font-weight: bold;">Misión</h4>
                <p class="fs-5" style="text-align: justify; color: #734a4a;">
                    <span style="text-align: justify; color: #734a4a;"> {{
                        descripcionMision }}</span>
                </p>
            </div>

            <div class="mt-5">
                <h4 class="mb-3" style="color: #734a4a; font-weight: bold;">Visión</h4>
                <p class="fs-5" style="text-align: justify; color: #734a4a;">
                    <span style="text-align: justify; color: #734a4a;"> {{
                        descripcionVision }}</span>
                </p>
            </div>

            <div class="mt-5">
                <h4 class="mb-3" style="color: #734a4a; font-weight: bold;">Valores Corporativos</h4>
                <div v-for="vc in valoresCorporativos" :key="vc._id">
                    <p class="fs-5" style="text-align: justify; color: #734a4a;">
                        <span style="font-weight: bold;">{{ vc.nombre }}:</span>
                        <span class="fs-5" style="text-align: justify; color: #734a4a; margin-left: 10px;"> {{
                            vc.descripcion }}</span>
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped></style>
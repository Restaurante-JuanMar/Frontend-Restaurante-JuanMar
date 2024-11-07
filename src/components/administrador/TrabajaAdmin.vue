<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useStoreTrabajaNosotros } from '../../stores/trabaja_con_nosotros.js';

const useTrabajaNosotros = useStoreTrabajaNosotros();
const solicitudes = ref([]);
const solicitudesFiltradas = ref([]);
const loading = ref(false);
const filter = ref('');

async function getSolicitud() {
    loading.value = true;
    try {
        const response = await useTrabajaNosotros.getAll();
        if (useTrabajaNosotros.estatus === 200) {
            solicitudes.value = [...response].reverse()
            solicitudesFiltradas.value = [...response].reverse()
        }
        console.log("solicitudes", response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

const filtrarSolicitudes = computed(() => {
    return solicitudesFiltradas.value.reverse().filter(solicitud => {
        const nombreCompleto = `${solicitud.nombre} ${solicitud.apellido}`.toLowerCase();
        const filterText = filter.value.toLowerCase();

        return (
            solicitud.nombre.toLowerCase().includes(filterText) ||
            solicitud.apellido.toLowerCase().includes(filterText) ||
            nombreCompleto.includes(filterText)
        );
    });
});


onMounted(() => {
    getSolicitud();
})
</script>

<template>
    <div>
        <div class="container">
            <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Información de Trabaja
                con Nosotros</h4>
            <form class="d-flex mb-3" role="search">
                <input class="form-control me-2" style="border: 1px solid #734a4a;" type="search" v-model="filter"
                    placeholder="Buscar por nombre" aria-label="Search">
                <button class="btn" type="button"
                    style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Buscar</button>
            </form>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                            <th scope="col" style="color: #734a4a;">Telefono</th>
                            <th scope="col" style="color: #734a4a;">Cargo</th>
                            <th scope="col" style="color: #734a4a;">Hoja de Vida</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="solicitud in filtrarSolicitudes" :key="solicitud._id">
                            <td style="color: #734a4a;">{{ solicitud.nombre }}</td>
                            <td style="color: #734a4a;">{{ solicitud.apellido }}</td>
                            <td style="color: #734a4a;">{{ solicitud.correo }}</td>
                            <td style="color: #734a4a;">{{ solicitud.telefono }}</td>
                            <td style="color: #734a4a;">{{ solicitud.cargo }}</td>
                            <td>
                                <a style="color: #734a4a; font-weight: bold;" :href="solicitud.hoja_vida.url"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "vision";
const estatus = ref("");
const validacion = ref("");
const visionSeleccionada = ref("");
const idVision = ref("");

export const useStoreVision = defineStore(
  modelo,
  () => {
    const visiones = ref([]);

    // Obtener todas las visiones
    const getAll = async () => {
      try {
        const response = await axios.get(`/${modelo}/all`);
        console.log(response);
        visiones.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todas las visiones:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener una visión por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        console.log(response);
        estatus.value = response.status;
        visionSeleccionada.value = response.data;
        return response.data;
      } catch (error) {
        console.error("Error al obtener la visión por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear o editar una visión (única)
    const agregarOEditarVision = async (data) => {
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        console.log("Visión:", response);
        estatus.value = response.status;
        idVision.value = response.data.vision?._id; // Asignamos el ID de la visión creada/actualizada
        return response.data;
      } catch (error) {
        console.error("Error al gestionar la visión:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar una visión por ID
    const activarVision = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/activar/${id}`);
        console.log("Activación de la visión:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar la visión:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Inactivar una visión por ID
    const inactivarVision = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/inactivar/${id}`);
        console.log("Inactivación de la visión:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar la visión:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    return {
      getAll,
      getById,
      agregarOEditarVision,
      activarVision,
      inactivarVision,
      visiones,
      estatus,
      validacion,
      visionSeleccionada,
      idVision,
    };
  },
  {
    persist: true,
  }
);

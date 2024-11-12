import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "mision";
const estatus = ref("");
const validacion = ref("");
const misionSeleccionada = ref("");
const idMision = ref("");

export const useStoreMision = defineStore(
  modelo,
  () => {
    const misiones = ref([]);

    // Obtener todas las misiones
    const getAll = async () => {
      try {
        const response = await axios.get(`/${modelo}/all`);
        console.log(response);
        misiones.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todas las misiones:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener una misión por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        console.log(response);
        estatus.value = response.status;
        misionSeleccionada.value = response.data;
        return response.data;
      } catch (error) {
        console.error("Error al obtener la misión por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear o editar una misión (única)
    const agregarOEditarMision = async (data) => {
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        console.log("Misión:", response);
        estatus.value = response.status;
        idMision.value = response.data.mision?._id; // Asignamos el ID de la misión creada/actualizada
        return response.data;
      } catch (error) {
        console.error("Error al gestionar la misión:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar una misión por ID
    const activarMision = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/activar/${id}`);
        console.log("Activación de la misión:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar la misión:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Inactivar una misión por ID
    const inactivarMision = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/inactivar/${id}`);
        console.log("Inactivación de la misión:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar la misión:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    return {
      getAll,
      getById,
      agregarOEditarMision,
      activarMision,
      inactivarMision,
      misiones,
      estatus,
      validacion,
      misionSeleccionada,
      idMision,
    };
  },
  {
    persist: true,
  }
);

import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "valores-corporativos";
const estatus = ref("");
const validacion = ref("");
const valorSeleccionado = ref("");
const idValor = ref("");

export const useStoreValoresCorporativos = defineStore(
  modelo,
  () => {
    const valores = ref([]);

    // Obtener todos los valores corporativos
    const getAll = async () => {
      try {
        const response = await axios.get(`/${modelo}/all`);
        console.log(response);
        valores.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todos los valores corporativos:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener un valor corporativo por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        console.log(response);
        estatus.value = response.status;
        valorSeleccionado.value = response.data;
        return response.data;
      } catch (error) {
        console.error("Error al obtener el valor corporativo por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear un nuevo valor corporativo
    const crearValor = async (data) => {
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        console.log("Valor Corporativo:", response);
        estatus.value = response.status;
        idValor.value = response.data.valor?._id; // Asignamos el ID del valor creado
        return response.data;
      } catch (error) {
        console.error("Error al crear el valor corporativo:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Editar un valor corporativo por ID
    const editarValor = async (id, data) => {
      try {
        const response = await axios.put(`/${modelo}/editar/${id}`, data);
        console.log("Actualización de valor corporativo:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al editar el valor corporativo:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar un valor corporativo por ID
    const activarValor = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/activar/${id}`);
        console.log("Activación del valor corporativo:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar el valor corporativo:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Inactivar un valor corporativo por ID
    const inactivarValor = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/inactivar/${id}`);
        console.log("Inactivación del valor corporativo:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar el valor corporativo:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    return {
      getAll,
      getById,
      crearValor,
      editarValor,
      activarValor,
      inactivarValor,
      valores,
      estatus,
      validacion,
      valorSeleccionado,
      idValor,
    };
  },
  {
    persist: true,
  }
);

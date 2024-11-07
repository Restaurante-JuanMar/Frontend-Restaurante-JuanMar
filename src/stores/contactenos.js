import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "contactenos";
const estatus = ref("");
const validacion = ref("");
const nuevaSolicitudId = ref("");
const solicitudSeleccionada = ref("");

export const useStoreContactar = defineStore(
  modelo,
  () => {
    const solicitudes = ref([]);

    // Obtener todas las solicitudes de contacto
    const getAll = async () => {
      try {
        const response = await axios.get(`/${modelo}/all`);
        console.log("Todas las solicitudes:", response);
        solicitudes.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todas las solicitudes:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener una solicitud de contacto por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        console.log("Solicitud por ID:", response);
        estatus.value = response.status;
        solicitudSeleccionada.value = response.data;
        return response.data;
      } catch (error) {
        console.error("Error al obtener la solicitud por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear una nueva solicitud de contacto
    const crearSolicitud = async (data) => {
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        console.log("Solicitud creada:", response);
        estatus.value = response.status;
        nuevaSolicitudId.value = response.data._id; // Guardamos el ID de la solicitud creada
        return response.data;
      } catch (error) {
        console.error("Error al crear la solicitud:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Editar una solicitud de contacto por ID
    const editarSolicitud = async (id, data) => {
      try {
        const response = await axios.put(`/${modelo}/editar/${id}`, data);
        console.log("Solicitud editada:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al editar la solicitud:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar una solicitud de contacto por ID
    const activarSolicitud = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/activar/${id}`);
        console.log("Activación de la solicitud:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar la solicitud:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Inactivar una solicitud de contacto por ID
    const inactivarSolicitud = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/inactivar/${id}`);
        console.log("Inactivación de la solicitud:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar la solicitud:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    return {
      getAll,
      getById,
      crearSolicitud,
      editarSolicitud,
      activarSolicitud,
      inactivarSolicitud,
      solicitudes,
      estatus,
      validacion,
      nuevaSolicitudId,
      solicitudSeleccionada,
    };
  },
  {
    persist: true,
  }
);

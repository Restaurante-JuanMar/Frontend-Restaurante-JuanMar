import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "trabaja-con-nosotros"; 
const estatus = ref("");
const validacion = ref("");
const idSolicitud = ref("");
const solicitudSeleccionada = ref("");
const editarSolicitudSelec = ref("");

export const useStoreTrabajaNosotros = defineStore(
  modelo,
  () => {
    const solicitudes = ref([]);

    // Obtener todas las solicitudes
    const getAll = async () => {
      try {
        const response = await axios.get(`/${modelo}/all`);
        console.log(response);
        solicitudes.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todas las solicitudes:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener una solicitud por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        console.log(response);
        estatus.value = response.status;
        solicitudSeleccionada.value = response.data;
        return response.data;
      } catch (error) {
        console.error("Error al obtener la solicitud por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear una nueva solicitud
    const crearSolicitud = async (data) => {
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        console.log("Solicitud:", response);
        estatus.value = response.status;
        idSolicitud.value = response.data._id; // Asignar el ID de la solicitud creada
        return response.data;
      } catch (error) {
        console.error("Error al crear la solicitud:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar una solicitud por ID
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

    // Inactivar una solicitud por ID
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

    // Subir archivo de hoja de vida
    const subirArchivo = async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "hoja_vida");

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dk0tssobk/raw/upload`,
          formData,
          config
        );

        console.log("Archivo subido:", response);
        const archivoUrl = response.data.secure_url; // URL segura del archivo subido
        return archivoUrl;
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        throw error;
      }
    };

    return {
      getAll,
      getById,
      crearSolicitud,
      activarSolicitud,
      inactivarSolicitud,
      subirArchivo,
      solicitudes,
      estatus,
      validacion,
      idSolicitud,
      solicitudSeleccionada,
      editarSolicitudSelec,
    };
  },
  {
    persist: true,
  }
);

import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "pqr";

export const useStorePqr = defineStore(
  modelo,
  () => {
    // Estados de la tienda
    const pqrs = ref([]);
    const estatus = ref("");
    const validacion = ref("");
    const pqrSeleccionada = ref("");
    const loading = ref(false);

    // Obtener todas las PQRs
    const getAll = async () => {
      loading.value = true;
      try {
        const response = await axios.get(`/${modelo}/all`);
        console.log("Solicitud:", response);
        pqrs.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todas las solicitudes:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener una PQR por ID
    const getById = async (id) => {
      loading.value = true;
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        console.log("Solicitud:", response);
        pqrSeleccionada.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener la solicitud por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear una nueva PQR
    const crearPqr = async (data) => {
      loading.value = true;
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        console.log("Solicitud:", response);
        estatus.value = response.status;
        pqrs.value.push(response.data); // Agregar la nueva PQR a la lista
        return response.data;
      } catch (error) {
        console.error("Error al crear la solicitud:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Editar una PQR existente
    const editarPqr = async (id, data) => {
      loading.value = true;
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

    // Activar una PQR por ID
    const activarPqr = async (id) => {
      loading.value = true;
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

    // Inactivar una PQR por ID
    const inactivarPqr = async (id) => {
      loading.value = true;
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

    const subirArchivo = async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "solicitud_pqr"); // Asegúrate que este preset permita archivos "raw"
  
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
  
          // Cambia el endpoint para permitir "raw" files como PDF
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dk0tssobk/raw/upload`,
            formData,
            config
          );
  
          console.log("Archivo subido:", response);
          const archivoUrl = response.data.secure_url; // URL segura del archivo PDF
          return archivoUrl;
        } catch (error) {
          console.error("Error al subir el archivo:", error);
          throw error; // Re-lanzar el error para manejarlo fuera
        }
      };

    return {
      pqrs,
      estatus,
      validacion,
      pqrSeleccionada,
      loading,
      getAll,
      getById,
      crearPqr,
      editarPqr,
      activarPqr,
      inactivarPqr,
      subirArchivo,
    };
  },
  {
    persist: true,
  }
);

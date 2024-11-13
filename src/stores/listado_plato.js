// stores/listado_platos.js
import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "listado-plato";
const estatus = ref("");
const validacion = ref("");
const listadoPlatoSeleccionado = ref(null);

export const useStoreListadoPlatos = defineStore(
  modelo,
  () => {
    const listadoPlatos = ref([]);

    // Obtener todos los documentos de ListadoPlatos
    const getAll = async () => {
      try {
        const response = await axios.get(`/${modelo}/all`);
        listadoPlatos.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todos los documentos de listado de platos:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener un documento de ListadoPlatos por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        listadoPlatoSeleccionado.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener el documento de listado de platos por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear un documento de ListadoPlatos asociado a una reserva por identificador
    const crearListadoPlato = async (data) => {
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al crear el documento de listado de platos:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Editar un documento de ListadoPlatos por ID
    const editarListadoPlato = async (id, data) => {
      try {
        const response = await axios.put(`/${modelo}/editar/${id}`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al editar el documento de listado de platos:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar un documento de ListadoPlatos por ID
    const activarListadoPlato = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/activar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar el documento de listado de platos:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Inactivar un documento de ListadoPlatos por ID
    const inactivarListadoPlato = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/inactivar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar el documento de listado de platos:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    const subirArchivo = async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "listado_plato"); // Asegúrate que este preset permita archivos "raw"
  
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
      getAll,
      getById,
      crearListadoPlato,
      editarListadoPlato,
      activarListadoPlato,
      inactivarListadoPlato,
      subirArchivo,
      listadoPlatos,
      estatus,
      validacion,
      listadoPlatoSeleccionado,
    };
  },
  {
    persist: true,
  }
);

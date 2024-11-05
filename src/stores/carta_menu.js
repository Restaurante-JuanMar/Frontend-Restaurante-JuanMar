import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "carta-menu"; // Cambiado a "carta" para que coincida con el endpoint
const estatus = ref("");
const validacion = ref("");
const nuevoArchivoCarta = ref("");
const idCarta = ref("");
const cartaSeleccionada = ref("");
const editarCartaSelec = ref("");

export const useStoreCarta = defineStore(
  modelo,
  () => {
    const cartas = ref([]);

    // Obtener todos los archivos de la carta
    const getAll = async () => {
      try {
        const response = await axios.get(`/${modelo}/all`);
        console.log(response);
        cartas.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error(
          "Error al obtener todos los archivos de la carta:",
          error
        );
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener un archivo de la carta por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        console.log(response);
        estatus.value = response.status;
        cartaSeleccionada.value = response.data;
        return response.data;
      } catch (error) {
        console.error("Error al obtener el archivo de la carta por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear un nuevo archivo de la carta
    const crearCarta = async (data) => {
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        console.log("Carta:", response);
        estatus.value = response.status;
        nuevoArchivoCarta.value = response.data.archivo?._id; // Asignamos el ID del archivo creado
        return response.data;
      } catch (error) {
        console.error("Error al crear el archivo de la carta:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        validacion.value = error.data.error
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar un archivo de la carta por ID
    const activarCarta = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/activar/${id}`);
        console.log("Activación del archivo de la carta:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar el archivo de la carta:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Inactivar un archivo de la carta por ID
    const inactivarCarta = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/inactivar/${id}`);
        console.log("Inactivación del archivo de la carta:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar el archivo de la carta:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    const subirArchivo = async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "carta_menu"); // Asegúrate que este preset permita archivos "raw"

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
      crearCarta,
      activarCarta,
      inactivarCarta,
      subirArchivo,
      cartas,
      estatus,
      validacion,
      nuevoArchivoCarta,
      idCarta,
      cartaSeleccionada,
      editarCartaSelec,
    };
  },
  {
    persist: true,
  }
);

import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "galeria"; // Modelo de referencia para la API
const estatus = ref("");
const validacion = ref("");
const nuevaGaleria = ref("");
const galeriaSeleccionada = ref("");

export const useStoreGaleria = defineStore(
  modelo,
  () => {
    const galerias = ref([]);

    // Obtener todas las imágenes de la galería
    const getAll = async () => {
      try {
        const response = await axios.get(`${modelo}/all`);
        console.log(response);
        galerias.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todas las imágenes de la galería:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener una imagen de la galería por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`${modelo}/${id}`);
        console.log(response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener la imagen de la galería por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    const getByPosition = async () => {
        try {
          const response = await axios.get(`${modelo}/posicion`);
          console.log(response);
          galerias.value = response.data;
          estatus.value = response.status;
          return response.data;
        } catch (error) {
          console.error("Error al obtener galeria por posición:", error);
          estatus.value = error.response.status;
        }
      };

      const getByFecha = async () => {
        try {
          const response = await axios.get(`${modelo}/fecha`);
          console.log(response);
          galerias.value = response.data;
          estatus.value = response.status;
          return response.data;
        } catch (error) {
          console.error("Error al obtener galeria por fecha:", error);
          estatus.value = error.response.status;
        }
      };

    // Crear o actualizar una imagen de la galería
    const crearOActualizarGaleria = async (data) => {
      try {
        const response = await axios.post(`${modelo}/registro`, data);
        console.log("Galería creada o actualizada:", response);
        estatus.value = response.status;
        nuevaGaleria.value = response.data.galeria?._id; // ID de la galería creada o actualizada
        return response.data;
      } catch (error) {
        console.error("Error al crear o actualizar la galería:", error);
        validacion.value = error.response?.data.error;
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar una imagen de la galería
    const activar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/activar/${id}`);
        console.log("Imagen de galería activada:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar la imagen de la galería:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Inactivar una imagen de la galería
    const inactivar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/inactivar/${id}`);
        console.log("Imagen de galería inactivada:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar la imagen de la galería:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    const subirFotosGaleria = async (id, file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "fotos_galeria");
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dk0tssobk/image/upload`,
            formData,
            config
          );
          console.log("img", response);
          const fotos = response.data.secure_url;
          return fotos;
        } catch (error) {
          console.error("Error al subir la foto:", error);
          throw error; // Re-lanzar el error para que se pueda manejar en el llamador
        }
      };

    return {
      getAll,
      getById,
      getByPosition, 
      getByFecha,
      crearOActualizarGaleria,
      activar,
      inactivar,
      subirFotosGaleria,
      galerias,
      estatus,
      validacion,
      nuevaGaleria,
      galeriaSeleccionada,
    };
  },
  {
    persist: true,
  }
);

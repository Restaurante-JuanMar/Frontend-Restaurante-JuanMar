import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "plato-especial";
const estatus = ref("");
const validacion = ref("");
const platoSeleccionado = ref("");
const idPlato = ref("");

export const useStorePlatosEspeciales = defineStore(
  modelo,
  () => {
    const platos = ref([]);

    // Obtener todos los platos especiales
    const getAll = async () => {
      try {
        const response = await axios.get(`/${modelo}/all`);
        platos.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todos los platos especiales:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener un plato especial por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        estatus.value = response.status;
        platoSeleccionado.value = response.data;
        return response.data;
      } catch (error) {
        console.error("Error al obtener el plato especial por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear un nuevo plato especial
    const crearPlato = async (data) => {
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        estatus.value = response.status;
        idPlato.value = response.data.plato?._id; // Guardar el ID del plato creado
        return response.data;
      } catch (error) {
        console.error("Error al crear el plato especial:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Editar un plato especial por ID
    const editarPlato = async (id, data) => {
      try {
        const response = await axios.put(`/${modelo}/editar/${id}`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al editar el plato especial:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar un plato especial por ID
    const activarPlato = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/activar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar el plato especial:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Inactivar un plato especial por ID
    const inactivarPlato = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/inactivar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar el plato especial:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    const subirGrupoFotos = async (id, file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "plato_especial");
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
      crearPlato,
      editarPlato,
      activarPlato,
      inactivarPlato,
      subirGrupoFotos,
      platos,
      estatus,
      validacion,
      platoSeleccionado,
      idPlato,
    };
  },
  {
    persist: true,
  }
);

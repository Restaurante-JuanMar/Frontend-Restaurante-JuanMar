import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "menu";
const estatus = ref("");
const validacion = ref("");
const nuevoMenu = ref("");
const idMenu = ref("");
const menuSeleccionado = ref("");
const editarMenuSelec = ref("");

export const useStoreMenu = defineStore(
  modelo,
  () => {
    const menus = ref([]);

    // Obtener todos los menús
    const getAll = async () => {
      try {
        const response = await axios.get(`${modelo}/all`);
        console.log(response);
        menus.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todos los menús:", error);
        estatus.value = error.response.status;
      }
    };

    // Obtener un menú por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`${modelo}/${id}`);
        console.log(response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener el menú por ID:", error);
        estatus.value = error.response.status;
      }
    };

    // Obtener menús por posición
    const getByPosition = async () => {
      try {
        const response = await axios.get(`${modelo}/posicion`);
        console.log(response);
        menus.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener menús por posición:", error);
        estatus.value = error.response.status;
      }
    };

    // Crear o actualizar un menú
    const crearOActualizarMenu = async (data) => {
      try {
        const response = await axios.post(`${modelo}/registro`, data);
        console.log("Nuevo menú o actualización:", response);
        estatus.value = response.status;
        nuevoMenu.value = response.data.menu?._id; // Asignamos el ID del menú creado o actualizado
        return response.data;
      } catch (error) {
        console.error("Error al crear o actualizar el menú:", error);
        validacion.value = error.response.data.error;
        estatus.value = error.response.status;
      }
    };

    // Activar un menú
    const activar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/activar/${id}`);
        console.log("Activación del menú:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar el menú:", error);
        estatus.value = error.response.status;
      }
    };

    // Inactivar un menú
    const inactivar = async (id) => {
      try {
        const response = await axios.put(`${modelo}/inactivar/${id}`);
        console.log("Inactivación del menú:", response);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar el menú:", error);
        estatus.value = error.response.status;
      }
    };

    const subirGrupoFotos = async (id, file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fotos_menu");
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
      crearOActualizarMenu,
      activar,
      inactivar,
      menus,
      estatus,
      validacion,
      nuevoMenu,
      idMenu,
      menuSeleccionado,
      editarMenuSelec,
      subirGrupoFotos,
    };
  },
  {
    persist: true,
  }
);

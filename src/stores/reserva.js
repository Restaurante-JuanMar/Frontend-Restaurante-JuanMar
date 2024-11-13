// tienda/reserva.js
import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

const modelo = "reserva";
const estatus = ref("");
const validacion = ref("");
const reservaSeleccionada = ref(null);
const idReserva = ref("");

export const useStoreReservas = defineStore(
  modelo,
  () => {
    const reservas = ref([]);

    // Obtener todas las reservas
    const getAll = async () => {
      try {
        const response = await axios.get(`/${modelo}/all`);
        reservas.value = response.data;
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al obtener todas las reservas:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Obtener una reserva por ID
    const getById = async (id) => {
      try {
        const response = await axios.get(`/${modelo}/${id}`);
        estatus.value = response.status;
        reservaSeleccionada.value = response.data;
        return response.data;
      } catch (error) {
        console.error("Error al obtener la reserva por ID:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Crear una nueva reserva
    const crearReserva = async (data) => {
      try {
        const response = await axios.post(`/${modelo}/registro`, data);
        estatus.value = response.status;
        idReserva.value = response.data.reserva?._id; // Guardar el ID de la reserva creada
        return response.data;
      } catch (error) {
        console.error("Error al crear la reserva:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Editar una reserva por ID
    const editarReserva = async (id, data) => {
      try {
        const response = await axios.put(`/${modelo}/editar/${id}`, data);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al editar la reserva:", error);
        validacion.value = error.response?.data?.error || "Error desconocido";
        estatus.value = error.response?.status || 500;
      }
    };

    // Aprobar una reserva por ID
    const aprobarReserva = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/aprobar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al aprobar la reserva:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Activar una reserva por ID
    const activarReserva = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/activar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al activar la reserva:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    // Inactivar una reserva por ID
    const inactivarReserva = async (id) => {
      try {
        const response = await axios.put(`/${modelo}/inactivar/${id}`);
        estatus.value = response.status;
        return response.data;
      } catch (error) {
        console.error("Error al inactivar la reserva:", error);
        estatus.value = error.response?.status || 500;
      }
    };

    return {
      getAll,
      getById,
      crearReserva,
      editarReserva,
      aprobarReserva,
      activarReserva,
      inactivarReserva,
      reservas,
      estatus,
      validacion,
      reservaSeleccionada,
      idReserva,
    };
  },
  {
    persist: true,
  }
);

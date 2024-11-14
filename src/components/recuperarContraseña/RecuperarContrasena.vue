<script setup>
import { ref } from "vue";
import { useStoreUsuarios } from "../../stores/usuario.js";
import { useRouter } from "vue-router";
import VerificarCodigo from "./validarCodigo.vue";
import logoJuanMar from '../../assets/juanmarlogo1.png';

const useUsuario = useStoreUsuarios();
const router = useRouter();
const loadingCorreo = ref(false);
const email = ref("");
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const componenteVerificar = ref(false);

function correoValido() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
}

function validarCorreo() {
  if (email.value.trim() === '' || !correoValido()) {
    notificacionValidacion.value = true;
    mensajeValidacion.value = 'Por favor ingrese un correo electrónico válido';
    setTimeout(() => {
      notificacionValidacion.value = false;
      mensajeValidacion.value = '';
    }, 3000);
    return false;
  }
  return true;
}

function validarCampo() {
  if (!validarCorreo()) {
    return;
  }
  enviarCodigo();
}

async function enviarCodigo() {
  loadingCorreo.value = true;
  try {
    const response = await useUsuario.codigoRecuperar(email.value);

    if (useUsuario.estatus === 400) {
      notificacionValidacion.value = true;
      mensajeValidacion.value = useUsuario.validacion;
      setTimeout(() => {
        notificacionValidacion.value = false;
        mensajeValidacion.value = '';
      }, 3000);
    } else if (useUsuario.estatus === 200) {
      useUsuario.correoRecuperar = email.value;
      componenteVerificar.value = true;
    } else {
      notificacionValidacion.value = true;
      mensajeValidacion.value = useUsuario.validacion;
      setTimeout(() => {
        notificacionValidacion.value = false;
        mensajeValidacion.value = '';
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingCorreo.value = false;
  }
}
</script>

<template>
  <div class="container-flui">
    <div style="width: 100%;">
      <div class="logo-container">
        <router-link to="/home">
          <img :src="logoJuanMar" width="275px"></img>
        </router-link>
      </div>
    </div>

    <section v-if="!componenteVerificar" class="main-section">
      <div class="card col-lg-4 text-center">
        <div class="card-body">
          <h2 class="card-title">Recuperar contraseña</h2>
          <p>Por favor, digite su correo para el proceso de recuperación de contraseña.</p>
          <form @submit.prevent="validarCampo">
            <div class="form-group">
              <input type="email" id="email" placeholder="Ej: correo@gmail.com" class="form-control" v-model="email" />
            </div>
            <div>
              <button value="Recuperar contraseña" type="submit" class="btn" :disabled="loadingCorreo">
                <span v-if="loadingCorreo" class="spinner-border spinner-border-sm" role="status"
                  aria-hidden="true"></span>
                <span v-if="!loadingCorreo">Recuperar contraseña</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <div v-if="notificacionVisible" class="custom-notify alert alert-success alert-dismissible fade show" role="alert">
      {{ mensajeNotificacion }}
    </div>
    <div v-if="notificacionValidacion" class="custom-notify alert alert-danger alert-dismissible fade show"
      role="alert">
      {{ mensajeValidacion }}
    </div>
    <div v-if="notificacionCargando" class="custom-notify alert alert-info alert-dismissible fade show" role="alert">
      {{ mensajeCargando }}
    </div>

    <VerificarCodigo v-if="componenteVerificar" />
  </div>
</template>

<style scoped>
/* General Styles */
.container-flui {
  background-color: #fe6f61;
  min-height: 100vh;
  padding: 0 20px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 15px;
}

.card {
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #734a4a;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-control:focus {
  border-color: #aaa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.btn {
  color: rgb(255, 255, 255);
  background-color: #734a4a;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  min-width: 30%;
}

.btn:hover {
  background-color: #533838;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.right-btn {
  color: white;
}

.custom-notify {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 300px;
  text-align: center;
  padding: 15px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

.custom-notify .close:hover {
  opacity: 1;
}

/* Responsivo */
@media screen and (max-width: 768px) {
  .container-fluid {
    padding: 0 10px;
  }

  .card-title {
    font-size: 22px;
  }

  .form-control {
    font-size: 14px;
  }

  .btn {
    font-size: 14px;
    padding: 8px 16px;
  }
}

@media screen and (max-width: 480px) {
  .container-fluid {
    padding: 0 5px;
  }

  .card-title {
    font-size: 20px;
  }

  .form-control {
    font-size: 14px;
    padding: 8px;
  }

  .btn {
    font-size: 14px;
    padding: 8px 16px;
  }
}

.main-section {
  display: flex;
  flex-direction: column;

  width: 100%;
  flex-grow: 1;
}
</style>

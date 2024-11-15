<script setup>
import { ref } from "vue";
import { useStoreUsuarios } from "../../stores/usuario.js";
import { useRouter } from 'vue-router';
import NuevaPassword from "./nuevaContraseña.vue";

const router = useRouter();
const codigo = ref("");
const useUsuario = useStoreUsuarios();
const email = useUsuario.email;
const validacion = ref("");
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');
const componenteNuevaPass = ref(false);
const loadVerificar = ref(false);


async function confirmarCodigo() {
  try {
    loadVerificar.value = true;
    const response = await useUsuario.confirmarCodigo(codigo.value);

    if (useUsuario.estatus === 200) {
      componenteNuevaPass.value = true;
    } else if (useUsuario.estatus == 400 || useUsuario.estatus === 404 || useUsuario.estatus === 500) {
      notificacionValidacion.value = true;
      mensajeValidacion.value = useUsuario.validacion;
      setTimeout(() => {
        notificacionValidacion.value = false;
        mensajeValidacion.value = '';
      }, 3000);
      return;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadVerificar.value = false;
  }
}

// Validaciones
function validarCampos() {
  if (codigo.value === null || codigo.value === "") {
    notificacionValidacion.value = true;
    mensajeValidacion.value = 'Por favor digite el código';
    setTimeout(() => {
      notificacionValidacion.value = false;
      mensajeValidacion.value = '';
    }, 3000);
    return;
  }
  confirmarCodigo();
}

function home() {
  router.push('/home')
}
</script>

<template>
  <div class="container-fluid">
    <section v-if="!componenteNuevaPass" style="display: flex; justify-content: center; align-items: center;">
      <div class="card col-lg-4 text-center">
        <div class="card-body">
          <h2 class="card-title">Verificar código</h2>
          <p class="card-text">Por favor, digite el código de verificación enviado a {{ email }}</p>
          <form @submit.prevent="validarCampos">
            <div class="form-group">
              <input type="number" id="codigo" placeholder="Digite el código..." class="form-control"
                v-model="codigo" />
            </div>
            <div>
              <button value="Enviar" type="submit" class="btn"
                :disabled="loadVerificar">
                <span v-if="loadVerificar" class="spinner-border spinner-border-sm" role="status"
                  aria-hidden="true"></span>
                <span v-if="!loadVerificar"> Enviar
                </span>
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

    <section v-if="componenteNuevaPass">
      <NuevaPassword />
    </section>
  </div>
</template>

<style scoped>
.card {
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
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
  .company-name {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  .company-name {
    font-size: 14px;
  }
}
</style>

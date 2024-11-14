<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStoreUsuarios } from "../../stores/usuario.js";

const router = useRouter();
const useUsuario = useStoreUsuarios();
const showOne = ref(true);
const showTwo = ref(false);
const notificacionCargando = ref(false);
const notificacionVisible = ref(false);
const notificacionValidacion = ref(false);
const mostrarNuevaPassword = ref(false);
const mostrarConfirmarCon = ref(false);
const mensajeCargando = ref('');
const mensajeValidacion = ref('');
const mensajeNotificacion = ref('');

// Enviar nueva contraseña
const data = ref({
  correo: useUsuario.email,
  codigo: useUsuario.codigoCorreo,
  password: ""
});
const checkPassword = ref("");
const loadNuevaPass = ref(false);


async function nuevaPassword() {
  try {
    loadNuevaPass.value = true;

    const response = await useUsuario.nuevaPassword(data.value);

    if (!response) return;

    if (useUsuario.estatus == 200) {
      showOne.value = false;
      showTwo.value = true;
    } else if (useUsuario.estatus === 400) {
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
    loadNuevaPass.value = false;
  }
}

// Validaciones
const vali = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

function cerrarNotificacion() {
  setTimeout(() => {
    notificacionValidacion.value = false;
    mensajeValidacion.value = '';
  }, 3000);
}


function validarCampos() {
  if (data.value.password.length < 8) {
    mensajeValidacion.value = 'La contraseña debe tener al menos 8 caracteres';
    notificacionValidacion.value = true;
    cerrarNotificacion();
    return false;
  }
  if (!/\d/.test(data.value.password)) {
    mensajeValidacion.value = 'La contraseña debe contener al menos un número';
    notificacionValidacion.value = true;
    cerrarNotificacion();
    return false;
  }
  if (!/[@#\/]/.test(data.value.password)) {
    mensajeValidacion.value = 'La contraseña debe contener al menos un carácter especial (@, #, /)';
    notificacionValidacion.value = true;
    return false;
  }
  if (!/[A-Z]/.test(data.value.password)) { // Verifica que haya al menos una letra mayúscula
    mensajeValidacion.value = 'La contraseña debe contener al menos una letra mayúscula';
    notificacionValidacion.value = true;
    cerrarNotificacion();
    return false;
  }
  if (!/[a-z]/.test(data.value.password)) { // Verifica que haya al menos una letra minúscula
    mensajeValidacion.value = 'La contraseña debe contener al menos una letra minúscula';
    notificacionValidacion.value = true;
    cerrarNotificacion();
    return false;
  }
  if (data.value.password !== checkPassword.value) {
    mensajeValidacion.value = 'Las contraseñas deben coincidir';
    notificacionValidacion.value = true;
    cerrarNotificacion();
    return false;
  }
  notificacionValidacion.value = false; // No hay errores
  cerrarNotificacion();
  nuevaPassword();
  return true;
}

const togglePasswordVisibility = (field) => {
  if (field === 'newPassword') {
    mostrarNuevaPassword.value = !mostrarNuevaPassword.value;
  } else if (field === 'confirmPassword') {
    mostrarConfirmarCon.value = !mostrarConfirmarCon.value;
  }
};


function home() {
  router.push('/home');
}
</script>

<template>
  <main>
    <section class="container" v-if="showOne">
      <form class="form" @submit.prevent="validarCampos">
        <div class="form-group">
          <label class="text-bold text-h6 mb-3 fw-bold" for="password">Por favor, ingrese la nueva contraseña</label>
          <div class="input-wrapper">
            <div class="input-group">
              <input :type="mostrarNuevaPassword ? 'text' : 'password'" id="password" class="form-control"
                v-model="data.password" placeholder="Nueva contraseña..." />
              <button class="btn-outline-secondary" id="btn" type="button"
                @click="togglePasswordVisibility('newPassword')">
                <i :class="mostrarNuevaPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>

          <label class="text-bold text-h6 mt-4 mb-2 fw-bold" for="confirm-password">Confirmar contraseña</label>
          <div class="input-wrapper">
            <div class="input-group mb-3">
              <input :type="mostrarConfirmarCon ? 'text' : 'password'" id="confirm-password" class="form-control"
                v-model="checkPassword" placeholder="Confirmar contraseña..." />
              <button class="btn-outline-secondary" id="btns" type="button"
                @click="togglePasswordVisibility('confirmPassword')">
                <i :class="mostrarConfirmarCon ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button value="Enviar" type="submit" class="btn" :disabled="loadNuevaPass">
              <span v-if="loadNuevaPass" class="spinner-border spinner-border-sm" role="status"
                aria-hidden="true"></span>
              <span v-if="!loadNuevaPass"> Cambiar contraseña
              </span>
            </button>
          </div>
        </div>
      </form>
    </section>

    <section v-if="showTwo" id="second">
      <article id="stext">
        <div id="stext11">
          <p id="smessage" style="color: #734a4a;">¡La contraseña ha sido cambiada exitosamente!</p>
          <div id="stext2">
            <p id="smessage2">Ahora puede ingresar al sistema</p>
            <div>
              <button type="submit" class="btn" @click="home">Ir al inicio</button>
            </div>
          </div>
        </div>
      </article>
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
  </main>
</template>


<style scoped>
.input-wrapper {
  position: relative;
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

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
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

#btn,
#btns {
  color: rgb(255, 255, 255);
  display: flex;
  background-color: #734a4a;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 5%;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn:hover {
  background-color: #533838;
}

#stext {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

#stext11 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 40%;
  padding: 25px;
  min-height: 40vh;
  gap: 20px;
}

#smessage {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

#smessage2 {
  font-size: 16px;
}

#stext2 {
  width: 100%;
  text-align: center;
}

/* Responsivo */
@media screen and (max-width: 768px) {
  .container {
    width: 90%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  #stext11 {
    width: 70%;
  }

  #smessage {
    font-size: 20px;
  }

  #smessage2 {
    font-size: 14px;
  }
}

@media screen and (max-width: 480px) {
  .container {
    width: 100%;
    box-shadow: none;
  }

  #stext11 {
    width: 90%;
    box-shadow: none;
  }

  #smessage {
    font-size: 18px;
  }

  #smessage2 {
    font-size: 12px;
  }
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LogoSinFondo from '../assets/logo_sin_fondo.png';
import { useStoreUsuarios } from '../stores/usuario.js';

const router = useRouter();
const useUsuario = useStoreUsuarios();
const cedula = ref('');
const contrasena = ref('');
const loading = ref(false);
const notificacionVisible = ref(false);
const validacion = ref('');

const login = async () => {
    loading.value = true;
    const data = {
        cedula: cedula.value,
        password: contrasena.value,
    };

    try {
        const response = await useUsuario.login(data);

        if (useUsuario.estatus === 200) {
            console.log(response);
            irInicioAdmin();

        } else if (useUsuario.estatus === 400 || useUsuario.estatus === 401) {
            notificacionVisible.value = true;
            validacion.value = 'Usuario o contraseña incorrectos';
            setTimeout(() => {
                notificacionVisible.value = false;
            }, 4000);
            return;
        }
    } catch (error) {
        console.log(error);
        notificacionVisible.value = true;
        validacion.value = 'Usuario o contraseña incorrectos';
        setTimeout(() => {
            notificacionVisible.value = false;
        }, 9000);
        return;
    } finally {
        loading.value = false;
    }
};
//Routes cliente

function irInicio() {
    router.push('/home')
}

function irNosotros() {
    router.push('/nosotros')
}

function irMenu() {
    router.push('/menu')
}

function irReserva() {
    router.push('/reserva')
}

function irGaleria() {
    router.push('/galeria')
}

function irRecorrido() {
    router.push('/recorrido')
}

function irTrabajaConNosotros() {
    router.push('/trabaja-con-nosotros')
}

function irContactenos() {
    router.push('/contactenos')
}


//Routes Panel-Admin

function irInicioAdmin() {
    router.push('/panel-admin')
}

function irMenuAdmin() {
    router.push('/menu-admin')
}

function irReservacionAdmin() {
    router.push('/reservacion-admin')
}

function irGaleriaAdmin() {
    router.push('/galeria-admin')
}

function irTrabajaConNosotrosAdmin() {
    router.push('trabaja-nosotros-admin')
}

function irContactenosAdmin() {
    router.push('/contactenos-admin')
}

function editarPerfil() {
    router.push('/editar-perfil-admin')
}

// Función para cerrar sesión
const logout = () => {
    useUsuario.token = ''; // Eliminar el token
    router.push('/home');   // Redirigir al usuario a la página de inicio de sesión
};

</script>

<template>
    <div class="app-container">
        <!-- Navegación superior -->
        <nav v-if="!useUsuario.token" class="navbar navbar-expand-lg" style="background-color: #fe6f61;">
            <div class="container-fluid" style="text-align: end;">
                <a class="navbar-brand" @click="irInicio()" style="cursor: pointer;">
                    <img :src="LogoSinFondo" alt="Restaurante JuanMar">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="nav justify-content-end me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                aria-current="page" @click="irInicio()">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irNosotros()">Nosotros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irMenu()">Menu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irReserva()">Reserva</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irGaleria()">Galeria</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irRecorrido()">Recorrido</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irTrabajaConNosotros()">Trabaja con Nosotros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irContactenos()">Contactenos</a>
                        </li>
                    </ul>
                    <form d-flex>
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#IngresarUser"
                            style="background-color: #734a4a; color: #fdfefe ; font-weight: bold;">
                            <i class="bi bi-box-arrow-right" style="margin-right: 5px;"></i>Ingresar
                        </button>
                        <!-- Modales para Ingresar y Recuperar Contraseña -->
                        <div class="modal fade" id="IngresarUser" data-bs-keyboard="false" tabindex="-1" role="dialog"
                            aria-labelledby="IngresoUser" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header" style="background-color: #fe6f61;">
                                        <h4 class="modal-title fs-5" id="IngresoUser"
                                            style="color: #fdfefe; font-weight: bold;">
                                            Iniciar Sesión como Administrador
                                        </h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" style="background-color: #facac5;">
                                        <form @submit.prevent="login">
                                            <div class="form-group mb-3">
                                                <label for="nombreUsuario"
                                                    class="form-label d-flex justify-content-start"
                                                    style="color: #734a4a; font-size: smaller; font-weight: bold;">Usuario:</label>
                                                <input type="number" class="form-control" id="nombreUsuario"
                                                    v-model="cedula" maxlength="20" required>
                                            </div>
                                            <div class="form-group mb-3">
                                                <label for="Contraseña" class="form-label d-flex justify-content-start"
                                                    style="color: #734a4a; font-size: smaller; font-weight: bold;">Contraseña:</label>
                                                <input type="password" class="form-control" id="Contraseña"
                                                    v-model="contrasena" maxlength="20" required>
                                            </div>
                                            <a data-bs-toggle="modal" data-bs-target="#RecuperarContraseña"
                                                style="font-size: small; color: #734a4a; font-weight: bold; text-decoration: none;"
                                                href="#">Recuperar
                                                Contraseña</a>
                                            <div class="modal-footer" style="background-color: #fe6f61;">
                                                <button type="submit" class="btn"
                                                    style="background-color: #734a4a; color: #fdfefe; font-weight: bold;">
                                                    Ingresar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="RecuperarContraseña" data-bs-backdrop="static"
                            data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="RecuperarContraseña"
                            aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header" style="background-color: #fe6f61;">
                                        <h4 class="modal-title fs-5" id="RecuperarContraseña"
                                            style="color: #fdfefe; font-weight: bold;">
                                            Recuperar Contraseña
                                        </h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" style="background-color: #facac5;">
                                        <form>
                                            <div class="form-group mb-3">
                                                <label for="NumeroDocumento"
                                                    class="form-label d-flex justify-content-start"
                                                    style="color: #734a4a; font-size: smaller; font-weight: bold;">Numero
                                                    de Documento:</label>
                                                <input type="number" class="form-control" id="NumeroDocumento" required>
                                            </div>
                                            <div class="form-group mb-3">
                                                <label for="Email" class="form-label d-flex justify-content-start"
                                                    style="color: #734a4a; font-size: smaller; font-weight: bold;">Correo
                                                    Electronico:</label>
                                                <input type="email" class="form-control" id="Email"
                                                    placeholder="email@gmail.com" required>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer" style="background-color: #fe6f61;">
                                        <button type="button" class="btn" data-bs-dismiss="modal"
                                            style="background-color: #734a4a; color: #fdfefe; font-weight: bold;">Enviar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </nav>

        <nav v-if="useUsuario.token" class="navbar navbar-expand-lg" style="background-color: #fe6f61;">
            <div class="container-fluid" style="text-align: end;">
                <a class="navbar-brand" @click="irInicioAdmin()" style="cursor: pointer;"><img :src="LogoSinFondo"
                        alt="Restaurante JuanMar"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                aria-current="page" @click="irInicioAdmin()">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irMenuAdmin()">Menu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irReservacionAdmin()">Reserva</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irGaleriaAdmin()">Galeria</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irTrabajaConNosotrosAdmin()">Trabaja con Nosotros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: #fdfefe; font-weight: bold; cursor: pointer;"
                                @click="irContactenosAdmin()">Contactenos</a>
                        </li>
                    </ul>
                    <!--icono user-->
                    <i style="color: #fdfefe ; font-size: 40px; margin-right: 20px; cursor: pointer;"
                        class="bi bi-person-circle" aria-controls="User" data-bs-toggle="offcanvas"
                        data-bs-target="#User"></i>
                </div>
            </div>
        </nav>

        <div v-if="useUsuario.token" class="offcanvas offcanvas-end" tabindex="-1" id="User"
            aria-labelledby="offcanvasExampleLabel" style="background-color: #facac5;">
            <section style="background-color: #fe6f61;">
                <div class="offcanvas-header">
                    <h4 class="offcanvas-title" id="offcanvasExampleLabel">Usuario</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
            </section>
            <section style="background-color: #facac5;">
                <div class="offcanvas-body">
                    <p><a style="color: #734a4a; font-weight: bold; text-align: left; text-decoration: none; cursor: pointer;"
                            @click="editarPerfil()" data-bs-dismiss="offcanvas">Editar Perfil</a></p>
                </div>
            </section>
            <section style="background-color: #fe6f61;">
                <div class="offcanvas-footer">
                    <button type="button" class="btn" style="color: #fdfefe; font-weight: bold;" @click="logout"
                        data-bs-dismiss="offcanvas" aria-label="Close"><i class="bi bi-box-arrow-right"></i> Cerrar
                        Seción</button>
                </div>
            </section>
        </div>

        <!-- Contenedor de contenido principal -->
        <main class="content">
            <router-view></router-view>
        </main>

        <div v-if="notificacionVisible" class="custom-notify alert alert-success alert-dismissible fade show"
            role="alert">
            {{ validacion }}
        </div>

        <!-- Footer fijo en la parte inferior de la pantalla -->
        <footer v-if="!useUsuario.token" class="footer text-center text-lg-start">
            <div class="container p-3">
                <div class="row">
                    <div class="col-lg-4 col-md-12 d-flex justify-content-center align-items-center mb-md-0">
                        <img :src="LogoSinFondo" alt="Restaurante JuanMar">
                    </div>
                    <div class="col-lg-4 col-md-12 text-center">
                        <h6 style="color: #fdfefe; font-weight: bold; margin: 5px;">Siganos en Nuestra Redes</h6>
                        <div
                            style="display: flex; justify-content: center; align-items: center; height: 100px; gap: 10px;">
                            <a href="https://www.facebook.com/JuanmarRestauranteSanGil" target="_blank"
                                style="color: #fdfefe; font-size: 30px;"><i class="bi bi-facebook"></i></a>
                            <a href="https://www.instagram.com/juanmarrestaurante" target="_blank"
                                style="color: #fdfefe; font-size: 30px;"><i class="bi bi-instagram"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 text-center">
                        <h6 style="color: #fdfefe; font-weight: bold; margin: 5px;">Contacto</h6>
                        <a href="https://wa.me/3022654186" target="_blank" class="whatsapp-button"
                            style="color: #fdfefe; font-size: 30px; text-decoration: none;">
                            <i class="bi bi-whatsapp"></i></a>
                        <a href="https://wa.me/3228008473" target="_blank" class="whatsapp-button"
                            style="color: #fdfefe; font-size: 30px; text-decoration: none;">
                            <i class="bi bi-whatsapp"></i></a>
                        <p style="color: #fdfefe; font-size: 30px;"><i class="bi bi-envelope-at-fill"></i></p>
                        <p style="color: #fdfefe; font-weight: bold;">juanmarrestaurantesocorro@gmail.com</p>
                    </div>
                </div>
                <div class="text-center">
                    <p style="color: #fdfefe; font-size: smaller; font-weight: bold;">© 2024 Restaurante JuanMar</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
/* Estructura para mantener el footer al fondo de la pantalla */
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content {
    flex: 1;
}

.footer {
    background-color: #fe6f61;
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
    background-color: #fa2424;
    color: white;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 16px;
}

.custom-notify .close:hover {
    opacity: 1;
}
</style>
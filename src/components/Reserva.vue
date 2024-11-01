<script setup>
import { ref } from 'vue';

const mostrar = ref(false);

function mostrarOcultar() {
    mostrar.value = !mostrar.value;
}

</script>

<template>
    <div>
        <!--Formulario de reserva-->
        <div class="container mt-5 d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <form class="rows needs-validation" novalidate id="formularioReserva">
                    <div class="col mb-3" style="text-align: center;">
                        <h4 style="font-weight: bold; color:#734a4a;">Solicitud de la Reserva</h4>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <p class="rounded-2"
                                style="font-weight: bold; color:#fdfefe; background-color: #fe6f61; border: 3px solid; border-color:#734a4a; ">
                                Aforo Máximo: 160 personas</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputfecha" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Fecha de la reserva</label>
                        <input type="date" class="form-control" id="exampleInputfecha" style="border-color: #734a4a"
                            required>
                        <div class="invalid-feedback">Digite la fecha de la reserva</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputNombre" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Nombres</label>
                        <input type="text" class="form-control" id="exampleInputNombre" style="border-color: #734a4a"
                            required>
                        <div class="invalid-feedback">Digite el nombre</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputApellidos" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Apellidos</label>
                        <input type="text" class="form-control" id="exampleInputApellidos" style="border-color: #734a4a"
                            required>
                        <div class="invalid-feedback">Digite los apellidos</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Correo electronico</label>
                        <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                            style="border-color: #734a4a" placeholder="email@gmail.com" required>
                        <div class="invalid-feedback">Digite el correo electronico</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputTelefono" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Telefono</label>
                        <input type="number" class="form-control" id="exampleInputTelefono"
                            style="border-color: #734a4a" placeholder="3178964263" required>
                        <div class="invalid-feedback">Digite el numero telefonico del celular</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputTelefono" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Telefono</label>
                        <input type="number" class="form-control" id="exampleInputTelefono"
                            style="border-color: #734a4a" placeholder="3178964263">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputNumPersonas" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Numero de personas</label>
                        <input type="number" class="form-control" id="exampleInputNumPersonas"
                            style="border-color: #734a4a" required>
                        <div class="invalid-feedback">Digite el numero de personas</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlDescripcion" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Descripción</label>
                        <textarea class="form-control" id="exampleFormControlDescripcion" rows="3"
                            style="border-color: #734a4a" required></textarea>
                        <div class="invalid-feedback">Digite una descripción</div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div>
                            <button type="submit" class="btn"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Enviar</button>
                        </div>
                        <div>
                            <button type="button" class="btn mb-5"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Cancelar</button>
                        </div>
                    </div>


                    <!--Cargar listado de platos-->
                    <div v-if="!mostrar" style="display: flex;flex-direction: column; justify-content: center;">
                        <p class="fw-bold text-uppercase text-center">¿Ya tienes una reserva confirmada?</p>
                        <div class="text-center">
                            <button type="button" class="btn mb-5"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                @click="mostrarOcultar()">Clic
                                aquí</button>
                        </div>
                    </div>
                    <div v-if="mostrar">
                        <div class="col mt-5 mb-3">
                            <h4 style="font-weight: bold; color:#734a4a;">Listado de Platos</h4>
                        </div>
                        <div class="mb-3">
                            <label for="NumeroTique" style="font-weight: bold; color: #734a4a;"
                                class="form-label">Numero de
                                Tique</label>
                            <input type="number" class="form-control" id="NumeroTique" placeholder="Digite el numero del tique" style="border-color: #734a4a"
                                required>
                        </div>
                        <div class="mb-3">
                            <label for="formFileLg" class="form-label"
                                style="color: #734a4a; font-weight: bold;">Archivo
                                del Listado</label>
                            <input class="form-control form-control-lg" id="formFileLg" type="file"
                                style="border-color: #734a4a; color: #734a4a; font-size: medium;" required>
                            <p style="color: #734a4a; font-weight: bold; font-size: small;">El archivo debe ser en pdf
                            </p>
                            <div class="invalid-feedback">Cargue el archivo</div>
                        </div>
                        <button type="submit" class="btn mb-5"
                            style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
        <!--Modal de advertencia-->
        <div class="modal fade" id="AdvertenciaReserva" tabindex="-1" aria-labelledby="advertenciaReservaLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #fe6f61;">
                        <h1 class="modal-title fs-5" style="color: #fdfefe;" id="advertenciaReservaLabel">Mensaje de la
                            Reserva</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style="background-color: #facac5; color: #734a4a;">
                        Nos estaremos contactándonos para determinar los detalles de la reserva, gracias por contar con
                        nuestro servicio
                    </div>
                    <div class="modal-footer" style="background-color: #fe6f61;">
                        <button type="submit" class="btn"
                            style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Aceptar</button>
                        <button type="button" class="btn"
                            style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                            data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
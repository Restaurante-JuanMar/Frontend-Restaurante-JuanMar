<script setup>
import { ref } from 'vue';
</script>

<template>
    <div>
        <div class="container d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <form class="rows needs-validation" novalidate id="formularioTrabaja_con_nosotros">
                    <div class="col mt-3 mb-5" style="text-align: center;">
                        <h4 style="font-weight: bold; color:#734a4a;">Trabaja con Nosotros</h4>
                    </div>
                    <div class="col mb-4" style="text-align: justify; color: #734a4a; font-weight: 50%;">
                        <p>En Juan Mar, valoramos la pasión por la gastronomía y el deseo de aprender. Si eres una
                            persona proactiva y responsable, te invitamos a unirte a nuestro equipo. Aquí encontrarás un
                            ambiente dinámico y colaborativo donde podrás desarrollar tus habilidades y crecer
                            profesionalmente en el apasionante mundo de la cocina marina. Lleva tu hoja de vida a
                            nuestro restaurante o completa el formulario en línea para comenzar tu viaje con nosotros.
                            ¡Esperamos conocerte pronto!.</p>
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
                        <div class="invalid-feedback">Digite apellidos</div>
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
                            style="border-color: #734a4a" required>
                        <div class="invalid-feedback">Digite el numero telefonico</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleDataList" class="form-label"
                            style="font-weight: bold; color: #734a4a;">Cargo</label>
                        <input class="form-control" style="border-color: #734a4a;" list="datalistOptions"
                            id="exampleDataList" placeholder="Seleccione el tipo de cargo" required>
                        <datalist id="datalistOptions" style="color: #734a4a;">
                            <option value="Administrador"></option>
                            <option value="Contabilidad"></option>
                            <option value="Jefe de mesas"></option>
                            <option value="Jefe de cocina"></option>
                            <option value="Mesero"></option>
                            <option value="Bar"></option>
                            <option value="Auxiliar de cocina"></option>
                            <option value="Steward"></option>
                        </datalist>
                        <div class="invalid-feedback">Seleccione un cargo</div>
                    </div>
                    <div class="mb-3">
                        <label for="formFileLg" class="form-label" style="color: #734a4a; font-weight: bold;">Hoja de
                            Vida</label>
                        <input class="form-control form-control-lg" id="formFileLg" type="file"
                            style="border-color: #734a4a; color: #734a4a; font-size: medium;" required>
                        <p style="color: #734a4a; font-size: small; font-weight: bold;">El archivo debe ser en pdf</p>
                        <div class="invalid-feedback">Cargue el archivo</div>
                    </div>

                    <div style="display: flex; gap: 10px;">
                        <div>
                            <button type="submit" class="btn mb-5"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Enviar</button>
                        </div>
                        <div>
                            <button type="button" class="btn mb-5"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
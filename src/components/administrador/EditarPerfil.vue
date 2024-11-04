<script setup>
import { ref } from 'vue';
</script>

<template>
    <div>
        <div class="container d-flex justify-content-center align-items-center">
        <div class="col-md-6">
            <div class="col mt-5 mb-3" style="text-align: center;">
                <h4 style="font-weight: bold; color:#734a4a;">Editar Usuario</h4>
            </div>
            <form class="rows" id="EditarUser">
                <div class="mb-3">
                    <label for="NombreUser" style="font-weight: bold; color: #734a4a;" class="form-label">Nombres</label>
                    <input type="text" class="form-control" id="NombreUser" style="border-color: #734a4a" required>
                </div>
                <div class="mb-3">
                    <label for="ApellidosUser" style="font-weight: bold; color: #734a4a;" class="form-label">Apellidos</label>
                    <input type="text" class="form-control" id="ApellidosUser" style="border-color: #734a4a" required>
                </div>
                <div class="mb-3">
                    <label for="EmailUser" style="font-weight: bold; color: #734a4a;" class="form-label">Correo electronico</label>
                    <input type="email" class="form-control" id="EmailUser" aria-describedby="emailHelp" style="border-color: #734a4a" placeholder="email@gmail.com" required>
                </div>
                <div class="mb-3">
                    <label for="TelefonoUser" style="font-weight: bold; color: #734a4a;" class="form-label">Telefono</label>
                    <input type="number" class="form-control" id="TelefonoUser" style="border-color: #734a4a" required>
                </div>
                <div class="col mt-5 mb-3">
                    <h4 style="font-weight: bold; color:#734a4a;">Actualizar Contraseña</h4>
                </div>
                <div class="mb-3">
                    <label for="ContraseñaActual" style="font-weight: bold; color: #734a4a;" class="form-label">Contraseña Actual</label>
                    <input type="password" class="form-control" id="ContraseñaActual" style="border-color: #734a4a" required>
                </div>
                <div class="mb-3">
                    <label for="NuevaContraseña" style="font-weight: bold; color: #734a4a;" class="form-label">Nueva Contraseña</label>
                    <input type="password" class="form-control" id="NuevaContraseña" style="border-color: #734a4a" required>
                </div>
                <div class="mb-3">
                    <label for="ConfirmaContraseña" style="font-weight: bold; color: #734a4a;" class="form-label">Confirma Contraseña</label>
                    <input type="password" class="form-control" id="ConfirmaContraseña" style="border-color: #734a4a" required>
                </div>
                <button type="submit" class="btn mb-5" style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Actualizar</button>
                <button type="submit" class="btn mb-5" style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Cancelar</button>
            </form>
        </div>
    </div>
    </div>
</template>

<style scoped>

</style>
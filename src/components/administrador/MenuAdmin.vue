<script setup>
import { ref } from 'vue';

</script>

<template>
    <div>
        <div class="container d-flex justify-content-center">
            <div class="col-md-6">
                <div class="col mb-5 mt-5">
                    <h4 style="color: #734a4a; font-weight:bold; text-align:center">Actualizar la Carta del Menú</h4>
                </div>
                <form action="" class="row" method="post">
                    <div class="mb-3">
                        <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                            class="form-label">Posición</label>
                        <select class="form-select" style="border-color:#734a4a; color:#734a4a; font-weight:bold"
                            aria-label="Default select example">
                            <option selected></option>
                            <option value="1">Hoja Carta 1</option>
                            <option value="2">Hoja Carta 2</option>
                            <option value="3">Hoja Carta 3</option>
                            <option value="4">Hoja Carta 4</option>
                            <option value="6">Hoja Carta 5</option>
                            <option value="7">Hoja Carta 6</option>
                        </select>
                        <span id="NotaImg" style="font-weight: bold; color:#734a4a; font-size:small">No se carga la
                            portada ni la ultima hoja</span>
                    </div>
                    <div class="mb-3">
                        <label for="ImagenMenu" class="form-label"
                            style="border: #734a4a; color:#734a4a; font-weight:bold">Cargue la Imagen</label>
                        <input class="form-control" type="file" id="ImagenMenu"
                            style="border: 1px solid #734a4a; color:#734a4a;" aria-describedby="NotaExtensionImg">
                        <span id="NotaExtensionImg" style="font-weight: bold; color:#734a4a; font-size:small">El archivo
                            debe ser en jpg</span>
                    </div>
                    <div class="mt-2 mb-3">
                        <button type="submit" class="btn"
                            style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Actualizar</button>
                    </div>
                </form>
                <div class="col mb-3 mt-3">
                    <h4 style="color: #734a4a; font-weight:bold;">Actualizar el Archivo de la Carta del Menú</h4>
                </div>
                <div class="mb-3">
                    <label for="ImagenMenu" class="form-label"
                        style="border: #734a4a; color:#734a4a; font-weight:bold">Cargue el Archivo</label>
                    <input class="form-control" type="file" id="ImagenMenu"
                        style="border: 1px solid #734a4a; color:#734a4a;" aria-describedby="NotaExtensionFile">
                    <span id="NotaExtensionFile" style="font-weight: bold; color:#734a4a; font-size:small">El archivo
                        debe ser en pdf</span>
                </div>
                <div class="mt-2 mb-3">
                    <button type="submit" class="btn"
                        style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
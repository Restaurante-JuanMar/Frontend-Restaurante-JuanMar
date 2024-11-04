<script setup>
import { ref } from 'vue';
import Evento from "../../assets/evento1.jpeg"

</script>

<template>
    <div>
        <div class="container d-flex justify-content-center">
            <div class="col-md-6">
                <div class="col mb-5 mt-5">
                    <h4 style="color: #734a4a; font-weight:bold; text-align:center">Actualizar la Galeria de Eventos
                        Especiales</h4>
                </div>
                <form action="" class="row" method="post">
                    <div class="mb-3">
                        <label for="Tipoevento" style="font-weight: bold; color:#734a4a" class="form-label">Tipo de
                            Evento</label>
                        <input type="text" class="form-control" id="TipoEvento"
                            style="border-color:#734a4a; color:#734a4a" value="Evento especial">
                    </div>
                    <div class="mb-3">
                        <label for="Tipoevento" style="font-weight: bold; color:#734a4a"
                            class="form-label">Posición</label>
                        <select class="form-select" style="border-color:#734a4a; color:#734a4a; font-weight:bold"
                            aria-label="Default select example">
                            <option selected></option>
                            <option value="1">Posición 1</option>
                            <option value="2">Posición 2</option>
                            <option value="3">Posición 3</option>
                            <option value="4">Posición 4</option>
                            <option value="5">Posición 5</option>
                            <option value="6">Posición 6</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="Descripcion" style="font-weight: bold; color:#734a4a"
                            class="form-label">Descripción</label>
                        <input type="text" class="form-control" id="Descripcion"
                            style="border-color:#734a4a; color:#734a4a">
                    </div>
                    <div class="mb-3">
                        <label for="FechaEvento" style="font-weight: bold; color:#734a4a" class="form-label">Fecha del
                            Evento</label>
                        <input type="date" class="form-control" id="FechaEvento"
                            style="border-color:#734a4a; color:#734a4a">
                    </div>
                    <div class="mb-3">
                        <label for="ImagenMenu" class="form-label"
                            style="border: #734a4a; color:#734a4a; font-weight:bold">Cargue la Imagen</label>
                        <input class="form-control" type="file" id="ImagenMenu"
                            style="border: 1px solid #734a4a; color:#734a4a;">
                    </div>
                    <div class="mt-2 mb-3">
                        <button type="submit" class="btn"
                            style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Actualizar</button>
                    </div>
                </form>
                <form class="d-flex mt-5 mb-3" role="search">
                    <input class="form-control me-2" style="border: 1px solid #734a4a;" type="search"
                        placeholder="Buscar por fecha (dd/mm/aaaa)" aria-label="Search">
                    <button class="btn" type="submit"
                        style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Buscar</button>
                </form>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">#</th>
                            <th scope="col" style="color: #734a4a;">Posición</th>
                            <th scope="col" style="color: #734a4a;">Descripción</th>
                            <th scope="col" style="color: #734a4a;">Fecha</th>
                            <th scope="col" style="color: #734a4a;">Imagen</th>
                            <th scope="col" style="color: #734a4a;">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" style="color: #734a4a;">1</th>
                            <td style="color: #734a4a;">1</td>
                            <td style="color: #734a4a;">Celebración de cumpleaños</td>
                            <td style="color: #734a4a;">28/10/2024</td>
                            <td>
                                <img :src="Evento" width="50%" height="50%" alt="Evento especial">
                            </td>
                            <td>
                                <button type="submit" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-pencil-square"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">2</th>
                            <td style="color: #734a4a;">4</td>
                            <td style="color: #734a4a;">Celebración de cumpleaños</td>
                            <td style="color: #734a4a;">28/10/2024</td>
                            <td>
                                <img :src="Evento" width="50%" height="50%" alt="Evento especial">
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-pencil-square"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">3</th>
                            <td style="color: #734a4a;">7</td>
                            <td style="color: #734a4a;">Celebración de cumpleaños</td>
                            <td style="color: #734a4a;">28/10/2024</td>
                            <td>
                                <img :src="Evento" width="50%" height="50%" alt="Evento especial">
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-pencil-square"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
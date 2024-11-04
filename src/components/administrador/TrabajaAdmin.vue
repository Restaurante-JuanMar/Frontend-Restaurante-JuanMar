<script setup>
import { ref } from 'vue';
</script>

<template>
    <div>
        <div class="container">
            <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Información de Trabaja
                con Nosotros</h4>
            <form class="d-flex mb-3" role="search">
                <input class="form-control me-2" style="border: 1px solid #734a4a;" type="search"
                    placeholder="Buscar por nombre" aria-label="Search">
                <button class="btn" type="submit"
                    style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Buscar</button>
            </form>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">#</th>
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                            <th scope="col" style="color: #734a4a;">Telefono</th>
                            <th scope="col" style="color: #734a4a;">Cargo</th>
                            <th scope="col" style="color: #734a4a;">Hoja de Vida</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" style="color: #734a4a;">1</th>
                            <td style="color: #734a4a;">Andres David</td>
                            <td style="color: #734a4a;">Salgado Cala</td>
                            <td style="color: #734a4a;">andres@gmail.com</td>
                            <td style="color: #734a4a;">3128794564</td>
                            <td style="color: #734a4a;">Administrador</td>
                            <td>
                                <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">2</th>
                            <td style="color: #734a4a;">Brayan</td>
                            <td style="color: #734a4a;">Rodriguez Jaimes</td>
                            <td style="color: #734a4a;">brayanrj@gmail.com</td>
                            <td style="color: #734a4a;">3018792560</td>
                            <td style="color: #734a4a;">Mesero</td>
                            <td>
                                <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">3</th>
                            <td style="color: #734a4a;">Johanna Maritza</td>
                            <td style="color: #734a4a;">Arias Sanchez</td>
                            <td style="color: #734a4a;">johanaarias@gmail.com</td>
                            <td style="color: #734a4a;">3164107896</td>
                            <td style="color: #734a4a;">Chef</td>
                            <td>
                                <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
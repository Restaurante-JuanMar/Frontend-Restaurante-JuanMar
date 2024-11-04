<script setup>
import { ref } from 'vue';


</script>

<template>
    <div>
        <div class="container">
            <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Información de Reservas
            </h4>
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
                            <th scope="col" style="color: #734a4a;">Fecha</th>
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                            <th scope="col" style="color: #734a4a;">Telefono</th>
                            <th scope="col" style="color: #734a4a;">Numero de Personas</th>
                            <th scope="col" style="color: #734a4a;">Descripción</th>
                            <th scope="col" style="color: #734a4a;">Aceptar</th>
                            <th scope="col" style="color: #734a4a;">Rechazar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" style="color: #734a4a;">1</th>
                            <td style="color: #734a4a;">08/12/2024</td>
                            <td style="color: #734a4a;">Andres David</td>
                            <td style="color: #734a4a;">Salgado Cala</td>
                            <td style="color: #734a4a;">andres@gmail.com</td>
                            <td style="color: #734a4a;">3128794564</td>
                            <td style="color: #734a4a;">50</td>
                            <td style="color: #734a4a;">Celebración de cumpleaños de una compañera de trabajo, se
                                requiere decoración</td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-check-circle-fill"></i></button>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">2</th>
                            <td style="color: #734a4a;">11/11/2024</td>
                            <td style="color: #734a4a;">Brayan</td>
                            <td style="color: #734a4a;">Rodriguez Jaimes</td>
                            <td style="color: #734a4a;">brayanrj@gmail.com</td>
                            <td style="color: #734a4a;">3018792560</td>
                            <td style="color: #734a4a;">20</td>
                            <td style="color: #734a4a;">Despedida de compañero de trabajo</td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-check-circle-fill"></i></button>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">3</th>
                            <td style="color: #734a4a;">21/12/2024</td>
                            <td style="color: #734a4a;">Johanna Maritza</td>
                            <td style="color: #734a4a;">Arias Sanchez</td>
                            <td style="color: #734a4a;">johanaarias@gmail.com</td>
                            <td style="color: #734a4a;">3164107896</td>
                            <td style="color: #734a4a;">150</td>
                            <td style="color: #734a4a;">Matrimonio mas decoración</td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-check-circle-fill"></i></button>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--Reservas aceptadas-->
                <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Reservas
                    Confirmadas</h4>
                <form class="d-flex mb-3" role="search">
                    <input class="form-control me-2" style="border: 1px solid #734a4a;" type="search"
                        placeholder="Buscar por nombre" aria-label="Search">
                    <button class="btn" type="submit"
                        style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Buscar</button>
                </form>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">#</th>
                            <th scope="col" style="color: #734a4a;">Fecha</th>
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                            <th scope="col" style="color: #734a4a;">Telefono</th>
                            <th scope="col" style="color: #734a4a;">Numero de Personas</th>
                            <th scope="col" style="color: #734a4a;">Descripción</th>
                            <th scope="col" style="color: #734a4a;">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" style="color: #734a4a;">1</th>
                            <td style="color: #734a4a;">08/12/2024</td>
                            <td style="color: #734a4a;">Andres David</td>
                            <td style="color: #734a4a;">Salgado Cala</td>
                            <td style="color: #734a4a;">andres@gmail.com</td>
                            <td style="color: #734a4a;">3128794564</td>
                            <td style="color: #734a4a;">50</td>
                            <td style="color: #734a4a;">Celebración de cumpleaños de una compañera de trabajo, se
                                requiere decoración</td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">2</th>
                            <td style="color: #734a4a;">11/11/2024</td>
                            <td style="color: #734a4a;">Brayan</td>
                            <td style="color: #734a4a;">Rodriguez Jaimes</td>
                            <td style="color: #734a4a;">brayanrj@gmail.com</td>
                            <td style="color: #734a4a;">3018792560</td>
                            <td style="color: #734a4a;">20</td>
                            <td style="color: #734a4a;">Despedida de compañero de trabajo</td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">3</th>
                            <td style="color: #734a4a;">21/12/2024</td>
                            <td style="color: #734a4a;">Johanna Maritza</td>
                            <td style="color: #734a4a;">Arias Sanchez</td>
                            <td style="color: #734a4a;">johanaarias@gmail.com</td>
                            <td style="color: #734a4a;">3164107896</td>
                            <td style="color: #734a4a;">150</td>
                            <td style="color: #734a4a;">Matrimonio mas decoración</td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--Listado de Platos-->
                <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Listado de Platos
                </h4>
                <form class="d-flex mb-3" role="search">
                    <input class="form-control me-2" style="border: 1px solid #734a4a;" type="search"
                        placeholder="Buscar por nombre" aria-label="Search">
                    <button class="btn" type="submit"
                        style="background-color: #734a4a; color:#fdfefe; font-weight:bold">Buscar</button>
                </form>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr style="text-align: center;">
                            <th scope="col" style="color: #734a4a;">#</th>
                            <th scope="col" style="color: #734a4a;">Numero de Tique</th>
                            <th scope="col" style="color: #734a4a;">Nombre</th>
                            <th scope="col" style="color: #734a4a;">Apellidos</th>
                            <th scope="col" style="color: #734a4a;">Archivo</th>
                            <th scope="col" style="color: #734a4a;">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" style="color: #734a4a;">1</th>
                            <td style="color: #734a4a;">20241030220</td>
                            <td style="color: #734a4a;">Andres David</td>
                            <td style="color: #734a4a;">Salgado Cala</td>
                            <td>
                                <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">2</th>
                            <td style="color: #734a4a;">20241111321</td>
                            <td style="color: #734a4a;">Brayan</td>
                            <td style="color: #734a4a;">Rodriguez Jaimes</td>
                            <td>
                                <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style="color: #734a4a;">3</th>
                            <td style="color: #734a4a;">20241221560</td>
                            <td style="color: #734a4a;">Johanna Maritza</td>
                            <td style="color: #734a4a;">Arias Sanchez</td>
                            <td>
                                <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf"
                                    target="_blank" download="CARTA_Juanmar_2024.pdf">
                                    Archivo.pdf
                                </a>
                            </td>
                            <td>
                                <button type="button" id="aceptar" class="btn"
                                    style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i
                                        class="bi bi-x-circle-fill"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
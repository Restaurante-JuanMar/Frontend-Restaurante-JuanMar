<script setup>
import { ref } from 'vue';
</script>

<template>
    <div>
        <div class="container">
        <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Información de Contactenos</h4>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr style="text-align: center;">
                        <th scope="col" style="color: #734a4a;">#</th>
                        <th scope="col" style="color: #734a4a;">Nombre</th>
                        <th scope="col" style="color: #734a4a;">Apellidos</th>
                        <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                        <th scope="col" style="color: #734a4a;">Telefono</th>
                        <th scope="col" style="color: #734a4a;">Comentario</th>
                        <th scope="col" style="color: #734a4a;">Imprimir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" style="color: #734a4a;">1</th>
                        <td style="color: #734a4a;">Andres David</td>
                        <td style="color: #734a4a;">Salgado Cala</td>
                        <td style="color: #734a4a;">andres@gmail.com</td>
                        <td style="color: #734a4a;">3128794564</td>
                        <td style="color: #734a4a;">Para realizar una reserva para un matrimonio que debo hacer</td>
                        <td>
                            <button type="button" id="imprimir" class="btn" style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i class="bi bi-printer-fill"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" style="color: #734a4a;">2</th>
                        <td style="color: #734a4a;">Brayan</td>
                        <td style="color: #734a4a;">Rodriguez Jaimes</td>
                        <td style="color: #734a4a;">brayanrj@gmail.com</td>
                        <td style="color: #734a4a;">3018792560</td>
                        <td style="color: #734a4a;">Necesito la carta del menu en medio digital</td>
                        <td>
                            <button type="button" id="imprimir" class="btn" style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i class="bi bi-printer-fill"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" style="color: #734a4a;">3</th>
                        <td style="color: #734a4a;">Johanna Maritza</td>
                        <td style="color: #734a4a;">Arias Sanchez</td>
                        <td style="color: #734a4a;">johanaarias@gmail.com</td>
                        <td style="color: #734a4a;">3164107896</td>
                        <td style="color: #734a4a;">Necsito realizar una reserva apara un cumpleaños</td>
                        <td>
                            <button type="button" id="imprimir" class="btn" style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"><i class="bi bi-printer-fill"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h4 style="color: #734a4a; font-weight: bold; text-align: center;" class="mt-5 mb-3">Información de PQR</h4>
            <table class="table table-striped table-hover">
                <thead>
                    <tr style="text-align: center;">
                        <th scope="col" style="color: #734a4a;">#</th>
                        <th scope="col" style="color: #734a4a;">Nombre</th>
                        <th scope="col" style="color: #734a4a;">Apellidos</th>
                        <th scope="col" style="color: #734a4a;">Tipo de Documento</th>
                        <th scope="col" style="color: #734a4a;">Numero de Documento</th>
                        <th scope="col" style="color: #734a4a;">Correo Electronico</th>
                        <th scope="col" style="color: #734a4a;">Telefono</th>
                        <th scope="col" style="color: #734a4a;">Tipo PQR</th>
                        <th scope="col" style="color: #734a4a;">Asunto</th>
                        <th scope="col" style="color: #734a4a;">Comentario</th>
                        <th scope="col" style="color: #734a4a;">Archivo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" style="color: #734a4a;">1</th>
                        <td style="color: #734a4a;">Andres David</td>
                        <td style="color: #734a4a;">Salgado Cala</td>
                        <td style="color: #734a4a;">Cédula de Ciudadanía</td>
                        <td style="color: #734a4a;">1100789456</td>
                        <td style="color: #734a4a;">andres@gmail.com</td>
                        <td style="color: #734a4a;">3128794564</td>
                        <td style="color: #734a4a;">Felicitaciones</td>
                        <td style="color: #734a4a;">Felicitaciones</td>
                        <td style="color: #734a4a;">Escelente el servicio y la presentación de la comida</td>
                        <td style="color: #734a4a;">
                            <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf" target="_blank" download="CARTA_Juanmar_2024.pdf">
                                Archivo.pdf
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" style="color: #734a4a;">2</th>
                        <td style="color: #734a4a;">Brayan</td>
                        <td style="color: #734a4a;">Rodriguez Jaimes</td>
                        <td style="color: #734a4a;">Cédula de Ciudadanía</td>
                        <td style="color: #734a4a;">1110321765</td>
                        <td style="color: #734a4a;">brayanrj@gmail.com</td>
                        <td style="color: #734a4a;">3018792560</td>
                        <td style="color: #734a4a;">Queja</td>
                        <td style="color: #734a4a;">Prestación del servicio</td>
                        <td style="color: #734a4a;">El personal que atiende y los meseros no tiene una buena actitud</td>
                        <td style="color: #734a4a;">
                            <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf" target="_blank" download="CARTA_Juanmar_2024.pdf">
                                Archivo.pdf
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" style="color: #734a4a;">3</th>
                        <td style="color: #734a4a;">Johanna Maritza</td>
                        <td style="color: #734a4a;">Arias Sanchez</td>
                        <td style="color: #734a4a;">Cédula de Ciudadanía</td>
                        <td style="color: #734a4a;">1010145789</td>
                        <td style="color: #734a4a;">johanaarias@gmail.com</td>
                        <td style="color: #734a4a;">3164107896</td>
                        <td style="color: #734a4a;">Petición</td>
                        <td style="color: #734a4a;">Carta del menu</td>
                        <td style="color: #734a4a;"></td>
                        <td style="color: #734a4a;">
                            <a style="color: #734a4a; font-weight: bold;" href="Carta_menu/CARTA_Juanmar_2024.pdf" target="_blank" download="CARTA_Juanmar_2024.pdf">
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

<style scoped>

</style>
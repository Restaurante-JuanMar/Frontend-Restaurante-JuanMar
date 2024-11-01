<script setup>
import { ref } from 'vue';
</script>

<template>
    <div>
        <div class="container d-flex justify-content-center align-items-center">
            <div class="col-md-6">
                <div class="col mt-3 mb-5" style="text-align: center;">
                    <h4 style="font-weight: bold; color:#734a4a;">Contáctenos</h4>
                </div>
                <div class="col mb-4" style="text-align: justify;">
                    <p style="color: #734a4a; font-weight: 50%;">En Juan Mar, valoramos profundamente la opinión de
                        nuestros clientes. Tu experiencia es fundamental para nosotros y nos ayuda a mejorar
                        continuamente. Te invitamos a compartir tus comentarios, sugerencias o cualquier aspecto que
                        hayas disfrutado durante tu visita. Ya sea que
                        hayas saboreado nuestros deliciosos platillos de mar, disfrutado de un ambiente acogedor o
                        recibido un servicio excepcional, queremos saberlo. Cada comentario cuenta y nos motiva a seguir
                        brindándote lo mejor. ¡Gracias por ser parte de nuestra familia! Si necesitas ajustes o un
                        enfoque
                        diferente, no dudes en decírmelo.</p>
                </div>
                <form class="rows needs-validation" novalidate id="formularioContactenos">
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
                            style="border-color: #734a4a" required>
                        <div class="invalid-feedback">Digite el numero telefonico</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlDescripcion" style="font-weight: bold; color: #734a4a;"
                            class="form-label">Comentario</label>
                        <textarea class="form-control" id="exampleFormControlDescripcion" rows="3"
                            style="border-color: #734a4a" required></textarea>
                        <div class="invalid-feedback">Realice un comentario</div>
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
                <div class="col mt-3 mb-3" style="text-align: center;">
                    <h4 style="font-weight: bold; color:#734a4a;">PQR</h4>
                </div>
                <div class="col mb-4" style="text-align: justify;">
                    <p style="color: #734a4a; font-weight: 50%;">En esta sección encuentra nuestro formulario
                        electrónico para enviar tus Peticiones, Quejas, Reclamos, Solicitudes y/o Felicitaciones;
                        presiona el botón «Formulario» e ingresa la información para que podamos brindarte una pronta y
                        efectiva respuesta. Tu opinión es valiosa para nosotros y nos ayudará a mejorar continuamente
                        nuestros servicios.</p>
                </div>
                <form action="" class="needs-validation mb-3" novalidate>
                    <div class="col mt-5">
                        <p>
                            <button class="btn" type="button" data-bs-toggle="collapse"
                                data-bs-target="#TableOfertaLaboral"
                                style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;"
                                aria-expanded="false" aria-controls="TableOfertaLaboral">
                                Formulario
                            </button>
                        </p>
                        <div style="min-height: 120px;">
                            <div class="collapse collapse-horizontal" id="TableOfertaLaboral">
                                <div class="card card-body"
                                    style="background-color: #fcf0ef; border: 1px solid #734a4a;">
                                    <div class="mb-3">
                                        <label for="exampleInputNombre" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Nombres</label>
                                        <input type="text" class="form-control" id="exampleInputNombre"
                                            style="border-color: #734a4a" required>
                                        <div class="invalid-feedback">Digite el nombre</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputApellidos" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Apellidos</label>
                                        <input type="text" class="form-control" id="exampleInputApellidos"
                                            style="border-color: #734a4a" required>
                                        <div class="invalid-feedback">Digite los apellidos</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="TipoDocumento" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Tipo de documento</label>
                                        <input class="form-control" style="border-color: #734a4a;"
                                            list="datalistOptions" id="TipoDocumento" required>
                                        <datalist id="datalistOptions">
                                            <option value="Cédula de Ciudadanía"></option>
                                            <option value="Cédula de Extrajenría"></option>
                                            <option value="Pasaporte"></option>
                                        </datalist>
                                        <div class="invalid-feedback">Seleccione un tipo de documento</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Numero de documento</label>
                                        <input type="number" class="form-control" id="exampleInputEmail"
                                            aria-describedby="emailHelp" style="border-color: #734a4a" required>
                                        <div class="invalid-feedback">Digite el numero del documento</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Correo electronico</label>
                                        <input type="email" class="form-control" id="exampleInputEmail"
                                            aria-describedby="emailHelp" style="border-color: #734a4a"
                                            placeholder="email@gmail.com" required>
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
                                        <label for="Tipopqr" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Tipo PQR</label>
                                        <input class="form-control" style="border-color: #734a4a;" list="datalistpqr"
                                            id="Tipopqr" required>
                                        <datalist id="datalistpqr">
                                            <option value="Petición"></option>
                                            <option value="Queja"></option>
                                            <option value="Reclamo"></option>
                                            <option value="Solicitud"></option>
                                            <option value="Felicitaciones"></option>
                                        </datalist>
                                        <div class="invalid-feedback">Seleccione el tipo de PQR</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="Asunto" style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Asunto</label>
                                        <input type="number" class="form-control" id="Asunto"
                                            style="border-color: #734a4a" required>
                                        <div class="invalid-feedback">Digite el asunto</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlDescripcion"
                                            style="font-weight: bold; color: #734a4a;"
                                            class="form-label">Descripción</label>
                                        <textarea class="form-control" id="exampleFormControlDescripcion" rows="3"
                                            style="border-color: #734a4a"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="formFileSm" class="form-label"
                                            style="font-weight: bold; color: #734a4a;">Cargue Archivo</label>
                                        <input class="form-control form-control-sm" id="formFileSm" type="file"
                                            style="border-color: #734a4a; color: #734a4a;" required>
                                        <p style="color:#734a4a; font-size: small; font-weight: bold;">El archivo debe
                                            ser pdf</p>
                                        <div class="invalid-feedback">Cargue el archivo</div>
                                    </div>
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button type="submit" class="btn"
                                            style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Enviar</button>
                                        <button type="button" class="btn"
                                            style="background-color: #734a4a; color: #fdfefe; border-radius: 4px; font-weight: bold;">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
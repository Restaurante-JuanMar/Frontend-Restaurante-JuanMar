import { createRouter, createWebHashHistory } from "vue-router";
import Nav from "../components/Nav.vue";
import Home from "../components/Home.vue";
import Nosotros from "../components/Nosotros.vue";
import Menu from "../components/Menu.vue";
import Reserva from "../components/Reserva.vue";
import Galeria from "../components/Galeria.vue";
import Recorrido from "../components/Recorrido.vue";
import TrabajaConNosotros from "../components/TrabajaNosotros.vue";
import Contactenos from "../components/Contactenos.vue";
import PanelAdmin from "../components/administrador/PanelAdmin.vue";
import MenuAdmin from "../components/administrador/MenuAdmin.vue";
import ReservacionAdmin from "../components/administrador/ReservacionAdmin.vue";
import GaleriaAdmin from "../components/administrador/GaleriaAdmin.vue";
import TrabajaConNosotrosAdmin from "../components/administrador/TrabajaAdmin.vue";
import ContactenosAdmin from "../components/administrador/ContactenosAdmin.vue";
import EditarPerfil from "../components/administrador/EditarPerfil.vue";
import Mision from "../components/administrador/Mision.vue";
import PlatoEspecialAdmin from "../components/administrador/PlatoEspecialAdmin.vue";
import recuperarContra from "../components/recuperarContraseña/RecuperarContrasena.vue";

const routes = [
  {
    path: "/",
    component: Nav,
    children: [
      { path: "", redirect: "/home" },
      {
        path: "/home",
        component: Home,
      },
      {
        path: "/nosotros",
        component: Nosotros,
      },
      {
        path: "/menu",
        component: Menu,
      },
      {
        path: "/reserva",
        component: Reserva,
      },
      {
        path: "/galeria",
        component: Galeria,
      },
      {
        path: "/recorrido",
        component: Recorrido,
      },
      {
        path: "/trabaja-con-nosotros",
        component: TrabajaConNosotros,
      },
      {
        path: "/contactenos",
        component: Contactenos,
      },
      {
        path: "/panel-admin",
        component: PanelAdmin,
      },
      {
        path: "/menu-admin",
        component: MenuAdmin,
      },
      {
        path: "/reservacion-admin",
        component: ReservacionAdmin,
      },
      {
        path: "/galeria-admin",
        component: GaleriaAdmin,
      },
      {
        path: "/trabaja-nosotros-admin",
        component: TrabajaConNosotrosAdmin,
      },
      {
        path: "/contactenos-admin",
        component: ContactenosAdmin,
      },
      {
        path: "/mision",
        component: Mision,
      },
      {
        path: "/plato-especial",
        component: PlatoEspecialAdmin,
      },
      {
        path: "/editar-perfil-admin",
        component: EditarPerfil,
      },
    ],
  },
  { path: "/recuperar-contrasena", component: recuperarContra },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

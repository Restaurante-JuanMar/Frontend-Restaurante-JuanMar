import { createRouter, createWebHashHistory } from "vue-router";
import Nav from "../components/Nav.vue";
import Home from "../components/Home.vue";
import Nosotros from "../components/Nosotros.vue";
import Menu from "../components/Menu.vue";
import Reserva from "../components/Reserva.vue";
import Recorrido from "../components/Recorrido.vue";
import TrabajaConNosotros from "../components/TrabajaNosotros.vue";
import Contactenos from "../components/Contactenos.vue";

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
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

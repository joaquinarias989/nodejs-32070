export let header = {
  title: "",
  desc: "",
};
export const setHeader = (pathname) => {
  switch (pathname) {
    case "/Productos":
      (header.title = "Productos"),
        (header.desc = "Administrá tu stock de la forma que prefieras.");
      break;
    case "/Pedidos":
      (header.title = "Pedidos"),
        (header.desc = "Verificá, cancelá y controlá los pedidos realizados.");
      break;
    case "/ConsultasRecibidas":
      (header.title = "Consultas Recibidas"),
        (header.desc = "Verificá las consultas que realizaron tus clientes.");
      break;
    case "/404":
      (header.title = "Pagina no encontrada"),
        (header.desc = "La página a la que intentas acceder no existe.");
      break;
    default:
      (header.title = "Hola Diego"), (header.desc = "Bienvenido de nuevo!");
      break;
  }
};

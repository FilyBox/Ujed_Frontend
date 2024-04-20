
const columns = [
  {name: "Estatus", uid: "status", sortable: true},
  {name: "Departamento", uid: "department", sortable: true},
  {name: "Titulo", uid: "title", sortable: true},
  {name: "Descripción", uid: "description", sortable: true},
  {name: "Creado/Actualizado", uid: "created_at", sortable: true},
  {name: "Acciones", uid: "actions"},
];

const statusOptions = [
  {name: "en espera", uid: "en espera"},
  {name: "resuelto", uid: "resuelto"},
  {name: "asignado", uid: "asignado"},
  {name: "descartado", uid: "descartado"},

];

const departmentOptions = [
  {name: "sin asignar", uid: "Sin asignar"},
  {name: "obras", uid: "obras"},
  {name: "mantenimiento", uid: "mantenimiento"},

];

const departmentOptionsNoNull = [
  {name: "obras", uid: "obras"},
  {name: "mantenimiento", uid: "mantenimiento"},

];




export {columns, statusOptions, departmentOptions, departmentOptionsNoNull};

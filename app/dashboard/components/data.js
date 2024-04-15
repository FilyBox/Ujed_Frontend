import React from "react";
const columns = [
    {name: "Estatus", uid: "status", sortable: true},
  {name: "Id", uid: "id", sortable: true},
  {name: "Titulo", uid: "title", sortable: true},
  {name: "Descripción", uid: "description", sortable: true},
  {name: "Creado/Actualizado", uid: "created_at", sortable: true},
  {name: "Usuario", uid: "user.name"},

  {name: "Acciones", uid: "actions"},
];

const statusOptions = [
  {name: "En Espera", uid: "en espera"},
  {name: "Resueltos", uid: "resuelto"},
  {name: "Asignado", uid: "asignado"},
  {name: "Descartado", uid: "descartado"},

];


export {columns, statusOptions};

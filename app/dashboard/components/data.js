import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
const columns = [
    {name: "Estatus", uid: "status", sortable: true},
    {name: "Departamento", uid: "department", sortable: true},

  {name: "Id", uid: "id", sortable: true},
  {name: "Titulo", uid: "title", sortable: true},
  {name: "Descripción", uid: "description", sortable: true},
  {name: "Creado/Actualizado", uid: "created_at", sortable: true},
  {name: "Ubicación", uid: "location", sortable: true},

  {name: "Usuario", uid: "user.name"},

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

import {
    ChipProps,
  } from "@nextui-org/react";
 
  
  const statusColorMap: Record<string, ChipProps["color"]> = {
    "en espera": "warning",
    asignado: "default",
    resuelto: "success",
    descartado: "danger",
  };
  
  const departmentColorMap: Record<string, ChipProps["color"]> = {
    "sin asignar": "warning",
    obras: "warning",
    mantenimiento: "primary",
  };
  
  
  
  
  export {statusColorMap, departmentColorMap};
  
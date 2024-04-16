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
  
  export interface ReportProps {
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    location: string;
    department: string;
    user: [];
  }
  
  export interface Table2Props {
    reports: ReportProps[];
  }
  
  
  export {statusColorMap, departmentColorMap};
  
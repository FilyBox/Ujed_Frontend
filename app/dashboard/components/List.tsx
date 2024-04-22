import React, { useState, useMemo, useCallback } from "react";
import { Accordion, AccordionItem, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Tooltip } from "@nextui-org/react";
import { FaPhotoVideo } from "react-icons/fa";
import { Table2Props, ReportProps, ListProps } from "@/types/type";
import { FiSearch } from "react-icons/fi";
import { departmentColorMap, statusColorMap } from "./consts";
import { departmentOptionsNoNull, statusOptions } from "./data";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { updateReportDepartment, updateReportStatus } from "@/hooks/route";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";


const List: React.FC<ListProps> = ({ reports, onDataChange }) => {
  const [filterValue, setFilterValue] = useState("");
  const { data: session } = useSession();
  const isAdminStatus = session?.user?.roles?.includes('admin');

  const filteredReports = useMemo(() => {
    return reports.filter(report => report.title.toLowerCase().includes(filterValue.toLowerCase()));
  }, [filterValue, reports]);

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };
  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);


  const handleDeparmentChange = async (reportId:string, newDepartment:string) => {
    if (!session) {
      console.error("No session available");
      return;
    }
    try {
      const updatedDepartment = await updateReportDepartment(reportId, newDepartment, session.user.token);
      console.log('Report updated successfully:', updatedDepartment);
      console.log("ID:"+reportId)
      toast.success(
        <div className="success alert-success">
          Estatus actualizado
        </div>,
        { duration: 3000 }
      );
      if (onDataChange) {
        onDataChange();
      }

    } catch (error) {
      console.error('Failed to update report:', error);
      toast.error(
        <div className="alert alert-danger">
          No fue posible actualizar el estatus
        </div>,
        { duration: 3000 }
      );
    }
  };
  
  const handleStatusChange = async (reportId:string, newStatus:string) => {
    if (!session) {
      console.error("No session available");
      return;
    }
    try {
      const updatedReport = await updateReportStatus(reportId, newStatus, session.user.token);
      console.log('Report updated successfully:', updatedReport);
      console.log("ID:"+reportId)
      toast.success(
        <div className="success alert-success">
          Estatus actualizado
        </div>,
        { duration: 3000 }
      );
      if (onDataChange) {
        onDataChange();
      }

    } catch (error) {
      console.error('Failed to update report:', error);
      toast.error(
        <div className="alert alert-danger">
          No fue posible actualizar el estatus
        </div>,
        { duration: 3000 }
      );
    }
  };

  return (
    <div>
   
      <Input
            isClearable
            className="w-full sm:max-w-[44%] p-2"
            placeholder="Buscar por nombre..."
            startContent={<FiSearch/>}
            value={filterValue}
            onClear={onClear}
            onChange={(e) => handleFilterChange(e.target.value)}
            />
            <Accordion
        showDivider={false}
        className="p-2 flex flex-col gap-1 w-full"
        variant="splitted"      >
        {filteredReports.map((report: ReportProps) => (
       
          <AccordionItem
            key={report.id}
            indicator={<FaChevronRight /> }
            title={report.title.split(' - ')[0]}
            subtitle={
              <div className="text-sm flex flex-col gap-2">
                <p className="text-sm text-gray-500 break-all">Fecha de creación: {new Date(report.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 break-all">Fecha de actualización: {new Date(report.updated_at).toLocaleDateString()}</p>
                <div className="flex gap-4">
                <div className="flex justify-start  items-">
                        <Chip className="capitalize" color={departmentColorMap[report.department]} size="sm" variant="flat">
                            {report.department || "Sin asignar"}
                        </Chip>
                        {  isAdminStatus && (
                                <Dropdown aria-label="Department options">
                                    <DropdownTrigger aria-label="Show department options">
                                    <Button isIconOnly size="sm" variant="light" aria-label="department chevron">
                                        <ChevronDownIcon className="text-small" />
                                    </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="option choices">
                                    {departmentOptionsNoNull.map(department => (
                                        <DropdownItem key={department.name} onClick={() => handleDeparmentChange(report.id, department.name)}>
                                        {department.name}
                                        </DropdownItem>
                                    ))}
                                    </DropdownMenu>
                                </Dropdown>
                        )}

                    </div>

                    <div className="flex justify-start items-">
                            <Chip className="capitalize" color={statusColorMap[report.status]} size="sm" variant="flat">
                            {report.status}
                            </Chip>
                            {
                                // Muestra el Dropdown solo si el usuario es admin
                                isAdminStatus && (
                                <Dropdown  aria-label="Status options">
                                <DropdownTrigger aria-label="Show status options">
                                    <Button isIconOnly size="sm" variant="light" aria-label="status chevron">
                                        <ChevronDownIcon className="text-small" />
                                    </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="option choices">
                                    {statusOptions.map(status => (
                                        <DropdownItem key={status.name} onClick={() => handleStatusChange(report.id, status.name)}>
                                        {status.name}
                                        </DropdownItem>
                                    ))}
                                    </DropdownMenu>
                                </Dropdown>
                                )
                            }
                    </div>

                </div>
                
                {report.images.length > 1 ? (

                  <div className="flex gap-2">
                      <Chip  size="sm" startContent={<FaPhotoVideo size={18} color="white"/>}  
                    classNames={{
                      base: "bg-red-500 px-3",
                      content: "drop-shadow shadow-black ",
                    }}>
                      <p className=" text-white ml-1">Archivo Multimedia</p>
                    </Chip>
                    <p className="text-sm text-gray-500">+{report.images.length - 1}</p>
                  </div>
                   
                ) : report.images.length === 1 ? (

                  <Chip  key={report.images[0].id} size="sm" startContent={<FaPhotoVideo size={18} color="white" />}  
                    classNames={{
                      base: "bg-red-500 px-3",
                      content: "drop-shadow shadow-black ",
                    }}>
                      <p className=" text-white ml-1">Archivo Multimedia</p>
                    </Chip>
                  
                ) : null}
                    

              </div>
            }
          >

            <div className="flex flex-col gap-4">

            <p className="text-sm text-gray-500">Usuario: {report.user.name ? ( report.user.name.length > 30 ? `${ report.user.name.substring(0, 150)}...` :  report.user.name) : "Sin usuario"}</p>


                <p>{report.description ? ( report.description.length > 150 ? `${ report.description.substring(0, 150)}...` :  report.description) : "Sin descripción"}</p>


                <Link href={{
                            pathname: '/dashboard/reportsdetails',
                            query:{id: report.id } 
                            
                        }} className="bg-[#B11830] text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300 focus:ring-blue-300 font-medium text-sm px-5  text-center mr-2 mb-2">
                        
                            Ver detalles
                </Link>

            </div>

         
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default List;

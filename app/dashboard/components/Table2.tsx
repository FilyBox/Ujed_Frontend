'use client';

import React, { useState, useMemo, useCallback } from "react";
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
import { ChevronDownIcon } from "./ChevronDownIcon";
import { departmentColorMap,statusColorMap } from "./consts";
import { ReportPropsTable,Table2Props } from "@/types/type";
import { columns, statusOptions, departmentOptions, departmentOptionsNoNull } from "./data";
import { capitalize } from "./utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon } from "./EyeIcon";
import { useSession } from "next-auth/react";
import { toast } from 'sonner'
import { useUserData } from "@/hooks/user/route";
import { FiSearch } from "react-icons/fi";
import { updateReportStatus, updateReportDepartment } from "@/hooks/route";
import classNames from "classnames";


const INITIAL_VISIBLE_COLUMNS = ["title", "description", "status", "actions","department", "name", "created_at"];
const Table2: React.FC<Table2Props> = ({ reports }) => {
  const { data: session } = useSession();
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [departmentFilter, setDepartmentFilter] = useState<Selection>("all");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

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
      setTimeout(() => {
        // Recargar la página
        window.location.reload();
        
      }, 3000); // Sincronizado con la duración del toast
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
      setTimeout(() => {
        // Recargar la página
        window.location.reload();
        
      }, 3000); // Sincronizado con la duración del toast
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

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  

  // Preprocesar reportes para manejar valores nulos en el departamento
  const preprocessedReports = useMemo(() => {
    return reports.map(report => ({
      ...report,
      department: report.department || "Sin asignar" // Asigna "Sin asignar" si department es null
    }));
  }, [reports]);



  const filteredItems = useMemo(() => {
    let filteredReports = [...preprocessedReports];

    if (hasSearchFilter) {
      filteredReports = filteredReports.filter((report) =>
        report.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredReports = filteredReports.filter((report) =>
        Array.from(statusFilter).includes(report.status)
      );
    }

    if (departmentFilter !== "all" && Array.from(departmentFilter).length !== departmentOptions.length) {
      filteredReports = filteredReports.filter((report) =>
        Array.from(departmentFilter).includes(report.department)
      );
    }

    return filteredReports;
  }, [reports, filterValue, statusFilter, hasSearchFilter, departmentFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: ReportPropsTable, b: ReportPropsTable) => {
      const first = a[sortDescriptor.column as keyof ReportPropsTable] as unknown as number;
      const second = b[sortDescriptor.column as keyof ReportPropsTable] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((report: ReportPropsTable, columnKey: React.Key) => {
    const cellValue = report[columnKey as keyof ReportPropsTable];

    switch (columnKey) {
      case "created_at":
        return (
          <div className="flex flex-col justify-center items-center text-sm">
            <p className="text-bold text-tiny capitalize text-default-400"> {report.created_at}</p>
            <p className="text-bold text-tiny capitalize text-default-400"> {report.updated_at}</p>
          </div>
        );
      case "status":
        const isAdminStatus = session?.user?.roles?.includes('admin');

        return (
          <div className="flex justify-center items-center">
            <Chip className="capitalize" color={statusColorMap[report.status]} size="sm" variant="flat">
            {cellValue}
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

          
        );
        
        case "title":
          const displayTitle = report.title.split(' - ')[0]; // Divide el título en ' - ' y toma el primer elemento
  
          const titleDisplay = displayTitle ? (displayTitle.length > 150 ? `${displayTitle.substring(0, 150)}...` : displayTitle) : "";
          return (
            
            <div className="flex flex-col min-w-52 justify-center items-start">
              <p className="capitalize"> {titleDisplay}</p>
            </div>   
  
            
          );

          case "description":
    
            const DescriptionDisplay =  report.description ? ( report.description.length > 150 ? `${ report.description.substring(0, 150)}...` :  report.description) : "";
            var btnGroupClasses = classNames(
              "flex flex-col justify-start items-start",
              {
                'min-w-52': report.description.length > 150,
              }
            );
            return (
            <div className={btnGroupClasses} >
              <p className="capitalize"> {DescriptionDisplay}</p>
            </div>          
            );

        case "department":

        const isAdminDepartment = session?.user?.roles?.includes('admin');

          return (
            <div className="flex justify-center items-center">
              <Chip className="capitalize" color={departmentColorMap[report.department]} size="sm" variant="flat">
              {cellValue}
            </Chip>
                    {
                      
                // Muestra el Dropdown solo si el usuario es admin
                isAdminDepartment && (
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
                )
              }
            </div>
  
            
          );
      case "actions":
        return ( 
         <div className="relative flex items-center justify-center">
          <Tooltip content="Ver">
          
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Link href={{
                    pathname: '/dashboard/reportsdetails',
                    query:{id: report.id } 
                  }}><EyeIcon /></Link>
            </span>
          </Tooltip>
          
        </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<FiSearch/>}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Estatus
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Departamento
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={departmentFilter}
                selectionMode="multiple"
                onSelectionChange={setDepartmentFilter}
              >
                {departmentOptions.map((department) => (
                  <DropdownItem key={department.uid} className="capitalize">
                    {capitalize(department.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small"> {reports.length} reportes totales</span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    departmentFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    reports.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "",
      }}
      className="w-full h-full "
      // selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody className="" emptyContent={"Reportes no encontrados"}>
        {sortedItems.map((report, index) => (
          <TableRow key={`${report.id}-${index}`}>
            {headerColumns.map((column) => (
              <TableCell key={column.uid}>{renderCell(report, column.uid)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Table2;
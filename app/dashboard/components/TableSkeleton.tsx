import React, { useCallback } from 'react';
import { Button, Card, Chip, CircularProgress, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { ChevronDownIcon } from './ChevronDownIcon';
import { FiSearch } from 'react-icons/fi';
import { columns } from './data';
import { EyeIcon } from './EyeIcon';
import { ReportPropsTable } from '@/types/type';

const TableSkeleton = () => {
    const rows: ReportPropsTable[] = [
        // Example rows data
        {
            id: "1",
            title: "Report Title",
            description: "Detailed description here",
            status: "Active",
            created_at: "2020-01-01T00:00:00.000Z",
            updated_at: "2020-01-02T00:00:00.000Z",
            department: "IT",
        },
        // More rows can be added similarly
    ];

    const renderCell = useCallback((report: ReportPropsTable, columnKey: React.Key) => {
        const cellValue = report[columnKey as keyof ReportPropsTable];

        switch (columnKey) {

                case "department":

                return (
                    <Skeleton className="h-3 mt-1 rounded-lg" />
                );

                case "status":
                return (
                    <div key={report.id} className="flex justify-center items-center  max-w-24">
                    <Chip className="capitalize min-w-16 max-w-16" size="sm" variant="flat">
                   
                    </Chip>

                    </div>
                );

                case "title":

                    return (
                        <Skeleton className="h-3 mt-1 rounded-lg min-w-36 " />
                    );

                
                case "description":

                    return (
                        <Skeleton className="h-3 mt-1 rounded-lg min-w-32" />
                    );

                case "created_at":
                    return (
                        <div key={report.id} className="flex flex-col  max-w-24">
                            <Skeleton className="h-3 mt-1 rounded-lg max-w-20" />
                            <Skeleton className="h-3 mt-1 rounded-lg max-w-24" />

    
                        </div>
                    );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center  max-w-16">
                        <Tooltip content="Ver" aria-label="View details"  >
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                    </div>
                   
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <main className='flex flex-col gap-4'>
            <div className="flex flex-col gap-4">

        
            <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
                    <Input
                        aria-label="Search by title"
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Buscar por título..."
                        startContent={<FiSearch />}
                        isDisabled
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger aria-label="Filter by status">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Estatus
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Status options"
                                disallowEmptySelection
                                closeOnSelect={false}
                                selectedKeys={""}
                                selectionMode="multiple"
                                disabledKeys={["espera", "resuelto", "asignado", "descartado"]}
                            >
                                <DropdownItem key="espera" aria-label="Pending">En Espera</DropdownItem>
                                <DropdownItem key="resuelto" aria-label="Resolved">Resuelto</DropdownItem>
                                <DropdownItem key="asignado" aria-label="Assigned">Asignado</DropdownItem>
                                <DropdownItem key="descartado" aria-label="Discarded">Descartado</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger aria-label="Filter by department">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Departamento
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Department options"
                                disallowEmptySelection
                                closeOnSelect={false}
                                selectedKeys={"departmentFilter"}
                                selectionMode="multiple"
                                disabledKeys={["espera", "resuelto", "asignado", "descartado"]}
                            >
                                <DropdownItem key="espera" aria-label="Unassigned">Sin Asignar</DropdownItem>
                                <DropdownItem key="resuelto" aria-label="Works">Obras</DropdownItem>
                                <DropdownItem key="asignado" aria-label="Maintenance">Mantenimiento</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    
                </div>

                <div className="flex justify-between items-center pl-3">
                    <span className="text-default-400 text-small"> 0 reportes totales</span>
                    <label className="flex items-center text-default-400 text-small">
                        Filas por página:
                        <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
                
                <Table aria-label="Skeleton table for report data"     classNames={{
                        wrapper: "min-h-[56vh] max-h-[56vh] sm:min-h-[65vh]",
                    }}>
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} >{column.name}</TableColumn>}
                    </TableHeader>
                    <TableBody emptyContent={"Reportes no encontrados"}>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.uid}>{renderCell(row, column.uid)}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="py-2 flex justify-between items-center">

                <span className="w-[30%] text-small text-default-400">
                 </span>
                    
                    <Pagination
                    isDisabled
                    isCompact 
                    showControls
                    showShadow
                    classNames={{
                        wrapper: "",
                        cursor:
                          "bg-[#cf112d] text-white font-bold",
                      }}
                      aria-label="pagination"
                    page={1}
                    total={3}
                    
                    />
                    <div className="flex w-[30%] justify-end gap-2">
                    <Button isDisabled size="sm" variant="flat" aria-label="Anterior">
                        Anterior
                    </Button>
                    <Button isDisabled size="sm" variant="flat" aria-label="Siguiente">
                        Siguiente
                    </Button>

                    <CircularProgress  size="sm" aria-label="Progress" strokeWidth={3}

                        classNames={{
                                svg: "w-8 h-8 drop-shadow-md",
                                indicator: "stroke-[#cf112d]",
                                value: "text-3xl font-semibold ",
                                
                    }}/>

                    
                    </div>
                    
            </div>
            </main>
        </>
    );
};

export default TableSkeleton;

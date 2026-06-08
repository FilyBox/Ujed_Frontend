"use client";

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
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { departmentColorMap, statusColorMap } from "./consts";
import { ReportPropsTable, Table2Props } from "@/types/type";
import {
  columns,
  statusOptions,
  departmentOptions,
  departmentOptionsNoNull,
} from "./data";
import { capitalize } from "./utils";
import Link from "next/link";
import { EyeIcon } from "./EyeIcon";
import { authClient, rolesOf } from "@/lib/auth-client";
import { FiSearch, FiInbox } from "react-icons/fi";
import { updateReportStatus, updateReportDepartment } from "@/hooks/route";
import classNames from "classnames";

const Table2: React.FC<Table2Props> = ({
  reports,
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
  onDataChange,
}) => {
  const { data: session } = authClient.useSession();
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [departmentFilter, setDepartmentFilter] = useState<Selection>("all");
  const [departmentChanges, setDepartmentChanges] = useState<
    Record<string, string>
  >({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "title",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const pages = Math.ceil(total / limit) || 1;

  const handleStatusChange = async (reportId: string, newStatus: string) => {
    if (!session) return;
    try {
      await updateReportStatus(reportId, newStatus, session?.session?.token);
      if (onDataChange) onDataChange();
    } catch (error) {
      console.error("Failed to update report:", error);
    }
  };

  const handleDeparmentChange = async (
    reportId: string,
    newDepartment: string,
  ) => {
    if (!session) return;
    try {
      await updateReportDepartment(
        reportId,
        newDepartment,
        session?.session?.token,
      );
      setDepartmentChanges((prev) => ({ ...prev, [reportId]: newDepartment }));
      if (onDataChange) onDataChange();
    } catch (error) {
      console.error("Failed to update report:", error);
    }
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const preprocessedReports = useMemo(() => {
    return reports.map((report) => ({
      ...report,
      department: report.department || "Sin asignar",
    }));
  }, [reports]);

  const filteredItems = useMemo(() => {
    let filteredReports = [...preprocessedReports];

    if (hasSearchFilter) {
      filteredReports = filteredReports.filter((report) =>
        report.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredReports = filteredReports.filter((report) =>
        Array.from(statusFilter).includes(report.status),
      );
    }

    if (
      departmentFilter !== "all" &&
      Array.from(departmentFilter).length !== departmentOptions.length
    ) {
      filteredReports = filteredReports.filter((report) =>
        Array.from(departmentFilter).includes(report.department),
      );
    }

    return filteredReports;
  }, [reports, filterValue, statusFilter, hasSearchFilter, departmentFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: ReportPropsTable, b: ReportPropsTable) => {
      const first = a[
        sortDescriptor.column as keyof ReportPropsTable
      ] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof ReportPropsTable
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = useCallback(
    (report: ReportPropsTable, columnKey: React.Key) => {
      const cellValue = report[columnKey as keyof ReportPropsTable];

      switch (columnKey) {
        case "created_at":
          return (
            <div className='flex flex-col justify-center items-start text-sm w-full'>
              <p className='text-bold text-tiny capitalize text-default-400'>
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
              <p className='text-bold text-tiny capitalize text-default-400'>
                {new Date(report.updatedAt).toLocaleDateString()}
              </p>
            </div>
          );
        case "status": {
          const isAdminStatus = rolesOf(session?.user?.role).includes("admin");
          return (
            <div className='flex justify-center items-center'>
              <Chip
                className='capitalize'
                color={statusColorMap[report.status]}
                size='sm'
                variant='flat'
              >
                {cellValue}
              </Chip>
              {isAdminStatus && (
                <Dropdown aria-label='Status options'>
                  <DropdownTrigger aria-label='Show status options'>
                    <Button
                      isIconOnly
                      size='sm'
                      variant='light'
                      aria-label='status chevron'
                    >
                      <ChevronDownIcon className='text-small' />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label='option choices'>
                    {statusOptions.map((status) => (
                      <DropdownItem
                        key={status.name}
                        onClick={() =>
                          handleStatusChange(report.id, status.name)
                        }
                      >
                        {status.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          );
        }
        case "title": {
          const displayTitle = report.title.split(" - ")[0];
          const titleDisplay = displayTitle
            ? displayTitle.length > 150
              ? `${displayTitle.substring(0, 150)}...`
              : displayTitle
            : "";
          return (
            <div className='flex flex-col min-w-52 justify-center items-start'>
              <p className='capitalize'>{titleDisplay}</p>
            </div>
          );
        }
        case "description": {
          const DescriptionDisplay = report.description
            ? report.description.length > 150
              ? `${report.description.substring(0, 150)}...`
              : report.description
            : "";
          const btnGroupClasses = classNames(
            "flex flex-col justify-start items-start",
            { "min-w-52": report.description.length > 150 },
          );
          return (
            <div className={btnGroupClasses}>
              <p className='capitalize'>{DescriptionDisplay}</p>
            </div>
          );
        }
        case "department": {
          const isAdminDepartment = rolesOf(session?.user?.role).includes("admin");
          return (
            <div key={report.id} className='flex justify-center items-center'>
              <Chip
                className='capitalize'
                color={departmentColorMap[report.department]}
                size='sm'
                variant='flat'
              >
                {cellValue}
              </Chip>
              {isAdminDepartment ? (
                <Dropdown aria-label='Department options'>
                  <DropdownTrigger aria-label='Show department options'>
                    <Button
                      isIconOnly
                      size='sm'
                      variant='light'
                      aria-label='department chevron'
                    >
                      <ChevronDownIcon className='text-small' />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label='option choices'
                    selectedKeys={selectedKeys}
                  >
                    {departmentOptionsNoNull.map((department) => (
                      <DropdownItem
                        key={department.name}
                        onClick={() =>
                          handleDeparmentChange(report.id, department.name)
                        }
                      >
                        {department.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Chip
                  className='capitalize'
                  color={departmentColorMap[report.department]}
                  size='sm'
                  variant='flat'
                >
                  {cellValue}
                </Chip>
              )}
            </div>
          );
        }
        case "actions":
          return (
            <div className='relative flex items-center justify-center'>
              <Tooltip content='Ver'>
                <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                  <Link
                    href={{
                      pathname: "/dashboard/reportsdetails",
                      query: { id: report.id },
                    }}
                  >
                    <EyeIcon />
                  </Link>
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const onNextPage = useCallback(() => {
    if (page < pages) onPageChange(page + 1);
  }, [page, pages, onPageChange]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) onPageChange(page - 1);
  }, [page, onPageChange]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onLimitChange(Number(e.target.value));
    },
    [onLimitChange],
  );

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value ?? "");
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col sm:flex-row justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Buscar por titulo...'
            startContent={<FiSearch />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  variant='flat'
                >
                  Estatus
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode='multiple'
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className='capitalize'>
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  variant='flat'
                >
                  Departamento
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={departmentFilter}
                selectionMode='multiple'
                onSelectionChange={setDepartmentFilter}
              >
                {departmentOptions.map((department) => (
                  <DropdownItem key={department.uid} className='capitalize'>
                    {capitalize(department.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  variant='flat'
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode='multiple'
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className='flex justify-between items-center pl-3'>
          <span className='text-default-400 text-small'>
            {total} reportes totales
          </span>
          <label className='flex items-center text-default-400 text-small'>
            Filas por página:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              value={limit}
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
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
    total,
    limit,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          {selectedKeys === "all"
            ? "Todos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          classNames={{
            cursor: "bg-[#cf112d] text-white font-bold",
          }}
          showControls
          showShadow
          page={page}
          total={pages}
          onChange={onPageChange}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={page <= 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={page >= pages}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, onPageChange, onNextPage, onPreviousPage, hasSearchFilter]);

  return (
    <Table
      aria-label='table with custom cells, pagination and sorting'
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: "min-h-[56vh] max-h-[56vh] sm:min-h-[65vh]",
      }}
      className='w-full h-full'
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement='outside'
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
      <TableBody
        emptyContent={
          <div className='flex flex-col items-center justify-center py-10 gap-3 text-default-400'>
            <FiInbox size={48} />
            <p className='text-base font-medium'>No hay reportes</p>
            <p className='text-sm'>No se encontraron reportes para mostrar</p>
          </div>
        }
      >
        {sortedItems.map((report, index) => (
          <TableRow key={`${report.id}-${index}`}>
            {headerColumns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(report, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Table2;

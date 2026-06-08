"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { useFetchSingleReport } from "@/hooks/route";
import ReportDetail from "@/app/dashboard/reportsdetails/[id]/ReportDetail";

function ReportModalBody({ id }: { id: string }) {
  const { report, loading } = useFetchSingleReport(id);

  if (loading) {
    return (
      <div className='flex justify-center items-center py-16'>
        <Spinner size='lg' color='danger' />
      </div>
    );
  }

  if (!report) {
    return (
      <p className='text-center py-12 text-gray-400'>Reporte no encontrado</p>
    );
  }

  return <ReportDetail report={report} />;
}

export default function ReportModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <Modal
      isOpen
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
      size='3xl'
      scrollBehavior='inside'
      
      classNames={{
        wrapper: "z-[100000]",
        backdrop: "z-[100000]",
        base: "max-h-[90vh]",
        header: "border-b border-gray-100 pb-3",
        footer: "border-t border-gray-100 pt-3",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <span className='text-base font-semibold text-gray-800'>
                Detalles del reporte
              </span>
            </ModalHeader>

            <ModalBody className='py-5'>
              <ReportModalBody id={id} />
            </ModalBody>

            <ModalFooter className='flex justify-between'>
              <Link href={`/dashboard/reportsdetails/${id}`}>
                <Button
                  variant='light'
                  size='sm'
                  endContent={<FiExternalLink size={14} />}
                  className='text-gray-500'
                >
                  Ver página completa
                </Button>
              </Link>
              <Button
                variant='light'
                size='sm'
                onPress={onClose}
                className='text-gray-500'
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

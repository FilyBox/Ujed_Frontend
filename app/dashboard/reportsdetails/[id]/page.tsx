"use client";

import { use, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { FiArrowLeft } from "react-icons/fi";
import { useFetchSingleReport } from "@/hooks/route";
import ReportDetail from "./ReportDetail";
import Loader from "@/components/ui/Loader";

function PageContent({ id }: { id: string }) {
  const { report, loading } = useFetchSingleReport(id);
  const router = useRouter();

  if (loading) return <Loader />;

  if (!report) {
    return (
      <div className='flex flex-col items-center justify-center h-full text-gray-400 gap-2'>
        <p className='text-lg font-medium'>Reporte no encontrado</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 w-full h-full'>
      <Button
        variant='light'
        size='sm'
        startContent={<FiArrowLeft size={16} />}
        onPress={() => router.back()}
        className='self-start text-gray-500 -ml-2 min-h-10'
      >
        Volver
      </Button>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full'>
        <ReportDetail report={report} />
      </div>
    </div>
  );
}

export default function ReportDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <Suspense fallback={<Loader />}>
      <PageContent id={id} />
    </Suspense>
  );
}

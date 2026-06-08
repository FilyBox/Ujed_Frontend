'use client';

import { Chip, Avatar, Divider, Button } from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { jsPDF } from "jspdf";
import { ReportProps } from '@/types/type';
import { statusColorMap, departmentColorMap } from "@/app/dashboard/components/consts";
import { FiCalendar, FiDownload, FiMapPin, FiImage } from "react-icons/fi";

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{label}</p>
      {children}
    </div>
  );
}

export default function ReportDetail({ report }: { report: ReportProps }) {
  const displayTitle = report.title.split(' - ')[0];
  const createdAt = report.created_at || (report as any).createdAt;
  const updatedAt = report.updated_at || (report as any).updatedAt;
  const lastName = report.user.last_name || (report.user as any).lastName || '';

  const fmt = (d: string) =>
    d ? new Date(d).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.addImage('https://ujed-frontend.vercel.app/Images/Logo.png', 'PNG', margin, margin, 120, 60);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Reporte De Instalaciones', pageWidth / 2, margin + 100, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`ASUNTO: ${displayTitle}`, margin, margin + 130);
    doc.text(`UBICACIÓN:`, margin, margin + 145);
    doc.text(`-Facultad: ${report.location.faculty || ''}`, margin, margin + 160);
    doc.text(`-Edificio: ${report.location.building || ''}`, margin, margin + 175);
    doc.text(`-Aula: ${report.location.classroom || ''}`, margin, margin + 190);

    const bodyText = [
      'Como parte de un esfuerzo por salvaguardar el bienestar de nuestras instalaciones,',
      `el alumno/a y/o personal de la UJED ${report.user.name || ''} ${lastName}, realizan su reporte para informar de ${report.description}.`,
      `El objetivo de este reporte es presentar dicha situacion al departamento de ${report.department}`,
      'y al personal pertinente de su área de especialidad.',
      '\nEs importante destacar que atender este tipo de situaciones es de carácter prioritario.',
      '\nPor lo tanto solicito su apoyo para resolver este predicamento con diligencia.',
      '\nAgradeciendo de antemano su valiosa colaboración.',
    ];
    doc.text(bodyText, margin, margin + 220, { maxWidth: pageWidth - 2 * margin });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(
      ['UNIVERSIDAD JUÁREZ DEL ESTADO DE DURANGO', 'Constitución 404 Sur, Zona Centro. C.P. 34000, Durango, Dgo. México', 'Tel: (618) 827 12 00  https://www.ujed.mx/'],
      pageWidth / 2,
      pageHeight - margin - 30,
      { align: 'center' },
    );
    doc.save('Reporte.pdf');
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Chips: status + department */}
      <div className="flex flex-wrap gap-2">
        <Chip color={statusColorMap[report.status]} variant="flat" size="sm" className="capitalize">
          {report.status}
        </Chip>
        <Chip color={departmentColorMap[report.department]} variant="flat" size="sm" className="capitalize">
          {report.department || 'Sin asignar'}
        </Chip>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 leading-tight">{displayTitle}</h2>

      {/* Dates */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <FiCalendar size={12} />
          Creado: {fmt(createdAt)}
        </span>
        <span className="flex items-center gap-1">
          <FiCalendar size={12} />
          Actualizado: {fmt(updatedAt)}
        </span>
      </div>

      <Divider className="my-1" />

      {/* Location + Description */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard label="Ubicación">
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <span className="flex items-start gap-1">
              <FiMapPin size={13} className="mt-0.5 text-gray-400 shrink-0" />
              <span>
                <span className="text-gray-400">Facultad: </span>{report.location.faculty || '—'}
              </span>
            </span>
            <p className="text-gray-600 text-xs ml-4">
              Edificio: {report.location.building || '—'} {report.location.classroom ? `· Aula: ${report.location.classroom}` : ''}
            </p>
          </div>
        </InfoCard>

        <InfoCard label="Descripción">
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-5">
            {report.description || 'Sin descripción'}
          </p>
        </InfoCard>
      </div>

      {/* User */}
      <InfoCard label="Reportado por">
        <div className="flex items-center gap-3">
          <Avatar
            name={report.user.name}
            classNames={{ base: "bg-[#B11830] shrink-0", name: "text-white font-semibold" }}
            size="sm"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{report.user.name} {lastName}</p>
            <p className="text-xs text-gray-400 truncate">{report.user.email}</p>
          </div>
        </div>
      </InfoCard>

      {/* Images */}
      {report.images?.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <FiImage size={11} />
            Imágenes · {report.images.length}
          </p>
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <Swiper
              navigation
              pagination={{ clickable: true }}
              mousewheel
              keyboard
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              spaceBetween={0}
              slidesPerView={1}
              className="w-full"
            >
              {report.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <img
                    src={image.url}
                    alt="Imagen del reporte"
                    className="w-full h-64 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* Download */}
      <div className="flex justify-end pt-2 pb-1">
        <Button
          className="bg-[#B11830] text-white font-medium"
          startContent={<FiDownload size={15} />}
          onPress={generatePDF}
          size="sm"
        >
          Descargar PDF
        </Button>
      </div>
    </div>
  );
}

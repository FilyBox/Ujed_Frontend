import React from 'react';
import { Textarea, Button } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Usando Swiper para el carrusel
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ReportProps, ImageProps } from '@/types/type';

// Componente para la cabecera del reporte
const Header = ({ title, createdAt }: { title: string, createdAt: string }) => {
  const displayTitle = title.split(' - ')[0]; // Divide el título en ' - ' y toma el primer elemento
  const displayDate = createdAt.split(' T ')[0]; // Divide el título en ' - ' y toma el primer elemento

  const userNameDisplay = displayTitle ? (displayTitle.length > 10 ? `${displayTitle.substring(0, 10)}...` : displayTitle) : "";

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between px-5 items-center gap-2 bg-red-500 py-2">
      
      <h1 className="text-lg">{userNameDisplay}</h1>
      <h1 className="text-lg">{displayDate}</h1>
    </div>
  );
};



// Componente que ensambla todo
const Content = ({ report }: { report: ReportProps }) => {
  

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
  
    // Configuración de márgenes y espacios
    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const currentDate: Date = new Date();

    const displayTitle = report.title.split(' - ')[0]; // Divide el título en ' - ' y toma el primer elemento
  
    const userNameDisplay = displayTitle ? (displayTitle.length > 10 ? `${displayTitle.substring(0, 10)}...` : displayTitle) : "";
  
    // Formatea la fecha como 'dd de mmmm de aaaa'
    const dateString: string = currentDate.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const logoUjed = 'https://ujed-frontend.vercel.app/Images/Logo.png'; 

    const logoSecretaria = '';
    
    doc.addImage(logoUjed, 'PNG', margin, margin, 120, 60);
    // doc.addImage(logoSecretaria, 'PNG', pageWidth - margin - 120, margin, 120, 60);
  
    // Título del documento
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Reporte De Instalaciones', pageWidth / 2, margin + 100, { align: 'center' });
  
    // Subtítulo / Encabezado de la carta
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('VINCULACIÓN', margin, margin + 130);
    doc.text(`UBICACIÖN: ${report.location}`, margin, margin + 145);
    doc.text(`ASUNTO: ${userNameDisplay}`, margin, margin + 160);
  
    // Cuerpo de la carta
    const bodyText = [
      'Como parte de un esfuerzo por salvaguardar el vienestar de nuestras instalaciones,',
      `el alumno/a y/o personal de la Universidad Juárez del Estado de Durango ${report.user.name} ${report.user.last_name}, realizan su reporte para informar de ${report.description}.`,
      
      `El objetivo de este reporte es el de presentar dicha situacion al departamento de ${report.department}`,
      ' y al personal pertinente de su área de especialidad.',
      '\nEs importante destacar que atender este tipo de situaciónes es de caracter prioritario para el buen vivir de todos aquellos que',
      'entran en cualquiera de nuestras instalaciones',
      '\nPor lo tanto solicito su apoyo para poder resolver este predicamento con diligencia.',
      '\nAgradeciendo de antemano su valiosa colaboración y sin otro particular por el',
      'momento, aprovecho la ocasión para enviarle un cordial saludo.'
    ];
  
    doc.setFontSize(12);
    doc.text(bodyText, margin, margin + 200, { maxWidth: pageWidth - 2 * margin });
  
  
    // Añadir información de la institución en el pie de página
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const footerText = [
      'UNIVERSIDAD JUAREZ DEL ESTADO DE DURANGO',
      'Constitución 404 Sur, Zona Centro. C.P. 34000, Durango, Dgo. México',
      'Tel: (618) 827 12 00 https://www.ujed.mx/'
    ];
  
    doc.text(footerText, pageWidth / 2, pageHeight - margin - 30, { align: 'center' });
  
    // Guardar el documento generado
    doc.save('Reporte.pdf');
  };
  

  return (

    <div className="p-4 ">
     
    <div className='flex flex-col w-full h-fit mb-5'>
    <div className="flex flex-col gap-2 bg-gray-300 rounded-t-2xl pl-5 py-3 w-full" ></div>

    <Header title={report.title} createdAt={report.created_at} />
    </div>
      <section className="h-full  w-full flex flex-col gap-x-4 pb-5">
        <div className="flex flex-col w-full   h-full">
            <p className="text-xl text-black">Usuario</p>
            <Textarea isReadOnly variant="bordered" placeholder="Nombre del usuario"
            defaultValue={`${report.user.name} ${report.user.last_name}`} className="h-full w-full" />
        </div>

        <div className="flex flex-col w-full   h-full">
            <p className="text-xl text-black">Email</p>
            <Textarea isReadOnly variant="bordered" placeholder="Email del usuario" className="h-full w-full"
            defaultValue={report.user.email}  />
        </div>

        <div className="flex flex-col w-full   h-full">
          <p className="text-xl text-black">Estado</p>
          <Textarea isReadOnly variant="bordered" placeholder="Estado del reporte" className="h-full w-full" defaultValue={report.status}  />
        </div>

        <div className="flex flex-col w-full   h-full">
          <p className="text-xl text-black">Ubicación</p>
          <Textarea isReadOnly variant="bordered" placeholder="Estado del reporte" className="h-full w-full" defaultValue={report.location}  />
        </div>

        <div className="flex flex-col w-full   h-full">
          <p className="text-xl text-black">Departamento</p>
          <Textarea isReadOnly variant="bordered" placeholder="Estado del reporte" className="h-full w-full" defaultValue={report.department}  />
        </div>

        <div className=" h-full flex flex-col w-full">
          <p className="text-xl text-black">Descripción</p>
          <Textarea isReadOnly variant="bordered" placeholder="Descripción del reporte" className="h-full w-full"      
            defaultValue={report.description}  />
        </div>

        <div className="row-span-2 col-span-2 h-full flex flex-col w-full">
        {report.images && report.images.length > 0 &&     
        <Swiper
        className='w-52 sm:w-96 max-h-96'
        navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {report.images.map(image => (
            <SwiperSlide key={image.id}>
              <img src={image.url} alt={`Image ${image.id}`} style={{ width: '100%', height: 'auto' }} />
            </SwiperSlide>
          ))}
        </Swiper>}
        <Button className="mt-4" onClick={generatePDF}>Descargar PDF</Button>

        </div>
      </section>
    </div>


    // <div id="reportContent" className="p-4">
    //   <div className="flex flex-col items-center">
    //     <h1 className="text-xl font-bold">{report.title}</h1>
    //     <h2 className="text-lg">{report.created_at}</h2>
    //     <Textarea readOnly value={report.description} className="w-full mb-4" />
    //     <Textarea readOnly value={`${report.user.name} ${report.user.last_name}`} className="w-full mb-4" />
    //     <Textarea readOnly value={report.user.email} className="w-full mb-4" />
    //     <div className="row-span-3 col-span-2 h-full flex flex-col w-full">
    //       {report.images && report.images.length > 0 &&     
    //       <Swiper
    //       className='w-96 max-h-96'
    //       navigation={true}
    //           pagination={true}
    //           mousewheel={true}
    //           keyboard={true}
    //           modules={[Navigation, Pagination, Mousewheel, Keyboard]}
    //         spaceBetween={50}
    //         slidesPerView={1}
    //         onSlideChange={() => console.log('slide change')}
    //         onSwiper={(swiper) => console.log(swiper)}
    //       >
    //         {report.images.map(image => (
    //           <SwiperSlide key={image.id}>
    //             <img src={image.url} alt={`Image ${image.id}`} style={{ width: '100%', height: 'auto' }} />
    //           </SwiperSlide>
    //         ))}
    //       </Swiper>}

    //       </div>        <Button className="mt-4" onClick={generatePDF}>Descargar PDF</Button>
    //   </div>
    // </div>
  );
};

export default Content;

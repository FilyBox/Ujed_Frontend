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
  return (
    <div className="w-full flex justify-between px-5 items-center gap-2 bg-red-500 py-2">
      <h1 className="text-lg">{title}</h1>
      <h1 className="text-lg">{createdAt}</h1>
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

    const margin = 40;
    const verticalSpacing = 12;

    // Agrega título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Reporte Detallado", margin, 60);

    // Agrega subtítulo
    doc.setFontSize(12);
    doc.text(`Título del reporte: ${report.title}`, margin, 100);

    // Agrega descripción
    doc.text("Descripción:", margin, 130);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(report.description, margin, 150);

    // Usuario y otros detalles
    doc.text(`Usuario: ${report.user.name} ${report.user.last_name}`, margin, 170);
    doc.text(`Email: ${report.user.email}`, margin, 190);
    doc.text(`Estado: ${report.status}`, margin, 210);
    doc.text(`Creado el: ${report.created_at}`, margin, 230);
    doc.text(`Actualizado el: ${report.updated_at}`, margin, 250);

    // Puedes agregar imágenes usando addImage si es necesario
    // Por ejemplo, una firma o un logo
    // doc.addImage(imageData, 'PNG', margin, 280, 50, 50);

    // Guarda el PDF
    doc.save("reporte.pdf");
  };


  return (

    <div className="p-4 ">
     
    <div className='flex flex-col w-full h-fit mb-5'>
    <div className="flex flex-col gap-2 bg-gray-300 rounded-t-2xl pl-5 py-3 w-full" ></div>

    <Header title={report.title} createdAt={report.created_at} />
    <h1 className="text-lg">{report.title}</h1>
    </div>
      <section className="h-full  w-full flex flex-col md:grid md:grid-rows-5 md:grid-flow-col gap-x-4">
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

        <div className="row-span-2 col-span-2 h-full flex flex-col w-full">
          <p className="text-xl text-black">Descripción</p>
          <Textarea isReadOnly variant="bordered" placeholder="Descripción del reporte" className="h-full w-full"      
            defaultValue={report.description}  />
        </div>

        <div className="row-span-3 sm:col-span-2 h-full flex flex-col w-full">
        {report.images && report.images.length > 0 &&     
        <Swiper
        className='w-96 max-h-96'
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

        </div>
      </section>
      <Button className="mt-4" onClick={generatePDF}>Descargar PDF</Button>
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

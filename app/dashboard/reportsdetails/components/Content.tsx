import React from 'react';
import { Button } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Usando Swiper para el carrusel
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { jsPDF } from "jspdf";
import { ReportProps } from '@/types/type';

// Componente para la cabecera del reporte
const Header = ({ title, createdAt, updatedAt }: { title: string, createdAt: string, updatedAt: string }) => {
  const displayTitle = title.split(' - ')[0]; // Divide el título en ' - ' y toma el primer elemento

  return (
    <div className="w-full flex flex-col justify-between px-5 items-center gap-2 bg-red-500 py-2">
      
      <h1 className="text-lg">{displayTitle}</h1>

      <div className='flex flex-col sm:flex-row w-full justify-start sm:justify-between'>
          <h1 className="text-lg">Fecha creación: {new Date(createdAt).toLocaleDateString()}</h1>
          <h1 className="text-lg">Fecha actualización: {new Date(updatedAt).toLocaleDateString()}</h1>
      </div>
     

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
    const userName = report.user.name ? (report.user.name) : "";

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
    doc.text(`ASUNTO: ${displayTitle}`, margin, margin + 130);

    doc.text(`UBICACIÓN:`, margin, margin + 145);
    doc.text(`-Facultad: ${report.location.faculty || ''}`, margin, margin + 160);
    doc.text(`-Edificio: ${report.location.building || ''}`, margin, margin + 175);
    doc.text(`-Aula: ${report.location.classroom || ''}`, margin, margin + 190);

    
  
    // Cuerpo de la carta
    const bodyText = [
      'Como parte de un esfuerzo por salvaguardar el vienestar de nuestras instalaciones,',
      `el alumno/a y/o personal de la Universidad Juárez del Estado de Durango ${report.user.name ? (report.user.name) : ""} ${report.user.last_name}, realizan su reporte para informar de ${report.description}.`,
      
      `El objetivo de este reporte es el de presentar dicha situacion al departamento de ${report.department}`,
      ' y al personal pertinente de su área de especialidad.',
      '\nEs importante destacar que atender este tipo de situaciónes es de caracter prioritario para el buen vivir de todos aquellos que',
      'entran en cualquiera de nuestras instalaciones',
      '\nPor lo tanto solicito su apoyo para poder resolver este predicamento con diligencia.',
      '\nAgradeciendo de antemano su valiosa colaboración y sin otro particular por el',
      'momento, aprovecho la ocasión para enviarle un cordial saludo.'
    ];
  
    doc.setFontSize(12);
    doc.text(bodyText, margin, margin + 220, { maxWidth: pageWidth - 2 * margin });
  
  

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

    <div className=" shadow  sm:rounded-3xl max-w-full mx-auto sm:my-10 w-full bg-red-500 py-2">
            <div className="px-4 py-5 sm:px-6">
                <h1 aria-label='title' className="text-lg leading-6 font-medium text-gray-900">{report.title}</h1>
            </div>
            <div className="border-t border-gray-200">
                <dl>

                  <div className="bg-white px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">

                  <p aria-label='subtitle' className="border-b mb-4 mt-1 max-w-2xl text-base font-medium text-gray-700">Detalles del reporte</p>

                      <dt aria-label='creation date label' className="text-sm font-medium text-gray-500">Fecha creación</dt>
                      <dd aria-label='creation date' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(report.created_at).toLocaleDateString()}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">
                      <dt aria-label='updated date label' className="text-sm font-medium text-gray-500">Ultima actualización</dt>
                      <dd aria-label='updated date' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(report.updated_at).toLocaleDateString()}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">
                      <dt aria-label='updated date label' className="text-sm font-medium text-gray-500">Descripción</dt>
                      <dd aria-label='updated date' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report.description}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">
                      <dt aria-label='updated date label' className="text-sm font-medium text-gray-500">Estatus</dt>
                      <dd aria-label='updated date' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report.status}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">
                      <dt aria-label='updated date label' className="text-sm font-medium text-gray-500">Departamento</dt>
                      <dd aria-label='updated date' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report.department}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">
                    <p aria-label='subtitle' className="border-b mb-4 mt-1 max-w-2xl text-base font-medium text-gray-700">Información del usuario</p>

                        <dt aria-label='user name label' className="text-sm font-medium text-gray-500">Nombre completo</dt>
                        <dd aria-label='user name' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">{report.user.name} {report.user.last_name}</dd>
                    </div>
                   
                    <div className="bg-white px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">
                        <dt aria-label='email label' className="text-sm font-medium text-gray-500">Email</dt>
                        <dd aria-label='email' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report.user.email}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">
                        <dt aria-label='roles label' className="text-sm font-medium text-gray-500">Roles</dt>
                        <dd aria-label='roles' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report.user.roles.join(', ')}</dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">
                        <dt aria-label='roles label' className="text-sm font-medium text-gray-500">Ubicación</dt>
                        <dd aria-label='roles' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`Facultad: ${report.location.faculty || ''}`} </dd>
                        <dd aria-label='roles' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`Edificio: ${report.location.building|| ''}`} </dd>
                        <dd aria-label='roles' className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`Aula: ${report.location.classroom}`} </dd>

                    </div>

                    <div className="bg-gray-50 px-4 py-5 flex flex-col justify-start sm:gap-4 sm:px-6">
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
                    </div>
                  
                </dl>
            </div>
            <div className="px-4 py-3 sm:px-6 flex sm:flex-row-reverse justify-between">

                <div className='sm:px-6 flex flex-row-reverse'>
                <Button className="bg-[#B11830] text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300 max-w-80 font-medium text-sm px-5  text-center mt-4" onClick={generatePDF}>Descargar PDF</Button>
                </div>


                
            </div>
        </div>

  );
};

export default Content;

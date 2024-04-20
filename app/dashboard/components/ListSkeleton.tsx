import { Accordion, AccordionItem, Chip, CircularProgress, Input, Skeleton } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";


const ListSkeleton = () => {

  return (
    <div>
        <div className="flex p-2">
        <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<FiSearch/>}
            isDisabled
            />
            <CircularProgress  size="sm" aria-label="Progress" strokeWidth={3}

                classNames={{
                        svg: "w-8 h-8 drop-shadow-md",
                        indicator: "stroke-[#cf112d]",
                        value: "text-3xl font-semibold ",
                        
                }}/>
        </div>
   
     
            <Accordion
        showDivider={false}
        className="p-2 flex flex-col gap-1 w-full"
        variant="splitted"      >
            
        <AccordionItem
            key="1"
            aria-label="acordion"

            title={<Skeleton className="h-3 mt-1 rounded-lg" />}
            isDisabled

            subtitle={
              <div className="text-sm flex flex-col gap-2">
                Ubicación: <Skeleton className="h-3 mt-1 rounded-lg" />
                <div>
                    <Chip className="capitalize" color="default" size="sm" variant="flat">
                    dasdad
                </Chip>
                <Chip className="capitalize" color="default" size="sm" variant="flat">
                    asda
                </Chip>
                </div>
                
              </div>
            }
          >
         
          </AccordionItem>

          <AccordionItem
            key="2"
            isDisabled
            aria-label="acordion"
            title={<div>
                <Skeleton className="h-3 mt-1 rounded-lg" />
            </div>}
            subtitle={
              <div className="text-sm flex flex-col gap-2">
                Ubicación: <Skeleton className="h-3 mt-1 rounded-lg" />
                <div>
                    <Chip className="capitalize" color="default" size="sm" variant="flat">
                    dasdad
                </Chip>
                <Chip className="capitalize" color="default" size="sm" variant="flat">
                    asda
                </Chip>
                </div>
                
              </div>
            }
          >
         
          </AccordionItem>

          <AccordionItem
            key="3"
            isDisabled
            aria-label="acordion"

            title={<Skeleton className="h-3 mt-1 rounded-lg" />}
            subtitle={
              <div className="text-sm flex flex-col gap-2">
                Ubicación: <Skeleton className="h-3 mt-1 rounded-lg" />
                <div>
                    <Chip className="capitalize" color="default" size="sm" variant="flat">
                    dasdad
                </Chip>
                <Chip className="capitalize" color="default" size="sm" variant="flat">
                    asda
                </Chip>
                </div>
                
              </div>
            }
          >
         
          </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ListSkeleton;

import {CircularProgress} from "@nextui-org/react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div> */}
      <CircularProgress label="Cargando..."  
       classNames={{
            indicator: "stroke-[#cf112d]",
            value: "text-3xl font-semibold ",
          }}/>

    </div>
  );
}

export default Loader;
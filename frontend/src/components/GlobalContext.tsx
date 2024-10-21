import { LOCALSTORAGE_SOURCE_DATA_ALIS } from "@/utils/Constants";
import { createContext, useEffect, useState } from "react";

interface GlobalContextType {
  sourceData: SourceDataType;
  setSourceData: React.Dispatch<React.SetStateAction<SourceDataType>>;
}

export const globalContext = createContext<GlobalContextType>({} as any);

export default function GlobalContextProvider({ children }: { children: any }) {
  const [sourceData, setSourceData] = useState<SourceDataType>(
    (typeof window !== "undefined" && localStorage.getItem(LOCALSTORAGE_SOURCE_DATA_ALIS))
      ? JSON.parse(localStorage.getItem(LOCALSTORAGE_SOURCE_DATA_ALIS)!)
      : { files: [], text: "", websites: [], QAndAs: [] }
  );

  useEffect(()=>{
    if(typeof window !== "undefined"){
      localStorage.setItem(LOCALSTORAGE_SOURCE_DATA_ALIS, JSON.stringify({...sourceData, files: []}));
    }
  }, [sourceData.QAndAs, sourceData.text, sourceData.websites]) 

  return (
    <globalContext.Provider value={{ sourceData, setSourceData }}>
      {children}
    </globalContext.Provider>
  );
}

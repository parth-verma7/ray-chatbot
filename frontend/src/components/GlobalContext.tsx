import { createContext, useState } from "react";

interface GlobalContextType {
  sourceData: SourceDataType;
  setSourceData: React.Dispatch<React.SetStateAction<SourceDataType>>;
}

export const globalContext = createContext<GlobalContextType>({} as any);

export default function GlobalContextProvider({ children }: { children: any }) {
  const [sourceData, setSourceData] = useState<SourceDataType>({
    files: null,
    QAndAs: null,
    text: null,
    websites: null,
  });
  return (
    <globalContext.Provider value={{ sourceData, setSourceData }}>
      {children}
    </globalContext.Provider>
  );
}

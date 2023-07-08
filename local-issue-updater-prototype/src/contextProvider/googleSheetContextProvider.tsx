'use client'
import { useState, createContext } from "react";

export const GoogleSheetDataContext = createContext({} as any);

export const GoogleSheetDataProvider: React.FC<any> = ({ children }) => {
    const [issuesData, setIssuesData] = useState([] as any);
    console.log("🚀 ~ file: googleSheetContextProvider.tsx:8 ~ issuesData:", issuesData)
    const initializeIssuesSheetData = (fetchedggData: any) => setIssuesData(fetchedggData)
    return (
        <GoogleSheetDataContext.Provider
            value={
                {
                    initializeIssuesSheetData,
                    issuesData,
                }
            }
        >
            {children}
        </ GoogleSheetDataContext.Provider>

    )
}


'use client'
import { IssueItem } from "@/types";
import { useState, createContext } from "react";

export const GoogleSheetDataContext = createContext({} as any);

export const GoogleSheetDataProvider: React.FC<any> = ({ children }) => {
    const [issuesData, setIssuesData] = useState<IssueItem[]>([] as any);
    const initializeIssuesSheetData = (issues: IssueItem[]) => {
        //set the data
        setIssuesData(issues)
    }
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


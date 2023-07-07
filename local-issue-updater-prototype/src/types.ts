export type IssueType = 
    "footpath"|
    "breakingwall"|
    "electricalline"|
    "flood"

export interface IssueItem {
    id: string;
    issueStatus: string;
    issueContent: string;
    type: IssueType;
    reporterName: string;
    reporterPhoneNum: string;
    workingSquad: string;
    ps: string;
    severity: string;
    datetimeReport: string;
}
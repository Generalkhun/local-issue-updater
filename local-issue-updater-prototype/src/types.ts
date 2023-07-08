export type IssueType = 
    "footpath"|
    "breakingwall"|
    "electricalline"|
    "flood"

export interface IssueItem {
    id: string;
    status: string;
    issueDetail: string;
    type: IssueType;
    area: string;
    reporterName: string;
    reporterPhoneNumber: string;
    responsibleTeam: string;
    ps: string;
    severity: string;
    datetimeReport: string;
    latestDatetimeUpdate: string;
}
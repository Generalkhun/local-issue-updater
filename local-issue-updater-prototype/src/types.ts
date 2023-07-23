export interface IssueItem {
    id: string;
    status: string;
    issueDetail: string;
    type: string;
    area: string;
    reporterName: string;
    reporterPhoneNumber: string;
    responsibleTeam: string;
    ps: string;
    severity: string;
    datetimeReport: string;
    latestDatetimeUpdate: string;
    imgsInfo: string;
}

export interface ImgsInfo {
    url: string,
    name: string,
}
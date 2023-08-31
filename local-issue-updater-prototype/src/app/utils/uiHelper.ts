import { IssueItem } from "@/types";
import axios from "axios"
import { isEmpty } from "lodash";
export function guidGenerator() {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export const getlocalISOTime = () => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
    return localISOTime
}


export const saveImgToGGDrive = async (imgFile: File, fileName: string) => {

    const form = new FormData()
    form.append("file", imgFile, fileName)

    const res = await axios({
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data'
        },
        url: '/api/saveImageToGGDrive',
        data: form
    })

    const imgURLGGdrive = res.data

    return imgURLGGdrive
}

export const getGGDriveImgURLViewWithId = (imgId: string) => {
    return `https://drive.google.com/uc?id=${imgId}&export=download`
}

export interface InputImgObject {
    url: string;
    name: string;
}

type GroupOfDisplayingImg = 'ps' | 'before' | 'after' | 'Unknown';
export interface OutputImgObject {
    group: GroupOfDisplayingImg;
    url: string;
}

export const extractIssueImageData = (imgsInfoParsed: any): OutputImgObject[] | [] => {
    if (isEmpty(imgsInfoParsed)) {
        return []
    }
    const outputArray: OutputImgObject[] = imgsInfoParsed.map((item: InputImgObject) => {
        if(!item.name) {
            return {}
        }
        const nameParts = item.name.split('_');
        const group = (nameParts.length >= 2 ? nameParts[1] : 'Unknown') as GroupOfDisplayingImg; // Assuming "Unknown" when group name is missing or in an incorrect format

        return {
            group,
            url: item.url,
        };
    });
    return outputArray;
}

export const getIssueStatusColor = (status: string) => {
    switch (status) {
        case "รับเรื่องปัญหา":
            return "#CDCDCD"
        case "กำลังดำเนินการ":
            return "#F6B14A"
        case "ดำเนินการเรียบร้อย":
            return "#79D741"
        case "นอกเขตพื้นที่":
            return "black"
        case "ที่ส่วนบุคคล":
            return "blue"
    }
}

export const severityMapper = (severity: string) => {
    switch (severity) {
        case 'วิกฤติ':
            return 'red'
        case 'ด่วน':
            return 'orange'
        case 'ปานกลาง':
            return 'yellow'
        case 'รอได้':
            return 'grey'
        default:
            return 'grey'
    }
}
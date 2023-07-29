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
    console.log("🚀 ~ file: uiHelper.ts:53 ~ extractIssueImageData ~ imgsInfoParsed:", imgsInfoParsed)
    if(isEmpty(imgsInfoParsed)) {
        return []
    }
    const outputArray: OutputImgObject[] = imgsInfoParsed.map((item: InputImgObject) => {
        const nameParts = item.name.split('_');
        const group = (nameParts.length >= 2 ? nameParts[1] : 'Unknown') as GroupOfDisplayingImg; // Assuming "Unknown" when group name is missing or in an incorrect format

        return {
            group,
            url: item.url,
        };
    });
    return outputArray;
}
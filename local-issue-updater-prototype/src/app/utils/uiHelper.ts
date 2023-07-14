import axios from "axios"
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
    form.append("file", imgFile)

    const res = await axios({
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data'
        },
        url: 'api/saveImageToGGDrive',
        data: form
    })

    const imgURLGGdrive = res.data

    return imgURLGGdrive
}
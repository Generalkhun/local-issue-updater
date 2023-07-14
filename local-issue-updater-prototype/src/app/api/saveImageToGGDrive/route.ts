import { google } from "googleapis";
import type { NextApiResponse } from "next";
import { get } from "lodash";
import { getGoogleDriveAuthConfig } from "@/app/utils/apiHelper";

export async function uploadFile(file: any) {
    let authServiceAccount;
    const googleDriveAuthConfig = await getGoogleDriveAuthConfig()
    try {
        authServiceAccount = await google.auth.getClient(googleDriveAuthConfig);
    } catch (error) {
        throw new Error(error as string)
    }
    const drive = google.drive({ version: "v3", auth: authServiceAccount });
    const media = {
        body: file.stream()
    };

    try {
        const savedFile = await drive.files.create(
            {
                media,
                requestBody: {
                    name: file.name,
                    mimeType: file.type,
                    parents: ["1jwb4lNcF-cgTvfzb4LD2QwYNmmMTevTG"], // remove when on prod
                },
            }
        )
        return savedFile

    } catch (error: any) {
        throw new Error(error)
    }

}
export const config = {
    api: {
        bodyParser: false,
    },
};
export async function POST(req: any, res: NextApiResponse) {
    const formData = await req.formData();
    const file = formData.get('file');
    const savedFile = await uploadFile(file)
    //res.status(200).json({ imgIdGGdrive: get(savedFile, 'data.id') });
};
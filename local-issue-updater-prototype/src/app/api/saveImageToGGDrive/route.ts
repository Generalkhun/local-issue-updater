import fs from "fs";

import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
// import {
//     DRIVE_API_TARGET_FOLDER_ID,
// } from "../../constants";
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
    const data = fs.createReadStream(file.path);
    const media = {
        body: data,
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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const form = new formidable.IncomingForm();
    //save file in ggdrive with auth
    form.parse(req, async function (err: any, _, files: any) {
        console.error('error on parsing a form image:', err)
        const file = files.file;
        const savedFile = await uploadFile(file) // upload file to google drive
        res.status(200).json({ imgIdGGdrive: get(savedFile, 'data.id') });
    });
};

export const config = {
    api: {
        bodyParser: false,
    },
};
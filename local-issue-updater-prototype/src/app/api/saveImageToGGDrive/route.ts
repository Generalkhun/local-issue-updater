import { google } from "googleapis";
import type { NextApiResponse } from "next";
import { get } from "lodash";
import { getGoogleDriveAuthConfig } from "@/app/utils/apiHelper";
import fs from 'fs'
import path from "path";
import { NextResponse } from "next/server";

// Function to save a File object to a given directory.
const saveFileToDirectory = async (file: File, targetDirectory: string): Promise<string> => {
    // Check if the target directory exists. If not, create it.
    if (!fs.existsSync(targetDirectory)) {
        fs.mkdirSync(targetDirectory, { recursive: true });
    }

    // Construct the file path using the target directory and the file name.
    const filePath = path.join(targetDirectory, file.name);

    // Use the fs module to write the file to the target directory.
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFile(filePath, Buffer.from(buffer), (err) => {
        if (err) {
            console.error('Error saving file to directory:', err);
        } else {
            console.log(`File saved successfully to: ${filePath}`);
        }
    });
    return filePath
}

async function uploadFile(file: File) {

    const filePath = await saveFileToDirectory(file, '/tmp/');

    let authServiceAccount;
    const googleDriveAuthConfig = await getGoogleDriveAuthConfig()
    try {
        authServiceAccount = await google.auth.getClient(googleDriveAuthConfig);
    } catch (error) {
        throw new Error(error as string)
    }
    const drive = google.drive({ version: "v3", auth: authServiceAccount });
    const media = {
        body: fs.createReadStream(filePath),
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
export async function POST(req: any, res: NextApiResponse) {
    const formData = await req.formData();
    const file = formData.get('file');
    const savedFile = await uploadFile(file)
    console.log("🚀 ~ file: route.ts:70 ~ POST ~ savedFile:", savedFile)
    console.log("🚀 ~ file: route.ts:70 ~ POST ~ savedFile.data:", savedFile.data)
    /**
     * @note returning data from uploadFile is as follow
     * kind: 'drive#file',
    *id: '1WIEWZJ8D7OkXcj920Utl-n6ZJt76ahoA',
    *name: 'd2d54a65-e06f-5649-39e7-fb2e9f096099_ps_0',
    *mimeType: 'image/png'
     */
    return NextResponse.json({
        imgIdGGdrive: get(savedFile, 'data.id'),
        imgNameGGdrive: get(savedFile, 'data.name'),
    })
};
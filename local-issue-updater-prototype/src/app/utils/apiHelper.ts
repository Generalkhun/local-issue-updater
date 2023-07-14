import { promises as fsp } from "fs"
import { google } from "googleapis";
import { GoogleAuthOptions } from "google-auth-library";
import { values, map, slice ,replace,get } from "lodash";


const singleObjJsonFileGenerator = async (obj: Object, path: string) => {
    const json = JSON.stringify(obj);
    try {
        await fsp.writeFile(path, json);
    } catch (error) {
        throw new Error(error as string)
    }
}

const getGoogleSheetAuthConfig = async () => {
    const ggSheetCredential = JSON.parse(
        Buffer.from(process.env.GG_SHEET_KEY_BASE64 || '', "base64").toString()
    );
    //generate a json file to store a keyfile
    await singleObjJsonFileGenerator(ggSheetCredential, '/tmp/googleSheetKeyFile.json');
    // google sheets
    const GOOGLE_SHEET_AUTH_CONFIG: GoogleAuthOptions = {
        //scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        /**
         * @note keyfile from secrets folder local test.
         * Use keyfile from generated one instead on the production with keys from the env vars
        */
        keyFile: '/tmp/googleSheetKeyFile.json',
    }
    return GOOGLE_SHEET_AUTH_CONFIG;
}

// const transformToArrayTobeAddedToGGSheet = (formData: Object, expectedLength: number) => {
//     if (Object.keys(formData).length !== expectedLength) {
//         throw new Error(`number of field must be ${expectedLength}`)
//     }
//     return values(formData)
// }
// export const saveFormToGGSheet = async (formData: any) => {

//     // transform the to arrays format 
//     const tobeAddedDataArray = transformToArrayTobeAddedToGGSheet(formData, 7)

//     // connect to the sheet 
//     const sheets = await connectGoogleSheetsApi()

//     // request 
//     const request = {
//         spreadsheetId: process.env.SHEET_ID,
//         range: SHEET_RANGE_ADD,
//         valueInputOption: 'USER_ENTERED',
//         insertDataOption: 'INSERT_ROWS',
//         requestBody: {
//             "majorDimension": "ROWS",
//             "values": [tobeAddedDataArray],
//         }
//     }
//     // append data on a google sheet row
//     const response = await sheets.spreadsheets.values.append(request)
//     return response
// }
// export const getIssuesDataFromGGSheet = async () => {
//     const sheets = await connectGoogleSheetsApi()
//     //query and return response
//     const response = await sheets.spreadsheets.values.get({
//         spreadsheetId: process.env.SHEET_ID,
//         range: 'test-issues!A1:L'
//     })
//     return formatGoogleSheetDataResponse(get(response, 'data.values'))
// }

// export const formatGoogleSheetDataResponse = (sheetDataArray: any) => {

//     // extract fields 
//     const fieldsname = sheetDataArray[0]

//     // loop through the rest and inject their field name, returned as object

//     const objectifyedRecords = map(slice(sheetDataArray, 1), (record: string[]) => {
//         let namedRecord = {}
//         for (let i = 0; i < fieldsname.length; i++) {
//             namedRecord = {
//                 ...namedRecord,
//                 [fieldsname[i]]: replace(record[i],/\\|"/g, '')
//             }
//         }
//         return namedRecord
//     })
//     return objectifyedRecords
// }
// Delete data (used for updating purpose, just delete -> add updated one)
// export const deleteGoogleSheetIssueData = async (rowNumber:number) => {
//     const sheets = await connectGoogleSheetsApi()
//     const request = {
//         // The ID of the spreadsheet to update.
//         spreadsheetId: "1Pv6xHZSKq_QXNGrI3XZWSPPuXUAL9f-YRX-B7MQrTKA",
    
//         // The A1 notation of the values to clear.
//         range: `A${rowNumber}:L${rowNumber}`,  // TODO: Update placeholder value.
//         resource: {
//           // TODO: Add desired properties to the request body.
//         },
//       };
//     return sheets.spreadsheets.values.clear(request);
// }

// export const getGoogleDriveAuthConfig = async () => {
//     const ggDriveCredential = JSON.parse(
//         Buffer.from(process.env.GG_DRIVE_KEY_BASE64 || '', "base64").toString()
//     );
//     //generate a json file to store a keyfile
//     await singleObjJsonFileGenerator(ggDriveCredential, GOOGLE_DRIVE_KEYFILE_PATH);
//     const GOOGLE_DRIVE_AUTH_CONFIG: GoogleAuthOptions = {
//         scopes: DRIVE_API_SCOPES,
//         /**
//          * @note keyfile from secrets folder local test.
//          * Use keyfile from generated one instead on the production with keys from the env vars
//         */
//         //keyFile: './secrets/googleDriveKeyFile.json'
//         keyFile: GOOGLE_DRIVE_KEYFILE_PATH,
//     }
//     return GOOGLE_DRIVE_AUTH_CONFIG;
// }



// local env

const SHEET_RANGE_ADD = 'test-issues!A1:L' // used to append a record

// This funtion is to connect googlesheet api
const connectGoogleSheetsApi = async () => {
    let auth;
    const googleSheetAuthConfig = await getGoogleSheetAuthConfig();
    try {
        auth = await google.auth.getClient(googleSheetAuthConfig)
    } catch (error) {
        throw new Error(error as string);
    }
    // connect to googlesheet 
    const sheets = google.sheets({ version: 'v4', auth })
    return sheets
}

const transformToArrayTobeAddedToGGSheet = (formData: Object, expectedLength: number) => {
    if (Object.keys(formData).length !== expectedLength) {
        throw new Error(`number of field must be ${expectedLength}`)
    }
    return values(formData)
}

/**
 * 
 * @param formData 
 * @param row by default, we will add it to the latest row. If passed, 
 * will over write the specified row with this issue. Mainly needed only when edit (delete then add updated row)
 * @returns 
 */
export const saveFormToGGSheet = async (formData: any, row?: number) => {

    // transform the to arrays format 
    const tobeAddedDataArray = transformToArrayTobeAddedToGGSheet(formData, 11)

    // connect to the sheet 
    const sheets = await connectGoogleSheetsApi()

    // request 
    const request = {
        spreadsheetId: "1Pv6xHZSKq_QXNGrI3XZWSPPuXUAL9f-YRX-B7MQrTKA",
        range: row ? `test-issues!A${row}:L${row}`:SHEET_RANGE_ADD,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: row ? 'OVERWRITE' : 'INSERT_ROWS',
        requestBody: {
            "majorDimension": "ROWS",
            "values": [tobeAddedDataArray],
        }
    }
    // append data on a google sheet row
    const response = await sheets.spreadsheets.values.append(request)
    return response
}

export const getIssuesDataFromGGSheet = async () => {
    const sheets = await connectGoogleSheetsApi()
    //query and return response
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "1Pv6xHZSKq_QXNGrI3XZWSPPuXUAL9f-YRX-B7MQrTKA",
        range: 'test-issues!A1:K'
    })
    return formatGoogleSheetDataResponse(get(response, 'data.values'))
}

export const formatGoogleSheetDataResponse = (sheetDataArray: any) => {

    // extract fields 
    const fieldsname = sheetDataArray[0]

    // loop through the rest and inject their field name, returned as object

    const objectifyedRecords = map(slice(sheetDataArray, 1), (record: string[]) => {
        let namedRecord = {}
        for (let i = 0; i < fieldsname.length; i++) {
            namedRecord = {
                ...namedRecord,
                [fieldsname[i]]: replace(record[i],/\\|"/g, '')
            }
        }
        return namedRecord
    })
    return objectifyedRecords
}


// Delete data (used for updating purpose, just delete -> add updated one)
export const deleteGoogleSheetIssueData = async (rowNumber:number) => {
    const sheets = await connectGoogleSheetsApi()
    const request = {
        // The ID of the spreadsheet to update.
        spreadsheetId: "1Pv6xHZSKq_QXNGrI3XZWSPPuXUAL9f-YRX-B7MQrTKA",
    
        // The A1 notation of the values to clear.
        range: `A${rowNumber}:L${rowNumber}`,  // TODO: Update placeholder value.
        resource: {
          // TODO: Add desired properties to the request body.
        },
      };
    return sheets.spreadsheets.values.clear(request);
}

export const getGoogleDriveAuthConfig = async () => {
    const GOOGLE_DRIVE_AUTH_CONFIG: GoogleAuthOptions = {
        scopes: ['https://www.googleapis.com/auth/drive.file'],
        /**
         * @note keyfile from secrets folder local test.
         * Use keyfile from generated one instead on the production with keys from the env vars
        */
        keyFile: './secrets/googleDriveKeyFile.json',
    }
    return GOOGLE_DRIVE_AUTH_CONFIG;
}


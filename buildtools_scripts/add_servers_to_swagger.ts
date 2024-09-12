import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

//Load env
dotenv.config();

const jsonReadFilePath = 'swagger_output.json';
const jsonOutputFilePath = './swagger_docs/swagger_output.json';
const directoryPath = path.dirname(jsonOutputFilePath);

//Read the swagger output
fs.readFile(jsonReadFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error in adding the server to swagger output json ${jsonReadFilePath}: ${err}`);
        return;
    }

    try {
        //Parse and updates the json file
        const jsonData = JSON.parse(data);
        const servers = {
            url: process.env.DDD_SWAGGER_SERVER_PROD_URL,
            description: process.env.DDD_SWAGGER_SERVER_PROD_DESCRIPTION,
        };
        jsonData.servers = [servers];
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
        //Writes the new file again
        //Check if the directory exists, create it if not
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, {recursive: true});
        }
        fs.writeFile(jsonOutputFilePath, updatedJsonData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(`Error writing to ${jsonOutputFilePath}: ${writeErr}`);
            } else {
                console.log(`Swagger output file file updated successfully with servers`);
                //Delete the old file
                fs.unlinkSync(jsonReadFilePath);
            }
        });
    } catch (jsonParseErr) {
        console.error(`Error parsing JSON from ${jsonReadFilePath}: ${jsonParseErr}`);
    }
});

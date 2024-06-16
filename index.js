import dotenv from 'dotenv';
import express from 'express';
import { AzureFileShare } from './config/AzureFileShare.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const downloadFile = async (request, response) => {
    try {
        const shareName = process.env.File_Share_Name;
        const directoryName = "your_Path" // example 2024/POC
        const fileName = "your_fileName"; // example azurefile.zip

        const azureFileShare = new AzureFileShare(shareName);

        const fileClient = azureFileShare.getFileClient(directoryName, fileName);


        const fileProperties = await fileClient.getProperties();
        const fileSize = fileProperties.contentLength;
        const downloadResponse = await fileClient.download(0);
        const readableStream = downloadResponse.readableStreamBody;

        response.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        response.setHeader('Content-Type', 'application/octet-stream');
        
        const chunkSize = 1 * 1024 * 1024;
        let bytesRead = 0;
        let isPaused = false;

        readableStream.on('data', (chunk) => {
            if (isPaused) {
                return;
            }

            response.write(chunk);
            bytesRead += chunk.length;

            if (bytesRead >= chunkSize) {
                readableStream.pause();
                isPaused = true;

                response.once('drain', () => {
                    readableStream.resume();
                    isPaused = false;
                    bytesRead = 0;
                });
            }
        });

        readableStream.on('end', () => {
            response.end();
            console.log(`File downloaded successfully: ${fileName}`);
        });

        readableStream.on('error', (error) => {
            console.error(`Error while downloading file: ${fileName}`, error);
            response.status(500).send('Error downloading the file');
        });
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
};

app.get('/download', downloadFile);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

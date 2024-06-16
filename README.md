# Azure Storage File Download

This project demonstrates how to download files in chunks from Azure File Share using Node.js.

## Features

- Downloads large files in manageable chunks.
- Uses Azure Storage SDK for Node.js.
- Handles network interruptions and resumes downloads.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Althamish16/POC-on-Azure-File-Share-Chunk-Download-with-nodeJS
cd POC-on-Azure-File-Share-Chunk-Download-with-nodeJS
npm install
```

## Configuration

1. Add necessary details in the `.env` file. Ensure you have the following environment variables configured:
   ```
   AZURE_STORAGE_ACCOUNT=<your_storage_account_name>
   AZURE_STORAGE_ACCESS_KEY=<your_storage_account_key>
   AZURE_SHARE_NAME=<your_share_name>
   ```

   Replace `<your_storage_account_name>`, `<your_storage_account_key>`, and `<your_share_name>` with your Azure Storage account details and File Share details.

2. Update the file_path and file_name with an extension in `index.js` to match your Azure file details.

## Running the Project

Start the server:

```bash
node index.js
```

## Trigger the Download

Once the server is running, access the following link in your browser to trigger the download:
```
http://localhost:8888/download
```

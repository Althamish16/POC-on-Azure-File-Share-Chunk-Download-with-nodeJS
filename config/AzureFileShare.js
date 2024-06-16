import { ShareServiceClient, StorageSharedKeyCredential } from "@azure/storage-file-share";

export class AzureFileShare {
    constructor(shareName) {
        const accountName = process.env.AzureFileShare_Account_Name;
        const accountKey = process.env.AzureFileShare_Account_Key;
        this.shareName = shareName;

        this.sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
        this.shareServiceClient = new ShareServiceClient(
            `https://${accountName}.file.core.windows.net`,
            this.sharedKeyCredential
        );
    }

    getDirectoryClient(directoryName) {
        const shareClient = this.shareServiceClient.getShareClient(this.shareName);
        return shareClient.getDirectoryClient(directoryName);
    }

    getFileClient(directoryName, fileName) {
        const directoryClient = this.getDirectoryClient(directoryName);
        return directoryClient.getFileClient(fileName);
    }
}


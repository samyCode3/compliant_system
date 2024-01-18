
import * as fs from 'fs/promises'

const folderPath = '../logs';

async function createFolderIfNotExists() {
    try {
        // Check if the folder exists
        await fs.access(folderPath);

        console.log(`Folder "${folderPath}" already exists.`);
    } catch (error) {
        // If it doesn't exist, create it
        await fs.mkdir(folderPath, { recursive: true });
        console.log(`Folder "${folderPath}" created successfully.`);
    }
}

createFolderIfNotExists();
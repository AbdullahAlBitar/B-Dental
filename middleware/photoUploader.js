const multer = require('multer');
const { google } = require('googleapis');

const apikeys = require('../apikeys.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary storage

// A Function that can provide access to google drive api
async function authorize() {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
}

// Add this function to create a folder if it doesn't exist
async function createFolder(authClient, folderName, parentFolderId) {
    const drive = google.drive({ version: 'v3', auth: authClient });

    // Check if folder exists
    const response = await drive.files.list({
        q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${parentFolderId}' in parents`,
        fields: 'files(id, name)',
        spaces: 'drive'
    });

    if (response.data.files.length > 0) {
        return response.data.files[0].id;
    }

    // Create folder if it doesn't exist
    const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId]
    };

    const folder = await drive.files.create({
        resource: fileMetadata,
        fields: 'id'
    });

    return folder.data.id;
}

// Function to upload file to Google Drive
const uploadToGoogleDrive = async (file, name) => {
    const authClient = await authorize();
    const mainFolderId = '1Oo4uhLety8X9kxL1lhBzaamC9sNDQ0lC';
    const subFolderName = name;

    const subFolderId = await createFolder(authClient, subFolderName, mainFolderId);


    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetadata = {
        name: file.originalname,
        parents: [subFolderId],
    };

    const media = {
        mimeType: file.mimetype,
        body: require('fs').createReadStream(file.path),
    };

    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink, webContentLink',
    });

    // Make the file public
    await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });

    // Clean up local file
    require('fs').unlinkSync(file.path);

    // return response.data.webContentLink; // Public URL of the file
    const publicLink = `https://drive.google.com/uc?id=${response.data.id}`;
    return publicLink;
};

module.exports = {
    upload,
    uploadToGoogleDrive
}
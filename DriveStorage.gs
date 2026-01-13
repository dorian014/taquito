/**
 * Taquito Instagram Post Generator
 * Google Drive Storage Operations
 */

const DriveStorage = {
  /**
   * Get the Taquito images folder
   */
  getFolder: function() {
    const folderId = getConfig().DRIVE_FOLDER_ID;
    return DriveApp.getFolderById(folderId);
  },

  /**
   * Save image to Drive
   * @param {Blob} imageBlob - The image blob to save
   * @param {string} filename - The filename to use
   * @returns {Object} - File info including URL and ID
   */
  saveImage: function(imageBlob, filename) {
    try {
      const folder = this.getFolder();
      const file = folder.createFile(imageBlob);
      file.setName(filename);

      // Make file publicly viewable
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      return {
        success: true,
        imageId: file.getId(),
        imageUrl: 'https://drive.google.com/uc?id=' + file.getId(),
        downloadUrl: 'https://drive.google.com/uc?export=download&id=' + file.getId()
      };
    } catch (error) {
      console.error('Error saving image to Drive:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get download URL for an image
   */
  getDownloadUrl: function(imageId) {
    return 'https://drive.google.com/uc?export=download&id=' + imageId;
  },

  /**
   * Get view URL for an image
   */
  getViewUrl: function(imageId) {
    return 'https://drive.google.com/uc?id=' + imageId;
  },

  /**
   * Get the Taquito reference image as base64
   */
  getTaquitoReferenceImage: function() {
    try {
      const imageId = getConfig().TAQUITO_IMAGE_ID;
      const file = DriveApp.getFileById(imageId);
      const blob = file.getBlob();
      const base64 = Utilities.base64Encode(blob.getBytes());
      return {
        success: true,
        base64: base64,
        mimeType: blob.getContentType()
      };
    } catch (error) {
      console.error('Error getting Taquito reference image:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete an image from Drive
   */
  deleteImage: function(imageId) {
    try {
      const file = DriveApp.getFileById(imageId);
      file.setTrashed(true);
      return { success: true };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * List recent images in the folder
   */
  listRecentImages: function(limit) {
    try {
      const folder = this.getFolder();
      const files = folder.getFiles();
      const images = [];

      while (files.hasNext() && images.length < limit) {
        const file = files.next();
        if (file.getMimeType().startsWith('image/')) {
          images.push({
            id: file.getId(),
            name: file.getName(),
            url: 'https://drive.google.com/uc?id=' + file.getId(),
            createdAt: file.getDateCreated()
          });
        }
      }

      // Sort by created date descending
      images.sort((a, b) => b.createdAt - a.createdAt);

      return { success: true, images: images };
    } catch (error) {
      console.error('Error listing images:', error);
      return { success: false, error: error.message };
    }
  }
};

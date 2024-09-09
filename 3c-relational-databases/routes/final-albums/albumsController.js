// 2a. Import the Album model
const Album = require("./albumsModel");

// 2b. Write functionality to create an album
async function createAlbum(albumData) {
  try {
    const newAlbum = await Album.create(albumData);

    return newAlbum;
  } catch (error) {
    // We throw the error back to the caller, so they can deal with it.
    throw error;
  }
}

// 2c. Export controller functions
module.exports = {
  createAlbum,
};

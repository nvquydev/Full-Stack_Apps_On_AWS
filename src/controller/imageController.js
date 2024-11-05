import { filterImageFromURL, deleteLocalFiles } from '../../util/util.js';

const __dirname = new URL('tmp', import.meta.url).pathname;
const urlRegex =
    /https?:\/\/(?:.*\.)?[\w\-]+\.[\w\-]+(\/[\w\-.,@?^=%&:/~+#]*)?\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff)(\?[^\s]*)?/g;

const savedImageController = async (req, res) => {
    try {
        const { image_url: imageUrl } = req.query;
        if (imageUrl.match(urlRegex)) {
            await filterImageFromURL(imageUrl)
                .then(({ outpath, inputURL }) => {
                    console.log(outpath);
                    res.sendFile(outpath);
                    setTimeout(() => {
                        deleteLocalFiles([outpath]);
                    }, 1000);
                })
                .catch((e) => {
                    res.status(500).json({
                        statusCode: 500,
                        httpMessage: 'Internal Server Error',
                        customMessage: e.message,
                    });
                });
            return;
        }
        throw new Error('Invalid Image URL');
    } catch (error) {
        res.status(422).json({
            statusCode: 422,
            httpMessage: 'Unprocessable Content',
            customMessage: error.message,
        });
    }
};
export default savedImageController;

import sharp from "sharp";

export async function reduceImageQuality(req, res, next) {
    if (req.file) {
        const { file: { buffer } } = req;
        req.file.buffer = await sharp(buffer).webp({ quality: 20 }).toBuffer()
    } else if (req.files) for (const file of req.files) {
        const { buffer } = file;
        file.buffer = await sharp(buffer).webp({ quality: 20 }).toBuffer()
    }
    return next()
}
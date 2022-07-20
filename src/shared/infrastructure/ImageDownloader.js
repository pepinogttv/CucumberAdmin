import axios from "axios";
import { Buffer } from "buffer";

async function downloadImage(url) {
  const { data } = await axios.get(url, {
    responseType: "arraybuffer",
  });
  return Buffer.from(data, "binary");
}

export const imageDownloader = Object.freeze({
  downloadBuffersFromUrls: async (urls) => {
    const buffers = await Promise.all(urls.map(downloadImage));
    return buffers;
  },
});

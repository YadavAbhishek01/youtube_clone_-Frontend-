const secretKey = import.meta.env.VITE_SECRET_KEY;
import CryptoJS from "crypto-js";

export const decryptData = (encryptedData) => {
    // return encryptedData
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

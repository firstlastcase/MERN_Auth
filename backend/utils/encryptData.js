import crypto from "crypto";


function encrypt(text) {
  const encryptionKey = process.env.DATA_ENCRYPTION_KEY;
  const iv = crypto.randomBytes(16); // Generate a random IV of 16 bytes (128 bits)

  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let encryptedData = cipher.update(text, "utf8", "hex");
  encryptedData += cipher.final("hex");
  
  // Combine IV and encrypted data with a delimiter (e.g., "::")
  const combinedData = iv.toString("hex") + "::" + encryptedData;
  
  return combinedData;
}



// Decryption function
function decrypt(combinedData) {
  const encryptionKey = process.env.DATA_ENCRYPTION_KEY;
    // console.log('combinedData received at the encryption function: >>> '+combinedData)
  // Split the combined data into IV and encrypted data using the delimiter (e.g., "::")
  const [ivHex, encryptedData] = combinedData.split("::");
//   console.log('ivHex: >>  '+ivHex)
//   console.log('encryptedData: >>  '+ encryptedData)
  const iv = Buffer.from(ivHex, "hex"); // Convert the IV from hexadecimal string to a buffer
//   console.log('iv: >>  '+iv)

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");

  return decryptedData;
}


export { encrypt, decrypt };

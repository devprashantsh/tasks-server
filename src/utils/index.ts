import {randomBytes} from 'crypto';
function generateUniqueId(length: number) {
  if (length % 2 !== 0) {
    throw new Error("Length must be an even number for a hexadecimal string.");
  }
  const bytes = randomBytes(length / 2);
  return bytes.toString("hex");
}

export { generateUniqueId };

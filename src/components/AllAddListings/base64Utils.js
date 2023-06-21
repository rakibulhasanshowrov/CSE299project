export const base64Decode = (str) => {
    const binaryStr = atob(str);
    const len = binaryStr.length;
    const bytes = new Uint8Array(len);
  
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
  
    return URL.createObjectURL(new Blob([bytes], { type: "image/jpg" }));
  };
  
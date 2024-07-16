// required parameter to fetch images
const urlEndpoint = import.meta.env.VITE_APP_URL_ENDPOINT;

// optional parameters (needed for client-side upload)
const publicKey = import.meta.env.VITE_APP_IMAGEKIT_PUBMIC_KEY; 
const authenticator = ()=>{
  return new Promise((resolve,reject)=>{
    resolve({signature,token,expiry})
  })
};

export {urlEndpoint,publicKey}
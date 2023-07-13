const jose = require('node-jose');

async function generateSignature(payload, privateKey) {
  try {
    // console.log(rsaJsonWebKey.kid);
    console.log("rsaJsonWebKey.kid");
    const rsaJsonWebKey = await getPrivateKey(privateKey);
    console.log(rsaJsonWebKey);
    const keystore = jose.JWK.createKeyStore();
    await keystore.add(rsaJsonWebKey);
   
    const signingKey = keystore.get(rsaJsonWebKey.kid);
    const detachedJws = await jose.JWS.createSign({ format: 'compact', fields: { alg: 'RS256', } }, signingKey)
      .update(payload, 'utf8')
      .final();

    const digitalSignature = detachedJws.replace(/\r?\n|\r/g, '');
    const output = {
      code: 200,
      data:{
        request: payload,
        signature: digitalSignature
      }
    };

    return output;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}
async function verifyDigitalSignature(payload, digitalSignature, publicKey) {
  try {
    var publicKey =  {
      kty: "RSA",
      e: "AQAB",
      use: "sig",
      kid: "2c63ce7c-87f5-41f2-baad-7ad8c938f0f1",
      n: "iCsartHZK9bvh0h7lNrqRuivhgVJ17bjmZVx-u5g690kcE_1jDmt5rjGmGERTNwLFtNmLrqfcrRX81HQaEJB9oNlPKNyRCbJk_avEVFZ6aZBvamP8QH9isO9DDxIsl0w2gKnnHZTQkliB2HhNWECgicK49T0PxW9l14pS04FAc3urNsFRSu1PhXa_m_t9faQ2ctOSPFKIKilWzS5MSqaOG7lhJqTcci9XjGuLMA29ETvO4eRo5PUSJLkguMfJPz82-lKqW6Mlo2V-ErBkPCzp6LiX9dQqg2OtVCLaMWlfy-t0FaHRTApTuvGSx_MBA9vGtJZl4CEfs_r-pRumb-0IQ",
    };
    const rsaJsonWebKey = await getPublicKey(publicKey);
    
    const verifierJws = await jose.JWS.createVerify(rsaJsonWebKey)
      .verify(digitalSignature, 'compact', payload, 'utf8');

    return verifierJws;

  } catch (ex) {
    console.error(ex);
  }

  return false;
}
 

async function getPublicKey(publicKey) {
  try {
    const rsaJsonWebKey = await jose.JWK.asKeyStore(publicKey);
    return rsaJsonWebKey.all({ use: 'sig' })[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
} 
async function getPrivateKey(privateKey) {
  try {
    const rsaJsonWebKey = await jose.JWK.asKeyStore(privateKey);
    return rsaJsonWebKey.all({ use: 'sig' })[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

 
module.exports = {
  generateSignature,
  verifyDigitalSignature,
};

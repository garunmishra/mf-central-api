const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });

const {
  submitRequestToMFCentral,
  getToken,
} = require("./helpers/encryptProcess.js");

//require('dotenv').config()

console.log(process.env);
//Dealing with data base operations
class EncryptionRepo {
  clientId = process.env.CLIENT_ID;
  clientSecret =  process.env.CLIENT_SECRET;
  encryptionKey = process.env.ENCRYPTION_KEY;
  username=  process.env.USER_NAME;
  password=  process.env.PASSWORD;
  privateKey = process.env.PRIVATE_KEY;
  publicKey = process.env.PUBLIC_KEY;

  async encrypt({ payload }) {
    try {
      if(payload.pan == undefined || payload.mobile== undefined){
        return  {code: 300, error:"Invalid Inputs"}
      }
      var url = process.env.UAT_CASE_SUMMARY_REQUEST;
console.log(process.env);
      var token = await getToken({clientId: this.clientId, clientSecret: this.clientSecret, username: this.username, password: this.password});
      if(token.access_token==undefined){
        return {code: 300, error:"Got error while generating header token"}
      }
      var data = submitRequestToMFCentral({
        url: url,
        token: token.access_token,
        clientId: this.clientId,
        encryptionKey: this.encryptionKey,
        privateKey: this.privateKey,
        PublicKey: this.publicKey,
        payload: JSON.stringify(payload),
      });
      return data;
    } catch (err) {
      console.log(err);
      return { code: 300,error: err.toString() };
    }
  }
  async compareOtp({ payload }) {
    try {
      var token = await getToken({clientId: this.clientId, clientSecret: this.clientSecret, username: this.username, password: this.password});
      if(token.access_token==undefined){
        return {code: 300, error:"Got error while generating header token"}
      }
      var url = process.env.UAT_INVESTOR_CONSENT;
      var data = await submitRequestToMFCentral({
        url: url,
        token: token.access_token,
        clientId: this.clientId,
        encryptionKey: this.encryptionKey,
        privateKey: this.privateKey,
        PublicKey: this.publicKey,
        payload: JSON.stringify(payload),
      });
      return data;
    } catch (err) {
      console.log(err);
      return { code: 300,error: err.toString() };
    }
  }

  async getData({ payload }) {
    try {
      var token = await getToken({clientId: this.clientId, clientSecret: this.clientSecret, username: this.username, password: this.password});
      if(token.access_token==undefined){
        return {code: 300, error:"Got error while generating header token"}
      }
      var url = process.env.UAT_GET_CAS_DOC;
      var data = submitRequestToMFCentral({
        url: url,
        token: token.access_token,
        clientId: this.clientId,
        encryptionKey: this.encryptionKey,
        privateKey: this.privateKey,
        PublicKey: this.publicKey,
        payload: JSON.stringify(payload),
      });
      return data;
    } catch (err) {
      console.log(err);
      return { code: 300,error: err.toString() };
    }
  }

}

module.exports = EncryptionRepo;

const axios = require("axios");
const CryptUtils = require("../../../utils/crypto");
var request = require("request");
const {
  generateSignature,
  verifyDigitalSignature,
} = require("./generateSignature.js");
const {Base64} = require('js-base64');
require('dotenv').config()
console.log(process.env);


function getToken({clientId, clientSecret, username, password}) {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: process.env.UAT_AUTH_TOKEN,
      qs: {
        username: username,
        password: password,
        grant_type: "password",
      },
      headers: {
        "postman-token": "b5f728e6-679c-d6a0-ba22-4c3ed4f7c3ee",
        "cache-control": "no-cache",
        authorization: "Basic " + Base64.encode(`${clientId}:${clientSecret}`),
        "content-type": "application/x-www-form-urlencoded",
      },
    };
    

    request(options, function (error, response, body) {
      if (error) resolve({ code: 300 });
      resolve(JSON.parse(body));
    });
  });
}

function callMFCentralApi({ url, data, headers }) {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: url,
      headers: headers,
      body: data,
      json: true,
    };
    console.log(options);
    request(options, function (error, response, body) {
      if (error) resolve({ code: 300 });
      console.log(response.statusCode);
      resolve(body);
    });
  });
}

// function generateSignature1({ body }) {
//   return new Promise((resolve, reject) => {
//     var options = {
//       method: "POST",
//       url: "https://uatservices.mfcentral.com/api/test/generateSignature",
//       headers: {
//         "postman-token": "f7d33c6e-549c-a24e-d212-747b68d44b0b",
//         "cache-control": "no-cache",
//         key: `{"keys":[{"p":"5LMQm4GanvxPsOo6vhghrTpfMOk0BDKT5RbAM8klrxaWGXybEv_et7cgUW59YOlRYaMlXfrK1th5sA7lBL7hU2gC-kZ6n05P6T_moNu2NL6pdxG5NE300I3gtCtFeTJUugya_VsF1spq_a4MNbAg1M0igTFDygi4czYgA5QTnb0","kty":"RSA","q" : "mGxWgRgLhUXwWifJFu55ecjz_PZQdX9N7N40lL85EeDbBT55At_qWtL98lPzkUIl-fMd_xsvDH-7dDzAHY47e17pptXHZJkQ5zsrF17V8PHLFeQiecwNC57g2HpqGOPMBWMA_IZMC86-xVC6N9X6fwOzQMgq0UczG_1BVJmy_DU","d" : "bkxsGrvE7Gv4Ll8aK6OALdwBgc_61o9AoYGaiCZbv_Krt4YtYl6-bKuzwm6uMtHy8ZRfqu5khedrbp8Q78Lr56DbeljzEB1TH1WszZxV9ptDmTwmapSwKZ0QHz8dq80s6wtHdceq_YCvtUclw7VG8OJrQc2X4xnbLyeIz4TtLV3LhUckavuQS04QVHPjZs9nVeCMcJlB5NmNF8AnUrN80dY_FbKpOIAeghcQFfkLwJQ1SqOK5kCSGEH4l0bQ7pSa_0kClmZCeZMMjbiLxb1B-b1AVs8MCR5Qiak62A-jvW_oy9WQ_hposIXtYgTqM6BuEmpW7iWX-vHj7T-GpANtoQ","e":"AQAB","use":"sig","kid":"2c63ce7c-87f5-41f2-baad-7ad8c938f0f1-ce1e8f3974e4","qi":"1G5Lnj6pVGQ55S9nELd__sKpCZEclVtqn9lFWF_qq5Vfy2ZtGVhfXiKlJGJxDf3Lo5C9i9K2Yg78YLzJnxcAShLe-0yocw-fKNUvd52uAYJEDrxTmot2-_mu4MibDL6f_GojfRRo2MzgSyt_wUKnkDg_iSJZITgF5pYJKq_kakI","dp":"j5Zpl-kAZk9tzVrSdOV7x2I9v9y6_uOufYgSNrFUyqA4r1nPl1c0w03jqZzgdUcoBFBFNsMuNUQG6uX_HkKmABLuw6oadQjbHUw0hcxMksMebRagnFlRmttpOFVushBKp-EgMm_Cs7-0-v8axV6GznTY9Bo1QJTHEfbqlLSUuFU","dq":"JmOS3eyqaiSVRn-iu-3QFoYwPVPkK9OmUrQcViJbQ094mjeDzt-KbNmbL_9I5xrb6bn7oha8oM9C7SGn2UnLXWUoP-az03hhs3tJfRdbltWvKpJMxJRJ7NVVF_Cs7BvjdK_cvb0tRgQKNDQC0rFH59mMuhIwBomCK9h7Lc2QMMk","n":"iCsartHZK9bvh0h7lNrqRuivhgVJ17bjmZVx-u5g690kcE_1jDmt5rjGmGERTNwLFtNmLrqfcrRX81HQaEJB9oNlPKNyRCbJk_avEVFZ6aZBvamP8QH9isO9DDxIsl0w2gKnnHZTQkliB2HhNWECgicK49T0PxW9l14pS04FAc3urNsFRSu1PhXa_m_t9faQ2ctOSPFKIKilWzS5MSqaOG7lhJqTcci9XjGuLMA29ETvO4eRo5PUSJLkguMfJPz82-lKqW6Mlo2V-ErBkPCzp6LiX9dQqg2OtVCLaMWlfy-t0FaHRTApTuvGSx_MBA9vGtJZl4CEfs_r-pRumb-0IQ"}]}`,
//         authorization: "Bearer xXlvzBg7aPb_Bexx7ksiJOqRSUc",
//         clientid: "finedge",
//         "content-type": "text/plain",
//       },
//       body: body,
//     };
//     console.log(options);
//     request(options, function (error, response, body) {
//       if (error) reject({ code: 300 });
//       var temp = JSON.parse(body);
//       if (temp["x-jws-signature"] != undefined) {
//         var obj = {};
//         obj.signature = temp["x-jws-signature"];
//         obj.request = temp["payload"];
//         resolve({ code: 200, data: obj });
//       } else {
//         reject({ code: 300 });
//       }
//     });
//   });
// }

async function submitRequestToMFCentral({
  url,
  token,
  clientId,
  encryptionKey,
  privateKey,
  publicKey,
  payload,
}) {
  console.log("Encryption Process started v1");
  console.log(payload);
  const encryptedText = CryptUtils.encryptDecrypt(
    "ENCRYPT",
    payload,
    encryptionKey
  );
  console.log(encryptedText);

  var mfcRequest = await generateSignature(encryptedText, privateKey);
  console.log(mfcRequest);
  var obj = undefined;
  if (mfcRequest.code == 200) {
    console.log("... Signature Generated...");
    obj = mfcRequest.data;
  }

  const headers = {
    "Content-Type": "application/json",
    ClientId: clientId,
    Authorization: `Bearer ${token}`,
  };
  if (obj == undefined) {
    return { code: 200, error: "Got error while generating signature" };
  }

  try {
   
    var result = await callMFCentralApi({ url, data: obj, headers });
   
    // const isVerified = await verifyDigitalSignature(result.response, result.signature, publicKey);
    // console.log(isVerified);
    // if (!isVerified) {
    //   return null;
    // }

    var decryptedText = CryptUtils.encryptDecrypt(
      "DECRYPT",
      result.response,
      encryptionKey
    );
   

    if (!decryptedText || decryptedText.trim().length === 0) {
      if(url == "https://services.mfcentral.com/api/client/V1/investorconsent"){
        return {code: 200,message: "OTP Matched"};
      }
      return null;
    }

    console.log("Response from MFCentral:", JSON.parse(decryptedText));
    return {code: 200,data: JSON.parse(decryptedText)};
  } catch (error) {
    console.log(error)
    return {code: 300,error: error.toString()};;
  }
}

module.exports = {
  submitRequestToMFCentral,
  getToken,
};

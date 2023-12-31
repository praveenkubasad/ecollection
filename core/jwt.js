const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// paths of certificates that are generated for creating JWT
const _privateKeyPath = "../keys/private.pem";
const _publicKeyPath = "../keys/public.pem";
const _privateRefreshKeyPath = "../keys/privater.pem";
const _publicRefreshKeyPath = "../keys/publicr.pem";

const SIGN_ALGORITHM = "RS256";
const TOKEN_EXPIRED = "Token Expired";
const FILE_ENCODING_UTF8 = "utf8";
const secretKey = 'TEST'
const ACCESS_TOKEN_EXPIRES = '2h'
const REFRESH_TOKEN_EXPIRES='5d'
class JWTHandler {
  constructor() {
    //this._fetchKeys();
  }

  _fetchKeys() {
    console.log("fetching keys");
    /* 
      1. Reading keys from respective files and storing them inside variables

      2. path.join(__dirname, _privateKeyPath)
         the above line just pulls out current directory path and appends
         it to the path where the keys exist

      3. We parse the data stored in files in utf-8 encoding
    */
    this._fetchPrivateKeyA();
    this._fetchPrivateKeyR();
    this._fetchPublicKeyA();
    this._fetchPublicKeyR();
  }

  _fetchPrivateKeyA() {
    this._privateKey = fs.readFileSync(
      path.join(__dirname, _privateKeyPath),
      FILE_ENCODING_UTF8
    );
  }

  _fetchPublicKeyA() {
    this._publicKey = fs.readFileSync(
      path.join(__dirname, _publicKeyPath),
      FILE_ENCODING_UTF8
    );
  }

  _fetchPrivateKeyR() {
    this._RprivateKey = fs.readFileSync(
      path.join(__dirname, _privateRefreshKeyPath),
      FILE_ENCODING_UTF8
    );
  }

  _fetchPublicKeyR() {
    this._RpublicKey = fs.readFileSync(
      path.join(__dirname, _publicRefreshKeyPath),
      FILE_ENCODING_UTF8
    );
  }

  // Creates an accessToken storing the email as payload
  // it uses the specified cert for creating jwt
  async genAccessToken(email,role) {
    // checking if privateKey cert is loaded
    // if not loaded, then this will reload the cert
    // if (!this._privateKey) {
    //   // console.log("re fetching key");
    //   this._fetchPrivateKeyA();
    // }

    // fetch expiry time from .env
    return this._genJWT(
      this._payloadAccessToken(email,role),
      secretKey,
      ACCESS_TOKEN_EXPIRES
    );
  }

  // Creates a refreshToken storing the user_id as payload
  // it uses the specified cert for creating jwt
  async genRefreshToken(user_id,role) {
    // if (!this._RprivateKey) {
    //   // console.log("re fetching refresh key");
    //   this._fetchPrivateKeyR();
    // }

    // fetch expiry time from .env
    return this._genJWT(
      this._payloadRefreshToken(user_id,role),
      secretKey,
      REFRESH_TOKEN_EXPIRES
    );
  }

  // returns decoded data of accessToken
  verifyAccessToken(token) {
    return this._decodeJWT(token, secretKey);
  }

  // returns decoded data of refreshToken
  verifyRefreshToken(token) {
    return this._decodeJWT(token, secretKey);
  }

  // decodes jwt and returns if it's valid and expiry or other errors
  _decodeJWT(token, secretKey) {
    try {
      return { valid: true, data: jwt.verify(token, secretKey) };
    } catch (err) {
      if (err.name.includes("TokenExpiredError")) {
        return { valid: false, error: TOKEN_EXPIRED };
      }
      return { valid: false, error: err };
    }
  }

  // signs a jwt token using specified details
 async _genJWT(payload, cert, expiresIn) {
    // return jwt.sign(payload, cert, {
    //   expiresIn: expiresIn,
    //   algorithm: SIGN_ALGORITHM,
    // });
    const token = await jwt.sign(payload,cert,{ expiresIn: expiresIn })
    return token
  }

  // returns accessToken's payload
  // uses authId, which is the mongodb id for the `auth` collection
  _payloadAccessToken(authId,role) {
    return {
      // aud: process.env.TOKEN_AUDIENCE,
      // sub: process.env.TOKEN_SUBJECT + "_AccessToken",
      // iss: process.env.TOKEN_ISSUER,
      authId: authId,
      role:role
    };
  }

  // returns refreshToken's payload
  // uses userId, which is the mongodb id for the `user` collection
  _payloadRefreshToken(userId,role) {
    return {
      // aud: process.env.TOKEN_AUDIENCE,
      // sub: process.env.TOKEN_SUBJECT + "_RefreshToken",
      // iss: process.env.TOKEN_ISSUER,
      userId: userId,
      role:role
    };
  }
}

const jwtInstance = new JWTHandler();

module.exports = jwtInstance;

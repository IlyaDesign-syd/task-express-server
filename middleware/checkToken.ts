import { auth }  from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN, // e.g. 'https://your-tenant.auth0.com/'
  tokenSigningAlg: 'RS256'
});

module.exports = jwtCheck;
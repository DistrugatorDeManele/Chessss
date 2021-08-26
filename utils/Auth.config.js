const config = {
  domain: 'dev-siz1fhi3.eu.auth0.com', // e.g., joel-1.auth0.com
  clientID: 'LpQoWiE53IpYKkNeJSOn5XQBObw322Wb', //e.g. 8zOgTfK4Ga1KaiFPNFen6gQstt2Jvwlo
  responseType: 'token id_token',
  audience: '', // e.g., https://joel-1.auth0.com/userinfo
  scope: 'openid profile',
  redirectUri: `${window.location.protocol}//${window.location.hostname}:${
    window.location.port
  }${window.location.pathname}callback`
};

export default config;

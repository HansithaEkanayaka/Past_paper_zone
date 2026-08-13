export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    try {
      // 1. Google OAuth2 Access Token එක ලබා ගැනීම
      const accessToken = await getGoogleAccessToken(
        env.GOOGLE_CLIENT_EMAIL,
        env.GOOGLE_PRIVATE_KEY
      );

      // 2. මෙතැනදී ඔබට අවශ්‍ය Google API එකක් වෙත ඉල්ලීම් යැවිය හැක
      return new Response(JSON.stringify({ success: true, token: accessToken }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
};

// JWT සාදා Google Token Endpoint එකෙන් Access Token ලබාගැනීමේ ක්‍රියාවලිය
async function getGoogleAccessToken(clientEmail: string, privateKeyPEM: string): Promise<string> {
  const HEADER = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  
  const PAYLOAD = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets", // ඔබට අවශ්‍ය Google API Scope එක මෙහි දමන්න
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = btoa(JSON.stringify(HEADER)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const encodedPayload = btoa(JSON.stringify(PAYLOAD)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  // Private Key එක PEM ආකෘතියෙන් සකස් කර CryptoKey එකක් බවට පත් කිරීම
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  let pemContents = privateKeyPEM;
  
  if (privateKeyPEM.includes(pemHeader)) {
    pemContents = privateKeyPEM.substring(
      privateKeyPEM.indexOf(pemHeader) + pemHeader.length,
      privateKeyPEM.indexOf(pemFooter)
    );
  }
  
  const binaryDerString = atob(pemContents.replace(/\s/g, ''));
  const binaryDer = new Uint8Array(binaryDerString.length);
  for (let i = 0; i < binaryDerString.length; i++) {
    binaryDer[i] = binaryDerString.charCodeAt(i);
  }

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // අත්සන් කිරීම (Signing)
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput)
  );

  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = `${signingInput}.${encodedSignature}`;

  // Google OAuth2 Token Endpoint වෙත ඉල්ලීම යැවීම
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  });

  const data: any = await response.json();
  if (!data.access_token) {
    throw new Error(`Failed to get access token: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}
const fs = require('fs');
const fetch = globalThis.fetch || require('node-fetch');

function parseEnv(path) {
  if (!fs.existsSync(path)) return {};
  const content = fs.readFileSync(path, 'utf8');
  const lines = content.split(/\r?\n/);
  const out = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

(async () => {
  try {
    const env = parseEnv('.env');
    const apiKey = env.VITE_FIREBASE_API_KEY || env.REACT_APP_FIREBASE_API_KEY || env.FIREBASE_API_KEY;
    if (!apiKey) {
      console.error('No se encontró VITE_FIREBASE_API_KEY en .env');
      process.exit(2);
    }

    const email = `test+${Date.now()}@example.com`;
    const password = 'Test1234!';

    console.log('Creando usuario de prueba:', email);

    const signUpRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    const signUpJson = await signUpRes.json();
    if (!signUpRes.ok) {
      console.error('Error en signUp:', signUpJson);
      process.exit(3);
    }
    console.log('signUp OK:', { localId: signUpJson.localId });

    // Ahora intento login
    const signInRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    const signInJson = await signInRes.json();
    if (!signInRes.ok) {
      console.error('Error en signIn:', signInJson);
      process.exit(4);
    }
    console.log('signIn OK:', { idToken: !!signInJson.idToken, localId: signInJson.localId });

    // Verifico lookup
    const lookupRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: signInJson.idToken })
    });
    const lookupJson = await lookupRes.json();
    if (!lookupRes.ok) {
      console.error('Error en lookup:', lookupJson);
      process.exit(5);
    }
    console.log('lookup OK:', lookupJson.users && lookupJson.users[0] && { email: lookupJson.users[0].email, uid: lookupJson.users[0].localId });

    console.log('Prueba completada con éxito.');
    process.exit(0);
  } catch (err) {
    console.error('Excepción:', err);
    process.exit(1);
  }
})();
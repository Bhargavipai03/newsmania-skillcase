import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  console.log("Key starting with:", apiKey?.substring(0, 10));
  const res = await fetch('https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB', {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey || '',
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: "Hallo, dies ist ein Test",
      model_id: 'eleven_multilingual_v2',
    }),
  });
  console.log("Status:", res.status);
  if (!res.ok) {
    console.log("Error:", await res.text());
  } else {
    console.log("Success, got audio of size:", (await res.arrayBuffer()).byteLength);
  }
}
test();

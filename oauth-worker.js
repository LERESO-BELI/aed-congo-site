import { Router } from 'itty-router';

const router = Router();

router.get('/auth', (request, env) => {
  return Response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user`
  );
});

router.get('/callback', async (request, env) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const result = await response.json();

  if (result.error) {
    return new Response(JSON.stringify(result), { status: 400 });
  }

  // Ce script renvoie le token au CMS via un message posté à la fenêtre parente
  return new Response(
    `<html><body><script>
      (function() {
        function recieveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({
              token: result.access_token,
              provider: 'github',
            })}',
            e.origin
          );
        }
        window.addEventListener("message", recieveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })()
    </script></body></html>`,
    { headers: { 'content-type': 'text/html' } }
  );
});

export default {
  fetch: router.handle,
};

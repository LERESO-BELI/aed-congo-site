const GITHUB_CLIENT_ID = 'Ov23liT1NlXG03ZfabE9';
const GITHUB_CLIENT_SECRET = '29da384cd7f83806206b1727afc8b1f07d6fc615';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';

    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/auth') {
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user`;
      return Response.redirect(githubAuthUrl, 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code }),
      });

      const tokenData = await tokenRes.json();
      const token = tokenData.access_token;

      if (!token) return new Response('Auth failed', { status: 401 });

      const html = `<!DOCTYPE html><html><body><script>
        (function() {
          function receiveMessage(e) {
            window.opener.postMessage('authorization:github:success:{"token":"${token}","provider":"github"}', e.origin);
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
      </script></body></html>`;

      return new Response(html, { headers: { 'Content-Type': 'text/html', ...corsHeaders } });
    }

    return new Response('AED Congo OAuth Server is Running', { headers: corsHeaders });
  }
};

// Vercel Edge Middleware — HTTP Basic Auth gate.
// Runs at the edge before any file is served. Credentials come from
// env vars (BASIC_AUTH_USER / BASIC_AUTH_PASS) set in the Vercel dashboard.
export const config = { matcher: '/:path*' };

export default function middleware(request) {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASS;

  // TEMPORARY diagnostic — reports only presence + length, never the values.
  if (new URL(request.url).searchParams.has('__authcheck')) {
    return new Response(JSON.stringify({
      userSet: typeof expectedUser === 'string' && expectedUser.length > 0,
      passSet: typeof expectedPass === 'string' && expectedPass.length > 0,
      userLen: expectedUser ? expectedUser.length : 0,
      passLen: expectedPass ? expectedPass.length : 0,
    }), { status: 200, headers: { 'content-type': 'application/json', 'x-robots-tag': 'noindex, nofollow' } });
  }

  const header = request.headers.get('authorization');
  if (header && header.startsWith('Basic ')) {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(':');
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    if (user === expectedUser && pass === expectedPass) {
      return; // credentials match — let the request through
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="The Excelsior Club", charset="UTF-8"',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

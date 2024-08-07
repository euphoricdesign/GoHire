import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  async callback(req:any, res:any) {
    try {      
      const result = await handleCallback(req, res);
      
      
      return result;
    } catch (error:any) {
      console.error('Detailed callback error:', error);
      res.status(error.status || 500).end(JSON.stringify(error, null, 2));
    }
  }
});
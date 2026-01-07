declare global {
  namespace Express {
    interface Request {
      cookies: {
        token?: string;
      } & Record<string, string>;
    }
  }
}

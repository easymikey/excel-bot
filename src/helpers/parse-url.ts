export const parseUrl = (url: string) => {
  const parsedUrl = new URL(url);

  return {
    protocol: parsedUrl.protocol,
    host: parsedUrl.host,
    hostname: parsedUrl.hostname,
    pathname: parsedUrl.pathname,
    href: parsedUrl.href,
    path: parsedUrl.pathname
  };
};

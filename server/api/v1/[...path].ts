export default defineEventHandler((event) => {
  const apiBase = process.env.API_BASE ?? "https://pt-api.jianyuelab.net";
  return proxyRequest(event, `${apiBase}${event.path}`);
});

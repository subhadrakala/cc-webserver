import { server } from './server.js'

const PORT = Number(process.env.PORT) || 80;
const HOST = process.env.HOST || "127.0.0.1";


server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});
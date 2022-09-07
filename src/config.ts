export const ttlSeconds = parseInt(process.env.RZ_TIMEOUT ?? '60');
export const maxBytes = parseInt(process.env.RZ_MAX_BYTES ?? '10240');
export const port = parseInt(process.env.RZ_POST ?? '8080');

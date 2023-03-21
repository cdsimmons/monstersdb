import { IncomingMessage } from "http";


export const capitalize = (string?: string) => {
	if (!string) { return; }
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getBaseUrl = (req: IncomingMessage) => {
	const protocol = req.headers['x-forwarded-proto'] || 'http';
	const baseUrl = req ? `${protocol}://${req.headers.host}` : '';

	return baseUrl;
}
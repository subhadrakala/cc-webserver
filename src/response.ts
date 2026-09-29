import fs from 'node:fs';
import { RequestData } from './request.js';
import path from 'node:path';

export function buildResponse(request: RequestData) : string {

    let filePath = './www' + request.path;
    if (request.path == '/'){
        filePath += 'index.html'
    }
    const absolutePath = path.resolve(filePath);
    const wwwDir = path.resolve('./www');

    if (absolutePath.startsWith(wwwDir)) {
        if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile()){
                try {
                    const data = fs.readFileSync(absolutePath, 'utf-8');
                    return `${request.version} 200 OK\r\n\r\n${data}`;
                }
                catch (error) {
                    return `${request.version} 500 Internal Server Error\r\n\r\nError reading file: ${error}`;
                }
        } else {
            return `${request.version} 404 Not Found\r\n\r\nRequested path not found: ${request.path}\r\n`;
        }
    }
    else {
        return `${request.version} 403 Forbidden\r\n\r\nAccess denied.\r\n`;
    }
}
import fs from 'node:fs';
import { RequestData } from './request.js';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

export function buildResponse(request: RequestData) : string {

    let filePath = './www' + request.path;
    if (request.path == '/'){
        filePath += 'index.html'
    }
    const absolutePath = path.resolve(filePath);
    if (request.path.includes('/cgi-bin/')) {
        const res = spawnSync(absolutePath, [], { encoding: 'utf-8'});
        let [headers, ...resbody] = res.stdout.split('\n\n');
        let formattedheaders = headers.replace(/\n/g, '\r\n');
        return `${request.version} 200 OK\r\n${formattedheaders}\r\n\r\n${resbody.join('\n\n')}`;
    }

    const wwwDir = path.resolve('./www');

    if (absolutePath.startsWith(wwwDir)) {
        if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile()){
                try {
                    const data = fs.readFileSync(absolutePath, 'utf-8');
                    return `${request.version} 200 OK\r\nContent-Type: text/html\r\n\r\n${data}`;
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
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs'
import { buildResponse } from '../src/response'
import { RequestData } from '../src/request';

describe('buildResponse test', () => {
    test('build response for valid path in request', () => {
        const request: RequestData = {
            method: 'GET',
            path: '/index.html',
            version: 'HTTP/1.1',
            headers: {}
        }
        const res = buildResponse(request);
        assert.strictEqual(res, 'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n' + fs.readFileSync('./www/index.html'));
        
    });

     test('build response for root path in request', () => {
        const request: RequestData = {
            method: 'GET',
            path: '/',
            version: 'HTTP/1.1',
            headers: {}
        }
        const res = buildResponse(request);
        assert.strictEqual(res, 'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n' + fs.readFileSync('./www/index.html'));
        
    });

         test('build response for access denied', () => {
        const request: RequestData = {
            method: 'GET',
            path: '/../../etc/passwd',
            version: 'HTTP/1.1',
            headers: {}
        }
        const res = buildResponse(request);
        assert.strictEqual(res, 'HTTP/1.1 403 Forbidden\r\n\r\nAccess denied.\r\n');
        
    });

         test('build response for missing file', () => {
        const request: RequestData = {
            method: 'GET',
            path: '/notfound',
            version: 'HTTP/1.1',
            headers: {}
        }
        const res = buildResponse(request);
        assert.strictEqual(res, 'HTTP/1.1 404 Not Found\r\n\r\nRequested path not found: /notfound\r\n');
        
    });

});
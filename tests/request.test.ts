import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { parseRequest } from '../src/request';

describe('Test parseRequest', () => {
    test('should parse a valid request', () => {
        const data = "GET / HTTP/1.1\r\nHost: localhost\r\n\r\n";
        const request = parseRequest(data);
        assert.strictEqual(request.method, "GET");
        assert.strictEqual(request.path, "/");
        assert.strictEqual(request.version, "HTTP/1.1");
        assert.deepStrictEqual(request.headers, {"Host": "localhost"});
    });

    test('should parse a request with body', () => {
        const data = "POST /submit HTTP/1.1\r\nHost: localhost\r\nContent-Length: 11\r\n\r\nHello World";
        const request = parseRequest(data);
        assert.strictEqual(request.method, "POST");
        assert.strictEqual(request.path, "/submit");
        assert.strictEqual(request.version, "HTTP/1.1");
        assert.deepStrictEqual(request.headers, {"Host": "localhost", "Content-Length": "11"});
        assert.strictEqual(request.body, "Hello World\n");
    });

    test('should parse a request with no body', () => {
        const data = "GET / HTTP/1.1\r\nHost: localhost\r\n\r\n";
        const request = parseRequest(data);
        assert.strictEqual(request.method, "GET");
        assert.strictEqual(request.path, "/");
        assert.strictEqual(request.version, "HTTP/1.1");
        assert.deepStrictEqual(request.headers, {"Host": "localhost"});
        assert.strictEqual(request.body, undefined);
    });
});
# cc-webserver

A basic HTTP/1.1 web server built from scratch in TypeScript using Node.js raw TCP sockets — built as part of the [Coding Challenges](https://codingchallenges.fyi/challenges/challenge-webserver) series.

## Features

- HTTP/1.1 request parsing (method, path, version, headers, body)
- Static file serving from a `www/` directory
- Default `index.html` for `/` requests
- 404 for missing files, 403 for path traversal attempts
- CGI support — execute scripts in `cgi-bin/` and stream their output
- Concurrent connections via Node.js async I/O
- Path traversal protection using `path.resolve()`
- Unit tests using Node.js built-in `node:test`

## Project Structure

```
cc-webserver/
├── src/
│   ├── index.ts        # Entry point — starts the server
│   ├── server.ts       # TCP server, handles connections
│   ├── request.ts      # HTTP request parser
│   └── response.ts     # HTTP response builder (file serving + CGI)
├── tests/
│   ├── request.test.ts # Unit tests for request parser
│   └── response.test.ts# Unit tests for response builder
├── www/
│   ├── index.html      # Default HTML page
│   └── cgi-bin/
│       └── hello.sh    # Example CGI script
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js v20+
- npm

### Install

```bash
npm install
```

### Run (development)

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Run (production)

Port 80 requires elevated privileges on macOS/Linux:

```bash
sudo npm start
```

### Run Tests

```bash
npm test
```

## Usage

### Serve a static file

```bash
curl http://localhost/
curl http://localhost/index.html
```

### CGI — dynamic content

Place executable scripts in `www/cgi-bin/`. The script's stdout (headers + body) is returned as the HTTP response.

```bash
curl http://localhost/cgi-bin/hello.sh
```

Example CGI script (`www/cgi-bin/hello.sh`):
```bash
#!/bin/bash
echo "Content-Type: text/html"
echo ""
echo "<h1>Hello from CGI!</h1>"
echo "<p>The time is: $(date)</p>"
```

### Security

Path traversal is blocked — requests like `/../../etc/passwd` return `403 Forbidden`. Only files inside `www/` are served.

## Configuration

| Environment Variable | Default     | Description        |
|---------------------|-------------|--------------------|
| `PORT`              | `80`        | Port to listen on  |
| `HOST`              | `127.0.0.1` | Host to bind to    |

```bash
PORT=8080 HOST=0.0.0.0 npm run dev
```

## HTTP Response Codes

| Code | Meaning               | When                              |
|------|-----------------------|-----------------------------------|
| 200  | OK                    | File found and served             |
| 403  | Forbidden             | Path traversal attempt detected   |
| 404  | Not Found             | File does not exist               |
| 500  | Internal Server Error | Error reading file                |

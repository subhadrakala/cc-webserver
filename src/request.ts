
export interface RequestData {
    method: string;
    path: string;
    version: string;
    headers: Record<string, string>;
    body?: string | undefined;
}

export function parseRequest(data: string) : RequestData {
    const [line1, ...rest] = data.split('\r\n');
    const [method, path, version] = line1.split(' ');

    const headers : Record<string, string> = {};
    let body: string | undefined = "";
    let readingHeaders = true;

    for (const line of rest) {
        if (line === "") {
            readingHeaders = false;
            continue;
        }
        if (readingHeaders) {
            const [key, value] = line.split(": ");
            headers[key] = value;
        }

        if (!readingHeaders) {
            body += line + "\n";
        }
    }

    if(body === ""){
        body = undefined;
    }

    let returnData: RequestData = {
        method,
        path,
        version,
        headers: headers,
        body: body
    }

    return returnData;
 }
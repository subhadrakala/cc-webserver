
export interface RequestData {
    method: string;
    path: string;
    version: string;
    headers: Record<string, string>;
    body?: string;
}

export function parseRequest(data: string) : RequestData {
    const [line1, ...rest] = data.split('\r\n');
    const [method, path, version] = line1.split(' ');

    let returnData: RequestData = {
        method,
        path,
        version,
        headers: {},
        body: ""
    }

    return returnData;
 }
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { Agent } from 'https';
import { getConfig } from '@/app/config';

const { host, port, custom_headers } = getConfig();

interface Realm {
    type: string;
    comment: string;
    realm: string;
}

interface ResponseData {
    data: Realm[];
}

export async function GET(request: Request): Promise<Response> {
    try {
        const cookieHeader = request.headers.get('cookie');

        if (!cookieHeader) {
            return NextResponse.json({ error: 'No token found' }, { status: 401 });
        }

        const token = cookieHeader?.split(';').find((cookie) => cookie.includes('token'))?.split('=')[1];
        const response = await fetch(`https://${host}:${port}/api2/json/cluster/resources`, {
            method: 'GET',
            headers: {
                ...custom_headers,
                "cookie": `PVEAuthCookie=${token}`,
            },
            agent: new Agent({ rejectUnauthorized: false }),
        });

        const data = await response.json() as ResponseData;

        return NextResponse.json(data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch realms' }, { status: 500 });
    }
}

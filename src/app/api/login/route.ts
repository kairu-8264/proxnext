import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { Agent } from 'https';
import { getConfig } from '@/app/config';

const { host, port, custom_headers } = getConfig();

export async function POST(request: Request): Promise<Response> {
    try {
        const { username, password, realm } = await request.json();

        const postData = new URLSearchParams({
            username,
            password,
            realm
        }).toString();

        const response = await fetch(`https://${host}:${port}/api2/json/access/ticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...custom_headers,
            },
            body: postData,
            agent: new Agent({ rejectUnauthorized: false }),
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}

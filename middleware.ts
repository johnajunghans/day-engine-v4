import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    const allowedOrigins = [
        'http://localhost:3000',
        'https://www.dayengine.com',
    ];
    const origin = request.headers.get('origin') || '';

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
        if (allowedOrigins.includes(origin)) {
            return new NextResponse(null, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': origin,
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                },
            });
        }
        return new NextResponse('CORS not allowed', { status: 403 });
    }

    // Update session and create a response
    const response = await updateSession(request);

    // Add CORS headers if origin is allowed
    if (allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - image files (svg, png, jpg, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};

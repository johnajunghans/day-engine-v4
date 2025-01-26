import { NextResponse } from "next/server"
import { createClient } from "../supabase/server"

type Table = "Rituals" | "Ritual_Instances"

export async function insert(req: Request, table: string) {
    const allowedOrigins = [
        'http://localhost:3000',
        'https://www.dayengine.com',
    ];

    const origin = req.headers.get('origin') || '';

    if (req.method === 'OPTIONS') {
        // Handle preflight request
        if (allowedOrigins.includes(origin)) {
            return new NextResponse(null, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': origin,
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
        }
        return new NextResponse('CORS not allowed', { status: 403 });
    }

    if (req.method === 'POST') {
        const supabase = await createClient();
        const newItem = await req.json();

        const { data, error } = await supabase
            .from(table)
            .insert(newItem)
            .select()
            .single();

        if (error) {
            console.error('Insert error:', error);
            return NextResponse.json({ message: error.message, status: error.code }, { status: 400 });
        }

        return new NextResponse(JSON.stringify({ data, status: 201 }), {
            headers: {
                'Access-Control-Allow-Origin': origin,
                'Content-Type': 'application/json',
            },
        });
    }

    return new NextResponse('Method not allowed', { status: 405 });
}

export async function update(req: Request, table: Table) {
    const supabase = await createClient()
    const updatedItem = await req.json()

    const { data, error } = await supabase.from(table)
        .update(updatedItem)
        .eq('id', updatedItem.id)
        .select()
        .single()

    if (error) {
        console.log("Update error:", error)
        return NextResponse.json({ message: error.message, status: error.code })
    }

    return NextResponse.json({ data, status: 201 })
}

export async function deleteItem(req: Request, table: Table) {
    const supabase = await createClient()
    const id = await req.json()

    const { error } = await supabase.from(table)
        .delete()
        .eq('id', id)
    
    if (error) {
        console.log("Delete error:", error)
        return NextResponse.json({ message: error.message, status: error.code })
    }

    return NextResponse.json({ status: 204 })
}

import { NextResponse } from "next/server"
import { createClient } from "../supabase/server"

type Table = "Rituals" | "Ritual_Instances"

export async function insert(req: Request, table: Table) {
    const supabase = await createClient()
    const newItem = await req.json()

    const { data, error } = await supabase.from(table)
        .insert(newItem)
        .select()
        .single()

    if (error) {
        console.log("Insert error:", error)
        return NextResponse.json({ error: error.message })
    }

    return NextResponse.json({ data, status: 201 })
}
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
        return NextResponse.json({ message: error.message, status: error.code })
    }

    return NextResponse.json({ data, status: 201 })
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

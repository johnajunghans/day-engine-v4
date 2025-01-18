import { deleteItem, insert, update } from "@/lib/functions/api-functions";

export async function POST(req: Request) {
    const res = await insert(req, "Rituals")
    return res
}

export async function PUT(req: Request) {
    const res = await update(req, "Rituals")
    return res
}

export async function DELETE(req: Request) {
    const res = await deleteItem(req, "Rituals")
    return res
}
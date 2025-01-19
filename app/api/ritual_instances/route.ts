import { insert, update } from "@/lib/functions/api-functions";

export async function POST(req: Request) {
    const res = await insert(req, "Ritual_Instances")
    return res
}

export async function PUT(req: Request) {
    const res = await update(req, "Ritual_Instances")
    return res
}
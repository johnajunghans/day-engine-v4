import { insert } from "@/lib/functions/api-functions";

export async function POST(req: Request) {
    const res = await insert(req, "Rituals")
    return res
}


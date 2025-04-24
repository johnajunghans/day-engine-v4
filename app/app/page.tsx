import { redirect } from "next/navigation"

export default function Dashboard() {

    redirect('/app/rhythm')

    return (
        <div>Homepage</div>
    )
}
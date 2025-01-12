import { createClient } from "@/lib/supabase/server";
import Navbar from "./(site)/(components)/navbar";

export default async function Home() {

  const supabase = await createClient()
  const { data } = await supabase.auth.getSession()

  return (
    <div className="font-[family-name:var(--font-philosopher)]">
      <Navbar session={data.session} />
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import Navbar from "./(site)/(components)/navbar";
import Image from "next/image";

export default async function Home() {

  const supabase = await createClient()
  const { data } = await supabase.auth.getSession()

  return (
    <div className="font-[family-name:var(--font-philosopher)] relative ">
      <Navbar session={data.session} />
      <Image priority src="/logo.png" alt="logo" width={300} height={300} className="animate-logo-spin absolute top-[calc(50%-150px)] left-[calc(50%-150px)]" />
    </div>
  );
}

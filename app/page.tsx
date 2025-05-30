import { createClient } from "@/lib/supabase/server";
import Navbar from "./(site)/(components)/navbar";
import Image from "next/image";
import ConcentricCirclesOfText from "./(site)/(components)/circular-text";

export default async function Home() {

  const supabase = await createClient()
  const { data } = await supabase.auth.getSession()

  return (
    <div className="font-[family-name:var(--font-philosopher)] relative min-h-screen overflow-hidden">
      <Navbar session={data.session} />
      <Image priority src="/logo.png" alt="logo" width={280} height={280} className="animate-logo-spin z-50 absolute top-[calc(50%-140px)] left-[calc(50%-140px)]" />
      <ConcentricCirclesOfText />
    </div>
  );
}

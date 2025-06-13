import Secoes from "@/components/Secoes/Secoes"
import Destaques from "@/components/Destaques/Destaques"

export default async function Home() {
  return (
    <div className="">
      <Destaques />
      <Secoes />
    </div>
  );
}

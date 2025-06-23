import Secoes from "./components/Secoes"
import Destaques from "./components/Destaques"

export default async function Home() {
  return (
    <div className="">
      <Destaques />
      <Secoes />
    </div>
  );
}

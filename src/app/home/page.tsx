"use client";

import Contact from "../contact/page";
import Content from "../content/page";
import Welcome from "../welcome/page";
import Boxes from "@/components/boxes";

export default function Home() {
  const contents = [
    { key: 1,title: "Home",  container: <Welcome /> },
    { key: 2,title: "Pesquisar CEP", container: <Content /> },
    { key: 3, title: "Contato", container: <Contact /> },
  ]
  return (
    <div>
      <Boxes
        contents={contents}
      />
    </div>
  );
}

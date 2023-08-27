"use client";

import Contact from "../contact/page";
import Content from "../content/page";
import Welcome from "../welcome/page";
import Boxes from "@/components/boxes";

export default function Home() {
  return (
    <div>
      <Boxes
        contents={[
          { key: 1, container: <Welcome /> },
          { key: 2, container: <Content /> },
          { key: 2, container: <Contact /> },
        ]}
      />
    </div>
  );
}

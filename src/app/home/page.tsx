"use client";

import Welcome from "../welcome/page";
import Boxes from "@/components/boxes";

export default function Home() {
  return (
    <div>
      <Boxes
        contents={[
          { key: 1, container: <Welcome /> },
          { key: 2, container: <Welcome /> },
        ]}
      />
    </div>
  );
}

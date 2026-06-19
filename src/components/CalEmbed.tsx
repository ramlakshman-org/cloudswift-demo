"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CAL_LINK, CAL_UI_CONFIG } from "@/lib/cal";

export function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", CAL_UI_CONFIG);
    })();
  }, []);

  return (
    <Cal
      calLink={CAL_LINK}
      config={{ layout: "month_view" }}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
    />
  );
}

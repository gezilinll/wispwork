import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { WispApp } from "./app/WispApp";
import "./app/app.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WispApp />
  </StrictMode>,
);

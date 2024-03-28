import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePIXI from "./components/game_pixi/index";
import StoreProvider from "./store/store";
// import AccessDenied from "./components/AccessDenied";
// import PageWrapper from "./components/PageWrapper";

const rootElement = document.getElementById("root") || new HTMLDivElement()
// export const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL
ReactDOM.createRoot(rootElement).render(
  <StoreProvider>
    <BrowserRouter>
      <Routes>
        <Route path="slot/:gameId">
          <Route index element={<GamePIXI />} />
          {/* <Route path="show-history" element={<BetHistory />} /> */}
          {/* <Route path="detail/:id" element={<BetHistoryDetails />} /> */}
        </Route>
        {/* <Route path="*" element={<PageWrapper><AccessDenied /></PageWrapper>} /> */}
      </Routes>
    </BrowserRouter>

  </StoreProvider>
);

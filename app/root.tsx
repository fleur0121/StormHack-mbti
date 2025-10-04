import React from "react";
import { Outlet } from "react-router";

export default function Root() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>StormHack</title>
      </head>
      <body>
        <div id="root">
          {/* Render route children */}
          <Outlet />
        </div>
      </body>
    </html>
  );
}

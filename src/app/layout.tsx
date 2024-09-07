"use client";
import { Provider } from "react-redux";
import { makeStore } from "../redux/store";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
      <Provider store={makeStore()}>
        <html lang="en">
          <link rel="icon" href="/images/favicon.ico" sizes="any" />
          <body suppressHydrationWarning={true}>
            <ToastContainer position="bottom-center" theme="dark" />
            {children}
          </body>
        </html>
      </Provider>
    </GoogleOAuthProvider>
  );
}

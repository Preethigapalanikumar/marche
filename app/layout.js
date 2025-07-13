
import { Layouts } from "./Layouts/Layouts";
import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layouts>
        {children}
        </Layouts>
      </body>
    </html>
  );
}

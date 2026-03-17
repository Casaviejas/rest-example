import { RouterProvider } from 'react-router';
import { Toaster } from "react-hot-toast";
import { router } from "./routes/router";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;


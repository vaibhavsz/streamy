import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import MainContainer from "./components/MainContainer";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WatchPage from "./components/WatchPage";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "watch",
          element: <WatchPage />
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <div className="App">
        {/* <h1 className="text-3xl font-bold">Streamy!!</h1> */}
        <Head />
        <RouterProvider router={appRouter}>
          <Body />
        </RouterProvider>
      </div>
    </Provider>
  );
}

/**
 * Head
 * Body
 *  Sidebar
 *   MenuItems
 * MainContainer
 *  ButtonsList
 *  VideoContainer
 *   VideoCard
 *
 */

export default App;

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './component/error/notfound';
import Homepage from './component/homepage/homepage';
import { Login, Profile } from './component/account'

// todo: extract router to a separate file
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <NotFound />,
  }

]);


// https://tkdodo.eu/blog/react-query-and-type-script
// https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function?from=reactQueryV3
// const baseUrl = 'http://localhost:4000/api'
const queryClient = new QueryClient(
  //   {
  //   defaultOptions: {
  //     queries: {
  //       queryFn: async ({ queryKey: [url] }) => {
  //         // ✅ narrow the type of url to string
  //         // so that we can work with it
  //         if (typeof url === 'string') {
  //           const { data } = await axios.get(
  //             `${baseUrl}/${url.toLowerCase()}`
  //           )
  //           return data
  //         }
  //         throw new Error('Invalid QueryKey')
  //       },
  //     },
  //   },
  // }
)

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>

  );
}

export default App;

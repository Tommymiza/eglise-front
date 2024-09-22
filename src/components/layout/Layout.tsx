import { Suspense } from "react";
import Loading from "./Loading";

const Layout = ({ children }: any) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default Layout;

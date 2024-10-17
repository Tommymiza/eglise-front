import { AuthLayout } from "@/components/layout/auth/AuthLayout";
import { SidebarLayout } from "@/components/layout/office/OfficeLayout";
import { Toaster } from "@/components/ui/sonner";
import React, { Fragment } from "react";

export default function layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Fragment>
      <Toaster richColors position="top-right" />
      <AuthLayout>
        <SidebarLayout>{children}</SidebarLayout>
      </AuthLayout>
    </Fragment>
  );
}

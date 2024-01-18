import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppShell, Button, Flex } from "@mantine/core";

import { PageLoader } from "@/components/__commons";
import { Menu } from "./Menu";
import { useAuth } from "@/core/providers";
import { useLogout } from "@/core/services/auth";
import { IconLogout } from "@tabler/icons-react";

export function PrivateLayout() {
  const { user, authenticated } = useAuth();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
  }

  useEffect(() => {
    if (!authenticated || user === null) {
      navigate("/");
    }
  }, [user, authenticated, navigate]);

  if (user === null) return <PageLoader />;

  return (
    <AppShell
      layout="alt"
      padding="md"
      header={{ height: 64 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
      }}
    >
      <AppShell.Header>
        <Flex align="center" justify="flex-end" h="100%" px="md">
          <Button
            onClick={() => handleLogout()}
            variant="outline"
            color="red"
            size="compact-sm"
            rightSection={<IconLogout size={16} />}
            loading={logoutMutation.isLoading}
          >
            Sair
          </Button>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Menu />
      </AppShell.Navbar>
      <AppShell.Main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}

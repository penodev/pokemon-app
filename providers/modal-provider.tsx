"use client";

import { PekeManageModal } from "@/components/modals/poke-manage-modal";
import React, { useEffect, useState } from "react";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <PekeManageModal />
    </div>
  );
}

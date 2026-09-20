"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Confirma a compra de forma mockada (sem banco de dados) e
// redireciona para a Home após uma pequena animação de sucesso.
export default function ConfirmPurchaseButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    setDone(true);
    setTimeout(() => router.push("/home"), 1600);
  }

  if (done) {
    return (
      <div className="bg-brand-green-light text-brand-green text-sm font-semibold text-center rounded-2xl py-3.5 slide-up">
        Compra confirmada! Redirecionando...
      </div>
    );
  }

  return (
    <button onClick={handleConfirm} disabled={loading} className="btn-primary">
      {loading ? "Processando..." : "Confirmar compra"}
    </button>
  );
}

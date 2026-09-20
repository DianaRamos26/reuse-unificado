"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// TELA — ESQUECI MINHA SENHA
// Fluxo mockado (sem backend/e-mail real): sempre mostra a mesma
// mensagem de confirmação, boa prática de segurança para não revelar
// quais e-mails estão cadastrados.
export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Informe um e-mail válido.");
      return;
    }
    setError(null);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    setSent(true);
  }

  return (
    <main className="min-h-screen flex flex-col fade-in">
      <div className="status-bar">
        <span>9:41</span>
        <span>●●● 5G 🔋</span>
      </div>

      <div className="flex items-center px-5 pt-2 pb-1">
        <Link href="/login" className="p-2 -ml-2 text-brand-plum">
          <ChevronLeft size={22} />
        </Link>
      </div>

      <div className="px-7 pt-6 flex-1">
        <h2 className="text-2xl font-bold text-brand-plum">
          Esqueci minha senha
        </h2>

        {sent ? (
          <div className="slide-up flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-light text-brand-green text-2xl">
              ✓
            </div>
            <p className="text-sm text-brand-plum/70 max-w-[260px]">
              Se <strong className="text-brand-plum">{email}</strong> estiver
              cadastrado no ReUse, você vai receber um e-mail com o link para
              redefinir sua senha em alguns instantes.
            </p>
            <Link href="/login" className="text-brand-pink font-semibold text-sm mt-2">
              Voltar para o login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-brand-plum/60 text-sm mt-1 mb-8">
              Informe o e-mail cadastrado e enviaremos instruções de
              recuperação
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-field">E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className="input-field"
                  autoComplete="email"
                />
              </div>
              {error && (
                <p className="text-xs text-red-500 bg-red-50 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}
              <button type="submit" disabled={loading} className="btn-primary mt-2">
                {loading ? "Enviando..." : "Enviar instruções"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// TELA — CADASTRO
// Objetivo: criação de conta (nome, e-mail, senha) mantendo a mesma
// identidade visual do Login. Fluxo mockado (sem backend/DB): valida
// os campos no front-end e redireciona para o Login ao concluir.
export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.name.trim().length < 2) {
      setError("Informe seu nome completo.");
      return;
    }
    if (form.password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    router.push("/login?cadastro=sucesso");
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
        <h2 className="text-2xl font-bold text-brand-plum">Crie sua conta</h2>
        <p className="text-brand-plum/60 text-sm mt-1 mb-8">
          Junte-se ao ReUse e comece a dar um novo destino aos seus itens
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Nome completo</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Como podemos te chamar?"
              className="input-field"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="label-field">E-mail</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="voce@email.com"
              className="input-field"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="label-field">Senha</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Mínimo de 6 caracteres"
              className="input-field"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="label-field">Confirmar senha</label>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Repita a senha"
              className="input-field"
              autoComplete="new-password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary mt-2">
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="text-center text-sm text-brand-plum/60 mt-8">
          Já tem conta?{" "}
          <Link href="/login" className="text-brand-pink font-semibold">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}

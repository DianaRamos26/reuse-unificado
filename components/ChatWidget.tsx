"use client";

import { useEffect } from "react";
import { MessageCircle } from "lucide-react";

// Integração oficial do "Web Channel" do watsonx Orchestrate (chat embutido).
// As credenciais NÃO ficam no código — vêm de variáveis de ambiente
// públicas (NEXT_PUBLIC_*), configuradas no painel da Vercel.
declare global {
  interface Window {
    wxOConfiguration?: Record<string, unknown>;
  }
}

const ORCHESTRATION_ID = process.env.NEXT_PUBLIC_WXO_ORCHESTRATION_ID;
const HOST_URL = process.env.NEXT_PUBLIC_WXO_HOST_URL;
const CRN = process.env.NEXT_PUBLIC_WXO_CRN;
const AGENT_ID = process.env.NEXT_PUBLIC_WXO_AGENT_ID;

const isConfigured = Boolean(ORCHESTRATION_ID && HOST_URL && CRN && AGENT_ID);

export default function ChatWidget() {
  useEffect(() => {
    if (!isConfigured || document.getElementById("wxo-loader-script")) return;

    window.wxOConfiguration = {
      orchestrationID: ORCHESTRATION_ID,
      hostURL: HOST_URL,
      rootElementID: "root",
      deploymentPlatform: "ibmcloud",
      crn: CRN,
      chatOptions: {
        agentId: AGENT_ID,
      },
      // Cores da marca ReUse aplicadas ao widget (rosa), em vez do azul
      // padrão da IBM — opção documentada e suportada pelo watsonx
      // Orchestrate, sem CSS por fora.
      style: {
        headerColor: "EC1E79",
        primaryColor: "EC1E79",
        userMessageBackgroundColor: "EC1E79",
        showBackgroundGradient: false,
      },
    };

    const script = document.createElement("script");
    script.id = "wxo-loader-script";
    script.src = `${HOST_URL}/wxochat/wxoLoader.js?embed=true`;
    script.addEventListener("load", () => {
      // @ts-expect-error — injetado pelo script do watsonx Orchestrate
      window.wxoLoader?.init();
    });
    document.head.appendChild(script);
  }, []);

  if (!isConfigured) {
    return (
      <button
        type="button"
        title="Configure as variáveis NEXT_PUBLIC_WXO_* para ativar o assistente ReUse Bot"
        className="absolute bottom-24 right-4 z-50 w-12 h-12 rounded-full bg-brand-pink text-white shadow-button flex items-center justify-center active:scale-90 transition-transform"
      >
        <MessageCircle size={22} />
      </button>
    );
  }

  return null;
}
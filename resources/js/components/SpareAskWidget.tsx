// resources/js/Components/SpareAskWidget.tsx
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export default function SpareAskWidget() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "system",
      content:
        "Hai, aku SpareAsk—chatbot di situs ini. Tanyakan apa pun tentang bengkel & sparepart motor ✨",
    },
  ]);
  const boxRef = useRef<HTMLDivElement>(null);
  const csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setSending(true);

    try {
      const res = await fetch("/chatbot/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf || "",
          Accept: "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply: string = data?.reply || "Maaf, aku belum bisa menjawab pertanyaan itu.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "⚠️ Gagal terhubung ke SpareAsk. Coba lagi ya." },
      ]);
    } finally {
      setSending(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <>
      {/* FAB: tertutup -> oranye + label; terbuka -> bulat '×' */}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-orange-500 shadow-xl hover:bg-orange-600 transition px-4 py-3 text-white"
          aria-label="Buka SpareAsk"
          title="Buka SpareAsk"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M4 4h16v12H7l-3 3V4z" />
          </svg>
          <span className="font-semibold">SpareAsk</span>
        </button>
      ) : (
        <button
          onClick={() => setOpen(false)}
          className="fixed bottom-6 right-6 z-50 grid place-items-center w-12 h-12 rounded-full bg-orange-600 text-white shadow-xl hover:bg-orange-700 transition text-2xl leading-none"
          aria-label="Tutup SpareAsk"
          title="Tutup SpareAsk"
        >
          ×
        </button>
      )}

      {/* Panel chat (kontras untuk dark theme) */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[360px] max-w-[92vw] rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden">
          <header className="flex items-center gap-2 px-4 py-3 border-b bg-white">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white grid place-items-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M4 4h16v12H7l-3 3V4z" />
              </svg>
            </div>
            <div className="font-semibold text-neutral-900">SpareAsk</div>
            {/* header tidak perlu tombol close lagi, karena FAB sudah jadi "×" */}
          </header>

          <div ref={boxRef} className="h-[400px] overflow-y-auto p-4 space-y-3 bg-neutral-50">
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const bubble =
                isUser
                  ? "bg-orange-600 text-white"
                  : m.role === "system"
                  ? "bg-white text-neutral-800 border"
                  : "bg-white text-neutral-800 border";

              return (
                <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow ${bubble}`}>
                    {m.content}
                  </div>
                </div>
              );
            })}
            {sending && <div className="text-xs text-neutral-500">SpareAsk sedang mengetik…</div>}
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Tulis pertanyaanmu"
                className="flex-1 rounded-full border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 placeholder-neutral-400 text-neutral-900"
              />
              <button
                onClick={sendMessage}
                disabled={sending || !input.trim()}
                className="shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white grid place-items-center hover:bg-orange-700 disabled:opacity-50"
                title="Kirim"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

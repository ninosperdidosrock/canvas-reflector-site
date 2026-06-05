const WHATSAPP_NUMBER = "34677760670";
const WHATSAPP_MESSAGE = "¡Hola Niños Perdidos! Me gustaría hablar con vosotros.";

export function WhatsAppFab() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_28px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-200 pl-4 pr-5 py-3"
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
        className="h-6 w-6"
      >
        <path d="M16.003 3C9.374 3 4 8.373 4 15c0 2.385.696 4.604 1.895 6.475L4 29l7.7-1.864A11.94 11.94 0 0 0 16.003 27C22.632 27 28 21.627 28 15S22.632 3 16.003 3Zm0 21.799a9.81 9.81 0 0 1-4.992-1.365l-.358-.213-4.572 1.107 1.124-4.452-.234-.371A9.74 9.74 0 0 1 6.2 15c0-5.404 4.401-9.799 9.802-9.799S25.8 9.596 25.8 15s-4.398 9.799-9.797 9.799Zm5.376-7.34c-.294-.148-1.74-.86-2.01-.959-.27-.099-.467-.148-.664.149-.196.296-.762.96-.935 1.157-.172.197-.345.222-.639.074-.294-.148-1.243-.458-2.367-1.462-.875-.781-1.466-1.745-1.639-2.041-.172-.296-.018-.456.13-.604.133-.133.294-.345.442-.518.148-.172.197-.296.295-.493.099-.197.05-.37-.025-.518-.074-.148-.664-1.6-.91-2.193-.24-.576-.485-.498-.664-.508l-.566-.01c-.197 0-.518.074-.79.37-.27.296-1.034 1.01-1.034 2.462s1.059 2.855 1.207 3.052c.148.197 2.085 3.184 5.05 4.464.706.305 1.256.487 1.685.624.708.225 1.353.193 1.864.117.569-.085 1.74-.711 1.986-1.397.246-.686.246-1.273.172-1.397-.074-.124-.27-.197-.564-.345Z" />
      </svg>
      <span className="text-sm font-semibold tracking-wide hidden sm:inline">
        WhatsApp
      </span>
    </a>
  );
}

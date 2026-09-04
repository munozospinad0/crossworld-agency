import {getTranslations} from 'next-intl/server';
import {dutyChannel} from '@/content/site';

/**
 * Botón flotante en celular con el canal directo del oficial de guardia:
 * WhatsApp si hay número configurado, si no el teléfono de operaciones.
 */
export async function DutyButton() {
  const t = await getTranslations('Cta');
  const wa = await getTranslations('Wa');
  const duty = dutyChannel(wa('general'));
  return (
    <a
      href={duty.href}
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border border-ink/8 bg-white/90 px-4 py-3 text-[0.95rem] font-medium text-ink shadow-soft backdrop-blur lg:hidden"
    >
      {t(duty.label)}
    </a>
  );
}

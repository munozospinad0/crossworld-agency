import {getTranslations} from 'next-intl/server';
import {site, whatsappHref} from '@/content/site';

export async function WhatsAppButton() {
  const t = await getTranslations('Cta');
  const c = await getTranslations('Common');
  return (
    <a
      href={whatsappHref()}
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-3 text-[0.95rem] font-medium text-ink shadow-1 lg:hidden"
      title={site.whatsapp.confirm ? c('toConfirm') : undefined}
    >
      {t('whatsapp')}
    </a>
  );
}

import {getTranslations} from 'next-intl/server';
import {ButtonLink} from '@/components/ui/Button';

export default async function NotFound() {
  const t = await getTranslations('NotFound');
  return (
    <section className="py-[clamp(56px,7vw,104px)]">
      <div className="wrap max-w-[60ch]">
        <p className="font-mono text-[0.8rem] text-muted">404</p>
        <h1 className="t-h2">{t('title')}</h1>
        <p className="mt-3">{t('text')}</p>
        <div className="mt-5">
          <ButtonLink href="/">{t('home')}</ButtonLink>
        </div>
      </div>
    </section>
  );
}

import {getTranslations} from 'next-intl/server';
import {StickyStack} from '@/components/motion/StickyStack';

export async function PortCallProcess() {
  const t = await getTranslations('Home');
  const steps = t.raw('process') as {n: string; title: string; text: string; when: string}[];
  return (
    <section id="process" className="deep relative py-[clamp(72px,9vw,128px)] text-on-dark">
      <div className="wrap">
        <div className="mb-12 max-w-[64ch]">
          <h2 className="t-h2 text-white">{t('processTitle')}</h2>
          <p className="mt-2 text-[1.08rem] text-on-dark-muted">{t('processSub')}</p>
        </div>
        <StickyStack steps={steps} />
      </div>
    </section>
  );
}

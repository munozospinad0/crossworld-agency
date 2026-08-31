import {getTranslations} from 'next-intl/server';
import {CanalJourney, type Stage} from '@/components/motion/CanalJourney';

export async function CanalCrossing() {
  const t = await getTranslations('Journey');
  const stages = t.raw('stages') as Stage[];
  return (
    <section id="crossing" className="deep py-[clamp(72px,9vw,120px)] text-on-dark">
      <div className="wrap">
        <div className="mb-4 max-w-[64ch]">
          <h2 className="t-h2 text-white">{t('title')}</h2>
          <p className="mt-2 mb-0 text-[1.08rem] text-on-dark-muted">{t('sub')}</p>
        </div>
        <CanalJourney stages={stages} hint={t('hint')} />
      </div>
    </section>
  );
}

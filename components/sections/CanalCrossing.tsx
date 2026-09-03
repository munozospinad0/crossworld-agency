import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/motion/Reveal';
import {SectionKicker} from '@/components/brand/SectionKicker';
import {CanalJourney} from '@/components/motion/CanalJourney';

/** Cruce del Canal narrado con scroll. Sin tarjetas de etapa (retiradas a pedido del cliente, 2-sep-2026). */
export async function CanalCrossing() {
  const t = await getTranslations('Journey');
  return (
    <section id="crossing" className="deep py-[clamp(72px,9vw,120px)] text-on-dark">
      <div className="wrap">
        <Reveal className="mb-2 max-w-[64ch]">
          <SectionKicker k="canal" index={3} dark />
          <h2 className="t-h2 text-white">{t('title')}</h2>
          <p className="mt-2 mb-0 text-[1.08rem] text-on-dark-muted">{t('sub')}</p>
        </Reveal>
        <CanalJourney labels={{map: t('mapLabel'), sea: t('sea'), lake: t('lake'), pacific: t('pacific'), caribbean: t('caribbean')}} />
      </div>
    </section>
  );
}

import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/motion/Reveal';

const images = ['/images/canal-transit.jpg', '/images/oil-terminal.jpg', '/images/port-cranes.jpg', '/images/container-terminal.jpg'];

export async function Audiences() {
  const t = await getTranslations('Home');
  const who = t.raw('who') as {title: string; text: string}[];
  return (
    <section id="who" className="py-[clamp(56px,7vw,104px)]">
      <div className="wrap">
        <div className="mb-9 max-w-[64ch]">
          <h2 className="t-h2">{t('whoTitle')}</h2>
          <p className="mt-2 text-[1.08rem] text-muted">{t('whoSub')}</p>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {who.map((w, i) => (
            <Reveal key={w.title} delay={i as 0 | 1 | 2 | 3}>
              <Link href="/contact" className="block h-full overflow-hidden rounded-card border border-line bg-surface transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-1">
                <div className="relative aspect-[4/3]">
                  <Image src={images[i]} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                </div>
                <div className="px-4.5 py-4">
                  <h3 className="mb-1 text-[1.05rem]">{w.title}</h3>
                  <p className="m-0 text-[0.92rem] text-text">{w.text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

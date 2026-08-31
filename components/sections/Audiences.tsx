import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/motion/Reveal';

const images = ['/images/ship-bow.jpg', '/images/oil-terminal.jpg', '/images/port-cranes.jpg', '/images/crane.jpg'];

export async function Audiences() {
  const t = await getTranslations('Home');
  const who = t.raw('who') as {title: string; text: string}[];
  return (
    <section id="who" className="border-t border-line bg-surface py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="mb-12 grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <h2 className="t-h2">{t('whoTitle')}</h2>
          <p className="m-0 text-[1.08rem] text-muted md:pb-1">{t('whoSub')}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {who.map((w, i) => (
            <Reveal key={w.title} delay={i as 0 | 1 | 2 | 3} className="shell h-full">
              <Link href="/contact" className="core group block h-full overflow-hidden bg-surface transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:hover:-translate-y-0.5 fine-pointer:hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={images[i]} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] fine-pointer:group-hover:scale-[1.04]" />
                </div>
                <div className="px-5 py-4.5">
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

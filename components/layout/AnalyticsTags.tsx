import {GoogleTagManager} from '@next/third-parties/google';

const EU = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'];

/** GTM + Consent Mode v2 por región (especificación §6). Sin NEXT_PUBLIC_GTM_ID no carga nada. */
export function AnalyticsTags() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id) return null;
  const consent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,region:${JSON.stringify(EU)}});
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});`;
  return (
    <>
      <script dangerouslySetInnerHTML={{__html: consent}} />
      <GoogleTagManager gtmId={id} />
    </>
  );
}

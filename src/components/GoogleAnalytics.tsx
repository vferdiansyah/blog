/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from 'next/script';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export type GoogleAnalyticsProps = {
  googleAnalyticsId: string;
};

export type AnalyticsConfig = {
  googleAnalytics?: GoogleAnalyticsProps;
};

/**
 * @example
 * const analytics: AnalyticsConfig = {
 *  googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
 * }
 */
type AnalyticsProps = {
  analyticsConfig: AnalyticsConfig;
};

const isProduction = process.env.NODE_ENV === 'production';

const GA = ({ googleAnalyticsId }: GoogleAnalyticsProps) => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />

      <Script strategy="afterInteractive" id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
        `}
      </Script>
    </>
  );
};

/**
 * Supports Google Analytics.
 * All components default to the hosted service, but can be configured to use a self-hosted
 * or proxied version of the script by providing the `src` / `apiHost` props.
 *
 * Note: If you want to use an analytics provider you have to add it to the
 * content security policy in the `next.config.js` file.
 * @param {AnalyticsProps} { analytics }
 * @return {*}
 */
export const Analytics = ({ analyticsConfig }: AnalyticsProps) => {
  return (
    <>
      {isProduction && analyticsConfig.googleAnalytics && (
        <GA {...analyticsConfig.googleAnalytics} />
      )}
    </>
  );
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (
  action: Gtag.EventNames,
  category: string,
  label: string,
  value: number,
) => {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

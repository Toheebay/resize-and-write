import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  className = ''
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // Check if the ad has already been initialized
        const adElement = document.querySelector(`[data-ad-slot="${adSlot}"]`);
        if (adElement && !adElement.hasAttribute('data-adsbygoogle-status')) {
          window.adsbygoogle.push({});
        }
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adSlot]);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5307036868654120"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
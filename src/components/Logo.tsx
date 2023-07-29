'use client';

import metadata from '@/data/metadata';
import { usePathname } from 'next/navigation';
import Typewriter from 'typewriter-effect';
import Link from './Link';

const Logo = () => {
  const pathname = usePathname();

  return (
    <div>
      <Link href="/" aria-label={metadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="text-primary-color dark:text-primary-color-dark flex items-center justify-between text-xl font-semibold">
            <Typewriter
              options={{
                strings: `~${pathname}`,
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Logo;

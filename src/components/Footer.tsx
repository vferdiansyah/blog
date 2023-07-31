import SocialIcon from '@/components/social-icons';
import metadata from '@/data/metadata';
import Link from './Link';

const Footer = () => {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${metadata.email}`} />
          <SocialIcon kind="github" href={metadata.github} />
          <SocialIcon kind="linkedin" href={metadata.linkedin} />
          <SocialIcon kind="twitter" href={metadata.twitter} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{metadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{metadata.title}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

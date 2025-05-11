import Link from 'next/link';

type Props = {
  slug: string;
  title: string;
  description: string;
  desktopScreenshotUrl?: string;
};

const InspirationCard = ({ slug, title, description, desktopScreenshotUrl }: Props) => (
  <Link href={`/inspirations/${slug}`}>
    <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl hover:ring-2 hover:ring-indigo-400 transition-all cursor-pointer">
      <img
        src={desktopScreenshotUrl}
        alt={title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
      </div>
    </div>
  </Link>
);

export default InspirationCard;

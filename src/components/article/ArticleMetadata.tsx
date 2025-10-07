import { Calendar, User, Clock, Eye, RefreshCw } from 'lucide-react';

interface ArticleMetadataProps {
  author?: string;
  date: string;
  readingTime?: number;
  viewCount?: number;
  category?: string;
  updatedAt?: string;
  createdAt?: string;
}

export default function ArticleMetadata({
  author,
  date,
  readingTime,
  viewCount,
  category,
  updatedAt,
  createdAt
}: ArticleMetadataProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const showUpdatedDate = updatedAt && createdAt && new Date(updatedAt).getTime() - new Date(createdAt).getTime() > 24 * 60 * 60 * 1000;

  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-600 py-4 border-y border-slate-200">
      {category && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {category}
        </span>
      )}

      {author && (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span>Published {formatDate(date)}</span>
      </div>

      {showUpdatedDate && (
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Updated {formatDate(updatedAt!)}</span>
        </div>
      )}

      {readingTime && (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{readingTime} min read</span>
        </div>
      )}

      {viewCount && viewCount > 0 && (
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>{viewCount.toLocaleString()} views</span>
        </div>
      )}
    </div>
  );
}

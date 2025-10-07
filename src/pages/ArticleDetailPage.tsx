import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArticleBySlug, incrementViewCount, Article } from '../utils/articleLoader';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';
import MetaTags from '../components/MetaTags';
import { enhancedMarkdownToHtml, extractHeadings, estimateReadingTime } from '../utils/enhancedMarkdownParser';
import TableOfContents from '../components/article/TableOfContents';
import ReadingProgress from '../components/article/ReadingProgress';
import ArticleMetadata from '../components/article/ArticleMetadata';
import { sanitizeMarkdownHtml } from '../utils/sanitizeHtml';

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [article, setArticle] = React.useState<Article | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [headings, setHeadings] = React.useState<Array<{ level: number; text: string; id: string }>>([]);
  const [readingTime, setReadingTime] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError('No article slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const fetchedArticle = await getArticleBySlug(slug);
        
        if (!fetchedArticle) {
          setError('Article not found');
        } else {
          setArticle(fetchedArticle);
          const extractedHeadings = extractHeadings(fetchedArticle.content);
          setHeadings(extractedHeadings);
          const estimatedTime = estimateReadingTime(fetchedArticle.content);
          setReadingTime(estimatedTime);

          if (fetchedArticle.id) {
            incrementViewCount(fetchedArticle.id);
          }
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">
              {error || 'The article you\'re looking for doesn\'t exist or has been moved.'}
            </p>
            <button
              onClick={() => navigate('/articles')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ErrorBoundary>
      <ReadingProgress />
      <div className="min-h-screen bg-gray-50">
        <MetaTags 
          title={article.meta_title || article.title}
          description={article.meta_description || article.excerpt}
          datePublished={article.created_at || article.date}
          dateModified={article.updated_at}
          author={article.author}
          type="Article"
          keywords={article.tags || []}
          canonicalUrl={`https://comparetheleaf.co.uk/articles/${article.slug}`}
        />
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Articles', path: '/articles' },
            { label: article.title, path: `/articles/${article.slug}` }
          ]}
        />
        
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={() => navigate('/articles')}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                {article.featured_image && (
                  <div className="relative h-72 md:h-96 overflow-hidden">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6 md:p-8 lg:p-12">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {article.title}
                  </h1>

                  {article.excerpt && (
                    <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                  )}

                  <ArticleMetadata
                    author={article.author || 'CompareTheLeaf Team'}
                    date={article.date}
                    readingTime={readingTime}
                    viewCount={article.view_count}
                    category={article.category || article.section}
                    updatedAt={article.updated_at}
                    createdAt={article.created_at}
                  />

                  <div className="prose prose-slate prose-lg max-w-none mt-8">
                    <div dangerouslySetInnerHTML={{ __html: sanitizeMarkdownHtml(enhancedMarkdownToHtml(article.content)) }} />
                  </div>
                </div>

                <div className="px-6 md:px-8 lg:px-12 pb-8">
                  <MedicalDisclaimer />
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <TableOfContents headings={headings} />
            </aside>
          </div>

          {/* CTA Section */}
          <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Find Your Perfect Clinic?
            </h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto text-lg">
              Use our clinic matching quiz to find the best medical cannabis clinic for your specific needs.
            </p>
            <button
              onClick={() => navigate('/quiz')}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-md inline-flex items-center gap-2"
            >
              Take our three-minute quiz
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
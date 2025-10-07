import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/Breadcrumbs';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  slug: string;
  featured: boolean;
}

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' }
  ];

  // Sample blog posts - in a real app, these would come from your CMS
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Understanding Medical Cannabis: A Comprehensive Guide for UK Patients',
      excerpt: 'Everything you need to know about medical cannabis in the UK, from legal requirements to finding the right clinic for your needs.',
      content: '',
      author: 'Dr. Sarah Johnson',
      publishDate: '2024-10-01',
      readTime: '8 min read',
      category: 'Education',
      tags: ['Medical Cannabis', 'UK Law', 'Patient Guide'],
      slug: 'understanding-medical-cannabis-uk-guide',
      featured: true
    },
    {
      id: '2',
      title: 'Comparing Medical Cannabis Clinics: What to Look For',
      excerpt: 'A detailed guide on how to choose the right medical cannabis clinic, including key factors to consider and questions to ask.',
      content: '',
      author: 'CompareTheLeaf Team',
      publishDate: '2024-09-28',
      readTime: '6 min read',
      category: 'Clinic Guides',
      tags: ['Clinic Comparison', 'Patient Tips', 'Healthcare'],
      slug: 'comparing-medical-cannabis-clinics-guide',
      featured: true
    },
    {
      id: '3',
      title: 'Medical Cannabis for Chronic Pain: Treatment Options and Success Stories',
      excerpt: 'Exploring how medical cannabis can help manage chronic pain conditions, with real patient experiences and clinical insights.',
      content: '',
      author: 'Dr. Michael Thompson',
      publishDate: '2024-09-25',
      readTime: '10 min read',
      category: 'Conditions',
      tags: ['Chronic Pain', 'Treatment', 'Patient Stories'],
      slug: 'medical-cannabis-chronic-pain-treatment',
      featured: false
    },
    {
      id: '4',
      title: 'The Cost of Medical Cannabis Treatment in the UK: 2024 Update',
      excerpt: 'A comprehensive breakdown of medical cannabis costs across different UK clinics, including consultation fees and medication prices.',
      content: '',
      author: 'CompareTheLeaf Research',
      publishDate: '2024-09-22',
      readTime: '7 min read',
      category: 'Pricing',
      tags: ['Costs', 'Pricing', 'UK Healthcare'],
      slug: 'medical-cannabis-costs-uk-2024',
      featured: false
    },
    {
      id: '5',
      title: 'Medical Cannabis and Mental Health: Anxiety, PTSD, and Depression Treatment',
      excerpt: 'How medical cannabis is being used to treat mental health conditions in the UK, with expert insights and patient testimonials.',
      content: '',
      author: 'Dr. Emma Wilson',
      publishDate: '2024-09-20',
      readTime: '9 min read',
      category: 'Mental Health',
      tags: ['Mental Health', 'Anxiety', 'PTSD', 'Depression'],
      slug: 'medical-cannabis-mental-health-treatment',
      featured: false
    },
    {
      id: '6',
      title: 'New Medical Cannabis Regulations: What Patients Need to Know',
      excerpt: 'Recent updates to UK medical cannabis regulations and how they affect patient access and treatment options.',
      content: '',
      author: 'Legal Team',
      publishDate: '2024-09-18',
      readTime: '5 min read',
      category: 'Legal Updates',
      tags: ['Regulations', 'Legal', 'Policy'],
      slug: 'new-medical-cannabis-regulations-uk',
      featured: false
    }
  ];

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "CompareTheLeaf Blog",
    "description": "Expert insights, guides, and updates on medical cannabis treatment in the UK",
    "url": "https://comparetheleaf.co.uk/blog",
    "publisher": {
      "@type": "Organization",
      "name": "CompareTheLeaf",
      "url": "https://comparetheleaf.co.uk"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.publishDate,
      "url": `https://comparetheleaf.co.uk/blog/${post.slug}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>Medical Cannabis Blog | Expert Insights & Guides | CompareTheLeaf</title>
        <meta name="description" content="Expert insights, patient guides, and the latest updates on medical cannabis treatment in the UK. Compare clinics, understand costs, and learn about treatment options." />
        <meta name="keywords" content="medical cannabis blog, UK cannabis news, patient guides, clinic reviews, treatment insights, CompareTheLeaf" />
        <link rel="canonical" href="https://comparetheleaf.co.uk/blog" />
        <meta property="og:title" content="Medical Cannabis Blog | Expert Insights & Guides | CompareTheLeaf" />
        <meta property="og:description" content="Expert insights, patient guides, and the latest updates on medical cannabis treatment in the UK." />
        <meta property="og:url" content="https://comparetheleaf.co.uk/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Medical Cannabis Blog | Expert Insights & Guides | CompareTheLeaf" />
        <meta name="twitter:description" content="Expert insights, patient guides, and the latest updates on medical cannabis treatment in the UK." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-6xl mx-auto mt-6">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Medical Cannabis Blog</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expert insights, patient guides, and the latest updates on medical cannabis treatment in the UK
              </p>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {category === 'all' ? 'All Posts' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Posts */}
            {selectedCategory === 'all' && featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {post.category}
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Featured
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <UserIcon className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{new Date(post.publishDate).toLocaleDateString('en-GB')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              <TagIcon className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                        >
                          Read More
                          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Posts */}
            <div className="mb-12">
              {selectedCategory !== 'all' && (
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedCategory} Articles</h2>
              )}
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <UserIcon className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                      >
                        Read More
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-green-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stay Updated</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Get the latest insights on medical cannabis treatment, clinic updates, and patient guides delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;

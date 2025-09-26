import React from 'react';
import { ArrowLeft, Calendar, Clock, ExternalLink, Share2, Bookmark, Eye, MessageCircle, ThumbsUp } from 'lucide-react';
import { getCategoryColor, getPublisherColor } from '../styles/designSystem';
import { NewsCard } from './NewsCard';

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  publisher: string;
  date: string;
  category: string;
  readTime?: string;
  isSponsored?: boolean;
  author?: string;
  content?: string;
  views?: number;
  likes?: number;
  comments?: number;
}

interface ArticleViewProps {
  article: Article;
  relatedArticles: Article[];
  onBack: () => void;
  onArticleClick: (article: Article) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  relatedArticles,
  onBack,
  onArticleClick
}) => {
  const categoryColors = getCategoryColor(article.category);
  const publisherColors = getPublisherColor(article.publisher);

  // Generate full article content (in a real app, this would come from the API)
  const fullContent = `
    ${article.description}

    The financial markets continue to evolve at an unprecedented pace, with new developments emerging daily that reshape the landscape for investors and businesses alike. Industry experts are closely monitoring these trends to provide insights that can help stakeholders make informed decisions.

    ## Key Market Indicators

    Recent analysis shows that several key indicators are pointing toward significant shifts in market dynamics. These changes are being driven by a combination of technological advancement, regulatory updates, and changing consumer behaviors.

    The impact of these developments extends beyond immediate market reactions, creating ripple effects that influence long-term strategic planning for businesses across various sectors.

    ## Industry Response

    Leading companies in the sector have begun adapting their strategies to align with these emerging trends. This proactive approach demonstrates the importance of staying ahead of market movements and positioning for future growth opportunities.

    Market analysts suggest that organizations that fail to adapt to these changes may find themselves at a competitive disadvantage in the coming quarters.

    ## Looking Forward

    As we move forward, it will be crucial to monitor how these developments continue to unfold. The interconnected nature of today's global economy means that changes in one sector can have far-reaching implications across multiple industries.

    Stakeholders are advised to maintain a close watch on these trends and consider how they might impact their own strategic initiatives and investment decisions.
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to News
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white mb-4 shadow-lg backdrop-blur-sm"
              style={{ 
                backgroundColor: `${categoryColors[500]}`,
                boxShadow: `0 8px 25px ${categoryColors[500]}40`
              }}
            >
              {article.category}
              {article.isSponsored && (
                <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs rounded-full">
                  Sponsored
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 leading-relaxed max-w-3xl">
              {article.description}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Meta */}
        <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm"
              style={{ backgroundColor: `${publisherColors[500]}` }}
            >
              <ExternalLink className="w-4 h-4" />
              {article.publisher}
            </div>
            
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{article.readTime || '5 min read'}</span>
              </div>
              {article.author && (
                <div className="text-sm">
                  By <span className="font-medium">{article.author}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Engagement Stats */}
          <div className="flex items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{article.views || '1.2k'}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{article.likes || '45'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{article.comments || '12'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Share2 className="w-4 h-4" />
            Share Article
          </button>
          <button 
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            <Bookmark className="w-4 h-4" />
            Save for Later
          </button>
          <button 
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Open Source
          </button>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-relaxed space-y-6">
            {fullContent.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="text-lg leading-relaxed mb-6">
                    {paragraph.trim()}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Was this article helpful?</span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors duration-200">
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-200 rotate-180">
                  <ThumbsUp className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">Share:</span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
            <p className="text-gray-600 text-lg">Discover more insights and analysis</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles.slice(0, 3).map((relatedArticle, index) => (
              <div
                key={relatedArticle.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <NewsCard
                  {...relatedArticle}
                  onClick={() => onArticleClick(relatedArticle)}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={onBack}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              View All Articles
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
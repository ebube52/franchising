import React from 'react';
import { Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { getCategoryColor, getPublisherColor } from '../styles/designSystem';

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  publisher: string;
  date: string;
  category: string;
  readTime?: string;
  isSponsored?: boolean;
  onClick: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  image,
  publisher,
  date,
  category,
  readTime = '3 min read',
  isSponsored = false,
  onClick
}) => {
  const categoryColors = getCategoryColor(category);
  const publisherColors = getPublisherColor(publisher);
  
  return (
    <article 
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden 
                 hover:shadow-xl hover:border-gray-200 transition-all duration-300 cursor-pointer
                 transform hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div 
          className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-sm"
          style={{ 
            backgroundColor: `${categoryColors[500]}`,
            boxShadow: `0 4px 12px ${categoryColors[500]}40`
          }}
        >
          {category}
        </div>
        
        {/* Sponsored Badge */}
        {isSponsored && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded-md">
            Sponsored
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Publisher & Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-sm"
            style={{ backgroundColor: `${publisherColors[500]}` }}
          >
            <ExternalLink className="w-3 h-3" />
            {publisher}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>
        
        {/* Read More Button */}
        <div className="flex items-center justify-between">
          <button 
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 
                       transition-colors duration-200 group/btn"
            style={{ color: `${categoryColors[600]}` }}
          >
            Read More
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
          
          {/* Reading Progress Indicator */}
          <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-300 group-hover:w-full w-0"
              style={{ backgroundColor: `${categoryColors[400]}` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};
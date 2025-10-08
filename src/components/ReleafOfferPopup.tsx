import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, Shield, Star, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import { trackPopupInteraction } from '../services/popupTrackingService';

interface ReleafOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReleafOfferPopup: React.FC<ReleafOfferPopupProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [hasTrackedShow, setHasTrackedShow] = useState(false);
  const promoCode = 'RELEAF123';
  const originalPrice = 99.99;
  const discountedPrice = 69.99;
  const discountPercentage = 30;
  const bookingUrl = 'https://tidd.ly/42d73vb';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      if (!hasTrackedShow) {
        trackPopupInteraction('shown', promoCode);
        setHasTrackedShow(true);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, hasTrackedShow, promoCode]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      toast.success('Promo code copied to clipboard!');
      trackPopupInteraction('code_copied', promoCode);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = promoCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      toast.success('Promo code copied!');
      trackPopupInteraction('code_copied', promoCode);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClaimOffer = () => {
    trackPopupInteraction('claimed', promoCode);
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    trackPopupInteraction('closed', promoCode);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-slideUp">
        <div className="relative bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors bg-black bg-opacity-20 rounded-full p-2 hover:bg-opacity-30"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center">
            <div className="inline-block bg-white text-red-600 px-4 py-1 rounded-full text-sm font-bold mb-3 animate-pulse">
              LIMITED TIME OFFER
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Wait! Don't Miss This
            </h2>
            <p className="text-xl opacity-90">Exclusive Releaf Discount</p>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {discountPercentage}% OFF
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              Your First Consultation
            </p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-2xl text-gray-400 line-through">
                £{originalPrice.toFixed(2)}
              </span>
              <span className="text-4xl font-bold text-green-600">
                £{discountedPrice.toFixed(2)}
              </span>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-dashed border-green-500 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-gray-600 mb-2">
                YOUR EXCLUSIVE PROMO CODE
              </p>
              <div className="flex items-center justify-center gap-3">
                <code className="text-2xl font-bold text-green-700 tracking-wider">
                  {promoCode}
                </code>
                <button
                  onClick={handleCopyCode}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                  aria-label="Copy promo code"
                >
                  {copied ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 font-medium mt-2">
                  Copied to clipboard!
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-gray-700">All-inclusive Releaf+ subscription at £39.99/month</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-gray-700">UK-grown pharmaceutical-grade cannabis</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-gray-700">100% money-back guarantee if unsuitable</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-semibold">4.9 Stars</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-blue-600" />
              <span className="font-semibold">2100+ Reviews</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="font-semibold">CQC Registered</span>
            </div>
          </div>

          <button
            onClick={handleClaimOffer}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Claim Your 30% Discount Now
            <ExternalLink className="h-5 w-5" />
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            Use code <span className="font-bold text-gray-700">{promoCode}</span> at checkout
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReleafOfferPopup;

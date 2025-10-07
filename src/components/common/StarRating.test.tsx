import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating', () => {
  it('renders correct number of filled stars', () => {
    const { container } = render(<StarRating value={3} />);
    const filledStars = container.querySelectorAll('.starFilled');
    expect(filledStars).toHaveLength(3);
  });

  it('renders correct number of empty stars', () => {
    const { container } = render(<StarRating value={2} />);
    const emptyStars = container.querySelectorAll('.starEmpty');
    expect(emptyStars).toHaveLength(3);
  });

  it('renders 5 stars total', () => {
    const { container } = render(<StarRating value={4} />);
    const allStars = container.querySelectorAll('svg');
    expect(allStars).toHaveLength(5);
  });

  it('handles zero rating', () => {
    const { container } = render(<StarRating value={0} />);
    const filledStars = container.querySelectorAll('.starFilled');
    const emptyStars = container.querySelectorAll('.starEmpty');
    expect(filledStars).toHaveLength(0);
    expect(emptyStars).toHaveLength(5);
  });

  it('handles maximum rating', () => {
    const { container } = render(<StarRating value={5} />);
    const filledStars = container.querySelectorAll('.starFilled');
    const emptyStars = container.querySelectorAll('.starEmpty');
    expect(filledStars).toHaveLength(5);
    expect(emptyStars).toHaveLength(0);
  });

  it('includes accessible aria-label', () => {
    render(<StarRating value={4} />);
    const rating = screen.getByRole('img');
    expect(rating).toHaveAttribute('aria-label', '4 out of 5 stars');
  });

  it('applies custom size prop', () => {
    const { container } = render(<StarRating value={3} size={24} />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveAttribute('width', '24');
      expect(star).toHaveAttribute('height', '24');
    });
  });

  it('uses default size when not specified', () => {
    const { container } = render(<StarRating value={3} />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveAttribute('width', '16');
      expect(star).toHaveAttribute('height', '16');
    });
  });

  it('has correct test id', () => {
    render(<StarRating value={3} />);
    expect(screen.getByTestId('star-rating')).toBeInTheDocument();
  });
});

import { useState, useEffect, useMemo, useCallback } from 'react';
import { todaysPicks, fashionProducts, craftProducts } from '../utils/productListMockData';

// Custom hook for optimized product search
export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Combine all products into one array for search
  const allProducts = useMemo(() => [
    ...todaysPicks.map(product => ({ ...product, category: 'todaysPicks' })),
    ...fashionProducts.map(product => ({ ...product, category: 'fashion' })),
    ...craftProducts.map(product => ({ ...product, category: 'craft' }))
  ], []);

  // Debounce search query to prevent excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fuzzy search function
  const fuzzySearch = useCallback((text, query) => {
    if (!query) return true;
    
    const searchText = text.toLowerCase();
    const searchQuery = query.toLowerCase();
    
    // Exact match
    if (searchText.includes(searchQuery)) return true;
    
    // Partial word match
    const words = searchQuery.split(' ');
    return words.every(word => searchText.includes(word));
  }, []);

  // Update isSearching when query changes
  useEffect(() => {
    if (searchQuery.trim() && searchQuery !== debouncedQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, debouncedQuery]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return {
        todaysPicks,
        fashionProducts,
        craftProducts,
        searchResults: []
      };
    }
    
    const results = allProducts.filter(product => 
      fuzzySearch(product.title, debouncedQuery) ||
      fuzzySearch(product.price, debouncedQuery) ||
      fuzzySearch(product.category, debouncedQuery)
    );
    
    return {
      todaysPicks: results.filter(p => p.category === 'todaysPicks'),
      fashionProducts: results.filter(p => p.category === 'fashion'),
      craftProducts: results.filter(p => p.category === 'craft'),
      searchResults: results
    };
  }, [debouncedQuery, allProducts, fuzzySearch]);

  // Search suggestions (for future enhancement)
  const searchSuggestions = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    
    const suggestions = new Set();
    allProducts.forEach(product => {
      const words = product.title.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.startsWith(debouncedQuery.toLowerCase()) && word.length > 2) {
          suggestions.add(word);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [debouncedQuery, allProducts]);

  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    filteredProducts,
    searchSuggestions,
    hasSearchResults: debouncedQuery.trim().length > 0
  };
};

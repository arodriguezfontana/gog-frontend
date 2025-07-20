import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { Game } from "../types/game";
import { searchGames as searchGamesService } from "../services/searchService";
import { useToast } from "../hooks/useToast";
import { useDebounce } from "use-debounce";

interface SearchContextData {
  loading: boolean;
  searchQuery: string;
  searchResults: Game[];
  hasSearched: boolean;
  setSearchQuery: (query: string) => void;
  handleEndReached: () => void;
  resetSearch: () => void;
}

const SearchContext = createContext<SearchContextData | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState(false);
  const { handleApiError } = useToast()

  const performSearch = useCallback(async (query: string, page: number) => {
    if (!query) {
      setSearchResults([]);
      setCurrentPage(1);
      setTotalPages(0);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await searchGamesService({ query, page });
      setSearchResults((prev) =>
        page === 1 ? response.games : [...prev, ...response.games]
      );
      setTotalPages(response.amountOfPages);
      setHasSearched(true);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery, currentPage);
    } else {
      resetSearch();
    }
  }, [debouncedQuery, currentPage, performSearch]);

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setHasSearched(false);
  };

  const handleEndReached = () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const resetSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setCurrentPage(1);
    setTotalPages(0);
    setHasSearched(false);
    setLoading(false);
  };

  const value = {
    loading,
    searchQuery,
    searchResults,
    hasSearched,
    setSearchQuery: handleSearchQueryChange,
    handleEndReached,
    resetSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

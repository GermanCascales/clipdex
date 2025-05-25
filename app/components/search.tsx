import { useEffect, useRef } from "react";

type SearchProps = {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (value: string) => void;
};

export default function Search({
  search,
  setSearch,
  handleSearch,
}: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }
    handleSearch(search);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={onSearch} className="flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <input
          type="text"
          ref={inputRef}
          value={search}
          onInput={(e) => setSearch(e.currentTarget.value)}
          placeholder="Type to search..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}

// src/components/ui/SearchBar.jsx
import React from "react";
import { Search } from "lucide-react";
import { Input } from "./input";

/**
 * SearchBar
 *
 * A reusable and flexible search input UI component used for filtering
 * or querying data collections such as products, brands, or categories.
 *
 * The component is designed to be **function-handler agnostic**, meaning
 * the `handleSearch` prop can accept any number of arguments depending
 * on the implementation defined by the parent component.
 *
 * When the input value changes, the component:
 * 1. Extracts the input value
 * 2. Calls `handleSearch(value, ...handlerArgs)`
 *
 * This allows developers to pass additional contextual parameters
 * alongside the search value (e.g., search type, filters, or scope).
 *
 * The component supports two UI layouts:
 *
 * - **left**: Search icon appears inside the input field (default)
 * - **right**: Search icon appears outside the input field
 *
 * This component behaves as a **controlled input**, meaning the parent
 * component is responsible for managing the `searchTerm` state.
 *
 * @component
 *
 * @param {Object} props - Component configuration object
 *
 * @param {"left" | "right"} [props.iconDirection="left"]
 * Determines where the search icon should appear relative to the input field.
 *
 * - `"left"`: icon inside the input
 * - `"right"`: icon outside the input
 *
 * @param {string} [props.iconColor="gray"]
 * Tailwind color used to style the search icon.
 *
 * Example values:
 * `"gray"`, `"green"`, `"blue"`, `"red"`
 *
 * @param {string} props.searchTerm
 * Current value of the search input.
 *
 * This makes the component a **controlled component**.
 * The parent component must manage the state.
 *
 * @param {(value: string, ...args: any[]) => void} props.handleSearch
 * Function executed whenever the search input changes.
 *
 * The first parameter is always the input value.
 * Additional parameters are forwarded from `handlerArgs`.
 *
 * Example execution:
 * handleSearch(value, "product")
 *
 * @param {string} [props.placeholder="Search for items..."]
 * Placeholder text displayed inside the search input.
 *
 * @param {Array<any>} [props.handlerArgs=[]]
 * Optional array of additional parameters passed to `handleSearch`.
 *
 * Useful when the search handler requires additional contextual
 * arguments such as search category or filter type.
 *
 * Example:
 * handlerArgs={["product"]}
 *
 * @param {string} [props.className]
 * Optional Tailwind or CSS classes applied to the root container.
 *
 * @param {Object} [props...]
 * Additional HTML attributes passed to the root container element.
 *
 * @example
 * <SearchBar
 *   searchTerm={searchTerm}
 *   handleSearch={setSearchTerm}
 * />
 *
 * @example
 * <SearchBar
 *   iconDirection="right"
 *   iconColor="green"
 *   searchTerm={searchTerm}
 *   handleSearch={handleSearch}
 *   handlerArgs={["product"]}
 * />
 */
export const SearchBar = ({
  iconDirection = "left",
  iconColor = "gray",
  searchTerm,
  handleSearch,
  placeholder = "Search for items...",
  handlerArgs = [],
  className = "",
  ...props
}) => {
  const onSearchChange = (e) => {
    const value = e.target.value;
    if (typeof handleSearch === "function") {
      handleSearch(value, ...handlerArgs);
    }
  };

  return (
    <div className={`flex-1 relative space-y-4 ${className}`} {...props}>
      {iconDirection === "left" && (
        <div className="flex-1 relative">
          <Search
            className={`absolute text-${iconColor}-500 left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`}
          />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={onSearchChange}
            className="pl-10"
          />
        </div>
      )}

      {iconDirection === "right" && (
        <div className="w-full flex justify-center">
          <input
            type="search"
            placeholder={placeholder}
            value={searchTerm}
            onChange={onSearchChange}
            className={`w-full py-[10.6px] ${
              searchTerm !== "" ? "mr-0 pr-3" : "mr-[-3rem]"
            } pl-[1.25rem] rounded-[0.9rem] bg-[#f9f9f9] border border-solid border-gray-300 bg-transparent cursor-text focus:outline-none`}
          />

          <div
            className={`text-${iconColor}-600 ${
              searchTerm !== "" ? "hidden" : "inline"
            } text-[1rem] py-[14px] px-4 font-semibold cursor-pointer z-[30]`}
          >
            <Search />
          </div>
        </div>
      )}
    </div>
  );
};

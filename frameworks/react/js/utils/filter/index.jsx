// src/hooks/useFilterCategory.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FormField from "../../pages/management/general/FormField";
import { useCustomApis } from "../../middleware/customs/useCustomApis";
import { useAccountApiHandler } from "../../middleware/customs/manager";

/**
 * React hook for filtering and sorting a list of items based on:
 * - Free-text search across multiple properties
 * - Optional sorting by a specified key (default: createdAt)
 *
 * **Features**
 * - Converts the search term into a case-insensitive lookup.
 * - Matches the search term against one or many selected object properties.
 * - If no search term is provided, the hook falls back to sorting.
 * - Sorting uses JavaScript Date comparison for `sortValue` fields.
 *
 * **Filtering Rules**
 * - Search mode triggers when `searchTerm` is not empty.
 * - Only selected `properties` are concatenated and checked for matches.
 *
 * **Sorting Rules**
 * - Sorting only applies when `searchTerm` is empty.
 * - Sorting is skipped when `sortValue` is null or undefined.
 * - `sortOrder` can be `"asc"` or `"desc"`.
 *
 * @param {Array<object>} data - List of records to filter/sortingValue.
 * @param {Array<string>} properties - Object keys to search against.
 * @param {object} [options] - Additional settings.
 * @param {string|null} [options.sortValue="createdAt"] - Field to sortingValue by (expects a date-like value).
 * @param {"asc"|"desc"} [options.sortOrder="desc"] - Sorting direction.
 *
 * @returns {object} Filter utilities.
 * @returns {Array<object>} return.filteredData - The final filtered/sorted results.
 * @returns {string} return.searchTerm - Current search term.
 * @returns {Function} return.setSearchTerm - Setter to update the search term.
 *
 * @example
 * // Search "name" and "description", sortingValue by createdAt (newest first)
 * const { filteredData, searchTerm, setSearchTerm } = useFilter(
 *   categories,
 *   ["name", "description"],
 *   { sortValue: "createdAt", sortOrder: "desc" }
 * );
 *
 * @example
 * // Disable sorting (only filtering)
 * const list = useFilter(data, ["title"], { sortValue: null });
 *
 * @example
 * // Using search input
 * <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
 */
export const useFilter = (data = [], properties = [], options = {}) => {
  const { sortValue = "createdAt", sortOrder = "desc" } = options;

  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredData = useMemo(() => {
    if (!Array.isArray(data) || !Array.isArray(properties)) return [];

    // ---------------------
    // SEARCH MODE
    // ---------------------
    if (normalizedSearch) {
      return data.filter((item) => {
        // Combine selected properties into one long searchable string
        const combined = properties
          .map((prop) => (item?.[prop] ?? "").toString().toLowerCase())
          .join(" ");

        return combined.includes(normalizedSearch);
      });
    }

    // ---------------------
    // NO SEARCH → SORT ONLY
    // ---------------------
    const sorted = [...data];

    // Skip sorting if sortValue is null
    if (!sortValue) return sorted;

    sorted.sort((a, b) => {
      const valA = new Date(a?.[sortValue]);
      const valB = new Date(b?.[sortValue]);

      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

    return sorted;
  }, [data, properties, normalizedSearch, sortValue, sortOrder]);

  return {
    filteredData,
    searchTerm,
    setSearchTerm,
  };
};

/**
 * A powerful unified filtering and sorting hook that combines search and sortingValue functionality
 * with support for multiple data properties and customizable sorting options.
 *
 * This hook provides real-time filtering through text search across multiple object properties
 * and flexible sorting with predefined sorting modes for common use cases.
 *
 * @param {Array} [data=[]] - The array of objects to filter and sortingValue
 * @param {Array<string>} [properties=[]] - Object property names to search through
 * @param {Object} [options={}] - Configuration options
 * @param {string} [options.defaultSort="Latest"] - Initial sorting mode (UI display value)
 *
 * @returns {Object} Filtering and sorting controls with results
 * @returns {Array} return.filteredData - The filtered and sorted result array
 * @returns {string} return.searchTerm - Current search term
 * @returns {function} return.setSearchTerm - React setter for search term
 * @returns {string} return.sortingValue - Current sorting mode (UI display value)
 * @returns {string} return.sortValue - Current property being sorted by
 * @returns {string} return.sortOrder - Current sortingValue order ("asc" or "desc")
 * @returns {function} return.handleSortingChange - Handler for changing sortingValue mode
 *
 * **Developer Defined Supported Sorting Modes**
 *  i.e., options = [
 *          { sortValue: 'name', value: "a-z", sortOrder: 'asc', label: "A-Z", },
 *          { sortValue: 'name', value: "z-a", sortOrder: 'desc', label: "Z-A", },
 *         { sortValue: 'createdAt', value: "latest", sortOrder: 'desc', label: "Latest", },
 *         ...
 * ]
 *
 * **Search Behavior**
 * - Searches across all specified `properties` concurrently
 * - Case-insensitive matching
 * - Trims whitespace from search term
 * - Returns items where ANY specified property contains the search term
 * - Combines all property values into a single searchable string
 *
 * **Performance Features**
 * - Memoized filtering to prevent unnecessary re-renders
 * - Handles invalid data gracefully (returns empty array)
 * - Preserves original data immutability
 *
 * @example
 * // Basic usage with search and sortingValue
 * const {
 *   filteredData,
 *   searchTerm,
 *   setSearchTerm,
 *   sortingValue,
 *   handleSortingChange
 * } = useFilterMore(users, ['name', 'email', 'department']);
 *
 * @example
 * // With custom default sorting
 * const {
 *   filteredData,
 *   searchTerm,
 *   setSearchTerm,
 *   sortingValue,
 *   handleSortingChange
 * } = useFilterMore(
 *   categories,
 *   ['name', 'description'],
 *   { defaultSort: 'A-Z' }
 * );
 *
 * @example
 * // Integration with UI components
 * function UserList({ users }) {
 *   const {
 *     filteredData: filteredUsers,
 *     searchTerm,
 *     setSearchTerm,
 *     sortingValue,
 *     handleSortingChange
 *   } = useFilterMore(users, ['name', 'email', 'role']);
 *
 *   return (
 *     <div>
 *       {/* Search Input *\/}
 *       <input
 *         type="text"
 *         placeholder="Search users..."
 *         value={searchTerm}
 *         onChange={(e) => setSearchTerm(e.target.value)}
 *       />
 *
 *       {/* Sort Dropdown *\/}
 *       <select
 *         value={sortingValue}
 *         onChange={(e) => handleSortingChange(e.target.value)}
 *       >
 *         <option value="Latest">Latest</option>
 *         <option value="A-Z">Name A-Z</option>
 *         <option value="Z-A">Name Z-A</option>
 *         <option value="Older">Older</option>
 *       </select>
 *
 *       {/* Results *\/}
 *       {filteredUsers.map(user => (
 *         <UserCard key={user.id} user={user} />
 *       ))}
 *     </div>
 *   );
 * }
 */

export const useFilterMore = (
  // More in use of "more options"
  data = [],
  properties = [],
  additionalFilterOptions = [],
  alternativeFilterOptions = [],
) => {

  // Sorting state
  const [sortingValue, setSortingValue] = useState("latest");
  // const [sortingValue, setSortingValue] = useState(defaultSort || "Latest");
  const [sortValue, setSortValue] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { customApi } = useCustomApis();
  const { searchForAccount } = useAccountApiHandler()

  const filterOptions = [
    { sortValue: 'name', value: "a-z", label: "A-Z", sortOrder: 'asc', },
    { sortValue: 'name', value: "z-a", label: "Z-A", sortOrder: 'desc', },
    { sortValue: 'createdAt', value: "older", label: "Older", sortOrder: 'asc', },
    { sortValue: 'createdAt', value: "latest", label: "Latest", sortOrder: 'desc', },
    { sortValue: 'updatedAt', value: "edited", label: "Edited", sortOrder: 'desc', },
  ];

  const optionsData = alternativeFilterOptions.length > 0 ? [...alternativeFilterOptions] : [...filterOptions, ...additionalFilterOptions];

  /**
   * Handles sorting mode changes and updates corresponding sortingValue parameters
   * @param {string} value - The sorting mode selected from UI
   */
  const handleSortingChange = (value) => {
    setSortingValue(value);


    // if (!value && !additionalFilterOptions) return;
    if (!value && !optionsData) return;

    // const sortingOption = additionalFilterOptions.find((option) => option.value === value);

    const sortingOption = optionsData.find((option) => option.value === value);

    if (sortingOption) {
      setSortValue(sortingOption.sortValue);
      setSortOrder(sortingOption.sortOrder);
    }
  };

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const timeoutRef = useRef(null);

  const handleSearch = (searchValue, query_api_name) => {
    setSearchTerm(searchValue)


    if (!normalizedSearch) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    console.log(normalizedSearch);

    timeoutRef.current = setTimeout(async () => {
      const data = {
        search_term: normalizedSearch,
      };

      await customApi(query_api_name, "search", null, data);
    }, 500);

    // Cleanup on unmount or re-run
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

  }

  const handleAccountSearch = (searchValue, account_type = 'user') => {
    setSearchTerm(searchValue)


    if (!normalizedSearch) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    console.log(normalizedSearch);

    timeoutRef.current = setTimeout(async () => {
      await searchForAccount(account_type, normalizedSearch);
    }, 500);

    // Cleanup on unmount or re-run
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

  }

  /**
   * Memoized filtered and sorted data
   * Applies search filter first, then sorting to the results
   */
  const filteredData = useMemo(() => {
    // Early return for invalid data
    if (!Array.isArray(data) || !Array.isArray(properties)) {
      return [];
    }

    // SEARCH MODE: Filter data based on search term across specified properties
    if (normalizedSearch) {
      // const hel = data.filter((item) => {
      //   // Combine all specified property values into a single searchable string
      //    properties
      //     .map((prop) => (console.log(item?.[prop] ?? "")))
      // });

      return data.filter((item) => {
        // Combine all specified property values into a single searchable string
        const combined = properties
          .map((prop) => (item?.[prop] ?? "").toString().toLowerCase())
          .join(" ");

        return combined.includes(normalizedSearch);
      });
    }

    // SORT MODE: Apply sorting when no search term is present
    const sorted = [...data]; // Create copy to avoid mutating original

    sorted.sort((a, b) => {
      const valA = a?.[sortValue];
      const valB = b?.[sortValue];

      // Numeric sorting (for properties like category_count)
      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      // String sorting (for properties like name)
      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      // Date sorting (for properties like createdAt)
      const dateA = new Date(valA);
      const dateB = new Date(valB);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return sorted;
  }, [data, properties, normalizedSearch, sortValue, sortOrder]);

  const SortComponent = ({ className }) => {
    return (
      <FormField
        field={{
          name: "sort",
          label: "Sort",
          value: sortingValue,
          type: "select",
          options: optionsData,
          onChange: (e) => handleSortingChange(e.target.value),
        }}
        containerClassName={className}
      // formData={form}
      // handleInputChange={onChange}
      />
    );
  };
  return {
    filteredData,
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleAccountSearch,

    // Sorting API
    // sortingValue,
    SortComponent,
    // sortValue,
    // sortOrder,
    // handleSortingChange,
  };
};

// // filteredCategories (fixed, safe, non-mutating)
// const normalizedSearch = searchTerm.trim().toLowerCase();

// const filteredCategories = React.useMemo(() => {
//   if (!Array.isArray(parent_categories)) return [];

//   // When searching → filter only
//   if (normalizedSearch) {
//     return parent_categories.filter((category) => {
//       const name = category?.name?.toLowerCase() || "";
//       const desc = category?.descriptions?.toLowerCase() || "";
//       return name.includes(normalizedSearch) || desc.includes(normalizedSearch);
//     });
//   }

//   // No search → return NEW array sorted by createdAt DESC
//   return [...parent_categories].sortingValue(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );
// }, [parent_categories, normalizedSearch]);

// export const useSorting = (sortKey = "name", sortOrder = "asc") => {
//   return (list) => {
//     const sortedList = [...list];

//     sortedList.sortingValue((a, b) => {
//       const A = a?.[sortKey];
//       const B = b?.[sortKey];

//       if (typeof A === "string") {
//         return sortOrder === "asc" ? A.localeCompare(B) : B.localeCompare(A);
//       }

//       if (typeof A === "number") {
//         return sortOrder === "asc" ? A - B : B - A;
//       }

//       return 0;
//     });

//     return sortedList;
//   };
// };

// export const useFilterMore = (
//   data = [],
//   properties = [],
//   {
//     sortValue = "createdAt",
//     sortOrder = "desc",
//     customSort = null, // <-- inject custom reusable sorting logic
//   } = {}
// ) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const normalizedSearch = searchTerm.trim().toLowerCase();

//   const filteredData = useMemo(() => {
//     if (!Array.isArray(data) || !Array.isArray(properties)) return [];

//     // --------------------
//     // SEARCH MODE
//     // --------------------
//     if (normalizedSearch) {
//       return data.filter((item) => {
//         const combined = properties
//           .map((prop) => (item?.[prop] ?? "").toString().toLowerCase())
//           .join(" ");
//         return combined.includes(normalizedSearch);
//       });
//     }

//     // --------------------
//     // SORT MODE
//     // --------------------
//     const sorted = [...data];

//     // 1️⃣ Use reusable sorting hook if provided
//     if (typeof customSort === "function") {
//       return customSort(sorted);
//     }

//     // 2️⃣ Default date sorting
//     if (!sortValue) return sorted;

//     sorted.sortingValue((a, b) => {
//       const valA = new Date(a?.[sortValue]);
//       const valB = new Date(b?.[sortValue]);
//       return sortOrder === "asc" ? valA - valB : valB - valA;
//     });

//     return sorted;
//   }, [data, properties, normalizedSearch, sortValue, sortOrder, customSort]);

//   return { filteredData, searchTerm, setSearchTerm };
// };

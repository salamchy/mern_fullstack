const ShopFiltering = ({ filters, filterState, setFilterState, clearFilter }) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>

      {/* category filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {
          filters.category.map((category) => (
            <label key={category} className="capitalize cursor-pointer flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                id="category"
                value={category}
                checked={filterState.category === category}
                onChange={(e) => setFilterState({ ...filterState, category: e.target.value })}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))
        }
      </div>

      {/* color filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Color</h4>
        <hr />
        {
          filters.colors.map((color) => (
            <label key={color} className="capitalize cursor-pointer flex items-center space-x-2">
              <input
                type="radio"
                name="color"
                id="color"
                value={color}
                checked={filterState.color === color}
                onChange={(e) => setFilterState({ ...filterState, color: e.target.value })}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-gray-700">{color}</span>
            </label>
          ))
        }
      </div>

      {/* price range filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Ranges</h4>
        <hr />
        {
          filters.priceRanges.map((range) => (
            <label key={range.label} className="capitalize cursor-pointer flex items-center space-x-2">
              <input
                type="radio"
                name="priceRange"
                id="priceRange"
                value={`${range.min}-${range.max}`}
                checked={filterState.priceRange === `${range.min}-${range.max}`}
                onChange={(e) => setFilterState({ ...filterState, priceRange: e.target.value })}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-gray-700">{range.label}</span>
            </label>
          ))
        }
      </div>

      {/* clear filter button */}
      <button onClick={clearFilter} className="bg-primary py-1 px-4 text-white rounded">Clear All Filters</button>

    </div>
  )
}
export default ShopFiltering
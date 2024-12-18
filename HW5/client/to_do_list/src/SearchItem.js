


const SearchItem=({search, setSearch, handleSearchSubmit})=>{
   return(      
      <form className="searchForm"             
            onSubmit={(e)=>{handleSearchSubmit(e)}}  
      >
         <label htmlFor="search">Search</label>
         <input
            id="search"
            type="text"
            role="searchbox"
            required
            placeholder="Search Item and Press Enter"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            
         />
      </form>
   );
};

export default SearchItem;
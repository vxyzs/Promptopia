import { useState, useEffect } from "react";
import PromptCard from './promptCard';
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setsearchedPosts] = useState([]);
  const [tagClick, setTagClick] = useState(false)

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async (e) => {
    if ((e && e.key === 'Enter') || tagClick) {
      if (e) e.preventDefault();
      const response = await fetch(`/api/search-prompt/${searchText}`);
      const data = await response.json();
      setsearchedPosts(data);
      setTagClick(false);
    }
  };

  const handleTagClick = (post) => {
    setTagClick(true);
    setSearchText(post);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [tagClick]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center bg-gray-50">
        <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          onKeyDown={handleSearch}
        />
        </InputGroup>
      </form>

      <PromptCardList
        data={searchText ? searchedPosts : posts}
        handleTagClick={handleTagClick} 
      />     
    </section>
  );
}

export default Feed;

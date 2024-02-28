'use client'
import { useState, useEffect } from "react";
import PromptCard from './promptCard';
import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data, handleTagClick, likedPrompts }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          likedPrompts 
        />
      ))}
    </div>
  );
}

const Feed = () => {
  const {data: session } = useSession();
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [likedPrompts, setLikedPrompts] = useState([]);
  const [tagClick, setTagClick] = useState(false)

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async (e) => {
    if ((e && e.key === 'Enter') || tagClick) {
      if (e) e.preventDefault();
      const response = await fetch(`/api/search-prompt/${searchText}`);
      const data = await response.json();
      setSearchedPosts(data);
      setTagClick(false);
    }
  };

  const handleTagClick = (post) => {
    setTagClick(true);
    setSearchText(post);
    handleSearch();
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };

    const fetchLikedPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/likedPosts`);
      const data = await response.json();
      setLikedPrompts(data);
    };

    fetchPosts();
    fetchLikedPrompts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchText, tagClick]);

  if(session?.user && !likedPrompts){
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    )
  }

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
        likedPrompts={likedPrompts} 
      />
    </section>
  );
}

export default Feed;

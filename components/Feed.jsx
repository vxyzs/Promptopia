'use client'
import { useState, useEffect } from "react";
import PromptCard from './promptCard';
import { Input, useStatStyles } from "@chakra-ui/react";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key = {post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setsearchText] = useState('');
  const [Posts, setPosts] = useState([])

  const handlesearchchange = (e) =>{
      setsearchText(e.target.value);
  }

  useEffect(() => {
    const fetchposts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchposts();
  }, [])

  console.log(Posts);


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <Input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handlesearchchange}
          required
          className="search_input peer bg-white"
          onKeyDown={handleSearch}
        />
      </form>

      <PromptCardList
        data={Posts}
        handleTagClick={() => {}}
      />      
    </section>
  )
}

export default Feed;
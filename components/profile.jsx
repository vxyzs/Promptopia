import { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { motion, AnimatePresence } from 'framer-motion';
import PromptCard from "./promptCard";
import { useSession } from 'next-auth/react';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [likedPrompts, setLikedPrompts] = useState([]);
  const {data: session} = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user?.id}/likedPosts`, {
          method: 'GET'
        });
        if (response.ok) {
          const likedPromptsData = await response.json();
          setLikedPrompts(likedPromptsData);
        } else {
          console.error('Failed to fetch liked prompts:', response.status);
        }
      } catch (error) {
        console.error('Error fetching liked prompts:', error);
      }
    };

    setIsVisible(true);
    fetchData();
  }, [session]);
  console.log(likedPrompts);

  return (
    <motion.section
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="head_text text-left"><span className="blue_gradient">{name} Profile</span></h1>
      <p className="desc text-left">{desc}</p>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="m-5"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.5 }}
          >
            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab>My Posts</Tab>
                <Tab>Liked Posts</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <motion.div
                    className="prompt_layout"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 1.5 }}
                  >
                    {data.map((post) => (
                      <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                      />
                    ))}
                  </motion.div>
                </TabPanel>
                <TabPanel>
                  <motion.div
                    className="prompt_layout"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 1.5 }}
                  >
                    {likedPrompts.map((post, index) => (
                      <PromptCard
                        key={post._id}
                        post={post}
                      />
                    ))}
                  </motion.div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default Profile;

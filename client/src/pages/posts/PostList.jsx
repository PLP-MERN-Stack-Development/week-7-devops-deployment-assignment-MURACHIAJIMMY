


import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-slate-50 to-purple-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-orange-100/40 backdrop-blur border border-slate-200 shadow-lg rounded-2xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            📝 All Posts
          </h2>
          <Button
            onClick={() => navigate("/dashboard/create")}
            className="bg-red-600 hover:bg-green-800 text-white font-semibold"
          >
            ➕ New Post
          </Button>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-6 italic">
            No posts yet. Be the first to share something!
          </p>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;

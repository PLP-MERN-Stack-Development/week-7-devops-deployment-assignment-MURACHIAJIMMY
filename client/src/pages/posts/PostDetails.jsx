

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // uncomment if using
import CommentSection from "@/components/CommentSection";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 space-y-4 px-4">
        <Skeleton className="h-8 w-2/3 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-40 w-full rounded-md" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        Post not found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-slate-100 via-pink-50 to-slate-200 px-4 py-10">
      <div className="w-full max-w-3xl space-y-6">
        <Card className="bg-white/80 backdrop-blur-lg border border-slate-200 p-8 rounded-xl shadow-xl space-y-4">
          <h1 className="text-3xl font-semibold text-gray-800 leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-pink-600 font-medium">
            Category: {post.category?.name || "Uncategorized"}
          </p>
          <div className="pt-4 text-gray-700 text-base leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </Card>

        <div className="bg-white/70 backdrop-blur border border-slate-200 p-6 rounded-xl shadow">
          <CommentSection postId={post._id} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

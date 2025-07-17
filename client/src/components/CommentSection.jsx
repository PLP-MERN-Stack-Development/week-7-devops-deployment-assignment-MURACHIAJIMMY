import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

// 'err' was defined but never used, so we can omit it in the catch block
useEffect(() => {
  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${postId}`);
      setComments(res.data);
    } catch {
      toast.error("Failed to load comments");
    }
  };
  fetchComments();
}, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(`/comments/${postId}`, { content });
      setComments((prev) => [...prev, res.data]);
      setContent("");
      toast.success("Comment added 💬");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments</h3>

      {comments.length === 0 ? (
        <p className="text-muted-foreground">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-2">
          {comments.map((cmt) => (
            <div
              key={cmt._id}
              className="border rounded p-2 text-sm bg-muted/50"
            >
              <span className="font-medium">{cmt.author?.username}:</span>{" "}
              {cmt.content}
            </div>
          ))}
        </div>
      )}

      {user && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Leave a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="submit" disabled={loading}
           className=" bg-red-300 hover:bg-green-700 text-white font-semibold tracking-wide transition">
            {loading ? "Posting..." : "Send"}
        
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { _id, title, content, category } = post;

  return (
    <Card className="p-4 space-y-2">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-muted-black-1000-foreground">
        {content.slice(0, 120)}...
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-900">
          {category?.name || "Uncategorized"}
        </span>
        <Button size="sm" onClick={() => navigate(`/dashboard/posts/${_id}`)}
           className="bg-pink-600 hover:bg-blue-700 text-white font-semibold tracking-wide transition">
          Read More
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;

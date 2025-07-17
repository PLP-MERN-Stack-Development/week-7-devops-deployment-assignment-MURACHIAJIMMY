

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// 💠 Upgraded CategorySelect (editable + suggestions)
const CategorySelect = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/categories");
        setCategories(res.data);
      } catch {
        setCategories([]);
      }
    })();
  }, []);

  return (
    <div className="relative">
      <Input
        type="text"
        name="categoryName"
        placeholder="Type or choose category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        list="category-options"
        className="w-full"
      />
      <datalist id="category-options">
        {categories.map((c) => (
          <option key={c._id} value={c.name} />
        ))}
      </datalist>
    </div>
  );
};

const PostForm = ({ edit = false }) => {
  useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    content: "",
    categoryName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCategoryChange = (val) =>
    setForm({ ...form, categoryName: val });

  useEffect(() => {
    if (edit && id) {
      (async () => {
        try {
          const res = await axios.get(`/posts/${id}`);
          const { title, content, category } = res.data;
          setForm({ title, content, categoryName: category?.name || "" });
        } catch {
          toast.error("Failed to load post");
        }
      })();
    }
  }, [edit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (edit) {
        await axios.put(`/posts/${id}`, form);
        toast.success("Post updated ✏️");
      } else {
        await axios.post("/posts", form);
        toast.success("Post created 📝");
      }
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-pink-100 via-slate-100 to-purple-100">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-10 space-y-6 border border-slate-200">
        <h2 className="text-3xl font-semibold text-center text-pink-600">
          {edit ? "Edit Your Post" : "Create New Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              name="title"
              placeholder="e.g. My Health Tips"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Content
            </label>
            <Textarea
              name="content"
              placeholder="Write your content..."
              value={form.content}
              onChange={handleChange}
              rows={8}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category
            </label>
            <CategorySelect
              value={form.categoryName}
              onChange={handleCategoryChange}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold tracking-wide transition"
          >
            {loading
              ? edit
                ? "Updating..."
                : "Posting..."
              : edit
              ? "Update"
              : "Post"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;

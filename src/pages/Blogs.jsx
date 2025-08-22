import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const Blogs = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data.slice(0, 10); 
    },
  });

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const res = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (oldPosts = []) => [data, ...oldPosts]);
      reset(); 
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      title: data.title,
      body: data.body,
      userId: 1, 
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching posts</p>;

  return (
    <div>
      <h2 className="text-4xl font-bold text-blue-400 text-center mb-6">
        My Blog Page
      </h2>

      <div className="flex flex-wrap gap-4 mb-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border-2 border-gray-300 w-[31%] p-4 rounded-lg shadow-md bg-white"
          >
            <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>

      <section className="p-6 bg-gray-100 rounded-xl shadow-md">
        <h3 className="text-3xl font-bold text-black text-center mb-4">
          Add New Post
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-semibold">Post Title</label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border rounded-md"
              placeholder="Enter post title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="body" className="block font-semibold">Post Body</label>
            <textarea
              id="body"
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Enter post content"
              {...register("body", { required: "Body is required" })}
            ></textarea>
            {errors.body && <p className="text-red-500">{errors.body.message}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {mutation.isLoading ? "Saving..." : "Save"}
          </button>

          {mutation.isError && (
            <p className="text-red-500 mt-2">Error saving post.</p>
          )}
          {mutation.isSuccess && (
            <p className="text-green-500 mt-2">Post added successfully!</p>
          )}
        </form>
      </section>
    </div>
  );
};

export default Blogs;

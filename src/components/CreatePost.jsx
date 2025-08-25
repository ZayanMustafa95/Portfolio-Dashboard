import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const newPost = async (postData) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    postData
  );
  console.log(response.data);
};

const CreatePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: newPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePost = (data) => {
    mutation.mutate({
      title: data.title,
      body: data.description,
      userId: 1,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handlePost)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            {...register("title", { required: "Please fill out this field" })}
            className="border p-2 rounded w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Post Description"
            {...register("description", {
              required: "Please fill out this field",
            })}
            className="border p-2 rounded w-full"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {mutation.isPending ? "Saving..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

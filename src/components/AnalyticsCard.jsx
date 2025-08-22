import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AnalyticsCards = () => {
  const { data: usersData } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/users");
      return res.data;
    },
  });

  const { data: postsData } = useQuery({
    queryKey: ["totalPosts"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/posts");
      return res.data;
    },
  });

  const { data: commentsData } = useQuery({
    queryKey: ["totalComments"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/comments");
      return res.data;
    },
  });

  if (!usersData || !postsData || !commentsData) return <p>Loading analytics...</p>;

  const cards = [
    { title: "Total Users", value: usersData.total, color: "bg-blue-300" },
    { title: "Total Posts", value: postsData.total, color: "bg-indigo-600" },
    { title: "Total Comments", value: commentsData.total, color: "bg-indigo-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${card.color} text-white p-6 rounded-xl shadow-lg`}
        >
          <h2 className="text-xl font-semibold">{card.title}</h2>
          <p className="text-3xl font-bold mt-4">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards;

import { toast } from "react-hot-toast";

const Homepage = () => {
  const handleClick = () => {
    toast.success("Button Clicked Successfully");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-2xl text-red-500 font-bold ">Homepage</h1>
      <button
        onClick={handleClick}
        className="bg-red-600 hover:bg-red-700 p-6 text-white font-bold rounded-2xl"
      >
        Click me
      </button>
    </div>
  );
};

export default Homepage;

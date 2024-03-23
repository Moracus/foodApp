import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/Context";
const foodApi = import.meta.env.VITE_foodApi;
const Details = () => {
  const { id } = useParams();
  const { recipeDetails, setRecipeDetails, handleAddtoFav, favouritesList } =
    useContext(GlobalContext);
  useEffect(() => {
    async function getRecipeDetails() {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${foodApi}`
      );
      const data = await res.json();
      if (data?.data) {
        setRecipeDetails(data?.data);
      }
    }
    getRecipeDetails();
  }, []);
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl  group">
          <img
            src={recipeDetails?.recipe?.image_url}
            className="w-ful h-full object-cover block group-hover:scale-105 duration-200"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {" "}
        <span className="txt-sm text-cyan-400 font-medium">
          {recipeDetails?.recipe?.publisher}
        </span>
        <h3 className="font-bold  text-2xl truncate text-white">
          {recipeDetails?.recipe?.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddtoFav(recipeDetails?.recipe)}
            className="p-3 px-8 rounded-lg text-md text-white font-semibold tracking-wider mt-3 inline-block bg-transparent border-2 border-gray-500 hover:border-l-4 hover:border-b-4"
          >
            {favouritesList &&
            favouritesList.length > 0 &&
            favouritesList.findIndex(
              (item) => item.id === recipeDetails?.recipe?.id
            ) !== -1
              ? "remove from favourites"
              : "add to favourites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-white">Ingredients</span>
          <ul className="flex flex-col">
            {recipeDetails?.recipe?.ingredients.map((ingredient, idx) => (
              <li key={idx}>
                <span className="text-2xl font-semibold text-white">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-2xl font-semibold text-white">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;

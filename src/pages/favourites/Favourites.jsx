import { useContext } from "react";
import { GlobalContext } from "../../context/Context";
import RecipeList from "../../components/RecipeList";

const Favourites = () => {
  const { favouritesList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center  gap-10">
      {favouritesList && favouritesList.length > 0 ? (
        favouritesList.map((item, idx) => {
          return <RecipeList item={item} key={idx} />;
        })
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-white font-bold">
            Nothing to show!!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;

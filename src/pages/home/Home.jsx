import { useContext } from "react";
import { GlobalContext } from "../../context/Context";
import RecipeList from "../../components/RecipeList";

const Home = () => {
  const { recipeList, loading } = useContext(GlobalContext);
  if (loading)
    return (
      <>
        <div>loading...</div>
      </>
    );
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center  gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item, idx) => {
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

export default Home;

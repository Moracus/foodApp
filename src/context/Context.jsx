/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext("");

const foodApi = import.meta.env.VITE_foodApi;
function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("pizza");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favouritesList, setFavouritesList] = useState([]);
  const navigate = useNavigate();
  const fetchFoodData = async () => {
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}&key=${foodApi}`
      );
      const data = await response.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFoodData();
    setSearchParam("");
    navigate("/");
  };
  useEffect(() => {
    fetchFoodData();
  }, []);
  const handleAddtoFav = (getCurrentItem) => {
    // console.log(getCurrentItem);
    let cpyFavList = [...favouritesList];
    const index = cpyFavList.findIndex((item) => item.id === getCurrentItem.id);
    if (index == -1) {
      //item is not alreday present
      cpyFavList.push(getCurrentItem);
    } else {
      cpyFavList.splice(index);
    }
    setFavouritesList(cpyFavList);
  };

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetails,
        setRecipeDetails,
        handleAddtoFav,
        favouritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
export default GlobalState;

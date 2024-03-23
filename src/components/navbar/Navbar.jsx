import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/Context";

const Navbar = () => {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);
  //   console.log(searchParam);

  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
      <h2 className="text-2xl font-semibold">
        <NavLink
          to={"/"}
          className={"text-white hover:text-gray-700 duration-300"}
        >
          FoodRecepies
        </NavLink>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Enter item..."
          className="bg-transparent p-3 px-8 appearance-none outline-none border border-white rounded-full lg:w-96 shadow-lg shadow-blue-100 focus:shadow-blue-200"
        />
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className={"text-white hover:text-gray-700 duration-300"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favourites"}
            className={"text-white hover:text-gray-700 duration-300"}
          >
            favourites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

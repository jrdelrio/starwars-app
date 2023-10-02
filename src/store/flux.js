const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      favorites: [],

      errorImages: {
        planets: [],
        starships: [],
        vehicles: [],
      },
    },

    actions: {
      addFavorite: (newFavorite) => {
        const store = getStore();
        setStore({ favorites: [...store.favorites, newFavorite] });
        console.log(`Added to favorites item ${newFavorite.name}!`);
        console.log(store.favorites)
      },

      // addErrorImages: (type, uid) => {
      //   const store = getStore();
      //   console.log(store)
      //   if (type == "planet"){setStore({ errorImages.planets: [...store.errorImages.planets, uid]})}
      //   setStore({errorImages: []})
      // },

      deleteFavorite: (item) => {
        const store = getStore();
        let delFav = store.favorites.filter((i) => item !== i);
        setStore({ favorites: delFav });
        console.log("Deleted from favorites!");
        console.log(item);
      },
    },
  };
};

export default getState;

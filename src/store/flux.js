const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      favorites: [],
    },

    actions: {
      addFavorite: (newFavorite) => {
        const store = getStore();
        setStore({ favorites: [...store.favorites, newFavorite] });
        console.log(`Added to favorites item ${newFavorite.name}!`);
      },

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

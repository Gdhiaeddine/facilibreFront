import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext({
  products:[],
  setProducts: () => {},
  categoriesList:[],
  setCategoriesList: () => {},
});

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([])

  useEffect(() => {
    const fetchProduct = async()=>{
          const res = await fetch(`${import.meta.env.VITE_API_URL}/products`,{
            method: 'GET',
            headers : {
              'Content-type' : 'application/json',
              'Accept': 'application/json',
            }
          }).then(res => res.json()).then(result=>{
            //console.log(result)
            if(result.status == 200){
              setProducts(result.data)
            }else{
              console.log("something went wrong");
            }
          })
      }
      const fetchCategory = async()=>{
          const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`,{
            method: 'GET',
            headers : {
              'Content-type' : 'application/json',
              'Accept': 'application/json',
            }
          }).then(res => res.json()).then(result=>{
            //console.log(result)
            if(result.status == 200){
              setCategoriesList(result.data)
            }else{
              console.log("something went wrong");
            }
          })
        }

        fetchProduct()
        fetchCategory()
  }, []);

  return (
    <DataContext.Provider 
    value={{ products, 
      categoriesList, 
      setProducts, 
      setCategoriesList,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

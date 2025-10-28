
import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { DataProvider } from "@/contexts/DataContext";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  /*
  const [categories, setCategories] = useState([])
  
  useEffect(()=>{
    fetchCategory()
  },[])

    const fetchCategory = async()=>{
      const res = await fetch(`${apiUrl}/categories`,{
        method: 'GET',
        headers : {
          'Content-type' : 'application/json',
          'Accept': 'application/json',
        }
      }).then(res => res.json()).then(result=>{
        console.log(result)
        if(result.status == 200){
          setCategories(result.data)
        }else{
          console.log("something went wrong");
        }
      })
  }
      */
  return (
    <DataProvider>
    <div className="flex min-h-screen flex-col">
      <Header />
        <main className="flex-1">
        {children}
      </main>
      <Footer/>
    </div>
    </DataProvider>
  );
};

export default PageLayout;

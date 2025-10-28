
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { adminToken, useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useData } from "@/contexts/DataContext";

export function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  //const [categories, setCategories] = useState([])
  const {user} = useAuth() 
  const {products , categoriesList, setCategoriesList} = useData()


  const filteredCategories = categoriesList.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    const handleDelete = async(id: number) => {
      try{
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`,{
      headers : {
        'Content-type' : 'application/json',
        'Accept': 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      }})
      setCategoriesList(categoriesList.filter(category => category.id !== id));
      toast({
        title: "Category deleted",
        description: "The category has been successfully deleted",
      });
      }catch(error){
        toast({
        title: "There is Problem",
        description: error,
      });
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        {
        user.role == "admin" && 
        <Button asChild>
          <Link to="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
        }
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Products</TableHead>
              {user.role == "admin" &&
              <TableHead className="text-right">Actions</TableHead>
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{products.filter(product => product.category_id === category.id).length}</TableCell>
                {user.role == "admin" &&
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/categories/${category.id}/edit`} className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive flex items-center"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                    
                  </DropdownMenu>
                </TableCell>
                } 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
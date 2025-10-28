
import { useState } from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/adminComponents/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminToken,useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useData } from "@/contexts/DataContext";

export function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const {products, categoriesList, setProducts} = useData()
  
  const handleDelete = async(id)=>{
    try{
    await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`,{
      headers : {
        'Content-type' : 'application/json',
        'Accept': 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      }
    })
    //console.log('Produit supprimé avec succès', res.data);
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    }catch(error){
      console.error('Erreur lors de la suppression du produit :', error);
    }
  }
  
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      // ||product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        {user?.role === "admin" &&
        <Button asChild>
          <Link to="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
        }
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or category..."
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
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              {user?.role === "Admin" &&
                <TableHead className="text-right">Actions</TableHead>
              }
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={`${import.meta.env.VITE_URL_IMAGE}/${product.image}`}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <span>{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{ categoriesList.find((cat) => cat.id === product.category_id)?.name}</TableCell>
                <TableCell>
                  <StatusBadge status={product.status} />
                </TableCell>
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
                        <Link to={`${product.id}/edit`} className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-destructive flex items-center">
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

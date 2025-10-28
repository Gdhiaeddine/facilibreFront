
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/adminComponents/StatusBadge";
import { adminToken } from "@/contexts/AuthContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";
import { Product } from "@/types/product";

export function ProductDetail() {
  const { id } = useParams();
  const isNewProduct = id === "new";
  const { toast } = useToast();
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product>([]);
  const [previewUrl, setPreviewUrl] = useState<any>({});
  const [categoryId, setCategoryId] = useState<string>(undefined);

  const {categoriesList}  = useData();
/*
  const [status, setStatus] = useState<"available" | "unavailable">(
  product.status ? "available" : "unavailable"
  );
  */
  const [status, setStatus] = useState<"available" | "unavailable">(product.status);

  useEffect(()=>{
    fetchProduct()  
  },[])

  useEffect(() => {
  if (product?.category_id !== undefined) {
      setCategoryId(String(product.category_id));
  }
  if (product?.image) {    
    setPreviewUrl(`${import.meta.env.VITE_URL_IMAGE}/${product.image}`);
    }
  }, [product]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [id]: value
    }));
  };
  const handlePhotoChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      // Create a preview URL for the selected image
      const url = URL.createObjectURL(file);
      setPreviewUrl(import.meta.env.VITE_URL_IMAGE);
  
      const formData = new FormData();
      formData.append("image", file);
  
      
      // In a real application, you would upload the file to a server
      try{
        
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/product-images`, formData, {
          headers: {
            'Content-Type': "multipart/form-data",
            //'Accept': 'application/json',
            'Authorization': `Bearer ${adminToken()}`,
          },
        });
        toast({
          title: "success",
          description: "product image",
        });
        const filename = res.data;
  
        setProduct(prev => ({
          ...prev,
          image: `uploads/products/${filename.data}`,
  
        }));
      }catch(error){
        console.error("Upload failed", error);
      }
      // For now, we'll just store the local URL
   
    };
  const fetchProduct = async()=>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`,{
            method: 'GET',
            headers : {
              'Content-type' : 'application/json',
              'Accept': 'application/json',
              'Authorization' : `Bearer ${adminToken()}`
            }
          }).then(res => res.json()).then(result=>{
            if(result.status == 200){
              setProduct(result.data)
              setStatus(result.data.status)
            }else{
              console.log("something went wrong");
            }
        })
      }
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      if (!product.title) {
        toast({
          title: "Missing information",
          description: "Please enter a Product name",
          variant: "destructive"
        });
        return;
    }
    

    try{
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        title : product.title,
        price : product.price,
        category_id : categoryId,
        status : status,
        description : product.description,
        image : product.image
      }, {
        headers: {
          //'Content-Type': "multipart/form-data",
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
      toast({
      title: "Product updated",
      description: `Category "${product.title}" has been updated successfully`,
      });
    
    }catch(error){
      console.error("Update failed", error);
      toast({
        title: "Error",
        description: `Failed to update ${product.title} category`,
        variant: "destructive"
      });
    }
    // Save logic would go here
    
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {isNewProduct ? "Add New Product" : "Edit Product"}
        </h1>
        <div className="flex items-center gap-2">
          {!isNewProduct && (
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm font-medium">Status:</span>
              <StatusBadge status={status} />
            </div>
          )}
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Product Name</Label>
              <Input id="title" defaultValue={product?.title || ""} 
                onChange={handleChange}
              
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" defaultValue={product?.price || ""} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value = {categoryId}
              onValueChange={(key) => setCategoryId(key)}>
                <SelectTrigger>
                  <SelectValue 
                  placeholder="Select category"
                  />
                </SelectTrigger>
                <SelectContent>
                  {categoriesList.map((category)=>(
                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={status} 
                onValueChange={(value) => setStatus(value as "available" | "unavailable")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                onChange={handleChange}
                defaultValue={product?.description || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded-md border bg-muted flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt={product.name || "product"}
                    className="h-full w-full object-cover"
                    />
                </div>
                <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full"
                  />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended size: 800x600px. Max file size: 2MB.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

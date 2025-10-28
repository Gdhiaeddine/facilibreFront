import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { adminToken } from "@/contexts/AuthContext";
import axios from "axios";

export function AddProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewProduct = "new";

  const [status, setStatus] = useState<"available" | "unavailable">("available");
  const [categoryId, setCategoryId] = useState<Number>();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category_id	: 0,
    status: status,
  });

  const [categories, setCategories] = useState([])

  const fetchCategory = async()=>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`,{
      method: 'GET',
      headers : {
        'Content-type' : 'application/json',
        'Accept': 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      }
    }).then(res => res.json()).then(result=>{
      //console.log(result)
      if(result.status == 200){
        setCategories(result.data)
      }else{
        console.log("something went wrong");
      }
    })
  }

  useEffect(()=>{
      fetchCategory()
    },[])
    const [previewUrl, setPreviewUrl] = useState<string>("");
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
    setPreviewUrl(url);

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
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product.title) {
      toast({
        title: "Missing information",
        description: "Please enter a category name",
        variant: "destructive"
      });
      return;
    }
    //const formData = new FormData();
    //formData.append("name", category.name);
    //formData.append("image", file);
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/products`, {
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category_id	: categoryId,
        status: product.status,
      }, {
        headers: {
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
    
    // Save logic would go here
    toast({
      title: "Product created",
      description: `"${product.title}" has been created successfully`,
    });
    
    navigate("/admin/products");
    }catch(e){
      toast({
        title: "Thre is problem",
        description: `${e}`,
      });
    }

  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Add New Product
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Cancel</Button>
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
              <Input
                    id="title"
                    value={product.title} 
                    onChange={handleChange} 
                    placeholder="Enter product name"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input 
                    id="price" 
                    onChange={handleChange} 
                    value={product.price} 
                    placeholder="Enter product price"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
              defaultValue= ""
              onValueChange={(key) => setCategoryId(+ key)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category)=>(
                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                  ))}

                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                defaultValue={status} 
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
              value={product.description} 
              placeholder="Enter Product Description"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              {!isNewProduct && (
                  <div className="h-24 w-24 rounded-md border bg-muted flex items-center justify-center">
                    <img
                      src="/placeholder.svg"
                      alt="Product"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              <div className="flex items-center gap-4">
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

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Folder } from "lucide-react";
import axios from "axios";
import { adminToken } from "@/contexts/AuthContext";


export function AddCategory() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [category, setCategory] = useState({
    name: "",
    image: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setCategory(prev => ({
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

    
    try{
      
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/category-images`, formData, {
        headers: {
          'Content-Type': "multipart/form-data",
          //'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
      toast({
        title: "success",
        description: "categorie image",
      });
      const filename = res.data;

      setCategory(prev => ({
        ...prev,
        image: `uploads/categories/${filename.data}`,

      }));
    }catch(error){
      console.error("Upload failed", error);
    }
    // For now, we'll just store the local URL
 
  };
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category.name) {
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/categories`, {
        name : category.name,
        image : category.image
      }, {
        headers: {
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
    
    // Save logic would go here
    toast({
      title: "Category created",
      description: `"${category.name}" has been created successfully`,
    });
    
    navigate("/admin/categories");
    }catch(e){
      toast({
        title: "Thre is problem",
        description: `${e}`,
      });
    }

  };

  const handleCancel = () => {
    navigate("/admin/categories");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Add New Category
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Category Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
                <Avatar className="w-48 h-48 rounded-lg">
                  {previewUrl ? (
                    <AvatarImage src={previewUrl} alt="Category" className="object-cover" />
                  ) : (
                    <AvatarFallback className="text-4xl bg-muted">
                      <Folder className="h-16 w-16 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="w-full">
                  <Label htmlFor="photo" className="block mb-2">Category Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    /*onChange={e => {
                      const f = e.target.files?.[0] || null;
                      setFile(f);
                      if (f) setPreviewUrl(URL.createObjectURL(f));
                    }}*/
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input 
                    id="name" 
                    value={category.name} 
                    onChange={handleChange} 
                    placeholder="Enter category name"
                  />
                </div>
                {/*<div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    value={category.description}
                    onChange={handleChange}
                    placeholder="Enter category description"
                  />
                </div>*/}
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" >
                Create Category
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
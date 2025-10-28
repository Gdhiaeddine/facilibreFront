
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Folder } from "lucide-react";
import { adminToken } from "@/contexts/AuthContext";
import axios from "axios";

interface category{
  name: string;
  image: string;
}

export function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [category, setCategory] = useState<category>([]);
  const [previewUrl, setPreviewUrl] = useState<any>({});
  
  useEffect(()=>{
    fetchCategory()
  },[])

  useEffect(() => {
  if (category?.image) {
    // Replace with your backend domain
    setPreviewUrl(`${import.meta.env.VITE_URL_IMAGE}/${category.image}`);
    }
  }, [category]);
   const fetchCategory = async()=>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`,{
          method: 'GET',
          headers : {
            'Content-type' : 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${adminToken()}`
          }
        }).then(res => res.json()).then(result=>{
          if(result.status == 200){
            setCategory(result.data)
          }else{
            console.log("something went wrong");
          }
        })
  };

  

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

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/category-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
      // Assume backend returns { data: 'filename.jpg' }
      setCategory(prev => ({
        ...prev,
        image: `uploads/categories/${res.data.data}`, // image is a filename now
    }));
  } catch (err) {
    console.error("Upload failed", err);
  }
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
    
    try{
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        name : category.name,
        image : category.image
      }, {
        headers: {
          //'Content-Type': "multipart/form-data",
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
      toast({
      title: "Category updated",
      description: `Category "${category.name}" has been updated successfully`,
      });
    
    }catch(error){
      console.error("Update failed", error);
      toast({
        title: "Error",
        description: `Failed to update ${category.name} category`,
        variant: "destructive"
      });
    }
    // Save logic would go here
    
  };

  const handleCancel = () => {
    navigate("/admin/categories");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Edit Category
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
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Update Category
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
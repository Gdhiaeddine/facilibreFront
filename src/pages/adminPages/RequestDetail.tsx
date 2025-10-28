import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/adminComponents/StatusBadge";
import { PrintRequestDetails } from "@/components/adminComponents/PrintRequestDetails";
import { adminToken } from "@/contexts/AuthContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";

export function RequestDetail() {
  interface Request{
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  adresse: string;
  addNote?: string;
  created_at: string;
  product_id: number;
  status: "new" | "contacted" | "completed" | "rejected";
  internaleNote : string
  }
  interface Product {
    id: number;
    title: string;
  }


  const { id } = useParams();
  const [request, setRequest] = useState<Request>({} as Request);
  const [status, setStatus] = useState<"new" | "contacted" | "completed" | "rejected" | "">("");
  const [internalNotes, setInternalNotes] = useState(request.internaleNote);
  const {products} = useData()
  const { toast } = useToast();
  const productName = products.find((product) => product.id === request.product_id)?.title
  const fetchRequest = async()=>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/requests/${id}`,{
            method: 'GET',
            headers : {
              'Content-type' : 'application/json',
              'Accept': 'application/json',
              'Authorization' : `Bearer ${adminToken()}`
            }
          }).then(res => res.json()).then(result=>{
            if(result.status == 200){
              setRequest(result.data)
              setStatus(result.data.status)
            }else{
              console.log("something went wrong");
            }
        })
      }
  useEffect(()=>{
    fetchRequest()
  }
  ,[])
  useEffect(()=>{
    setInternalNotes(request.internaleNote)
  }
  ,[request])
  const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
    try{
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/requests/${id}`, {
        status : status,
        internaleNote : internalNotes
      }, {
        headers: {
          //'Content-Type': "multipart/form-data",
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
      setTimeout(()=>{
        toast({
          title: "Request updated",
          description: `Request "${request.id}" has been updated successfully`,
      });
      },1000)
      
    
    }catch(error){
      console.error("Update failed", error);
      toast({
        title: "Error",
        description: `Failed to update ${request.id} Request`,
        variant: "destructive"
      });
    }
    // Save logic would go here
    
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Purchase Request #{id}</h1>
          <p className="text-muted-foreground">Submitted on {request?.created_at ? new Date(request.created_at).toISOString().slice(0, 10): "unknown date"}</p>
        </div>
        <div className="flex items-center gap-2">
          <PrintRequestDetails request={request} internalNotes={internalNotes} product={productName}/>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Client Information</CardTitle>
            <StatusBadge status={status} />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-sm text-muted-foreground">Name</Label>
                <p className="font-medium">{request.name}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Phone</Label>
                <p className="font-medium">{request.phoneNumber}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="font-medium break-words">{request.email}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Address</Label>
                <p className="font-medium break-words	">{request.adresse}</p>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Label htmlFor="status">Update Status</Label>
              <Select 
                value={status} 
                onValueChange={(value) => 
                  setStatus(value as "new" | "contacted" | "completed" | "rejected")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Product</Label>
              <p className="font-medium">{productName}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Client Notes</Label>
              <p className="break-words">{request.addNote || "\/"}</p>
            </div>
            <div className="space-y-2 pt-2">
              <Label htmlFor="internalNotes">Internal Notes</Label>
              <Textarea
                id="internalNotes"
                placeholder="Add notes about follow-up calls, payment details, etc."
                rows={5}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

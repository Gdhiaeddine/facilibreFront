
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/adminComponents/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { adminToken } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

export function Requests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState([])
  const {products} = useData()

  const fetchRequests = async()=>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/requests`,{
      method: 'GET',
      headers : {
        'Content-type' : 'application/json',
        'Accept': 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      }
    }).then(res => res.json()).then(result=>{
      if(result.status == 200){
        setRequests(result.data)
      }else{
        console.log("something went wrong");
      }
    })
  }
  useEffect(()=>{
    fetchRequests()
  },[])

  const matchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const matchedProductIds = matchedProducts.map((p) => p.id);

  const filteredRequests = requests.filter(
    (request) =>
      matchedProductIds.includes(request.product_id) ||
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Client Purchase Requests</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client name, product, or email..."
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
              <TableHead>Client</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{products.find((product) => product.id === request.product_id)?.title}</TableCell>
                <TableCell>{request.name}</TableCell>
                <TableCell>
                  <div>
                    <div>{request.phone}</div>
                    <div className="text-sm text-muted-foreground">{request.phoneNumber}</div>
                  </div>
                </TableCell>
                <TableCell>{new Date(request.created_at).toISOString().slice(0, 10)}</TableCell>
                <TableCell>
                  <StatusBadge status={request.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`${request.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

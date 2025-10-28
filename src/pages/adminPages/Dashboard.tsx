
import { StatCard } from "@/components/adminComponents/StatCard";
import { StatusBadge } from "@/components/adminComponents/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminToken } from "@/contexts/AuthContext";
import { Package, ShoppingBag, CheckCircle, XCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([])
  const {products} = useData()
  useEffect(()=>{
    fetchRequests()
  },[])


  const availableCount = products.filter(product => product.status === "available").length;
  const unavailableCount = products.filter(product => product.status === "unavailable").length;

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

  const countNewRequests = requests.filter(request => request.status === "new").length;
  // Mock data for our dashboard
  const stats = {
    totalProducts: products.length,
    activeProducts: availableCount,
    unavailableProducts: unavailableCount,
    totalRequests: requests.length,
    newRequests: countNewRequests,
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="flex gap-2">
          {user?.role === "Admin" &&
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
          }
          <Button variant="outline" asChild>
            <Link to="/admin/requests">View All Requests</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package />}
        />
        <StatCard
          title="Active Products"
          value={stats.activeProducts}
          icon={<CheckCircle />}
          className="border-success/20"
        />
        <StatCard
          title="Unavailable Products"
          value={stats.unavailableProducts}
          icon={<XCircle />}
          className="border-destructive/20"
        />
        <StatCard
          title="New Requests"
          value={stats.newRequests}
          icon={<ShoppingBag />}
          description={`out of ${stats.totalRequests} total requests`}
          className="border-primary/20"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Purchase Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{products.find((product) => product.id === request.product_id)?.title}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{new Date(request.created_at).toISOString().slice(0, 10)}</TableCell>
                  <TableCell>
                    <StatusBadge status={request.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/requests/${request.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
export default Dashboard;
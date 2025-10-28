
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCheck ,UserPlus, UserMinus, Settings as SettingsIcon } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { adminToken, useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [admins, setAdmins] = useState([]);
  const currentUserRole = user.role;

  // Form state for new admin
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "",
    password: ""
  });

  const [updateAdmin, setUpdateAdmin] = useState({
    name: "",
    email: "",
  });

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setNewAdmin({
      ...newAdmin,
      [id.replace('new-', '')]: value
    });
  };
  
  const fetchAdmins = async()=>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`,{
          method: 'GET',
           headers : {
            'Content-type' : 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${adminToken()}`,
           }
            }).then(res => res.json()).then(result=>{
              if(result.status == 200){
          setAdmins(result.data)
              }else{
            console.log("something went wrong");
      }
    })
  }
  useEffect(()=>{
    fetchAdmins()
  },[])

  useEffect(() => {
  const currentAdmin = admins.find((admin) => admin.id === user.id);
  if (currentAdmin) {
    setUpdateAdmin({
      name: user.name,
      email: currentAdmin.email,
    });
  }
  }, [admins, user]);
  // Update Current Account
  const handleInputChangeUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setUpdateAdmin({
      ...updateAdmin,
      [id.replace('update-', '')]: value
    });
  };
  const handleAccountUpdate = async()=>{
    const currentAdmin = admins.find((admin) => user.id === admin.id)?.email
    if(updateAdmin.name == user.name && updateAdmin.email == currentAdmin){
      toast({
        title: "There is No change",
        description: `The information still the same`,
        duration: 3000,
      });
      return
    }

    const updateAdminEntry = {
      name: updateAdmin.name,
      email: updateAdmin.email,
    };


    try{
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
        name : updateAdmin.name,
        email : updateAdmin.email,
      }, {
        headers: {
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
      toast({
      title: "Admin Updated",
      description: `${updateAdmin.name} has been Updated`,
    });
    }catch(e){
      toast({
        title: "Thre is problem",
        description: `${e}`,
      });
    }
    console.log(updateAdminEntry)
  }
  // Handle add admin
  const handleAddAdmin = async() => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const newAdminEntry = {
      //id: admins.length + 1,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      // In a real app, you would hash this password before storing
    };
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name : newAdmin.name,
        email : newAdmin.email,
        role : newAdmin.role,
        password : newAdmin.password,

      }, {
        headers: {
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
    
    // Save logic would go here
    toast({
      title: "Admin added",
      description: `${newAdmin.name} has been added as ${newAdmin.role === "admin" ? "Principale Admin" : "Vendeur"}`,
    });
    setAdmins([...admins, newAdminEntry]);
    }catch(e){
      toast({
        title: "Thre is problem",
        description: `${e}`,
      });
    }
    
    

    // Reset form
    setNewAdmin({
      name: "",
      email: "",
      role: "seller",
      password: ""
    });
  };



  //Update Admins and Vendeurs
  const [admin, setAdmin] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const handleEditAdmin = async(value)=>{
    const { id, name, email, role } = value;
    const filteredAdmin = { id, name, email, role };
    setAdmin(filteredAdmin)
    console.log(admin)
  }
  const handleInputChangeUpdateUser = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAdmin((prev) => ({
      ...prev,
      [id.replace('edit-', '')]: value
    }));
  };
  const handleAccountUpdateUser = async()=>{
    try{
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/${admin.id}`, {
        name : admin.name,
        email : admin.email,
        role : admin.role,
      }, {
        headers: {
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
      toast({
      title: "Admin Updated",
      description: `${admin.name} has been Updated`,
    });
    fetchAdmins()
    }catch(e){
      toast({
        title: "Thre is problem",
        description: `${e}`,
      });
    }
  }

  // Delete User
  const handleDelete = async(id, name)=>{
    if(id == user.id) {
      toast({
        title: "This Your Account",
        description: `You Cant delete yourself`,
        duration: 3000
      });
      return
    }
    try{
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`,{
        headers: {
          'Authorization': `Bearer ${adminToken()}`,
        },
      });
      toast({
      title: "Admin Delete",
      description: `${name} has been Deleted`,
    });
    fetchAdmins()
    }catch(e){
      toast({
        title: "Thre is problem",
        description: `${e}`,
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences.</p>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          {currentUserRole === "admin" && (
            <TabsTrigger value="users">Users</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="update-name" defaultValue={user?.name} onChange={handleInputChangeUpdate}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="update-email" defaultValue={admins.find((admin) => user.id === admin.id)?.email || ''} onChange={handleInputChangeUpdate}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={currentUserRole === "admin" ? "Principal Admin" : "Vendeur"} disabled />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleAccountUpdate}>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {user.role.toLowerCase() === "admin" && (
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Add or remove users and adjust their permissions.
                  </CardDescription>
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2" />
                      Add Admin
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Add New Admin</SheetTitle>
                      <SheetDescription>
                        Create a new admin account with appropriate permissions.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-name">Name</Label>
                        <Input 
                          id="new-name" 
                          placeholder="Full Name" 
                          value={newAdmin.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-email">Email</Label>
                        <Input 
                          id="new-email" 
                          placeholder="email@example.com" 
                          type="email"
                          value={newAdmin.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Password</Label>
                        <Input 
                          id="new-password" 
                          placeholder="••••••••" 
                          type="password"
                          value={newAdmin.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-role">Role</Label>
                        <select 
                          id="new-role" 
                          className="w-full h-10 px-3 border border-input bg-background rounded-md"
                          value={newAdmin.role}
                          onChange={handleInputChange}
                        >
                          <option value="admin">Principal Admin</option>
                          <option value="seller">Vendeur</option>
                        </select>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button type="button" onClick={handleAddAdmin}>Add Admin</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell>
                          {admin.id === user.id &&
                          <UserCheck className="h-4 w-4 mr-1 inline"/>
                          }
                          {admin.name}
                          </TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          {admin.role === "admin" ? "Principal Admin" : "Vendeur"}
                        </TableCell>
                        {admin.id != user.id &&
                          <TableCell className="text-right">                          
                            
                            <Sheet>
                            <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="ml-2" onClick={()=>handleEditAdmin(admin)}>
                            <SettingsIcon className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                            </SheetTrigger>
                              <SheetContent>
                              <SheetHeader>
                               <SheetTitle>Edit Admin</SheetTitle>
                              <SheetDescription>
                                 Edit admin account with appropriate permissions.
                                </SheetDescription>
                             </SheetHeader>
                              <div className="py-4 space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="new-name">Name</Label>
                                 <Input 
                                   id="edit-name" 
                                   placeholder="Full Name" 
                                    value={admin.name}
                                    onChange={handleInputChangeUpdateUser}
                                  />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="new-email">Email</Label>
                                <Input 
                                  id="edit-email" 
                                  placeholder="email@example.com" 
                                  type="email"
                                  value={admin.email}
                                  onChange={handleInputChangeUpdateUser}
                               />
                             </div>
                             <div className="space-y-2">
                               <Label htmlFor="new-role">Role</Label>
                                <select 
                                  id="edit-role" 
                                  className="w-full h-10 px-3 border border-input bg-background rounded-md"
                                  value={admin.role}
                                 onChange={handleInputChangeUpdateUser}
                                >
                                 <option value="admin">Principal Admin</option>
                                 <option value="seller">Vendeur</option>
                                  </select>
                                       </div>
                                      </div>
                              <SheetFooter>
                                       <Button type="button" onClick={handleAccountUpdateUser}>Edit Admin</Button>
                             </SheetFooter>
                            </SheetContent>
                            </Sheet>
                          
                          
                          <Button variant="destructive" size="sm" className="ml-2" onClick={()=>{handleDelete(admin.id,admin.name)}}>
                            <UserMinus className="h-4 w-4 mr-1"/>
                            Remove
                          </Button>
                        </TableCell>}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

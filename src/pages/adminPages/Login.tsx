
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/contexts/AuthContext";

const Login= ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const {login} = useContext(AuthContext)

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`,{
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => res.json()).then(result=>{      
      if (result.status == "200"){
        const adminInfo = {
          id: result.id,
          name : result.name,
          token : result.token,
          role : result.role,
        }
        localStorage.setItem('adminInfo',JSON.stringify(adminInfo))
        login(adminInfo)
        setTimeout(()=>{
          toast({
            title: "Login successful",
            description: `Welcome back, ${result.role === "admin" ? "Principal Admin" : "Vendeur"}!`,
          });
        
        },1000)
        navigate("/admin");
      }else{
        toast({
          title: "Authentication failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    })
    // Simple mock authentication
    /*setTimeout(() => {
      const user = adminUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // In a real app, you'd use a proper authentication system
        localStorage.setItem("authUser", JSON.stringify({ email: user.email, role: user.role }));
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.role === "principal" ? "Principal Admin" : "Vendeur"}!`,
        });
        navigate("/admin");
       
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1000);*/
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Facilibre</h1>
          <p className="text-muted-foreground">Admin Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@facilibre.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Demo accounts:</p>
          <p>Principal Admin: principale@admin.com / password</p>
          <p>Vendeur: test@test.test / password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

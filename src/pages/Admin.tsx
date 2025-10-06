import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Tip {
  id: string;
  title: string;
  content: string;
  date_posted: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tips, setTips] = useState<Tip[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingTip, setEditingTip] = useState<Tip | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roles) {
      toast({
        title: "Access denied",
        description: "Admin privileges required.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    fetchTips();
  };

  const fetchTips = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tips")
      .select("*")
      .order("date_posted", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tips",
        variant: "destructive",
      });
      console.error(error);
    } else {
      setTips(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast({
        title: "Validation error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingTip) {
      const { error } = await supabase
        .from("tips")
        .update({
          title: formData.title,
          content: formData.content,
        })
        .eq("id", editingTip.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update tip",
          variant: "destructive",
        });
        console.error(error);
      } else {
        toast({
          title: "Success",
          description: "Tip updated successfully",
        });
        setEditingTip(null);
        setFormData({ title: "", content: "" });
        fetchTips();
      }
    } else {
      const { error } = await supabase.from("tips").insert({
        title: formData.title,
        content: formData.content,
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create tip",
          variant: "destructive",
        });
        console.error(error);
      } else {
        toast({
          title: "Success",
          description: "Tip created successfully",
        });
        setFormData({ title: "", content: "" });
        fetchTips();
      }
    }
  };

  const handleEdit = (tip: Tip) => {
    setEditingTip(tip);
    setFormData({
      title: tip.title,
      content: tip.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tip?")) return;

    const { error } = await supabase.from("tips").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete tip",
        variant: "destructive",
      });
      console.error(error);
    } else {
      toast({
        title: "Success",
        description: "Tip deleted successfully",
      });
      fetchTips();
    }
  };

  const cancelEdit = () => {
    setEditingTip(null);
    setFormData({ title: "", content: "" });
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingTip ? "Edit Tip" : "Create New Tip"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter tip title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Content
                </label>
                <Textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Enter tip content"
                  rows={6}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingTip ? "Update Tip" : "Create Tip"}
                </Button>
                {editingTip && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">All Tips</h2>
        
        {loading ? (
          <p className="text-muted-foreground">Loading tips...</p>
        ) : tips.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No tips yet. Create your first tip above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {tips.map((tip) => (
              <Card key={tip.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{tip.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(tip.date_posted).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(tip)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(tip.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Admin;

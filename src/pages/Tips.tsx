import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TipCard from "@/components/TipCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Tip {
  id: string;
  title: string;
  content: string;
  date_posted: string;
}

const TIPS_PER_PAGE = 6;

const Tips = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tips")
      .select("*")
      .order("date_posted", { ascending: false });

    if (error) {
      console.error("Error fetching tips:", error);
    } else {
      setTips(data || []);
    }
    setLoading(false);
  };
  
  const totalPages = Math.ceil(tips.length / TIPS_PER_PAGE);
  const startIndex = (currentPage - 1) * TIPS_PER_PAGE;
  const endIndex = startIndex + TIPS_PER_PAGE;
  const currentTips = tips.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Browse All Tips
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our complete collection of cybersecurity tips and best practices.
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading tips...</p>
        ) : tips.length === 0 ? (
          <p className="text-muted-foreground">No tips available yet.</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 mb-8 animate-slide-in">
              {currentTips.map((tip) => (
                <TipCard
                  key={tip.id}
                  title={tip.title}
                  content={tip.content}
                  datePosted={tip.date_posted}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <Button
                variant="outline"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Tips;

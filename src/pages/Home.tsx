import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shuffle, ArrowRight, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import TipCard from "@/components/TipCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface Tip {
  id: string;
  title: string;
  content: string;
  date_posted: string;
}

const Home = () => {
  const [todaysTip, setTodaysTip] = useState<Tip | null>(null);
  const [randomTip, setRandomTip] = useState<Tip | null>(null);
  const [allTips, setAllTips] = useState<Tip[]>([]);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    const { data, error } = await supabase
      .from("tips")
      .select("*")
      .order("date_posted", { ascending: false });

    if (error) {
      console.error("Error fetching tips:", error);
      return;
    }

    if (data && data.length > 0) {
      setAllTips(data);
      setTodaysTip(data[0]);
      setRandomTip(data[Math.floor(Math.random() * data.length)]);
    }
  };

  const getRandomTip = () => {
    if (allTips.length > 0) {
      const randomIndex = Math.floor(Math.random() * allTips.length);
      setRandomTip(allTips[randomIndex]);
    }
  };

  const handleDonation = () => {
    const amountInput = prompt('Enter the amount you would like to donate (in KES):');
    
    if (!amountInput) {
      return; // User cancelled
    }
    
    const amount = parseFloat(amountInput);
    
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    const emailInput = prompt('Enter your email address:');
    
    if (!emailInput || !emailInput.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    const handler = window.PaystackPop.setup({
      key: 'pk_live_82ed5d1d068c5eb4dc3aedf9e7a93ac25afefe11',
      email: emailInput.trim(),
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'KES',
      ref: 'scriky_' + Math.floor((Math.random() * 1000000000) + 1),
      callback: function(response: any) {
        alert('Payment successful! Thank you for your support! Reference: ' + response.reference);
      },
      onClose: function() {
        console.log('Payment window closed');
      },
      metadata: {
        custom_fields: [
          {
            display_name: "Support Scriky",
            variable_name: "support_type",
            value: "Buy Me a Coffee"
          }
        ]
      }
    });
    handler.openIframe();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-12 pb-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Your Daily Dose of Cybersecurity
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay secure with a new cybersecurity tip every day. Learn, practice, and protect yourself online.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/tips">
                  Browse All Tips <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" onClick={getRandomTip}>
                <Shuffle className="mr-2 h-4 w-4" />
                Random Tip
              </Button>
            </div>
          </div>
        </section>

        {/* Today's Tip */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Today's Tip</span>
          </h2>
          <div className="max-w-3xl animate-slide-in">
            {todaysTip ? (
              <TipCard
                title={todaysTip.title}
                content={todaysTip.content}
                datePosted={todaysTip.date_posted}
                featured
              />
            ) : (
              <p className="text-muted-foreground">Loading today's tip...</p>
            )}
          </div>
        </section>

        {/* Random Tip Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Random Tip</span>
            </h2>
            <Button variant="outline" size="sm" onClick={getRandomTip} disabled={!randomTip}>
              <Shuffle className="h-4 w-4" />
            </Button>
          </div>
          <div className="max-w-3xl">
            {randomTip ? (
              <TipCard
                title={randomTip.title}
                content={randomTip.content}
                datePosted={randomTip.date_posted}
              />
            ) : (
              <p className="text-muted-foreground">Loading random tip...</p>
            )}
          </div>
        </section>

        {/* Support Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-card rounded-2xl p-8 md:p-12 text-center shadow-glow">
            <Coffee className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Support Scriky</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Love our daily cybersecurity tips? Help us keep the platform running and create more valuable content for the community.
            </p>
            <Button size="lg" onClick={handleDonation} className="gap-2">
              <Coffee className="h-5 w-5" />
              Buy Me a Coffee
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-8 pb-16">
          <div className="bg-card border rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss a Tip</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our community of security-conscious users. Create an account to track your progress and bookmark your favorite tips.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">Get Started Free</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

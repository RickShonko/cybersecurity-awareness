import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Coffee, Heart } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Support Scriky
            </h1>
            <p className="text-xl text-muted-foreground">
              Help us keep cybersecurity education free and accessible for everyone.
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-gradient-card rounded-2xl p-8 shadow-glow mb-8 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <Coffee className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Buy Me a Coffee</h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Scriky is a passion project dedicated to making cybersecurity knowledge accessible to everyone. 
              Your support helps us continue creating quality content, maintain the platform, and reach more people 
              who need to stay safe online.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If you find our daily tips valuable and want to support our mission, consider buying us a coffee! 
              Every contribution, no matter how small, helps us keep the lights on and the tips flowing.
            </p>

            {/* Buy Me a Coffee Widget */}
            <div className="bg-background/50 rounded-xl p-8 text-center border border-border">
              <p className="text-muted-foreground mb-6">
                Click the button below to support us via Buy Me a Coffee
              </p>
              <a
                href="https://www.buymeacoffee.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Coffee className="h-5 w-5" />
                Buy Me a Coffee
              </a>
            </div>
          </div>

          {/* Other Ways to Support */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Other Ways to Support</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Share Scriky with friends and family who could benefit from daily security tips</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Follow us on social media and engage with our content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Provide feedback and suggestions to help us improve</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Contribute your own cybersecurity tips and knowledge</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Target, Users, Zap } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Security First",
      description: "Every tip is carefully researched and verified by cybersecurity professionals.",
    },
    {
      icon: Target,
      title: "Daily Updates",
      description: "Get a fresh cybersecurity tip every day to build lasting security habits.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a growing community of security-conscious individuals learning together.",
    },
    {
      icon: Zap,
      title: "Quick & Actionable",
      description: "Each tip is designed to be practical and implementable in minutes.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16 animate-fade-in text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              About Scriky
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your trusted companion for building better cybersecurity habits, one tip at a time.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16 animate-slide-in">
            <div className="bg-gradient-card rounded-2xl p-8 shadow-glow">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In today's digital world, cybersecurity isn't just for IT professionals—it's for everyone. 
                Scriky was created to make cybersecurity knowledge accessible, digestible, and actionable 
                for people of all technical backgrounds.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that security doesn't have to be complicated. By providing one simple, 
                practical tip each day, we help you build lasting security habits that protect you, 
                your data, and your digital life.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Why Choose Scriky?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div className="mb-16">
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">The Story Behind Scriky</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Scriky was born from a simple observation: most people want to be more secure online, 
                but feel overwhelmed by the complexity of cybersecurity advice. We wanted to change that.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Instead of lengthy guides and technical jargon, we focus on bite-sized, actionable tips 
                that anyone can understand and implement. Each tip is carefully crafted to provide real 
                value without requiring hours of your time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, thousands of users start their day with a Scriky tip, building better security 
                habits one day at a time. Join us on this journey to a safer digital world.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TipCard from "@/components/TipCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - will be replaced with API calls
const mockTips = [
  {
    id: 1,
    title: "Enable Two-Factor Authentication Everywhere",
    content:
      "Two-factor authentication (2FA) adds an extra layer of security to your accounts. Even if someone gets your password, they won't be able to access your account without the second factor. Use authenticator apps like Google Authenticator or Authy for the most secure 2FA method.",
    datePosted: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Use a Password Manager",
    content:
      "Password managers generate and store complex, unique passwords for all your accounts. This means you only need to remember one master password. Popular options include 1Password, Bitwarden, and LastPass.",
    datePosted: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    title: "Keep Your Software Updated",
    content:
      "Software updates often include security patches for vulnerabilities. Enable automatic updates whenever possible, especially for your operating system, browser, and antivirus software.",
    datePosted: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 4,
    title: "Be Cautious with Email Attachments",
    content:
      "Never open email attachments from unknown senders. Even if an email appears to be from someone you know, verify it's legitimate before opening attachments, especially if unexpected.",
    datePosted: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 5,
    title: "Use HTTPS Everywhere",
    content:
      "Always check for HTTPS (the padlock icon) in your browser's address bar, especially when entering sensitive information. HTTPS encrypts data between your browser and the website.",
    datePosted: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: 6,
    title: "Regular Backup Your Data",
    content:
      "Regularly backup important data to multiple locations. Use the 3-2-1 rule: 3 copies of data, on 2 different media types, with 1 copy off-site. This protects against ransomware and hardware failures.",
    datePosted: new Date(Date.now() - 432000000).toISOString(),
  },
];

const TIPS_PER_PAGE = 6;

const Tips = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(mockTips.length / TIPS_PER_PAGE);
  const startIndex = (currentPage - 1) * TIPS_PER_PAGE;
  const endIndex = startIndex + TIPS_PER_PAGE;
  const currentTips = mockTips.slice(startIndex, endIndex);

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

        <div className="grid gap-6 md:grid-cols-2 mb-8 animate-slide-in">
          {currentTips.map((tip) => (
            <TipCard
              key={tip.id}
              title={tip.title}
              content={tip.content}
              datePosted={tip.datePosted}
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
      </main>

      <Footer />
    </div>
  );
};

export default Tips;

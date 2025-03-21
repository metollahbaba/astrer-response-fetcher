
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";
import Loader from "@/components/ui-custom/Loader";

export function AstrerResponse() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [customRequest, setCustomRequest] = useState("");
  const [requestHistory, setRequestHistory] = useState<string[]>([]);

  const fetchResponse = async (url = "https://astrer.tech/") => {
    try {
      setLoading(true);
      setResponse(null);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const text = await response.text();
      setResponse(text);
      
      // Add to history if not already present
      if (!requestHistory.includes(url) && url !== "https://astrer.tech/") {
        setRequestHistory(prev => [url, ...prev].slice(0, 5));
      }
      
      toast.success("Response fetched successfully");
    } catch (error) {
      console.error("Error fetching response:", error);
      toast.error("Failed to fetch response");
      setResponse("Error fetching response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRequest) return;
    
    let url = customRequest;
    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }
    
    if (!url.includes("astrer.tech")) {
      url = `https://astrer.tech/${url.replace(/^https?:\/\//, '')}`;
    }
    
    fetchResponse(url);
  };

  const handleHistoryClick = (url: string) => {
    setCustomRequest(url);
    fetchResponse(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-medium mb-3">Astrer Response Viewer</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fetches and displays responses from astrer.tech. Enter a custom path or use the default endpoint.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter astrer.tech path (e.g., astrer.tech/hello)"
              value={customRequest}
              onChange={(e) => setCustomRequest(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border-input bg-background shadow-sm transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <Button 
            type="submit"
            className="h-12 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all duration-200 shadow-sm"
            disabled={loading}
          >
            Fetch Response
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-12 rounded-lg transition-all duration-200 flex items-center justify-center"
            disabled={loading}
            onClick={() => fetchResponse()}
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </Button>
        </form>
      </motion.div>

      {requestHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-sm text-muted-foreground mb-2">Recent requests:</p>
          <div className="flex flex-wrap gap-2">
            {requestHistory.map((url, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs truncate max-w-[200px]"
                onClick={() => handleHistoryClick(url)}
              >
                {url.replace("https://astrer.tech/", "")}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
        
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center py-16"
          >
            <Loader size="lg" />
            <p className="mt-4 text-muted-foreground animate-pulse">Fetching response...</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-card overflow-hidden">
              <div className="p-1 bg-muted/30 border-b border-border flex items-center">
                <div className="flex gap-1.5 px-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-xs text-center text-muted-foreground truncate pr-12">
                  astrer.tech
                </div>
              </div>
              <div className="p-6 max-h-[500px] overflow-auto">
                {response ? (
                  <pre className="whitespace-pre-wrap break-words text-sm font-mono">{response}</pre>
                ) : (
                  <div className="text-center text-muted-foreground py-8">No response data</div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AstrerResponse;

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function AIAssistantFAB() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Assalamu alaikum! I'm your Quran companion. How can I help with your Quranic studies today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Create a user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    // Store current input for API call
    const currentQuery = input;
    
    // Add the user message to messages
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Call our server API endpoint
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentQuery }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      const responseContent = data.content || "I couldn't process your question properly. Please try again.";
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Fallback response in case of API error
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error while processing your question. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button 
        onClick={() => setOpen(true)} 
        className="fixed bottom-20 right-4 rounded-full shadow-lg h-14 w-14 p-3 md:bottom-8 md:right-8"
      >
        <span className="material-symbols-rounded text-2xl">chat</span>
      </Button>
      
      {/* Chat Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] h-[70vh] flex flex-col p-0" aria-describedby="chat-description">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>Quran Assistant</DialogTitle>
            <DialogDescription id="chat-description">Ask me anything about the Quran or Islamic teachings</DialogDescription>
          </DialogHeader>
          
          {/* Chat Messages */}
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex space-x-2"
            >
              <Input
                placeholder="Ask a question about the Quran..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <span className="material-symbols-rounded">send</span>
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
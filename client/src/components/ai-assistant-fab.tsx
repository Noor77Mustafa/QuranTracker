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
    
    // Add the user message to messages
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate a response (In a real app, this would make an API call to the Perplexity API)
    setTimeout(() => {
      // Sample responses based on keywords in the user's message
      let responseContent = "I'll need to learn more about that topic to provide a better answer. The Quran is a vast source of knowledge with many dimensions.";
      
      const lowerCaseInput = input.toLowerCase();
      
      if (lowerCaseInput.includes("surah") || lowerCaseInput.includes("chapter")) {
        responseContent = "The Quran has 114 surahs (chapters), each with unique themes and teachings. You can explore them in the 'Read' section of this app. Would you like me to tell you more about a specific surah?";
      } else if (lowerCaseInput.includes("ramadan") || lowerCaseInput.includes("fasting")) {
        responseContent = "Ramadan is the ninth month of the Islamic calendar, during which Muslims fast from dawn until sunset. The Quran was first revealed during this month. Fasting teaches self-discipline, empathy, and God-consciousness (taqwa).";
      } else if (lowerCaseInput.includes("prayer") || lowerCaseInput.includes("salah") || lowerCaseInput.includes("salat")) {
        responseContent = "Prayer (Salah) is one of the Five Pillars of Islam. Muslims pray five times daily: Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), and Isha (night).";
      } else if (lowerCaseInput.includes("hajj") || lowerCaseInput.includes("pilgrimage")) {
        responseContent = "Hajj is the annual Islamic pilgrimage to Mecca, Saudi Arabia, and is mandatory for Muslims to perform at least once in their lifetime if they are physically and financially able.";
      } else if (lowerCaseInput.includes("zakat") || lowerCaseInput.includes("charity")) {
        responseContent = "Zakat is one of the Five Pillars of Islam, requiring Muslims to give 2.5% of their qualifying wealth to those in need annually.";
      } else if (lowerCaseInput.includes("prophet") || lowerCaseInput.includes("muhammad")) {
        responseContent = "Prophet Muhammad ﷺ was the final prophet of Islam who received the revelations of the Quran from Allah through the angel Gabriel over 23 years. His life and teachings (Sunnah) serve as a model for Muslims.";
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
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
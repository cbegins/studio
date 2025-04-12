'use client';

import {generateRoast} from '@/ai/flows/generate-roast';
import {moderateContent} from '@/ai/flows/moderate-content';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {toast} from '@/hooks/use-toast';
import {CheckCircle, MessageSquare} from 'lucide-react';
import React, {useState} from 'react';

const loadingMessages = ['Hacking the mainframe...', 'Decrypting humor...', 'Injecting roast logic...', 'Compiling wit...'];

export default function Home() {
  const [question, setQuestion] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<
      {
        type: 'question' | 'roast';
        text: string;
      }[]
  >([]);

  const askQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: 'Please enter a valid question.',
      });
      return;
    }

    setLoading(true);
    setRoast('');
    const randomLoadingMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(randomLoadingMessage);

    setChatHistory(prev => [...prev, {type: 'question', text: question}]);
    setQuestion('');

    try {
      // Generate roast
      let generatedRoast = await generateRoast({question: question});
      let roastText = generatedRoast.roast;

      // Moderate content
      let moderationResult = await moderateContent({text: roastText});

      if (!moderationResult.isSafe) {
        roastText =
            moderationResult.adjustedText ||
            'I am programmed to be ethical and cannot respond to that.';
        toast({
          title: 'Roast was deemed unsafe and has been adjusted.',
        });
      }

      setRoast(roastText);
      setChatHistory(prev => [...prev, {type: 'roast', text: roastText}]);
      toast({
        title: 'Roast Generated!',
        icon: <CheckCircle className="h-4 w-4" />,
      });
    } catch (error: any) {
      console.error('Error generating roast:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate roast. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl bg-background shadow-xl rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span>HackBegin</span>
          </CardTitle>
          <CardDescription>Ask a hacking-related question, get roasted!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {chatHistory.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${item.type === 'question'
                  ? 'bg-secondary text-secondary-foreground self-start'
                  : 'bg-primary text-primary-foreground self-end'}`}>
                {item.text}
              </div>
            ))}
            {loading && <div className="italic text-sm text-muted-foreground">{loadingMessage}</div>}
            {roast && !loading && <div className="self-end">{roast}</div>}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything about hacking..."
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  askQuestion();
                }
              }}
              disabled={loading}
            />
            <Button onClick={askQuestion} disabled={loading}>
              Roast Me!
            </Button>
          </div>
        </CardContent>
         <CardFooter className="flex justify-center items-center">
          <a href="https://github.com/TirupMehta" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            © Tirup Mehta 2025
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

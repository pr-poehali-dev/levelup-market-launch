import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatBot({ isOpen, onClose }: AIChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Я ваш виртуальный помощник. Чем могу помочь?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('помощь') || lowerMessage.includes('помоги')) {
      return 'Я могу помочь вам с покупкой аккаунтов, пополнением баланса, размещением объявлений и ответить на вопросы о работе маркетплейса.';
    }
    
    if (lowerMessage.includes('баланс') || lowerMessage.includes('пополнить')) {
      return 'Для пополнения баланса перейдите в личный кабинет, откройте вкладку "Кошелек" и нажмите кнопку "Пополнить баланс". Доступны способы оплаты: карта, электронные кошельки, криптовалюта.';
    }
    
    if (lowerMessage.includes('купить') || lowerMessage.includes('аккаунт')) {
      return 'В каталоге представлены различные Steam аккаунты. Вы можете фильтровать их по цене и характеристикам. После выбора нажмите "Купить сейчас" и средства спишутся с вашего баланса.';
    }
    
    if (lowerMessage.includes('продать') || lowerMessage.includes('разместить')) {
      return 'Чтобы разместить свой аккаунт на продажу, войдите в личный кабинет, перейдите во вкладку "Продажи" и нажмите "Разместить аккаунт". Укажите характеристики и желаемую цену.';
    }
    
    if (lowerMessage.includes('безопас') || lowerMessage.includes('гарант')) {
      return 'Все сделки проходят через систему гарантий. Мы проверяем каждый аккаунт перед размещением. Ваши средства защищены на время проверки покупки.';
    }
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
      return 'Привет! Рад помочь вам с любыми вопросами по LevelUp Market!';
    }

    if (lowerMessage.includes('спасибо') || lowerMessage.includes('благодар')) {
      return 'Всегда рад помочь! Если возникнут ещё вопросы — обращайтесь!';
    }
    
    return 'Спасибо за вопрос! Для более детальной консультации вы можете связаться с нашей поддержкой через раздел "Контакты" или написать на support@levelup-market.ru';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-96 animate-scale-in">
      <Card className="shadow-2xl border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary via-secondary to-accent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Icon name="Bot" size={24} className="text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">AI Помощник</CardTitle>
                <p className="text-white/80 text-xs">Онлайн</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Напишите сообщение..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-primary to-secondary"
                disabled={!inputValue.trim()}
              >
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

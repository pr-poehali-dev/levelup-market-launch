import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-gradient bg-400%" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <Badge className="mb-6 bg-gradient-to-r from-primary to-secondary border-0" variant="outline">
            <Icon name="Zap" size={14} className="mr-1" />
            Безопасные сделки
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Покупай и продавай
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-400%">
              Steam аккаунты
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Более 10,000 успешных сделок. Гарантия безопасности и мгновенная доставка
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity text-lg px-8"
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Search" size={20} className="mr-2" />
              Смотреть каталог
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 text-lg px-8"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Продать аккаунт
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <p className="text-sm text-muted-foreground">Сделок</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">
                5K+
              </div>
              <p className="text-sm text-muted-foreground">Пользователей</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-sm text-muted-foreground">Поддержка</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

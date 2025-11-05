import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Account {
  id: string;
  title: string;
  price: number;
  level: number;
  games: number;
  hours: number;
  image: string;
  featured?: boolean;
  tags: string[];
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  balance: number;
}

export default function Index() {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [filter, setFilter] = useState('all');
  const [purchases, setPurchases] = useState<Account[]>([]);
  const [sales, setSales] = useState<Account[]>([]);

  const mockAccounts: Account[] = [
    {
      id: '1',
      title: 'Premium CS:GO Account',
      price: 4999,
      level: 40,
      games: 120,
      hours: 2500,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      featured: true,
      tags: ['CS:GO', 'High Level', 'Rare Skins']
    },
    {
      id: '2',
      title: 'Dota 2 Pro Account',
      price: 8499,
      level: 87,
      games: 250,
      hours: 5600,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
      featured: true,
      tags: ['Dota 2', 'Pro Level', 'Immortals']
    },
    {
      id: '3',
      title: 'Starter Account with Popular Games',
      price: 1299,
      level: 12,
      games: 45,
      hours: 450,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
      tags: ['Budget', 'Popular Games']
    },
    {
      id: '4',
      title: 'AAA Games Collection',
      price: 5999,
      level: 55,
      games: 180,
      hours: 3200,
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
      tags: ['AAA Games', 'Complete Library']
    },
    {
      id: '5',
      title: 'Indie Games Paradise',
      price: 2499,
      level: 28,
      games: 320,
      hours: 1800,
      image: 'https://images.unsplash.com/photo-1587095951604-b9d924a3fda0?w=400&h=300&fit=crop',
      tags: ['Indie', 'Large Library']
    },
    {
      id: '6',
      title: 'Competitive FPS Account',
      price: 6799,
      level: 65,
      games: 95,
      hours: 4100,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
      featured: true,
      tags: ['FPS', 'Competitive', 'High Rank']
    }
  ];

  const filteredAccounts = mockAccounts.filter(account => {
    if (filter === 'all') return true;
    if (filter === 'featured') return account.featured;
    if (filter === 'budget') return account.price < 3000;
    if (filter === 'premium') return account.price >= 5000;
    return true;
  });

  const handleLogin = () => {
    setUser({
      name: 'Player One',
      email: 'player@steam.com',
      balance: 15000
    });
    setIsLoggedIn(true);
    toast({
      title: 'Вход выполнен',
      description: 'Добро пожаловать в LevelUp Market!',
    });
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setShowDashboard(false);
    toast({
      title: 'Выход выполнен',
      description: 'До скорой встречи!',
    });
  };

  const handleBuyAccount = (account: Account) => {
    if (!isLoggedIn) {
      toast({
        title: 'Требуется авторизация',
        description: 'Пожалуйста, войдите в систему для покупки аккаунта',
        variant: 'destructive'
      });
      return;
    }
    
    if (user && user.balance >= account.price) {
      setPurchases([...purchases, account]);
      setUser({ ...user, balance: user.balance - account.price });
      toast({
        title: 'Покупка успешна!',
        description: `Вы приобрели ${account.title}`,
      });
    } else {
      toast({
        title: 'Недостаточно средств',
        description: 'Пополните баланс для совершения покупки',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowDashboard(false)}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-gradient bg-400%"></div>
                <div className="relative bg-gradient-to-r from-primary via-secondary to-accent p-2 rounded-xl">
                  <Icon name="Gamepad2" className="text-white" size={28} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  LevelUp Market
                </h1>
                <p className="text-xs text-muted-foreground">Маркетплейс Steam аккаунтов</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setShowDashboard(false)}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Главная
              </button>
              <a href="#catalog" className="text-foreground/80 hover:text-foreground transition-colors">
                Каталог
              </a>
              <a href="#faq" className="text-foreground/80 hover:text-foreground transition-colors">
                FAQ
              </a>
              <a href="#contacts" className="text-foreground/80 hover:text-foreground transition-colors">
                Контакты
              </a>
            </nav>

            <div className="flex items-center gap-3">
              {isLoggedIn && user ? (
                <>
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                    <Icon name="Wallet" size={18} className="text-accent" />
                    <span className="font-semibold">{user.balance.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Avatar 
                    className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                    onClick={() => setShowDashboard(!showDashboard)}
                  >
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={20} />
                  </Button>
                </>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity">
                      <Icon name="User" size={18} className="mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Вход в аккаунт</DialogTitle>
                      <DialogDescription>
                        Войдите через Steam или используйте email
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary"
                        onClick={handleLogin}
                      >
                        <Icon name="Steam" size={20} className="mr-2" fallback="Gamepad2" />
                        Войти через Steam
                      </Button>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">или</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="player@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="password">Пароль</Label>
                          <Input id="password" type="password" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button className="w-full" onClick={handleLogin}>
                        Войти
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      {showDashboard && isLoggedIn && user ? (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowDashboard(false)}
              className="mb-4"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="purchases" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="purchases">
                <Icon name="ShoppingBag" size={16} className="mr-2" />
                Покупки
              </TabsTrigger>
              <TabsTrigger value="sales">
                <Icon name="TrendingUp" size={16} className="mr-2" />
                Продажи
              </TabsTrigger>
              <TabsTrigger value="wallet">
                <Icon name="Wallet" size={16} className="mr-2" />
                Кошелек
              </TabsTrigger>
            </TabsList>

            <TabsContent value="purchases" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>История покупок</CardTitle>
                  <CardDescription>Все ваши приобретенные аккаунты</CardDescription>
                </CardHeader>
                <CardContent>
                  {purchases.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>У вас пока нет покупок</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {purchases.map((purchase) => (
                        <div key={purchase.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card/50">
                          <img src={purchase.image} alt={purchase.title} className="w-20 h-20 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{purchase.title}</h4>
                            <p className="text-sm text-muted-foreground">Уровень: {purchase.level} • Игр: {purchase.games}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-accent">{purchase.price.toLocaleString('ru-RU')} ₽</p>
                            <Badge variant="secondary" className="mt-1">Завершено</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Мои продажи</CardTitle>
                  <CardDescription>Аккаунты, выставленные на продажу</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="mb-4">У вас нет активных продаж</p>
                    <Button className="bg-gradient-to-r from-primary to-secondary">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Разместить аккаунт
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wallet" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Баланс кошелька</CardTitle>
                    <CardDescription>Ваши доступные средства</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
                        {user.balance.toLocaleString('ru-RU')} ₽
                      </div>
                      <Button className="mt-4 bg-gradient-to-r from-accent to-secondary">
                        <Icon name="Plus" size={18} className="mr-2" />
                        Пополнить баланс
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Статистика</CardTitle>
                    <CardDescription>Ваша активность</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon name="ShoppingBag" size={20} className="text-primary" />
                        </div>
                        <span className="text-sm">Всего покупок</span>
                      </div>
                      <span className="font-bold text-xl">{purchases.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary/10">
                          <Icon name="TrendingUp" size={20} className="text-secondary" />
                        </div>
                        <span className="text-sm">Всего продаж</span>
                      </div>
                      <span className="font-bold text-xl">{sales.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Icon name="Star" size={20} className="text-accent" />
                        </div>
                        <span className="text-sm">Рейтинг</span>
                      </div>
                      <span className="font-bold text-xl">5.0</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <>
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

          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: 'Shield',
                    title: 'Безопасность',
                    description: 'Гарантия на каждый аккаунт. Защита покупателя и продавца'
                  },
                  {
                    icon: 'Zap',
                    title: 'Мгновенно',
                    description: 'Получите доступ к аккаунту сразу после оплаты'
                  },
                  {
                    icon: 'HeadphonesIcon',
                    title: 'Поддержка 24/7',
                    description: 'Круглосуточная помощь в решении любых вопросов'
                  }
                ].map((feature, index) => (
                  <Card key={index} className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-all hover:scale-105 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                        <Icon name={feature.icon as any} className="text-white" size={24} />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="catalog" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Каталог аккаунтов
                </h2>
                <p className="text-muted-foreground text-lg">
                  Выберите идеальный аккаунт для себя
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {[
                  { id: 'all', label: 'Все', icon: 'Grid3x3' },
                  { id: 'featured', label: 'Рекомендуем', icon: 'Star' },
                  { id: 'budget', label: 'Бюджетные', icon: 'Wallet' },
                  { id: 'premium', label: 'Премиум', icon: 'Crown' }
                ].map((filterOption) => (
                  <Button
                    key={filterOption.id}
                    variant={filter === filterOption.id ? 'default' : 'outline'}
                    onClick={() => setFilter(filterOption.id)}
                    className={filter === filterOption.id ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                  >
                    <Icon name={filterOption.icon as any} size={16} className="mr-2" />
                    {filterOption.label}
                  </Button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAccounts.map((account, index) => (
                  <Card 
                    key={account.id} 
                    className="overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:scale-105 animate-scale-in group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={account.image} 
                        alt={account.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {account.featured && (
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-accent to-secondary border-0">
                          <Icon name="Star" size={12} className="mr-1" />
                          Топ
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{account.title}</CardTitle>
                      <CardDescription className="flex flex-wrap gap-2 mt-2">
                        {account.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                        <div className="text-center p-2 rounded-lg bg-card border border-border">
                          <Icon name="Trophy" size={16} className="mx-auto mb-1 text-primary" />
                          <div className="font-semibold">{account.level}</div>
                          <div className="text-xs text-muted-foreground">Уровень</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-card border border-border">
                          <Icon name="Gamepad2" size={16} className="mx-auto mb-1 text-secondary" />
                          <div className="font-semibold">{account.games}</div>
                          <div className="text-xs text-muted-foreground">Игр</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-card border border-border">
                          <Icon name="Clock" size={16} className="mx-auto mb-1 text-accent" />
                          <div className="font-semibold">{account.hours}</div>
                          <div className="text-xs text-muted-foreground">Часов</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-0">
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {account.price.toLocaleString('ru-RU')} ₽
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        onClick={() => handleBuyAccount(account)}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        Купить
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="py-20 bg-card/30">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Часто задаваемые вопросы
                </h2>
                <p className="text-muted-foreground text-lg">
                  Ответы на популярные вопросы
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: 'Безопасно ли покупать аккаунты?',
                    answer: 'Да, абсолютно безопасно. Мы гарантируем безопасность каждой сделки. Все аккаунты проходят проверку перед публикацией, а деньги хранятся в защищенном хранилище до завершения сделки.'
                  },
                  {
                    question: 'Как быстро я получу аккаунт после покупки?',
                    answer: 'Доступ к аккаунту предоставляется мгновенно после подтверждения оплаты. Обычно это занимает не более 5 минут. Данные приходят в личный кабинет и на указанную почту.'
                  },
                  {
                    question: 'Могу ли я вернуть аккаунт?',
                    answer: 'Да, вы можете вернуть аккаунт в течение 24 часов после покупки, если он не соответствует описанию или есть проблемы с доступом. После изменения данных аккаунта возврат невозможен.'
                  },
                  {
                    question: 'Какие гарантии вы предоставляете?',
                    answer: 'Мы предоставляем гарантию 30 дней на каждый аккаунт. Если возникнут проблемы с доступом или блокировкой, мы заменим аккаунт или вернем деньги.'
                  },
                  {
                    question: 'Как продать свой аккаунт?',
                    answer: 'Зарегистрируйтесь на платформе, создайте объявление с описанием аккаунта и установите цену. После проверки модератором объявление будет опубликовано в каталоге.'
                  }
                ].map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left font-semibold">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section id="contacts" className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Контакты и поддержка
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Мы всегда рады помочь вам
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: 'Mail',
                      title: 'Email',
                      value: 'support@levelup.market',
                      link: 'mailto:support@levelup.market'
                    },
                    {
                      icon: 'MessageCircle',
                      title: 'Telegram',
                      value: '@levelupmarket',
                      link: 'https://t.me/levelupmarket'
                    },
                    {
                      icon: 'Phone',
                      title: 'Телефон',
                      value: '+7 (800) 555-35-35',
                      link: 'tel:+78005553535'
                    }
                  ].map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="border-border/50 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer bg-card/50 backdrop-blur h-full">
                        <CardHeader className="text-center">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                            <Icon name={contact.icon as any} className="text-white" size={24} />
                          </div>
                          <CardTitle>{contact.title}</CardTitle>
                          <CardDescription className="text-base font-medium text-foreground">
                            {contact.value}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </a>
                  ))}
                </div>

                <Card className="mt-12 border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Часы работы поддержки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Онлайн чат</span>
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                          <Icon name="Circle" size={8} className="mr-2 fill-green-500" />
                          24/7
                        </Badge>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Email поддержка</span>
                        <span className="font-medium">Пн-Вс, 9:00 - 21:00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Телефон</span>
                        <span className="font-medium">Пн-Пт, 10:00 - 19:00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="border-t border-border/40 bg-card/30 backdrop-blur py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-primary via-secondary to-accent p-2 rounded-lg">
                  <Icon name="Gamepad2" className="text-white" size={24} />
                </div>
                <span className="font-bold text-lg">LevelUp Market</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Маркетплейс для безопасной покупки и продажи Steam аккаунтов
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">С играми</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Высокий уровень</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Редкие предметы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Бюджетные</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Как это работает</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Безопасность</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                {['MessageCircle', 'Twitter', 'Youtube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Icon name={social as any} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 LevelUp Market. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

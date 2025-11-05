import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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

interface DashboardProps {
  user: User;
  purchases: Account[];
  sales: Account[];
  onBack: () => void;
}

export default function Dashboard({ user, purchases, sales, onBack }: DashboardProps) {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
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
  );
}

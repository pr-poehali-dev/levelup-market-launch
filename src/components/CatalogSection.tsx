import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface CatalogSectionProps {
  accounts: Account[];
  filter: string;
  onFilterChange: (filter: string) => void;
  onBuyAccount: (account: Account) => void;
}

export default function CatalogSection({ accounts, filter, onFilterChange, onBuyAccount }: CatalogSectionProps) {
  const filterOptions = [
    { id: 'all', label: 'Все', icon: 'Grid3x3' },
    { id: 'featured', label: 'Рекомендуем', icon: 'Star' },
    { id: 'budget', label: 'Бюджетные', icon: 'Wallet' },
    { id: 'premium', label: 'Премиум', icon: 'Crown' }
  ];

  return (
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
          {filterOptions.map((filterOption) => (
            <Button
              key={filterOption.id}
              variant={filter === filterOption.id ? 'default' : 'outline'}
              onClick={() => onFilterChange(filterOption.id)}
              className={filter === filterOption.id ? 'bg-gradient-to-r from-primary to-secondary' : ''}
            >
              <Icon name={filterOption.icon as any} size={16} className="mr-2" />
              {filterOption.label}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account, index) => (
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
                  onClick={() => onBuyAccount(account)}
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
  );
}

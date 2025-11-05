import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface User {
  name: string;
  email: string;
  avatar?: string;
  balance: number;
}

interface HeaderProps {
  isLoggedIn: boolean;
  user: User | null;
  showDashboard: boolean;
  onToggleDashboard: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Header({ isLoggedIn, user, showDashboard, onToggleDashboard, onLogin, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onToggleDashboard}>
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
              onClick={onToggleDashboard}
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
                  onClick={onToggleDashboard}
                >
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onLogout}
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
                      onClick={onLogin}
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
                    <Button className="w-full" onClick={onLogin}>
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
  );
}

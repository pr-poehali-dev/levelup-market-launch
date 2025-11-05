import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CatalogSection from '@/components/CatalogSection';
import FAQSection from '@/components/FAQSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';
import AIChatBot from '@/components/AIChatBot';
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

export default function Index() {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [filter, setFilter] = useState('all');
  const [purchases, setPurchases] = useState<Account[]>([]);
  const [sales, setSales] = useState<Account[]>([]);
  const [showChatBot, setShowChatBot] = useState(false);

  const mockAccounts: Account[] = [];

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
      balance: 0
    });
    setIsLoggedIn(true);
    toast({
      title: 'Вход выполнен',
      description: 'Добро пожаловать в LevelUp Market!',
    });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    if (updatedUser.balance !== user?.balance) {
      toast({
        title: 'Баланс обновлен',
        description: `Ваш новый баланс: ${updatedUser.balance.toLocaleString('ru-RU')} ₽`,
      });
    }
    if (updatedUser.avatar !== user?.avatar) {
      toast({
        title: 'Аватар обновлен',
        description: 'Ваш аватар успешно изменен',
      });
    }
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

  const handleToggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header 
        isLoggedIn={isLoggedIn}
        user={user}
        showDashboard={showDashboard}
        onToggleDashboard={handleToggleDashboard}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {showDashboard && isLoggedIn && user ? (
        <Dashboard 
          user={user}
          purchases={purchases}
          sales={sales}
          onBack={() => setShowDashboard(false)}
          onUpdateUser={handleUpdateUser}
        />
      ) : (
        <>
          <HeroSection />
          <FeaturesSection />
          <CatalogSection 
            accounts={filteredAccounts}
            filter={filter}
            onFilterChange={setFilter}
            onBuyAccount={handleBuyAccount}
          />
          <FAQSection />
          <ContactsSection />
        </>
      )}

      <Footer />

      <Button
        onClick={() => setShowChatBot(!showChatBot)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-lg hover:shadow-xl transition-all hover:scale-110"
        size="icon"
      >
        <Icon name={showChatBot ? "X" : "Bot"} size={24} />
      </Button>

      <AIChatBot isOpen={showChatBot} onClose={() => setShowChatBot(false)} />
    </div>
  );
}
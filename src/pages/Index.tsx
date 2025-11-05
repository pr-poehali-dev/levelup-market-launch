import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CatalogSection from '@/components/CatalogSection';
import FAQSection from '@/components/FAQSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';

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
    </div>
  );
}

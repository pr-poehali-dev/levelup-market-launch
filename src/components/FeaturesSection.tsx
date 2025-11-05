import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function FeaturesSection() {
  const features = [
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
  ];

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-all hover:scale-105 animate-scale-in" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  const contacts = [
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
  ];

  return (
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
            {contacts.map((contact, index) => (
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
  );
}

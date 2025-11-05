import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
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
  );
}

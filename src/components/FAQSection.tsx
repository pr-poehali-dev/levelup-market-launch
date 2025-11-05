import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQSection() {
  const faqs = [
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
  ];

  return (
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
          {faqs.map((item, index) => (
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
  );
}

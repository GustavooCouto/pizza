import { Flame, Clock, Leaf, Award } from 'lucide-react'

const features = [
  {
    icon: Flame,
    title: 'Forno a Lenha',
    description: 'Nossa pizza é assada em forno a lenha tradicional, atingindo temperaturas de até 450°C para uma massa perfeita.',
  },
  {
    icon: Clock,
    title: 'Fermentação Longa',
    description: 'Nossa massa descansa por no mínimo 48 horas, resultando em uma textura leve e sabor incomparável.',
  },
  {
    icon: Leaf,
    title: 'Ingredientes Frescos',
    description: 'Selecionamos diariamente os melhores ingredientes de produtores locais e importados da Itália.',
  },
  {
    icon: Award,
    title: 'Tradição & Qualidade',
    description: 'Receitas tradicionais napolitanas combinadas com técnicas modernas de alta gastronomia.',
  },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Nossa História
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-6">
              Orgânica por essência, recheada por prazer
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                A Sapore Artesanal nasceu da paixão por criar pizzas autênticas e saborosas. 
                Acreditamos que a verdadeira pizza artesanal começa com ingredientes de qualidade, 
                frescos e cuidadosamente selecionados.
              </p>
              <p>
                Cada pizza que preparamos carrega o carinho e a dedicação de nossa equipe. 
                Nossas receitas são pensadas para agradar todos os paladares, desde os sabores 
                tradicionais até as criações mais ousadas.
              </p>
              <p>
                Nossa missão é proporcionar uma experiência gastronômica única, onde cada fatia 
                conta uma história de tradição, qualidade e amor pela culinária artesanal.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-background p-6 rounded-2xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

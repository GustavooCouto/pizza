import Image from 'next/image'
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer id="contato" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Sapore Artesanal"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-foreground">Sapore Artesanal</span>
                <span className="text-[10px] text-muted-foreground">Orgânica por essência</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Pizza artesanal feita com amor e tradição. 
              Orgânica por essência, recheada por prazer.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="tel:+5546911158681" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                (46) 9115-8681
              </a>
              <a 
                href="https://wa.me/5546911158681" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Região de atendimento<br />Consulte disponibilidade</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Horário</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Terça a Domingo</span>
              </div>
              <p className="ml-6">18:00 às 23:00</p>
              <p className="ml-6 text-xs">Segunda-feira: Fechado</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5546911158681"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-green-600 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Sapore Artesanal. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { MenuSection } from '@/components/menu-section'
import { DrinksSection } from '@/components/drinks-section'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MenuSection />
        <DrinksSection />
        <AboutSection />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

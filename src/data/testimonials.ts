export interface Testimonial {
  id: number;
  text: string;
  rating: 4 | 4.5 | 5;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Première expérience de location et franchement au top ! Le Karakou était encore plus beau en vrai qu´en photo ✨",
    rating: 5,
  },
  {
    id: 2,
    text: "J´ai loué la Takchita SARAH pour mes fiançailles…une pure merveille🤍 Tout le monde m'a demandé d'où elle venait ! Merci pour ta disponibilité !",
    rating: 5,
  },
  {
    id: 3,
    text: "J'ai adoré la possibilité de choisir entre plusieurs bas, c'est top pour les femmes voilées !",
    rating: 4.5,
  },
  {
    id: 4,
    text: "Le caftan ESMA était incroyable pour mon évènement avec les bijoux qui vont avec en plus, très satisfaite !",
    rating: 5,
  },
  {
    id: 5,
    text: "Des modèles sublimes et un accueil très chaleureux 🥰",
    rating: 5,
  },
  {
    id: 6,
    text: "Le caftan (SELMA) était magnifique et à un prix abordable !",
    rating: 4.5,
  },
];


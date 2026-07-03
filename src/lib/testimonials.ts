export type TestimonialPlatform = "instagram" | "tiktok" | "youtube";

export interface Testimonial {
  text: string;
  author: string;
  platform: TestimonialPlatform;
  url: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "No esperaba yo encontrarme un pedazo de concierto así en el mangafest. No me lo pude pasar mejor gracias a vosotros 🔥",
    author: "@paulx_611",
    platform: "instagram",
    url: "https://www.instagram.com/p/DPEBGAyDzY7/?igsh=MTV5aXpsZW9leWJ2Yw==",
  },
  {
    text: "Espero veros otra vez así como en el manga fest (joder cómo les quedó la intro de Attack on Titan)",
    author: "@samux011",
    platform: "instagram",
    url: "https://www.instagram.com/p/DPEBGAyDzY7/?igsh=MTV5aXpsZW9leWJ2Yw==",
  },
  {
    text: "Pero pero, qué maravilla, necesito esto en estudio Spoty y maravilloso sería una maqueta / CD. ¡Bravo!",
    author: "@seruvk",
    platform: "tiktok",
    url: "https://www.tiktok.com/@ninosperdidos.rock/video/pQPN-eDBsE",
  },
  {
    text: "Cantáis versiones rock de canciones Disney + vuestro nombre 🥰 me habéis llegado al corazón",
    author: "@nayra",
    platform: "tiktok",
    url: "https://www.tiktok.com/@ninosperdidos.rock",
  },
  {
    text: "Yo también fui testigo de su primer concierto, fue genial. 🥰🥰",
    author: "@zalacain",
    platform: "tiktok",
    url: "https://www.tiktok.com/@ninosperdidos.rock",
  },
];

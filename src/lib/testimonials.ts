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
    text: "🙌🙌🙌 acabamos de disfrutar con vosotros hoy, en los Molinos",
    author: "@yen_crespo",
    platform: "instagram",
    url: "https://www.instagram.com/p/DdD56Tgtnr5?comment_id=17911145049527077",
  },
  {
    text: "Qué bien habéis estado, lo habéis dado todo como siempre, pero hoy el público lo ha petado, gracias a los Molinos de Getafe 👏👏👏👏💕💕💕 y desde luego a NIÑOS PERDIDOS ROCK que sois muy GRANDES!!!!",
    author: "@mazoila65",
    platform: "instagram",
    url: "https://www.instagram.com/p/DdD56Tgtnr5?comment_id=17972814170938415",
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
  {
    text: "Os hemos visto en Enguera y sois un grupo de 10, hemos disfrutado un montón el concierto. Muchas gracias 😍",
    author: "@sara_xya_",
    platform: "instagram",
    url: "https://www.instagram.com/p/DcwiC38Nled?comment_id=17957907674999329",
  },
];

# Pet Project - Social Media Platform

Detta projekt är en sociala medier-plattform byggd med Next.js, TypeScript och Tailwind CSS.  
Den använder också en Neon Postgres serverless-databas och Drizzle för ORM (Object Relational Model).  

Plattformen innehåller sidor för att se inlägg, samt att kunna se och bläddra bland profiler.  
Användare kan också logga in för att följa profiler och gilla inlägg.

Live preview: [Vercel Deployment](https://nextjs-petproject.vercel.app)

## Innehållsförteckning

- [Om projektet](#om-projektet)
- [Funktionalitet](#funktionalitet)
- [Teknologier](#teknologier)
- [Projektstruktur](#projektstruktur)
- [Installation](#installation)
- [Användning](#användning)
- [Arbetsflöde](#arbetsflöde)
- [Sprintplan](#sprintplan)
- [Lärdomar](#lärdomar)
- [Utvecklingsmöjligheter](#utvecklingsmöjligheter)
- [Credit](#credit)
- [Licens](#licens)

## Om projektet

Detta har varit ett individuellt arbete på 3 veckor där målet varit ett portfolioprojekt för att visa upp användbara kunskaper.

Jag valde en sociala medier plattform med fokus på att läsa informtion från en databas och presentera det på ett snyggt vis.

## Funktionalitet

- Listar profiler och inlägg med paginering, sortering och filtrering.
- Visar enskilda profiler och inlägg.
- Visar bilder genom ett bildgalleri.
- Söka efter profiler eller inlägg.
- Registrering, inloggning och hantering av användarkonto.
- Följa profiler och gilla inlägg.
- Responsivitet.

## Teknologier

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/)
- [Neon Postgres DB](https://neon.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- REST API (Next.js API-routes)
- [WAVE](https://wave.webaim.org/)

## Projektstruktur

```
Project
├── app                   # Next-js routes and global-styles
├── components            # React components 
├── db                    # Database managers
│   └── migration         # SQL table scripts
├── lib                   # Utility functions
│   ├── data              # JSON test-data
│   └── service           # Service-functions
├── public                # assets
│   └── profiles          # test-data assets
├── next.config.js        # Next.js configuration
├── drizzle.config.ts     # Drizzle configuration
├── middleware.ts         # Clerk auth layer
└── package.json          # Project dependencies
```

## Installation

1.  **Klona repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Installera beroenden i projekt-root:**

    ```bash
    npm install
    ```

3.  **Förbered databasen**

    Ha en databas redo och igång, t.ex [Neon](https://console.neon.tech/signup).  
    Anslut för att köra SQL direkt, t.ex med SQL Editor från [Neon Console](https://console.neon.tech/):  
    
    Kör SQL-migrationsscripten under `/db/migration/` i projektet med format `<XXXX_string.sql>` från längsta till högsta tillgänglig.  
    Säkerställ att alla tabeller har skapats utan problem.

4.  **Konfigurera miljö-variabler:**

    Skapa en `.env`-fil i projekt-root och lägg till nödvändig information för nedan:
    ```
    DATABASE_URL=[ACTUAL_DATABASE_URL]
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[ACTUAL_PUBLISHABLE_KEY]
    CLERK_SECRET_KEY=[ACTUAL_SECRET_KEY]

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
    ```
    
5.  **Kör utvecklingservern:**

    ```bash
    npm run dev
    ```

    Öppna [http://localhost:3000](http://localhost:3000) i webbläsaren för att kunna se applikationen.

## Användning

- Startsidan (**Home**) presenterar senaste inläggen från profiler. Dom kan både sorteras och filtrering.
- Profiler (**Profiles**) visar alla existerande profiler och kan filtreras baserat på existerande resultat.
- Om oss (**About**) visar utfyllnad för saker så som generell information, kontakt och support.
- Sidor för inlägg presenterar detalj-information om enskilda inlägg.
- Sidor för Profil presenterar detalj-information om enskilda profiler, samt grupperar information som uppladdade bilder och dess skapade inlägg.
- Sökfunktion i header söker utifrån aktuell sida.
- Användare kan registrera sig, logga in och hantera användarkonto.
- Inloggade användare kan följa profiler och gilla inlägg. Detta reflekteras sedan i viss filtrering.

## Arbetsflöde

Arbetet har utförts på egen hand under 3 veckor.  
Vi blev indelade i grupper som agerade bollplank och extra stöd, samt planerad avstämning.  

Arbetet har sköts agilt och använde SCRUM där gruppen höll möten för sprint-planning, -reviews, samt -retrospectives.  
Projektet har styrts via en KANBAN-board i Github Projects där dokumentation och planerat arbete samlats.  

## Sprintplan

### Sprint 1

Innan själva projektet startade så sammanställde man en grafisk design och dokumentation av vad som planerade arbetas på.  
Första veckan lade jag fokus på grundläggande komponenter och layout, såsom header, sidebar och innehållsdel.  

### Sprint 2

Andra veckan lade främst fokus på databas-anslutning och kommunikation med data.  
Utöver det såg jag till att alla sidor kunde presentera innehåll.  

### Sprint 3

Sista veckan såg till att få allting att falla på plats och finslipas med responsivitet, styling och WCAG-kontroll.

## Lärdomar

- Ansluta och kommunicera med Neon Postgres databas.
- Integrering av Drizzle ORM.
- Next.js API-routes och arbeta mot lokalt REST-API.
- Hantering av scope-creep och prioritering av rätt uppgifter.
- Responsivitet och WCAG-kontrollering.

## Utvecklingsmöjligheter

Om jag bygger vidare på plattformen så vill jag fortsätta det jag var tvungen att skala bort från planeringen.  
- Användare ska kunna skapa och hantera profiler, samt skapa inlägg.
- Någon form av bilduppladdning.
- Användare borde också kunna lägga till kommentarer på inlägg.

## Credit

Djur-bilder för innehåll används från dessa källor:  
https://www.pexels.com/@graeme-travers-637657729/  
https://www.pexels.com/@shvetsa/  
https://www.pexels.com/@ingewallu/  
https://www.pexels.com/@jesse-bannister-32886237/  
https://www.pexels.com/@barnabas-davoti-31615494/  
https://www.pexels.com/@marek-kupiec-1696944/  

## Licens

[MIT](LICENSE)
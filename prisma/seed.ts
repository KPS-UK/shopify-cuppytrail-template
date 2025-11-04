import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Competitions
  await prisma.competition.createMany({
    data: [
      {id: 1, name: 'Premier League', shortName: 'EPL', countryIso: 'GB' },
      {id: 2, name: 'La Liga', shortName: 'LL', countryIso: 'ES' },
    ],
  });

  // Seed Teams
  await prisma.team.createMany({
    data: [
      // Premier League teams (competitionId = 1)
      { id: 1, name: 'Manchester United', shortName: 'MUN', countryIso: 'GB', competitionId: 1 },
      { id: 2, name: 'Liverpool', shortName: 'LIV', countryIso: 'GB', competitionId: 1 },
      { id: 3, name: 'Chelsea', shortName: 'CHE', countryIso: 'GB', competitionId: 1 },
      { id: 4, name: 'Arsenal', shortName: 'ARS', countryIso: 'GB', competitionId: 1 },
      { id: 5, name: 'Manchester City', shortName: 'MCI', countryIso: 'GB', competitionId: 1 },

      // La Liga teams (competitionId = 2)
      { id: 6, name: 'Real Madrid', shortName: 'RMA', countryIso: 'ES', competitionId: 2 },
      { id: 7, name: 'Barcelona', shortName: 'BAR', countryIso: 'ES', competitionId: 2 },
      { id: 8, name: 'Atletico Madrid', shortName: 'ATM', countryIso: 'ES', competitionId: 2 },
      { id: 9, name: 'Sevilla', shortName: 'SEV', countryIso: 'ES', competitionId: 2 },
      { id: 10, name: 'Valencia', shortName: 'VAL', countryIso: 'ES', competitionId: 2 },
    ],
  });

  // Seed Players
  const playersData = [
    // Manchester United
    { firstName: 'David', lastName: 'De Gea', nationality: 'ES', teamId: 1 },
    { firstName: 'Harry', lastName: 'Maguire', nationality: 'GB', teamId: 1 },
    { firstName: 'Raphael', lastName: 'Varane', nationality: 'FR', teamId: 1 },
    { firstName: 'Luke', lastName: 'Shaw', nationality: 'GB', teamId: 1 },
    { firstName: 'Bruno', lastName: 'Fernandes', nationality: 'PT', teamId: 1 },
    { firstName: 'Paul', lastName: 'Pogba', nationality: 'FR', teamId: 1 },
    { firstName: 'Marcus', lastName: 'Rashford', nationality: 'GB', teamId: 1 },
    { firstName: 'Jadon', lastName: 'Sancho', nationality: 'GB', teamId: 1 },
    { firstName: 'Mason', lastName: 'Greenwood', nationality: 'GB', teamId: 1 },
    { firstName: 'Anthony', lastName: 'Martial', nationality: 'FR', teamId: 1 },
    { firstName: 'Fred', lastName: 'Rodrigues', nationality: 'BR', teamId: 1 },

    // Liverpool
    { firstName: 'Alisson', lastName: 'Becker', nationality: 'BR', teamId: 2 },
    { firstName: 'Virgil', lastName: 'van Dijk', nationality: 'NL', teamId: 2 },
    { firstName: 'Trent', lastName: 'Alexander-Arnold', nationality: 'GB', teamId: 2 },
    { firstName: 'Andrew', lastName: 'Robertson', nationality: 'GB', teamId: 2 },
    { firstName: 'Fabinho', lastName: 'Tavares', nationality: 'BR', teamId: 2 },
    { firstName: 'Jordan', lastName: 'Henderson', nationality: 'GB', teamId: 2 },
    { firstName: 'Mohamed', lastName: 'Salah', nationality: 'EG', teamId: 2 },
    { firstName: 'Sadio', lastName: 'Mane', nationality: 'SN', teamId: 2 },
    { firstName: 'Roberto', lastName: 'Firmino', nationality: 'BR', teamId: 2 },
    { firstName: 'Diogo', lastName: 'Jota', nationality: 'PT', teamId: 2 },
    { firstName: 'Thiago', lastName: 'Alcantara', nationality: 'ES', teamId: 2 },

    // Chelsea
    { firstName: 'Edouard', lastName: 'Mendy', nationality: 'SN', teamId: 3 },
    { firstName: 'Thiago', lastName: 'Silva', nationality: 'BR', teamId: 3 },
    { firstName: 'Reece', lastName: 'James', nationality: 'GB', teamId: 3 },
    { firstName: 'Ben', lastName: 'Chilwell', nationality: 'GB', teamId: 3 },
    { firstName: "N'Golo", lastName: 'Kante', nationality: 'FR', teamId: 3 },
    { firstName: 'Mateo', lastName: 'Kovacic', nationality: 'HR', teamId: 3 },
    { firstName: 'Mason', lastName: 'Mount', nationality: 'GB', teamId: 3 },
    { firstName: 'Kai', lastName: 'Havertz', nationality: 'DE', teamId: 3 },
    { firstName: 'Christian', lastName: 'Pulisic', nationality: 'US', teamId: 3 },
    { firstName: 'Romelu', lastName: 'Lukaku', nationality: 'BE', teamId: 3 },
    { firstName: 'Timo', lastName: 'Werner', nationality: 'DE', teamId: 3 },

    // Add all remaining players in the same pattern...
  ];

  await prisma.player.createMany({ data: playersData });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

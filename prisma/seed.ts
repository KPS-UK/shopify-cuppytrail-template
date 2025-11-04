import { Competition, Match, Player, PrismaClient, Team } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Competitions
  const competitions : Competition[] = [
    {id: 1, name: 'Premier League', shortName: 'EPL', countryIso: 'GB' },
    {id: 2, name: 'La Liga', shortName: 'LL', countryIso: 'ES' }
  ]

  await Promise.all(competitions.map(comp => 
    prisma.competition.upsert({
      where: { id: comp.id },
      create: comp,
      update: comp,
    })
  ));

  // Seed Teams
  const teams : Team[] = [
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
  ];

  await Promise.all(teams.map(team =>
    prisma.team.upsert({
      where: { id: team.id },
      create: team,
      update: team,
    })
  ));

  // Seed Players
  const players : Partial<Player>[] = [
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

    // Arsenal (teamId = 4)
      { firstName: 'Aaron', lastName: 'Ramsdale', nationality: 'GB', teamId: 4 },
      { firstName: 'Ben', lastName: 'White', nationality: 'GB', teamId: 4 },
      { firstName: 'Gabriel', lastName: 'Magalhaes', nationality: 'BR', teamId: 4 },
      { firstName: 'Kieran', lastName: 'Tierney', nationality: 'GB', teamId: 4 },
      { firstName: 'Thomas', lastName: 'Partey', nationality: 'GH', teamId: 4 },
      { firstName: 'Granit', lastName: 'Xhaka', nationality: 'CH', teamId: 4 },
      { firstName: 'Bukayo', lastName: 'Saka', nationality: 'GB', teamId: 4 },
      { firstName: 'Martin', lastName: 'Odegaard', nationality: 'NO', teamId: 4 },
      { firstName: 'Gabriel', lastName: 'Jesus', nationality: 'BR', teamId: 4 },
      { firstName: 'Eddie', lastName: 'Nketiah', nationality: 'GB', teamId: 4 },
      { firstName: 'Fabio', lastName: 'Vieira', nationality: 'PT', teamId: 4 },

      // Manchester City (teamId = 5)
      { firstName: 'Ederson', lastName: 'Moraes', nationality: 'BR', teamId: 5 },
      { firstName: 'Ruben', lastName: 'Dias', nationality: 'PT', teamId: 5 },
      { firstName: 'John', lastName: 'Stones', nationality: 'GB', teamId: 5 },
      { firstName: 'Kyle', lastName: 'Walker', nationality: 'GB', teamId: 5 },
      { firstName: 'Rodri', lastName: 'Hernandez', nationality: 'ES', teamId: 5 },
      { firstName: 'Ilkay', lastName: 'Gundogan', nationality: 'DE', teamId: 5 },
      { firstName: 'Kevin', lastName: 'De Bruyne', nationality: 'BE', teamId: 5 },
      { firstName: 'Phil', lastName: 'Foden', nationality: 'GB', teamId: 5 },
      { firstName: 'Bernardo', lastName: 'Silva', nationality: 'PT', teamId: 5 },
      { firstName: 'Jack', lastName: 'Grealish', nationality: 'GB', teamId: 5 },
      { firstName: 'Erling', lastName: 'Haaland', nationality: 'NO', teamId: 5 },

      // Real Madrid (teamId = 6)
      { firstName: 'Thibaut', lastName: 'Courtois', nationality: 'BE', teamId: 6 },
      { firstName: 'Dani', lastName: 'Carvajal', nationality: 'ES', teamId: 6 },
      { firstName: 'Eder', lastName: 'Militao', nationality: 'BR', teamId: 6 },
      { firstName: 'David', lastName: 'Alaba', nationality: 'AT', teamId: 6 },
      { firstName: 'Ferland', lastName: 'Mendy', nationality: 'FR', teamId: 6 },
      { firstName: 'Luka', lastName: 'Modric', nationality: 'HR', teamId: 6 },
      { firstName: 'Toni', lastName: 'Kroos', nationality: 'DE', teamId: 6 },
      { firstName: 'Casemiro', lastName: 'Alves', nationality: 'BR', teamId: 6 },
      { firstName: 'Karim', lastName: 'Benzema', nationality: 'FR', teamId: 6 },
      { firstName: 'Vinicius', lastName: 'Junior', nationality: 'BR', teamId: 6 },
      { firstName: 'Marco', lastName: 'Asensio', nationality: 'ES', teamId: 6 },

      // Barcelona (teamId = 7)
      { firstName: 'Marc-Andre', lastName: 'Ter Stegen', nationality: 'DE', teamId: 7 },
      { firstName: 'Jordi', lastName: 'Alba', nationality: 'ES', teamId: 7 },
      { firstName: 'Ronald', lastName: 'Araujo', nationality: 'UY', teamId: 7 },
      { firstName: 'Gerard', lastName: 'Pique', nationality: 'ES', teamId: 7 },
      { firstName: 'Sergio', lastName: 'Busquets', nationality: 'ES', teamId: 7 },
      { firstName: 'Frenkie', lastName: 'de Jong', nationality: 'NL', teamId: 7 },
      { firstName: 'Pedri', lastName: 'Gonzalez', nationality: 'ES', teamId: 7 },
      { firstName: 'Gavi', lastName: '', nationality: 'ES', teamId: 7 },
      { firstName: 'Robert', lastName: 'Lewandowski', nationality: 'PL', teamId: 7 },
      { firstName: 'Ousmane', lastName: 'Dembele', nationality: 'FR', teamId: 7 },
      { firstName: 'Raphinha', lastName: '', nationality: 'BR', teamId: 7 },

      // Atletico Madrid (teamId = 8)
      { firstName: 'Jan', lastName: 'Oblak', nationality: 'SI', teamId: 8 },
      { firstName: 'Kieran', lastName: 'Trippier', nationality: 'GB', teamId: 8 },
      { firstName: 'Jose', lastName: 'Maria Gimenez', nationality: 'UY', teamId: 8 },
      { firstName: 'Stefan', lastName: 'Savic', nationality: 'ME', teamId: 8 },
      { firstName: 'Mario', lastName: 'Hernandez', nationality: 'CO', teamId: 8 },
      { firstName: 'Koke', lastName: '', nationality: 'ES', teamId: 8 },
      { firstName: 'Rodri', lastName: 'Hernandez', nationality: 'ES', teamId: 8 },
      { firstName: 'Antoine', lastName: 'Griezmann', nationality: 'FR', teamId: 8 },
      { firstName: 'Joao', lastName: 'Felix', nationality: 'PT', teamId: 8 },
      { firstName: 'Angel', lastName: 'Correa', nationality: 'AR', teamId: 8 },
      { firstName: 'Matheus', lastName: 'Cunha', nationality: 'BR', teamId: 8 },

      // Sevilla (teamId = 9)
      { firstName: 'Yassine', lastName: 'Bounou', nationality: 'MA', teamId: 9 },
      { firstName: 'Jesus', lastName: 'Navas', nationality: 'ES', teamId: 9 },
      { firstName: 'Diego', lastName: 'Carlos', nationality: 'BR', teamId: 9 },
      { firstName: 'Jules', lastName: 'Kounde', nationality: 'FR', teamId: 9 },
      { firstName: 'Aleix', lastName: 'Garcia', nationality: 'ES', teamId: 9 },
      { firstName: 'Fernando', lastName: 'Reges', nationality: 'BR', teamId: 9 },
      { firstName: 'Ivan', lastName: 'Rakitic', nationality: 'HR', teamId: 9 },
      { firstName: 'Lucas', lastName: 'Ocampos', nationality: 'AR', teamId: 9 },
      { firstName: 'Suso', lastName: '', nationality: 'ES', teamId: 9 },
      { firstName: 'Youssef', lastName: 'En-Nesyri', nationality: 'MA', teamId: 9 },
      { firstName: 'Rafa', lastName: 'Mir', nationality: 'ES', teamId: 9 },

      // Valencia (teamId = 10)
      { firstName: 'Jose', lastName: 'Santos', nationality: 'ES', teamId: 10 },
      { firstName: 'Gaya', lastName: '', nationality: 'ES', teamId: 10 },
      { firstName: 'Hugo', lastName: 'Guedes', nationality: 'PT', teamId: 10 },
      { firstName: 'Dimitri', lastName: 'Foulquier', nationality: 'FR', teamId: 10 },
      { firstName: 'Carlos', lastName: 'Soler', nationality: 'ES', teamId: 10 },
      { firstName: 'Uros', lastName: 'Racic', nationality: 'RS', teamId: 10 },
      { firstName: 'Daniel', lastName: 'Wass', nationality: 'DK', teamId: 10 },
      { firstName: 'Lee', lastName: 'Kang-In', nationality: 'KR', teamId: 10 },
      { firstName: 'Goncalo', lastName: 'Guedes', nationality: 'PT', teamId: 10 },
      { firstName: 'Kevin', lastName: 'Gameiro', nationality: 'FR', teamId: 10 },
      { firstName: 'Maxi', lastName: 'Gomez', nationality: 'UY', teamId: 10 },
  ];

  players.forEach((player, index) => {
    player.id = index + 1;
  });

  // Upsert Players
  await Promise.all(players.map(player =>
    prisma.player.upsert({
      where: {
        id: player.id
      },
      create: player as Player,
      update: player,
    })
  ));

  // --- Generate Fixtures (3 rounds per competition) ---
  const createFixtures = (teamIds: number[], competitionId: number) => {
    const fixtures: Match[] = [];
    const now = new Date();

    let fixtureId = 1;
    for (let round = 1; round <= 3; round++) {
      const roundDate = new Date(now);
      roundDate.setDate(now.getDate() + round * 7); // one week apart

      const shuffled = [...teamIds].sort(() => Math.random() - 0.5);

      for (let i = 0; i < shuffled.length; i += 2) {
        if (i + 1 >= shuffled.length) break;

        const homeTeamId = shuffled[i];
        const awayTeamId = shuffled[i + 1];

        fixtures.push({
          id: fixtureId++,
          date: new Date(roundDate),
          homeTeamId,
          awayTeamId,
          competitionId,
        });
      }
    }

    return fixtures;
  };

  const eplTeamIds = [1, 2, 3, 4, 5];
  const laLigaTeamIds = [6, 7, 8, 9, 10];

  const eplFixtures = createFixtures(eplTeamIds, 1);
  const laLigaFixtures = createFixtures(laLigaTeamIds, 2);

  const matches = [...eplFixtures, ...laLigaFixtures];
  await Promise.all(matches.map(match =>
    prisma.match.upsert({
      where: {
        // You may need to adjust this to match your unique constraint
        id: match.id
      },
      create: match,
      update: match,
    })
  ));

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

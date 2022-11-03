import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user  = await prisma.user.create({
        data: {
            name: 'fulano',
            email: 'fulano@gmail.com',
            avatarUrl: 'https://github.com/elinaldo1.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Exemplo pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            data: '2022-11-03T23:19:22.908Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data: {
            data: '2022-11-02T02:19:22.908Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamsPoints: 1,

                    Participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                      
                }
            }
        }
    })

}

main();
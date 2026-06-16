"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const existingAdmin = await prisma.user.findUnique({
        where: { email: 'admin@recehgenerator.com' },
    });
    if (!existingAdmin) {
        console.log("No admin found. Please run seed.ts first.");
        return;
    }
    const dummyJokes = [
        { text: "Why do programmers prefer dark mode? Because light attracts bugs.", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "How many programmers does it take to change a light bulb? None, that's a hardware problem.", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "Why did the programmer quit his job? Because he didn't get arrays.", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "There are 10 types of people in the world: those who understand binary, and those who don't.", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "What is the most used language in programming? Profanity.", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "Why do Java programmers have to wear glasses? Because they don't C#.", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "Real programmers count from 0.", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "To understand what recursion is, you must first understand recursion.", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "I would love to change the world, but they won't give me the source code.", category: "SFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "Why did the worker get fired from the calendar factory? He took a couple of days off.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "I told my boss that three companies were after me and I needed a raise. He asked which ones. I said gas, water, and electricity.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "My boss told me to have a good day. So I went home.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "I used to work in a shoe recycling shop. It was sole destroying.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "I got fired from the keyboard factory today. They told me I wasn't putting in enough shifts.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "Why is working in a mirror factory so dangerous? It's a job you can really see yourself dying in.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "My boss asked me to start my presentation with a joke. So I put my payslip on the first slide.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "I asked my boss if I could come to work a little late today. He said 'Dream on'. I think that means yes.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "What's the difference between a poorly dressed man on a tricycle and a well-dressed man on a bicycle? Attire.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
        { text: "I started a new job as a tailor, but it was just sew sew.", category: "NSFW", status: "APPROVED", authorId: existingAdmin.id },
    ];
    await prisma.joke.createMany({
        data: dummyJokes
    });
    console.log('Inserted 20 dummy jokes.');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seedJokes.js.map
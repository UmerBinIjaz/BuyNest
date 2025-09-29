const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaNeon({ connectionString });
const prisma = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") {
  globalThis.prisma = prisma;
}

export default prisma;

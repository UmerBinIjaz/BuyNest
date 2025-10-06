import prisma from "@/lib/prisma";
import { inngest } from "./client";

// Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-create" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    try {
      const { data } = event;
      await prisma.user.create({
        data: {
          id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        },
      });
    } catch (err) {
      console.error("❌ Prisma insert failed:", err);
      throw err; // Let Inngest retry if needed
    }
  }
);


export const SyncUserUpdation = inngest.createFunction(
    {id: 'sync-user-update'},
    {event: 'clerk/user.updated'},
    async (event) => {
        const {data} = event
        await prisma.user.update({
            where: {id: data.id,},
            data: {
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            }
        })
    }
);

export const syncUserDeletion = inngest.createFunction(
    {id: 'sync-user-delete'},
    {event: 'clerk/user.deleted'},
    async (event) => {
        const {data} = event
        await prisma.user.delete({
            where: {id: data.id,}
        })
    }
);

// Inngest Function to delete cupon on expiry
export const deleteCouponOnExpiry = inngest.createFunction(
    {id: 'delete-coupon-on-expiry'},
    {event: 'app/coupon.expired'},
    async (event, step) => {
        const {data} = event
        const expiryDate = new Date(data.expiresAt);
        await step.sleepUntil('wait-for-expiry', expiryDate)
        await step.run('delete-coupon', async () => {
            await prisma.coupon.delete({
                where: {code: data.code}
            })
        }
    }
);
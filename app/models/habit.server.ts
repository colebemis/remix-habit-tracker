import type { Habit, User } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Habit } from "@prisma/client";

export function getHabit({
  id,
  userId,
}: Pick<Habit, "id"> & {
  userId: User["id"];
}) {
  return prisma.habit.findFirst({
    select: { id: true, title: true },
    where: { id, userId },
  });
}

export function getHabits({ userId }: { userId: User["id"] }) {
  return prisma.habit.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "asc" },
  });
}

export function createHabit({
  title,
  userId,
}: Pick<Habit, "title"> & {
  userId: User["id"];
}) {
  return prisma.habit.create({
    data: {
      title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteHabit({
  id,
  userId,
}: Pick<Habit, "id"> & { userId: User["id"] }) {
  return prisma.habit.deleteMany({
    where: { id, userId },
  });
}

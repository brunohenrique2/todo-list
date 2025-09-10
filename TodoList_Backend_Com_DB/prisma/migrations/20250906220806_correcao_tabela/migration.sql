/*
  Warnings:

  - You are about to drop the column `creator_id` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Tasks" DROP CONSTRAINT "Tasks_creator_id_fkey";

-- AlterTable
ALTER TABLE "public"."Tasks" DROP COLUMN "creator_id",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."GroupTasks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "GroupTasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GroupTasks_creatorId_idx" ON "public"."GroupTasks"("creatorId");

-- CreateIndex
CREATE INDEX "Tasks_creatorId_idx" ON "public"."Tasks"("creatorId");

-- CreateIndex
CREATE INDEX "Tasks_groupId_idx" ON "public"."Tasks"("groupId");

-- AddForeignKey
ALTER TABLE "public"."Tasks" ADD CONSTRAINT "Tasks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tasks" ADD CONSTRAINT "Tasks_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."GroupTasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GroupTasks" ADD CONSTRAINT "GroupTasks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

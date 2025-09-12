-- DropForeignKey
ALTER TABLE "public"."Tasks" DROP CONSTRAINT "Tasks_creator_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Tasks" ADD CONSTRAINT "Tasks_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

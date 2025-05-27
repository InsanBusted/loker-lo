/*
  Warnings:

  - The primary key for the `Bidang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Bidang` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `kategoriId` on the `Lowongan` table. All the data in the column will be lost.
  - You are about to drop the `Kategori` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Bidang` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Bidang` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `bidangId` on the `Biodata` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bidangId` on the `Lowongan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Biodata" DROP CONSTRAINT "Biodata_bidangId_fkey";

-- DropForeignKey
ALTER TABLE "Lowongan" DROP CONSTRAINT "Lowongan_bidangId_fkey";

-- DropForeignKey
ALTER TABLE "Lowongan" DROP CONSTRAINT "Lowongan_kategoriId_fkey";

-- AlterTable
ALTER TABLE "Bidang" DROP CONSTRAINT "Bidang_pkey",
ADD COLUMN     "slug" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bidang_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Biodata" DROP COLUMN "bidangId",
ADD COLUMN     "bidangId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lowongan" DROP COLUMN "kategoriId",
DROP COLUMN "bidangId",
ADD COLUMN     "bidangId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Kategori";

-- CreateIndex
CREATE UNIQUE INDEX "Bidang_slug_key" ON "Bidang"("slug");

-- AddForeignKey
ALTER TABLE "Biodata" ADD CONSTRAINT "Biodata_bidangId_fkey" FOREIGN KEY ("bidangId") REFERENCES "Bidang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lowongan" ADD CONSTRAINT "Lowongan_bidangId_fkey" FOREIGN KEY ("bidangId") REFERENCES "Bidang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

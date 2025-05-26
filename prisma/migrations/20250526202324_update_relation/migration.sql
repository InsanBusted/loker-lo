-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "KategoriEnum" AS ENUM ('mahasiswa', 'alumni', 'perusahaan');

-- CreateEnum
CREATE TYPE "PelamarStatus" AS ENUM ('review', 'tolak', 'terima');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biodata" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "kategori" "KategoriEnum" NOT NULL,
    "bidangId" TEXT NOT NULL,
    "tahunLulus" INTEGER,
    "namaPerusahaan" TEXT,

    CONSTRAINT "Biodata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiodataSkill" (
    "biodataId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "BiodataSkill_pkey" PRIMARY KEY ("biodataId","skillId")
);

-- CreateTable
CREATE TABLE "Lowongan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "namaPerusahaan" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kategoriId" TEXT NOT NULL,
    "bidangId" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "gaji" TEXT NOT NULL,
    "benefit" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lowongan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bidang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Bidang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lowonganId" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pelamar" (
    "id" TEXT NOT NULL,
    "status" "PelamarStatus" NOT NULL,
    "proposalId" TEXT NOT NULL,

    CONSTRAINT "Pelamar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusProposal" (
    "id" TEXT NOT NULL,
    "proposalId" TEXT NOT NULL,
    "status" "PelamarStatus" NOT NULL,

    CONSTRAINT "StatusProposal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Biodata_userId_key" ON "Biodata"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Pelamar_proposalId_key" ON "Pelamar"("proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "StatusProposal_proposalId_key" ON "StatusProposal"("proposalId");

-- AddForeignKey
ALTER TABLE "Biodata" ADD CONSTRAINT "Biodata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Biodata" ADD CONSTRAINT "Biodata_bidangId_fkey" FOREIGN KEY ("bidangId") REFERENCES "Bidang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiodataSkill" ADD CONSTRAINT "BiodataSkill_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "Biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiodataSkill" ADD CONSTRAINT "BiodataSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lowongan" ADD CONSTRAINT "Lowongan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lowongan" ADD CONSTRAINT "Lowongan_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lowongan" ADD CONSTRAINT "Lowongan_bidangId_fkey" FOREIGN KEY ("bidangId") REFERENCES "Bidang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_lowonganId_fkey" FOREIGN KEY ("lowonganId") REFERENCES "Lowongan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelamar" ADD CONSTRAINT "Pelamar_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusProposal" ADD CONSTRAINT "StatusProposal_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

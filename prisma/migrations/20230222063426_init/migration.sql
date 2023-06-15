-- CreateEnum
CREATE TYPE "LoginMethod" AS ENUM ('google', 'phone', 'email', 'apple');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('player', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country_code" INTEGER NOT NULL,
    "phone_number" BIGINT NOT NULL,
    "display_picture" TEXT NOT NULL,
    "login_method" "LoginMethod" NOT NULL DEFAULT 'email',
    "user_role" "UserRole" NOT NULL DEFAULT 'player',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the column `validityPeriod` on the `Permit` table. All the data in the column will be lost.
  - Added the required column `expiryDate` to the `Permit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Permit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "permitCode" TEXT NOT NULL,
    "originalCode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" DATETIME NOT NULL,
    "amountPaid" REAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "issuedById" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Permit_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Permit_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Permit" ("amountPaid", "createdAt", "id", "issuedById", "originalCode", "permitCode", "status", "studentId", "updatedAt") SELECT "amountPaid", "createdAt", "id", "issuedById", "originalCode", "permitCode", "status", "studentId", "updatedAt" FROM "Permit";
DROP TABLE "Permit";
ALTER TABLE "new_Permit" RENAME TO "Permit";
CREATE UNIQUE INDEX "Permit_permitCode_key" ON "Permit"("permitCode");
CREATE UNIQUE INDEX "Permit_originalCode_key" ON "Permit"("originalCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

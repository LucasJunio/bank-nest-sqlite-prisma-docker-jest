-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "value" REAL,
    "type" TEXT,
    "currentAccountId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_currentAccountId_fkey" FOREIGN KEY ("currentAccountId") REFERENCES "CurrentAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("createdAt", "currentAccountId", "id", "type", "value") SELECT "createdAt", "currentAccountId", "id", "type", "value" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_CurrentAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL DEFAULT 0.00,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "custumerId" INTEGER,
    CONSTRAINT "CurrentAccount_custumerId_fkey" FOREIGN KEY ("custumerId") REFERENCES "Custumer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CurrentAccount" ("createdAt", "custumerId", "id", "total") SELECT "createdAt", "custumerId", "id", "total" FROM "CurrentAccount";
DROP TABLE "CurrentAccount";
ALTER TABLE "new_CurrentAccount" RENAME TO "CurrentAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateTable
CREATE TABLE "Custumer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CurrentAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL DEFAULT 0.00,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "custumerId" INTEGER,
    CONSTRAINT "CurrentAccount_custumerId_fkey" FOREIGN KEY ("custumerId") REFERENCES "Custumer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "value" REAL,
    "type" TEXT,
    "currentAccountId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_currentAccountId_fkey" FOREIGN KEY ("currentAccountId") REFERENCES "CurrentAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

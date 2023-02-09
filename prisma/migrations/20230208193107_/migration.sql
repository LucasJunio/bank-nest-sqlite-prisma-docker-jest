-- CreateTable
CREATE TABLE "Custumer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CurrentAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL NOT NULL DEFAULT 0.00,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "custumerId" INTEGER NOT NULL,
    CONSTRAINT "CurrentAccount_custumerId_fkey" FOREIGN KEY ("custumerId") REFERENCES "Custumer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "currentAccountId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_currentAccountId_fkey" FOREIGN KEY ("currentAccountId") REFERENCES "CurrentAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

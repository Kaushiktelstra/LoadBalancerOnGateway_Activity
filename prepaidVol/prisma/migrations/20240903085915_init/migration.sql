-- CreateTable
CREATE TABLE `PrepaidVoucher` (
    `voucherId` INTEGER NOT NULL,
    `voucherName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`voucherId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

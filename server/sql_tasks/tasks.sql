-- вывести количество юзеров по ролям
SELECT role, count(role) 
FROM "Users" 
GROUP BY role;

-- Всем юзерам с ролью customer, которые осуществляли заказы в новогодние праздники в период с 25.12 по 14.01 необходимо зачислить по 10% кэшбэка со всех заказов в этот период
UPDATE "Users" 
SET balance = user_prizes.cashback
FROM (
  SELECT u.balance + (SUM(c.prize) * 0.1) as cashback, u.id, c."createdAt", c.prize, u.balance
  FROM "Users" AS u
    INNER JOIN "Contests" AS c ON u.id = c."userId"
  WHERE 
  ((EXTRACT(DAY FROM to_date(c."createdAt", 'YYYY-MM-DD')) >= 24 AND 
  EXTRACT(DAY FROM to_date(c."createdAt", 'YYYY-MM-DD')) <= 31) 
  AND EXTRACT(MONTH FROM to_date(c."createdAt", 'YYYY-MM-DD')) = 12)
  OR ((EXTRACT(DAY FROM to_date(c."createdAt", 'YYYY-MM-DD')) >= 1 AND
  EXTRACT(DAY FROM to_date(c."createdAt", 'YYYY-MM-DD')) <= 23)
  AND EXTRACT(MONTH FROM to_date(c."createdAt", 'YYYY-MM-DD')) = 1)
  GROUP BY u.id, c."createdAt", c.prize, u.balance
) as user_prizes
WHERE user_prizes.id = "Users".id

-- Для роли сreative необходимо выплатить 3-м юзерам
-- с самым высоким рейтингом по 10$ на их счета.
BEGIN;
UPDATE "Users" 
SET balance = bonus.value
FROM (
  SELECT u.balance + 10 as value, u.id
  FROM "Users" AS u
  WHERE u.role = 'creator'
  ORDER BY u.rating DESC
  LIMIT 3
) as bonus
WHERE bonus.id = "Users".id;
UPDATE "Banks" 
SET balance = transfer.bal
FROM (
  SELECT balance - 30 as bal
  FROM "Banks"
  WHERE name = 'creative'
) as transfer
WHERE "Banks".name = 'creative';
COMMIT;
INSERT INTO Dispositivos (nome, modelo, endereco, porta, usuario, senha)
VALUES ("Catraca 01", "IDBlock", "192.168.0.126", "81", "admin", "admin");

INSERT INTO Dispositivos (nome, modelo, endereco, porta, usuario, senha)
VALUES ("Catraca 02", "IDBlock", "192.168.0.127", "82", "admin", "admin");

DELETE FROM Dispositivos WHERE id = 3;
SET SQL_SAFE_UPDATES = 0;
DELETE FROM Dispositivos; -- Your original DELETE statement
SET SQL_SAFE_UPDATES = 1; -- **Important:** Re-enable safe mode!

UPDATE Dispositivos
SET nome = 'Catraca 01'
WHERE id = 1;

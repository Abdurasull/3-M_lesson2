CREATE DATABASE IF NOT EXISTS KURSLAR;

USE KURSLAR;

CREATE TABLE IF NOT EXISTS Talabalar(
    id INT AUTO_INCREMENT PRIMARY KEY,
    ism VARCHAR(50) NOT NULL,
    familiya VARCHAR(50) NOT NULL,
    yosh INT NOT NULL,
    KURS TINYINT NOT NULL
);

SHOW TABLES;



INSERT INTO Talabalar(ism, familiya, yosh, KURS) VALUES 
    ('Ali', 'Valiyev', 20, 1),
    ('Olim', 'Toshpoev', 22, 2),
    ('Gulnora', 'Saidova', 19, 1),
    ('Dilmurod', 'Xolov', 21, 3),
    ('Shokir', 'Jabborov', 23, 2);



SELECT * FROM Talabalar;


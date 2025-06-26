-- Заполнение базы данных тестовыми данными
USE mushcase;

-- Кейсы
INSERT INTO cases (name, price, image_url, description) VALUES
('Operation Bravo Case', 25, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8jLXwJzLxYFqrn/254fx254f', 'Классический кейс из операции Bravo'),
('Chroma Case', 35, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_Sq7cbSXwJmKxpFqrrqFwn/254fx254f', 'Яркие расцветки в хромированном стиле'),
('Phoenix Case', 29, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_Sq78D2SwlmJgJy/254fx254f', 'Огненные расцветки скинов Phoenix'),
('Huntsman Case', 45, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8zMXwJlLxV/254fx254f', 'Коллекция Huntsman с легендарными ножами'),
('Breakout Case', 39, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX9_IXw5mJgJy/254fx254f', 'Эксклюзивные скины из операции Breakout'),
('Vanguard Case', 55, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8jLXwJzLxY/254fx254f', 'Военная коллекция Vanguard'),
('Chroma 2 Case', 69, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_Sq78cLWwxmJgJh/254fx254f', 'Продолжение популярной серии Chroma'),
('Falchion Case', 99, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8DLXwhlJg5/254fx254f', 'Коллекция с ножом Falchion'),
('Shadow Case', 79, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8TLWwJj/254fx254f', 'Темные скины коллекции Shadow'),
('Revolver Case', 89, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8DFXwJ0/254fx254f', 'Винтажная коллекция Revolver'),
('Operation Wildfire Case', 119, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8DLXwl/254fx254f', 'Дикие расцветки операции Wildfire'),
('Chroma 3 Case', 139, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8DFXwJlJgh/254fx254f', 'Третья часть серии Chroma'),
('Gamma Case', 159, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8TFXwJ4/254fx254f', 'Радиоактивная коллекция Gamma'),
('Gamma 2 Case', 179, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8zFXwJ3/254fx254f', 'Продолжение серии Gamma'),
('Glove Case', 279, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFfQA_SqX8DFXgJzLxZFqrnoFAn0/254fx254f', 'Эксклюзивная коллекция с перчатками');

-- Скины для Operation Bravo Case (id=1)
INSERT INTO skins (case_id, name, rarity, price, image_url, rarity_order) VALUES
(1, 'AK-47 | Fire Serpent', 'Covert', 45000, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7s/256fx256f', 6),
(1, 'Desert Eagle | Golden Koi', 'Classified', 8500, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7c/256fx256f', 5),
(1, 'P90 | Emerald Dragon', 'Classified', 7200, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7c/256fx256f', 5),
(1, 'USP-S | Overgrowth', 'Restricted', 1800, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7c8/256fx256f', 4),
(1, 'P2000 | Ocean Foam', 'Restricted', 1400, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7c8/256fx256f', 4),
(1, 'AWP | Pink DDPAT', 'Mil-Spec', 650, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7s8/256fx256f', 3),
(1, 'MP7 | Ocean Foam', 'Mil-Spec', 420, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm788/256fx256f', 3),
(1, 'MAC-10 | Graven', 'Industrial Grade', 180, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm788/256fx256f', 2),
(1, 'Negev | Bratatat', 'Industrial Grade', 120, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm788/256fx256f', 2),
(1, 'Tec-9 | Tornado', 'Consumer Grade', 45, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7b8/256fx256f', 1);

-- Скины для других кейсов (сокращенно)
INSERT INTO skins (case_id, name, rarity, price, image_url, rarity_order) VALUES
-- Chroma Case скины
(2, '★ Karambit | Doppler', 'Exceedingly Rare', 125000, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7s/256fx256f', 7),
(2, 'AK-47 | Aquamarine Revenge', 'Covert', 15800, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7s/256fx256f', 6),
(2, 'M4A1-S | Hyper Beast', 'Covert', 12400, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7s/256fx256f', 6),
(2, 'Galil AR | Eco', 'Classified', 3200, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7c/256fx256f', 5),
(2, 'SCAR-20 | Cardiac', 'Restricted', 890, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7c8/256fx256f', 4),

-- Phoenix Case скины
(3, 'AWP | Asiimov', 'Covert', 28500, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7s/256fx256f', 6),
(3, 'AK-47 | Redline', 'Classified', 6800, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7c/256fx256f', 5),
(3, 'P90 | Trigon', 'Classified', 4200, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7c/256fx256f', 5),
(3, 'Nova | Antique', 'Restricted', 1200, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7c8/256fx256f', 4),
(3, 'Tec-9 | Titanium Bit', 'Mil-Spec', 380, 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA9QVcJY8gulRcQFfQQDSm7s8/256fx256f', 3);

-- Добавим еще скинов для разнообразия каждого кейса...
-- (Продолжение для всех 15 кейсов с 20-30 скинами каждый)
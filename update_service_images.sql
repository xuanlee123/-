-- ============================================================
-- 为每个服务单独分配真实图片的 UPDATE 语句
-- 执行方式: 连接数据库后执行此脚本
-- ============================================================

USE neighborhood;

-- 家政服务 (category_id=1) - 清洁/家政主题图片
UPDATE service SET images = 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400' WHERE id = 4;
UPDATE service SET images = 'https://images.unsplash.com/photo-1549087595-80d1eb83f7ce?w=400' WHERE id = 8;
UPDATE service SET images = 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400' WHERE id = 11;
UPDATE service SET images = 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400' WHERE id = 12;
UPDATE service SET images = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400' WHERE id = 15;
UPDATE service SET images = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400' WHERE id = 16;

-- 维修服务 (category_id=2) - 维修/工具主题图片
UPDATE service SET images = 'https://images.unsplash.com/photo-1585779030276-8915c3ec1c11?w=400' WHERE id = 17;
UPDATE service SET images = 'https://images.unsplash.com/photo-1571488838980-73df3f3d5b89?w=400' WHERE id = 18;
UPDATE service SET images = 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400' WHERE id = 19;
UPDATE service SET images = 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400' WHERE id = 20;
UPDATE service SET images = 'https://images.unsplash.com/photo-1585779030276-8915c3ec1c11?w=400' WHERE id = 21;
UPDATE service SET images = 'https://images.unsplash.com/photo-1571488838980-73df3f3d5b89?w=400' WHERE id = 22;
UPDATE service SET images = 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400' WHERE id = 23;
UPDATE service SET images = 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=400' WHERE id = 24;
UPDATE service SET images = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' WHERE id = 26;
UPDATE service SET images = 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400' WHERE id = 27;
UPDATE service SET images = 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400' WHERE id = 28;
UPDATE service SET images = 'https://images.unsplash.com/photo-1585779030276-8915c3ec1c11?w=400' WHERE id = 29;
UPDATE service SET images = 'https://images.unsplash.com/photo-1571488838980-73df3f3d5b89?w=400' WHERE id = 30;
UPDATE service SET images = 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=400' WHERE id = 31;
UPDATE service SET images = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400' WHERE id = 32;

-- 生鲜配送 (category_id=3) - 生鲜/蔬果主题图片
UPDATE service SET images = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400' WHERE id = 34;
UPDATE service SET images = 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400' WHERE id = 35;
UPDATE service SET images = 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=400' WHERE id = 36;
UPDATE service SET images = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' WHERE id = 37;
UPDATE service SET images = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400' WHERE id = 38;
UPDATE service SET images = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' WHERE id = 39;
UPDATE service SET images = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400' WHERE id = 40;
UPDATE service SET images = 'https://images.unsplash.com/photo-1607082348824-97132b85ef97?w=400' WHERE id = 41;
UPDATE service SET images = 'https://images.unsplash.com/photo-1546169665-1e51b7a1e9d6?w=400' WHERE id = 42;
UPDATE service SET images = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' WHERE id = 43;
UPDATE service SET images = 'https://images.unsplash.com/photo-1604715892465-6345641e22f5?w=400' WHERE id = 44;
UPDATE service SET images = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' WHERE id = 45;
UPDATE service SET images = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400' WHERE id = 47;
UPDATE service SET images = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' WHERE id = 48;

-- 医疗服务 (category_id=4) - 医疗/健康主题图片
UPDATE service SET images = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' WHERE id = 49;
UPDATE service SET images = 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400' WHERE id = 50;
UPDATE service SET images = 'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=400' WHERE id = 51;
UPDATE service SET images = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400' WHERE id = 52;
UPDATE service SET images = 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400' WHERE id = 53;
UPDATE service SET images = 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400' WHERE id = 54;
UPDATE service SET images = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400' WHERE id = 55;
UPDATE service SET images = 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400' WHERE id = 56;
UPDATE service SET images = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400' WHERE id = 57;
UPDATE service SET images = 'https://images.unsplash.com/photo-1515041219749-89347f83291a?w=400' WHERE id = 58;
UPDATE service SET images = 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400' WHERE id = 59;
UPDATE service SET images = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400' WHERE id = 60;
UPDATE service SET images = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400' WHERE id = 61;
UPDATE service SET images = 'https://images.unsplash.com/photo-1515041219749-89347f83291a?w=400' WHERE id = 62;
UPDATE service SET images = 'https://images.unsplash.com/photo-1525382455947-f319bc05fb35?w=400' WHERE id = 63;
UPDATE service SET images = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400' WHERE id = 64;

-- 教育培训 (category_id=5) - 教育/学习主题图片
UPDATE service SET images = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400' WHERE id = 65;
UPDATE service SET images = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400' WHERE id = 66;
UPDATE service SET images = 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400' WHERE id = 67;
UPDATE service SET images = 'https://images.unsplash.com/photo-1497633762265-9f179a990aa6?w=400' WHERE id = 68;
UPDATE service SET images = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400' WHERE id = 69;
UPDATE service SET images = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400' WHERE id = 70;
UPDATE service SET images = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400' WHERE id = 71;
UPDATE service SET images = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400' WHERE id = 72;
UPDATE service SET images = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400' WHERE id = 73;
UPDATE service SET images = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400' WHERE id = 74;
UPDATE service SET images = 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400' WHERE id = 75;
UPDATE service SET images = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' WHERE id = 76;
UPDATE service SET images = 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400' WHERE id = 78;
UPDATE service SET images = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400' WHERE id = 79;
UPDATE service SET images = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400' WHERE id = 80;

-- 便民服务 (category_id=6) - 便民/社区主题图片
UPDATE service SET images = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400' WHERE id = 81;
UPDATE service SET images = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' WHERE id = 82;
UPDATE service SET images = 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=400' WHERE id = 83;
UPDATE service SET images = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' WHERE id = 84;
UPDATE service SET images = 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400' WHERE id = 85;
UPDATE service SET images = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400' WHERE id = 86;
UPDATE service SET images = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400' WHERE id = 87;
UPDATE service SET images = 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400' WHERE id = 88;
UPDATE service SET images = 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400' WHERE id = 89;
UPDATE service SET images = 'https://images.unsplash.com/photo-1527507214368-2ffde4a2a78b?w=400' WHERE id = 90;
UPDATE service SET images = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400' WHERE id = 91;
UPDATE service SET images = 'https://images.unsplash.com/photo-1594922782328-970b13e80018?w=400' WHERE id = 92;
UPDATE service SET images = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400' WHERE id = 93;
UPDATE service SET images = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400' WHERE id = 94;
UPDATE service SET images = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' WHERE id = 95;
UPDATE service SET images = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400' WHERE id = 96;
UPDATE service SET images = 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400' WHERE id = 97;
UPDATE service SET images = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400' WHERE id = 98;
UPDATE service SET images = 'https://images.unsplash.com/photo-1614036417651-9e0037651980?w=400' WHERE id = 99;
UPDATE service SET images = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' WHERE id = 100;
UPDATE service SET images = 'https://images.unsplash.com/photo-1607082351659-82c7b1fc4df9?w=400' WHERE id = 101;
UPDATE service SET images = 'https://images.unsplash.com/photo-1607082348824-97132b85ef97?w=400' WHERE id = 102;
UPDATE service SET images = 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400' WHERE id = 103;
UPDATE service SET images = 'https://images.unsplash.com/photo-1604715892465-6345641e22f5?w=400' WHERE id = 104;
UPDATE service SET images = 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400' WHERE id = 106;
UPDATE service SET images = 'https://images.unsplash.com/photo-1509909756405-be0194c169de?w=400' WHERE id = 107;
UPDATE service SET images = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' WHERE id = 108;
UPDATE service SET images = 'https://images.unsplash.com/photo-1620379667142-93e5bfcb7c68?w=400' WHERE id = 110;
UPDATE service SET images = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' WHERE id = 111;
UPDATE service SET images = 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400' WHERE id = 112;

-- 物业服务 (category_id=7) - 物业/社区主题图片
UPDATE service SET images = 'https://images.unsplash.com/photo-1565514020179-26b2d6c1cd7a?w=400' WHERE id = 113;
UPDATE service SET images = 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400' WHERE id = 114;
UPDATE service SET images = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' WHERE id = 115;
UPDATE service SET images = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400' WHERE id = 116;
UPDATE service SET images = 'https://images.unsplash.com/photo-1565514020179-26b2d6c1cd7a?w=400' WHERE id = 117;
UPDATE service SET images = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' WHERE id = 118;
UPDATE service SET images = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400' WHERE id = 119;
UPDATE service SET images = 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400' WHERE id = 120;
UPDATE service SET images = 'https://images.unsplash.com/photo-1565514020179-26b2d6c1cd7a?w=400' WHERE id = 121;
UPDATE service SET images = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400' WHERE id = 122;
UPDATE service SET images = 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400' WHERE id = 123;
UPDATE service SET images = 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400' WHERE id = 124;
UPDATE service SET images = 'https://images.unsplash.com/photo-1565514020179-26b2d6c1cd7a?w=400' WHERE id = 125;
UPDATE service SET images = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400' WHERE id = 126;
UPDATE service SET images = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400' WHERE id = 127;
UPDATE service SET images = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400' WHERE id = 128;

-- 验证更新结果
SELECT id, name, images FROM service ORDER BY id;

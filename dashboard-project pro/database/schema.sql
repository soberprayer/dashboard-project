-- 创建数据库
CREATE DATABASE user_management;
GO

USE user_management;
GO

-- 创建用户表
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    phone NVARCHAR(20),
    avatar NVARCHAR(500),
    role NVARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'moderator', 'user')),
    status NVARCHAR(20) DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending')),
    department NVARCHAR(100),
    position NVARCHAR(100),
    join_date DATE,
    last_login DATETIME,
    login_count INT DEFAULT 0,
    location NVARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 0.0,
    projects INT DEFAULT 0,
    tasks INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

-- 插入测试数据
INSERT INTO users (name, email, phone, avatar, role, status, department, position, join_date, last_login, login_count, location, rating, projects, tasks) VALUES
(N'林红', 'linhong@example.com', '138-0013-8000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=linhong', 'admin', 'active', N'技术部', N'高级工程师', '2023-01-15', '2024-06-09 14:30:00', 245, N'北京', 4.8, 12, 89),
(N'张广', 'zhangguang@example.com', '139-0013-9000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangguang', 'user', 'active', N'产品部', N'产品经理', '2023-03-20', '2024-06-09 16:45:00', 189, N'上海', 4.6, 8, 67),
(N'全丹', 'quandan@example.com', '136-0013-6000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=quandan', 'user', 'inactive', N'设计部', N'UI设计师', '2023-05-10', '2024-06-05 09:20:00', 156, N'深圳', 4.9, 15, 134),
(N'王兵', 'wangbing@example.com', '137-0013-7000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangbing', 'moderator', 'pending', N'运营部', N'运营专员', '2023-08-01', '2024-06-09 11:15:00', 98, N'广州', 4.3, 6, 45),
(N'赵人', 'zhaoren@example.com', '135-0013-5000', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoren', 'user', 'active', N'销售部', N'销售代表', '2024-01-15', '2024-06-08 17:30:00', 34, N'杭州', 4.1, 3, 23);
GO

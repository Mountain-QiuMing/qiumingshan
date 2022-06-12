# Micro Light

## 开发
### 依赖
- node
- npm 
- nest cli
    ```bash
      npm i -g @nestjs/cli
    ```
- mysql8.0
  
    - 账号：`root`
    - 密码：`123456`
    - 初始数据库：`web_c`

    mysql设置 `root` 初始密码 
    ```mysql
    mysqladmin -uroot password 123456
    ```

### 启动

#### 安装 node 依赖插件

```bash
yarn
```

#### 运行开发环境

```bash
yarn start:dev
```

### 构建
打包命令
```bash
yarn build
```

### 部署
运行生产环境
```bash
yarn start:prod
```
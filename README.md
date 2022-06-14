# Micro Light

## 开发

### env 环境变量文件

在根目录下创建 `.env` 配置文件，文件内容前往 [config-center](https://github.com/Mountain-QiuMing/config-center/blob/master/micro-light.env) 获取

### 依赖

- node
- npm
- nest cli
  ```bash
    npm i -g @nestjs/cli
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

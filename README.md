# Product Management App

## Requirements
- Node.js ^18
- npm

## Config remote images URL
edit file `next.config.mjs` dan edit bagian `images` seperti berikut:
```typescript
const nextConfig = {
     images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    ...
};

export default nextConfig;

```

## Installment
- Install Dependencies
```cmd
npm install
```
- Run app
```cmd
npm run dev
```
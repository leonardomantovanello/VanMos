# ---- Build stage ----
# vite/@vitejs/plugin-react are devDependencies, so this stage needs the full
# dependency tree (not --only=production) to run `npm run build`.
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Serve stage ----
# Static output only — no Node/npm needed at runtime, so the final image
# stays small and doesn't ship devDependencies or source files.
FROM nginx:1.27-alpine AS serve

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

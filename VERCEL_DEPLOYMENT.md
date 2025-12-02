# Configuración de Vercel - Sogrub

## ✅ Estado del Despliegue

El proyecto **Sogrub** está completamente configurado y desplegado en Vercel con despliegues automáticos desde GitHub.

## 🔗 Enlaces Importantes

- **Proyecto Vercel**: sogrub
- **Equipo**: devchemical's projects
- **URL de Producción**: https://sogrub-kxmdp012n-devchemicals-projects.vercel.app
- **Dominios adicionales**:
  - https://v0-sogrub-website-remake.vercel.app
  - https://sogrub-devchemicals-projects.vercel.app
  - https://sogrub-devchemical-devchemicals-projects.vercel.app

## 🚀 Despliegues Automáticos

### Configuración Actual

- ✅ **GitHub integrado**: El repositorio `devchemical/sogrub` está conectado con Vercel
- ✅ **Despliegue automático en `main`**: Cada push a la rama `main` desencadena un despliegue a producción
- ✅ **Despliegue de previews**: Los pull requests generan URLs de preview automáticamente
- ✅ **Variables de entorno configuradas**: Todas las variables de Supabase están disponibles

### Variables de Entorno

Las siguientes variables están configuradas en todos los entornos (production, preview, development):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📦 Framework Detectado

- **Framework**: Next.js
- **Versión de Node**: 22.x
- **Bundler**: Turbopack

## 🔧 Comandos Útiles

```bash
# Ver el estado del proyecto
vercel

# Ver logs de producción
vercel logs

# Ver deployments recientes
vercel ls

# Abrir el proyecto en Vercel
vercel open

# Desplegar manualmente
vercel --prod

# Ver variables de entorno
vercel env ls

# Añadir nueva variable de entorno
vercel env add [NOMBRE]
```

## 📝 Flujo de Trabajo

### Despliegue a Producción

1. Hacer commit de los cambios
2. Push a la rama `main`
3. Vercel detecta el push automáticamente
4. Se inicia el build y despliegue
5. Una vez completado, los cambios están en producción

```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
# Vercel desplegará automáticamente
```

### Despliegue de Preview

1. Crear una rama nueva
2. Hacer push de la rama
3. Crear un Pull Request
4. Vercel genera una URL de preview automáticamente

```bash
git checkout -b feature/nueva-funcionalidad
git add .
git commit -m "feat: añadir nueva funcionalidad"
git push origin feature/nueva-funcionalidad
# Crear PR en GitHub
# Vercel generará una URL de preview
```

## 🔍 Monitoreo

- **Inspector**: Cada despliegue tiene una URL de inspector para ver logs y métricas
- **Analytics**: Disponible en el dashboard de Vercel
- **Logs en tiempo real**: Accesibles mediante `vercel logs` o en el dashboard

## 🔐 Seguridad

- ✅ Variables de entorno seguras (no se exponen en el código)
- ✅ `.env.local` está en `.gitignore`
- ✅ Solo variables con prefijo `NEXT_PUBLIC_` son expuestas al cliente
- ✅ RLS (Row Level Security) configurado en Supabase

## 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Git Integration](https://vercel.com/docs/git)
- [Environment Variables](https://vercel.com/docs/environment-variables)

---

**Última actualización**: 2 de diciembre de 2025

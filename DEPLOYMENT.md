# 🚀 Guide de Déploiement V1 sur Vercel

## ✅ Prérequis

- [x] Compte GitHub
- [x] Compte Vercel (gratuit) : https://vercel.com
- [x] Code pushé sur GitHub

## 📋 Checklist avant déploiement

### Fichiers créés
- [x] `public/data/products.json` - Données des produits
- [x] `public/assets/products/` - Dossier pour les images
- [x] `vercel.json` - Configuration Vercel
- [x] Service `dresses.service.ts` modifié pour lire JSON
- [x] Routes admin désactivées dans `App.tsx`

### À faire manuellement

#### 1. Ajouter les images produits
Placez vos images dans `/public/assets/products/` avec les noms correspondants :
- `caftan-royal-dore.jpg`
- `takchita-bordeaux-premium.jpg`
- `caftan-emeraude-moderne.jpg`
- etc.

**Pour l'instant**, les URLs Unsplash fonctionnent encore, mais remplacez-les par vos vraies images.

#### 2. Configurer le formulaire de contact (optionnel)
Le formulaire fonctionne en mode simulation. Pour activer l'envoi réel :

**Option A : Formspree (Recommandé - Gratuit)**
1. Créer un compte sur https://formspree.io
2. Créer un nouveau formulaire
3. Copier le Form ID
4. Dans `ContactPage.tsx`, décommenter le code Formspree
5. Remplacer `YOUR_FORM_ID` par votre ID

**Option B : EmailJS (Gratuit)**
1. Créer un compte sur https://www.emailjs.com
2. Configurer un template email
3. Ajouter l'intégration dans `ContactPage.tsx`

## 🚀 Déploiement sur Vercel

### Étape 1 : Préparer le code
```bash
cd frontend
npm install
npm run build  # Tester le build localement
npm run preview  # Vérifier que tout fonctionne
```

### Étape 2 : Push sur GitHub
```bash
git add .
git commit -m "feat: migrate to V1 static site with JSON data"
git push origin main  # ou votre branche principale
```

### Étape 3 : Connecter à Vercel

1. Aller sur https://vercel.com
2. Cliquer **"Add New Project"**
3. Importer votre repo GitHub
4. **Configuration importante** :
   - **Root Directory** : `frontend` ⚠️ **IMPORTANT**
   - **Framework Preset** : Vite (détecté automatiquement)
   - **Build Command** : `npm run build` (par défaut)
   - **Output Directory** : `dist` (par défaut)
   - **Install Command** : `npm install` (par défaut)

### Étape 4 : Déployer

1. Cliquer **"Deploy"**
2. Attendre le build (2-3 minutes)
3. Site en ligne ! 🎉

### Étape 5 : Tester en production

Vérifier que :
- [ ] Toutes les pages chargent
- [ ] Le catalogue s'affiche
- [ ] Les images s'affichent
- [ ] La navigation fonctionne
- [ ] Calendly s'affiche
- [ ] Le formulaire de contact fonctionne

## 🌐 Configurer un domaine custom (optionnel)

1. Dans Vercel, aller dans **Settings** > **Domains**
2. Ajouter votre domaine
3. Suivre les instructions DNS

## 📝 Modifier les produits après déploiement

### Ajouter/modifier un produit :

1. Éditer `public/data/products.json`
2. Ajouter l'image dans `public/assets/products/` si nécessaire
3. Commit et push :
```bash
git add .
git commit -m "feat: add new product"
git push
```
4. Vercel redéploie automatiquement ! 🚀

## 🐛 Dépannage

### Le build échoue
- Vérifier que le Root Directory est bien `frontend`
- Vérifier les logs Vercel pour l'erreur exacte

### Les images ne s'affichent pas
- Vérifier que les chemins sont relatifs depuis `/public`
- Format correct : `/assets/products/image.jpg`

### Le JSON ne charge pas
- Vérifier que le fichier est dans `/public/data/`
- Vérifier la console navigateur pour les erreurs

### Les routes ne fonctionnent pas
- Vérifier que `vercel.json` contient les rewrites
- Vérifier que toutes les routes sont configurées dans `App.tsx`

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifier les logs Vercel (onglet "Logs")
2. Tester localement d'abord (`npm run build && npm run preview`)
3. Vérifier la console navigateur pour les erreurs

---

**Bon déploiement ! 🚀**


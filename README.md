# faceupReactNativeApp
Faceup React Native App with camera and facial IA

Faceup est une appli React Native réalisée avec Expo.

Elle met en oeuvre les notions suivantes :

- Saisie d'un pseudo
- Contrôle de la caméra suite à une demande d'autorisation
- Prise de photos (menu snap)
- Synchro des photos sur Cloudinary, pour affichage dans une galerie
- Analyse des clichés par un algorythme de reconnaissance faciale, utilisant Azure de Microsoft (à moins d'avoir une
API Key valide, on ne peut voir cette partie fonctionner, cette partie a été commentée dans le code)

Pour lancer l'appli vous avez besoi d'installer EXPO sur votre telephone et devez être connecté sur le même réseau wifi 
avec votre tel et votre PC :

- Clonez le dépôt
- Lancer le backend : cd locapic/backend + nodemon
- Lancer le front : cd locapic + npm start
- Puis scannez le QR code ave votre tel sur la page qui s'ouvre alors

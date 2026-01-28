# 🚀 Hosting Your Portfolio on CPanel

Indudhar, follow these steps to deploy your 7+ years of expertise to your own server.

## 🔴 IMPORTANT: Fix for Blank Page on CPanel
If your site is blank after uploading, it is likely because the browser doesn't know what `process.env.API_KEY` is. 

### The Quick Fix (Without a Build Tool)
If you are uploading the files directly without running `npm run build`:
1. Open `index.html` in your CPanel File Manager.
2. Look for the `<script>` tag inside the `<head>` that contains `window.process = ...`.
3. Update it to include your key directly like this:
   ```javascript
   window.process = { env: { API_KEY: 'YOUR_ACTUAL_KEY_HERE' } };
   ```
4. Save the file and refresh your site.

---

## 1. Prepare Your Files
If you are using a local machine for development:
```bash
npm run build
```
Upload the contents of the `dist` or `build` folder to `public_html`.

## 2. Upload via File Manager
1. Log in to your **CPanel**.
2. Open **File Manager**.
3. Navigate to `public_html`.
4. Click **Upload** and drop all your files there.
5. **CRITICAL**: Ensure the `.htaccess` file is uploaded. It handles the "Snap Scroll" routing and Gzip compression.

## 3. SSL (HTTPS)
As a web developer, you know HTTPS is vital for modern SEO and security.
1. In CPanel, go to **SSL/TLS Status**.
2. Click **Run AutoSSL** to ensure your site is secure.

## 4. Troubleshooting
- **404 on Refresh**: Ensure `.htaccess` is present in `public_html`.
- **Images not loading**: Check if paths in your code are relative (e.g., `./images/photo.jpg`) and that filenames match exactly (CPanel is case-sensitive).
- **AI Chat Error**: Check the browser console (F12). If you see "API_KEY_MISSING", follow the "Quick Fix" step above.

---
*Created for Indudhar Gavasi - Creative Technologist*
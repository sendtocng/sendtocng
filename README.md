# Cryptonews.global - Crypto News Site

A playful yet professional crypto news website built for normies, by normies. Features a clean design with your custom color palette and an easy-to-use admin panel for managing articles.

## 🎨 Design Features

- **Custom Color Palette**: Navy, deep blue, light blue, and Bitcoin orange (#F7931A)
- **Playful Card Layouts**: Subtle tilts and hover effects for visual interest
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Smooth Animations**: Scroll-triggered animations and micro-interactions
- **Fast Search**: Real-time article search as you type

## 📁 File Structure

```
cryptonews.global/
├── index.html          # Main homepage
├── admin.html          # Admin panel for managing articles
├── styles.css          # Main stylesheet
├── admin-styles.css    # Admin panel styles
├── script.js           # Homepage functionality
├── admin.js            # Admin panel functionality
├── articles.js         # Article database (JSON storage)
└── README.md           # This file
```

## 🚀 Getting Started

### Option 1: Open Locally
1. Download all files to a folder
2. Open `index.html` in your web browser
3. That's it! The site runs entirely in the browser using localStorage

### Option 2: Host Online
1. Upload all files to your web hosting provider
2. Point your domain (cryptonews.global) to the hosting
3. Access via your domain

**Popular hosting options:**
- GitHub Pages (free)
- Netlify (free)
- Vercel (free)
- Traditional web hosting (Bluehost, SiteGround, etc.)

## ✍️ Adding Articles

### Using the Admin Panel (Easiest)
1. Open `admin.html` in your browser
2. Fill out the form with:
   - **Title**: Your article headline
   - **Summary**: A brief pitch (shows on cards)
   - **Date**: Publication date
   - **Image URL**: Link to an image (use Unsplash for free images)
   - **Tags**: Comma-separated (e.g., "Bitcoin, DeFi, Education")
   - **Content**: Optional full article text
3. Click "Add Article"
4. Your article appears immediately on the homepage!

### Finding Free Images
- **Unsplash**: https://unsplash.com (high-quality, free)
- **Pexels**: https://pexels.com (free stock photos)
- Right-click image → "Copy image address" → Paste into Image URL field

### Managing Articles
In the admin panel, you can:
- **View All Articles**: See all published articles
- **Delete Articles**: Remove individual articles
- **Clear All**: Remove all articles (use carefully!)
- **Reset to Defaults**: Restore sample articles

## 🎨 Customization

### Changing Colors
Edit `styles.css` at the top (CSS variables):
```css
:root {
    --navy: #0a1628;
    --deep-blue: #0d4f8b;
    --light-blue: #7ec8e3;
    --bitcoin-orange: #F7931A;
    --white: #ffffff;
}
```

### Changing Fonts
The site uses three fonts:
- **Bebas Neue**: Headlines and titles
- **Space Mono**: Dates and technical text
- **Work Sans**: Body text

To change fonts, edit the Google Fonts link in `index.html` and update `font-family` in `styles.css`.

### Changing the Tagline
Edit `index.html`, find:
```html
<h2>Crypto News and Updates<br><span class="highlight">by Normies for Normies</span></h2>
```

### Adjusting Number of Recent Articles
In `script.js`, find this line:
```javascript
const recentArticles = allArticles.slice(0, 3);
```
Change `3` to show more/fewer recent articles.

## 🔐 Privacy & Security

### Protecting Your Identity
✅ **You're already protected!** This site:
- Has no backend server (runs in browser)
- Stores articles in browser localStorage
- Contains no personal information by default
- Doesn't track visitors

### Additional Privacy Steps
1. **Domain Privacy**: Enable WHOIS privacy with your registrar
2. **Pseudonym**: Use a pen name for articles (add to admin panel if desired)
3. **Contact Email**: Use privacy-focused email (ProtonMail, etc.)
4. **No Personal Details**: Don't mention location, real name, or identifying info

### When Hosting Online
- Articles are stored in browser localStorage (client-side only)
- Consider adding a backend if you need article sync across devices
- For now, manage articles from one device/browser

## 🔧 Technical Details

### How It Works
- **Frontend Only**: Pure HTML/CSS/JavaScript
- **Storage**: Browser localStorage (no database needed)
- **Articles**: JSON format stored locally
- **Search**: Real-time filtering with 300ms debounce
- **Sharing**: Social sharing to Twitter, Reddit, plus link copying

### Browser Compatibility
Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

### Data Persistence
- Articles saved in browser localStorage
- Data persists across browser sessions
- Clearing browser data removes articles (backup important content!)
- Each browser/device has separate storage

## 📱 Mobile Experience

The site is fully responsive and works great on:
- Phones (320px and up)
- Tablets
- Desktop screens
- Large displays (4K)

## 🎯 Next Steps & Ideas

### Future Enhancements
- **Full Article Pages**: Click cards to read full articles
- **Categories**: Filter by blockchain (Ethereum, Solana, etc.)
- **Dark Mode**: Toggle between light/dark themes
- **Newsletter**: Collect email subscribers
- **RSS Feed**: Let readers subscribe via RSS
- **Comments**: Add Disqus or similar for discussions
- **Analytics**: Add privacy-friendly analytics (Plausible, Fathom)

### Backend Options (Optional)
If you want to sync articles across devices:
- **Firebase**: Google's free database service
- **Supabase**: Open-source Firebase alternative
- **MongoDB Atlas**: Free tier available
- **Simple PHP + MySQL**: Traditional approach

## 💡 Tips for Success

1. **Post Consistently**: Aim for your 1 article/day goal
2. **Use Good Images**: Quality visuals increase engagement
3. **Write Catchy Titles**: Make people want to click
4. **Keep Summaries Short**: 1-2 sentences max
5. **Tag Appropriately**: Use 2-4 relevant tags per article
6. **Mix Content Types**: News, education, analysis, opinions
7. **Stay Current**: Cover trending topics in crypto

## 🆘 Troubleshooting

**Articles not showing up?**
- Check browser console for errors (F12)
- Verify localStorage is enabled
- Try different browser

**Admin panel not saving?**
- Make sure all required fields (*) are filled
- Check image URL is valid
- Verify date format is correct

**Search not working?**
- Clear browser cache
- Reload page
- Check JavaScript console for errors

**Images not loading?**
- Verify image URLs are publicly accessible
- Use https:// URLs (not http://)
- Try different image source

## 📞 Support

Since you built this yourself, you're the admin! But here are resources:

- **HTML/CSS**: https://developer.mozilla.org/
- **JavaScript**: https://javascript.info/
- **Hosting Help**: Your hosting provider's support
- **Domain Issues**: Your domain registrar's support

## 🎉 Have Fun!

This is YOUR space to share crypto knowledge and opinions. Write freely, be creative, and enjoy building your crypto news empire!

---

**Built with ❤️ for crypto normies everywhere**

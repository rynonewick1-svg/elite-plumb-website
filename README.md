# Elite Plumb & Gas Website

Professional plumbing and gas fitting website for Coffs Harbour.

## Setup & Deployment

### 1. GitHub & Vercel Setup

1. Create a GitHub repository
2. Clone this project into it
3. Push to GitHub
4. Go to [vercel.com](https://vercel.com) and connect your GitHub repo
5. Set environment variable `RESEND_API_KEY` in Vercel settings

### 2. Email Sending (Resend)

The contact form uses Resend API to send emails. To enable it:

1. Get your Resend API key from [resend.com](https://resend.com)
2. Add to Vercel environment variables as `RESEND_API_KEY`
3. Update the `from` email address in `api/send-email.js` to your domain

**Note:** Resend requires a verified domain. For testing, you can:
- Use the test mode in Resend
- Or temporarily show a success message and require manual follow-up via phone/email

### 3. File Structure

```
elite-plumb/
├── index.html          (Home page)
├── services.html       (Services page)
├── about.html         (About page)
├── contact.html       (Contact form page)
├── styles.css         (Shared styles)
├── app.js             (JavaScript)
├── api/
│   └── send-email.js  (Vercel serverless function)
└── package.json       (Dependencies)
```

### 4. Images & Branding

Currently using placeholder images. To swap:

1. Replace `.image-placeholder` divs with `<img>` tags
2. Add image files to an `images/` folder
3. Update src paths

**Hero image locations:**
- `index.html` - Hero section (1200x600px recommended)
- `services.html` - Each service detail (800x600px)
- `about.html` - Team photo (600x600px)

### 5. Customization

**Colors** (in `styles.css`):
- Primary: `#1F3A5F` (Navy)
- Accent: `#00B4D8` (Teal)

**Contact info** (in HTML files):
- Phone: Update 0402 471 198
- Email: Update elite.pg@outlook.com

**Copy:**
- Edit text directly in HTML files
- No database needed—all static

### 6. Deploy

1. Push changes to GitHub
2. Vercel auto-deploys
3. Your site is live at your domain

### 7. Custom Domain

1. In Vercel settings, add custom domain
2. Update DNS records (follow Vercel instructions)
3. SSL certificate auto-generates

## Quick Wins for Next Version

- [ ] Add real photos (hero, team, service examples)
- [ ] Set up Google Analytics
- [ ] Add Google Business Profile embed
- [ ] Create blog section for SEO
- [ ] Add service pricing
- [ ] Set up automated email confirmations via Resend
- [ ] Add social proof video/testimonials
- [ ] Create mobile app version

## Support

For questions about setup, email ryan@locale.com

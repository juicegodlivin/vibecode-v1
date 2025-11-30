# Vibe-Coded Website Clone

A hilarious parody website scraped from [vibe-coded.lol](https://vibe-coded.lol/) using **Firecrawl MCP**.

## What is this?

This is a perfect clone of the satirical "Every Fucking AI-Coded Website Ever" - a website that brilliantly parodies the cookie-cutter landing pages that people generate using AI assistants like Claude and ChatGPT without understanding the code.

## How was this created?

This was scraped using **Firecrawl MCP** (Model Context Protocol) integrated with Cursor IDE. The entire website was extracted in seconds, including:

- ✅ Full HTML structure
- ✅ All styling (Bootstrap + custom CSS)
- ✅ External links and references
- ✅ Images (via external URLs)
- ✅ JavaScript functionality

## Firecrawl MCP Test Results

**Status:** ✅ **SUCCESS**

The Firecrawl MCP integration worked flawlessly:
- Connected to the Firecrawl API via MCP
- Successfully scraped the entire website
- Retrieved markdown, HTML, and all links
- Used 1 credit from Firecrawl API

## How to View

Simply open `index.html` in any web browser:

```bash
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

Or just double-click the `index.html` file.

## Features (from the original site + enhancements)

- 🧭 **Fixed navigation header** with smooth scrolling
- 📋 **CA Widget** - One-click copy contract address (shows "Soon..." until launch)
- 🎨 **Beautiful gradient backgrounds** (hero section and rainbow gradient "About Us")
- 💎 **$0 Revenue badge**
- ∞ **Technical Debt counter**
- 🔥 **Zero Tests metric**
- 📊 **Ridiculous fake metrics** (99.9% uptime "when localhost is running")
- 🍪 **Satirical cookie consent banner**
- ⚠️ **Leaked password:** `hunter2` (but we only see *******)
- 📁 **"Professional" messy project structure**
- 🔗 **Broken links that go nowhere**
- ⭐ **Fake testimonials** with `{{TEMPLATE_VARIABLES}}`
- 📱 **Responsive design** for mobile devices

## 🚀 Updating the CA (Contract Address) at Launch

When you're ready to launch, simply update line 21 in `index.html`:

```html
<!-- Change this line: -->
<span style="..." id="caText">Soon...</span>

<!-- To your actual CA: -->
<span style="..." id="caText">YourContractAddressHere</span>
```

The widget will automatically enable one-click copy functionality once you replace "Soon..." with the actual address!

## Original Source

Original website: [https://vibe-coded.lol/](https://vibe-coded.lol/)

Created by [Jimmy Koppel](https://x.com/jimmykoppel) as a brilliant satire of AI-generated landing pages.

## Technologies Used

- **Firecrawl MCP**: Web scraping via Model Context Protocol
- **Bootstrap 3**: CSS framework
- **Font Awesome**: Icons
- **Animate.css**: Animations
- **WOW.js**: Scroll animations
- **Unsplash/Picsum**: Random placeholder images

## License

This is a clone for testing/educational purposes. All credit goes to the original creator at vibe-coded.lol.

---

**Built with Firecrawl MCP + Claude + Cursor** 🚀

*Yes, this README was also AI-generated. Meta enough for you?*


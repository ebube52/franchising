# 🚀 Quick Start - Franchise API System

## ⚡ Get Running in 5 Minutes

### Step 1: View Your Website (0 minutes)
```bash
npm run dev
```
Visit http://localhost:5173

**What you'll see:**
- ✅ Franchise Hub with 30+ franchises (local data)
- ✅ "API Manager" button in navigation
- ✅ Fully functional franchise search and quiz

---

### Step 2: Sync Data to Database (1 minute)

1. Click **"API Manager"** button
2. Click **"Sync Local Data to Database"**
3. Wait for "✅ Successfully synced X franchises"
4. Done! Your Supabase database now has all franchises

---

### Step 3: Get API Access (Optional - 2-3 days)

**Email FranChimp:**
```
To: [email protected]
Subject: API Key Request for Franchise Hub

Hi FranChimp team,

I'm building a franchise discovery platform and would like to integrate your API.

Website: [Your URL]
Use case: Helping entrepreneurs find Canadian franchises
Expected usage: ~1,000 API calls/month

Can you provide an API key?

Thanks!
```

**When you receive your key:**
1. Open `.env` file
2. Add: `VITE_FRANCHIMP_API_KEY=your_key_here`
3. Save file
4. Restart dev server
5. Test in API Manager

---

## 📚 Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| **QUICK_START.md** | This file - get started fast | Read first (5 min) |
| **API_SETUP_INSTRUCTIONS.md** | Detailed setup guide | Read second (15 min) |
| **FRANCHISE_API_GUIDE.md** | Complete API reference | Reference as needed |
| **IMPLEMENTATION_SUMMARY.md** | What was built | Understand the system |

---

## 🎯 What Works Right Now

### Without Any API Keys
- ✅ 30+ Canadian franchises (local data)
- ✅ Franchise search and filtering
- ✅ Interactive quiz
- ✅ Admin panel
- ✅ Database caching
- ✅ Full application functionality

### With API Keys (After Setup)
- ✅ Live franchise data from multiple sources
- ✅ Real-time updates
- ✅ Hundreds of franchises
- ✅ Automatic data refresh
- ✅ API monitoring

---

## 🔧 Key Features

### For Users (Home Page)
- Franchise search by industry, investment, region
- Interactive quiz to find best matches
- Detailed franchise profiles
- Contact information
- Investment requirements

### For Admins (API Manager)
- Real-time statistics dashboard
- API connection testing
- Database cache management
- Activity monitoring
- One-click data sync

---

## 💡 Pro Tips

1. **Start with local data** - No setup needed, works immediately
2. **Sync to Supabase** - Better performance, production-ready
3. **Get API keys later** - When you need live data
4. **Monitor costs** - Use cache to reduce API calls
5. **Check admin panel** - Monitor everything in one place

---

## 🆘 Quick Troubleshooting

**Problem:** Can't see API Manager button
**Solution:** Check that navigation is visible, refresh page

**Problem:** Sync fails
**Solution:** Check Supabase credentials in `.env`, verify internet connection

**Problem:** No franchises showing
**Solution:** Click "Sync Local Data to Database" in API Manager

**Problem:** API test fails
**Solution:** Normal without API keys. Add keys to enable.

---

## 📞 Get Help

1. **Browser Console** - Press F12, check for errors
2. **Documentation** - Read `API_SETUP_INSTRUCTIONS.md`
3. **Admin Panel** - Check API logs and statistics
4. **Supabase Dashboard** - Verify database connection

---

## ✅ Success Checklist

Week 1:
- [ ] Run `npm run dev`
- [ ] Visit website
- [ ] Click API Manager
- [ ] Sync local data
- [ ] Browse franchises
- [ ] Test quiz feature

Week 2:
- [ ] Read `FRANCHISE_API_GUIDE.md`
- [ ] Email FranChimp for API key
- [ ] Wait for response

Week 3:
- [ ] Add API key to `.env`
- [ ] Test API connection
- [ ] Monitor usage
- [ ] Optimize cache settings

---

## 🎉 You're Ready!

Your franchise website is **production-ready** right now with local data.

**Next milestone:** Get API keys for live data (optional, enhances system)

**Current status:** ✅ Fully functional

---

**Need more details?** → Read `API_SETUP_INSTRUCTIONS.md`

**Want API info?** → Read `FRANCHISE_API_GUIDE.md`

**Understand the code?** → Read `IMPLEMENTATION_SUMMARY.md`

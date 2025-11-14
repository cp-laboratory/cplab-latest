# Push Notifications Setup Guide

This guide will help you set up Web Push Notifications for the CPLAB application.

## Prerequisites

1. Install the `web-push` package:
```bash
pnpm add web-push
pnpm add -D @types/web-push
```

## Step 1: Generate VAPID Keys

VAPID keys are required for Web Push API authentication.

Run the following command to generate keys:

```bash
npx web-push generate-vapid-keys
```

This will output something like:

```
=======================================
Public Key:
BEl62iUYgUivxIkv69yViEuiBIa-Ib9-S...

Private Key:
6T2a4BH8xxxxxxxxxxxxxxx...
=======================================
```

## Step 2: Add Environment Variables

Create or update your `.env.local` file with the generated keys:

```bash
# VAPID Keys for Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY="BEl62iUYgUivxIkv69yViEuiBIa-Ib9-S..."
VAPID_PRIVATE_KEY="6T2a4BH8xxxxxxxxxxxxxxx..."
VAPID_EMAIL="mailto:your-email@cplab.com"
```

**Important:**
- The public key must have the `NEXT_PUBLIC_` prefix
- Replace with your actual generated keys
- Use a valid email address for VAPID_EMAIL

## Step 3: Implementation Overview

### Backend (Payload CMS)

**Collections Created:**

1. **`notifications`** (Professor Only)
   - Title, body, image, icon, link
   - Send immediately or schedule
   - Tracks sent count and failures
   - Auto-hook to send push when "Send Immediately" is checked

2. **`push-subscriptions`** (Professor Only - View Only)
   - Stores user push subscriptions
   - Automatically managed by the system

**Access Control:**
- Only professors can see and manage these collections
- Students and public users cannot access them

### Frontend Features

**Notification Bell Icon:**
- Located in navbar next to "Contact"
- Shows unread count badge
- Click to view notification history
- Subscribe button if not yet subscribed

**Push Notification Flow:**
1. User clicks bell icon
2. Clicks "Enable Push Notifications"
3. Browser requests permission
4. Subscription saved to database
5. Professor sends notification from admin panel
6. User receives push notification in real-time
7. Click notification → redirects to specified link

## Step 4: How to Send Notifications (For Professors)

1. Log in to Payload CMS admin panel
2. Go to **Notifications** collection
3. Click "Create New"
4. Fill in:
   - **Title**: Notification headline
   - **Body**: Notification message
   - **Image** (optional): Featured image
   - **Icon** (optional): Small icon (defaults to app icon)
   - **Link** (optional): URL to redirect when clicked
5. Check **"Send Immediately"** in sidebar
6. Click "Create"

The notification will be sent to all subscribed users!

## Step 5: Testing

### Test Subscription:

1. Open your app in browser
2. Click the bell icon in navbar
3. Click "Enable Push Notifications"
4. Grant permission when prompted
5. You should see "Successfully subscribed!"

### Test Sending:

1. Go to admin panel
2. Create a new notification
3. Check "Send Immediately"
4. Save
5. You should receive a push notification!

### Verify in Browser DevTools:

```javascript
// Check if service worker is registered
navigator.serviceWorker.getRegistrations()

// Check push subscription
navigator.serviceWorker.ready.then(registration => {
  registration.pushManager.getSubscription().then(sub => {
    console.log('Subscription:', sub)
  })
})
```

## Step 6: Production Deployment

### On Vercel:

1. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
   - `VAPID_PRIVATE_KEY`
   - `VAPID_EMAIL`

2. Deploy your app

3. Test notifications on production

### Browser Compatibility:

✅ Chrome/Edge (Desktop & Mobile)
✅ Firefox (Desktop & Mobile)
✅ Safari (macOS 16.4+ and iOS 16.4+)
❌ Opera Mini

## Troubleshooting

### "Push notifications are not supported"
- User's browser doesn't support Push API
- May be using private/incognito mode
- iOS Safari requires iOS 16.4+

### "Permission denied"
- User denied notification permission
- Need to manually reset permission in browser settings

### Notifications not received
- Check VAPID keys are correct
- Verify subscription is saved in database
- Check browser console for errors
- Ensure service worker is registered

### Subscription fails with 401/403
- VAPID keys mismatch
- Check environment variables are set correctly
- Regenerate VAPID keys and update

## API Endpoints

### Public Endpoints:

- `POST /api/push/subscribe` - Subscribe to notifications
- `GET /api/push/notifications` - Get notification history

### Admin Only (via Payload):

- Send notifications through Payload CMS admin panel

## Security Notes

1. **VAPID Private Key**: Keep secret, never expose in client code
2. **Public Key**: Safe to expose (already prefixed with `NEXT_PUBLIC_`)
3. **Access Control**: Only professors can send notifications
4. **Subscription Privacy**: Only professors can view subscription list

## Features Summary

✅ Real-time push notifications
✅ Notification history in bell panel
✅ Unread count badge
✅ Click notification to redirect
✅ Subscribe/unsubscribe functionality
✅ Professor-only admin access
✅ Works offline (cached in service worker)
✅ Vercel compatible (no Socket.IO needed)
✅ Browser notification permission handling
✅ Auto-cleanup of invalid subscriptions

## Next Steps

1. Install `web-push` package
2. Generate VAPID keys
3. Add keys to `.env.local`
4. Test subscription flow
5. Test sending notifications
6. Deploy to production with environment variables

Happy notifying! 🔔

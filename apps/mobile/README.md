# Mobile App (Expo)

This directory is prepared for the future Expo/React Native mobile application.

## Setup Instructions

When ready to add the mobile app:

```bash
cd apps/mobile
npx create-expo-app@latest . --template tabs
```

## Shared Dependencies

Consider creating a `packages/shared` directory for:
- API client
- TypeScript types
- Shared utilities
- Business logic

## Architecture

The mobile app will share:
- API endpoints with the web app
- Authentication flow
- User management
- Core business logic

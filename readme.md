# ContactsApp

### clone the repository

### Start the server:

- `cd server`

- install dependecies with `npm install`

- `npm start`

### Environment variables

- create file `.env` inside `/ContactsApp` directory (check `.env.example`)
- if you want to test the app on simulator pass `http://localhost:3000/` as `API_URL`
- if you want to test the app on **physical device** pass `http://YOUR_IP_ADDRESS:3000/` as `API_URL`
  (for macOS: `ifconfig | grep "inet " | grep -v 127.0.0.1` filters the output to display only the IPv4 addresses that are currently assigned to the network interfaces)

### Start Expo app (new terminal)

- `cd ContactsApp`
- install dependecies with `yarn`
- start metro bundler with `yarn start` (to start with **clear cache**: `npx expo start -c`)
- press `i` for iOS simulator or `a` for android emulator.
  or
- scan QR code and run the app on `Expo go` app with physical device

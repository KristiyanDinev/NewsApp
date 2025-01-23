### News App
- All the code we touch: all things in `src/` folder. 
!If you know what you are doing then in `package.json`!
!If you know what you are doing then in `ios/` or/and `android/` or/and `src/assets/fonts`!

- Minimum recomendation for screen: `hight 2400px. width 1080px. 6,0" inch screen.`

### Resourses
- for linking `npx react-native-asset`
- https://emojidb.org/search-symbol-emojis
- https://reactnavigation.org/docs/hello-react-navigation?config=static
- Dependencies: `npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-webview`
- Added `android:usesCleartextTraffic="true"` in `android/app/src/main/AndroidManifest.xml`. And created `android/app/src/main/res/xml/network_security_config.xml`

### TODO
- edit news in admin panel
- Route the search results for user
- server has to handle editing news.

### Software Requrements
- NodeJS >= 18
- JDK >= 17

### Platform Requirements
- For Android you can build it on Windows and/or Linux.
- For iOS you can build it on MacOS

### Android
Debug APK
```bash
npm run start
```
- You will find it in `/android/app/build/outputs/debug/app-debug.apk`


Release APK 

```bash
cd android
gradlew assembleRelease
```
- You will find it in `/android/app/build/outputs/release/app-release.apk`


### iOS
Debug
```bash
not for now
```

Release
```bash
not for now
```

### Fixes for some problems for developers
Note: Research online for videos or articles on how to fix it. 

- Android SDK not found.
1. Make file `local.properties` in `/android/local.properties`.
2. Locate where is your Android SDK (You can get one by installing Android Studio).
3. Put the location of the SDK in `local.properties` like this: `sdk.dir=C:\\Android` (in my case the SDK location is in C:\\Android).
Note: Another solution can be to add `ANDROID_HOME` and the location of the SDK in the envirement variables.

- Emulator not found or failed to start.
1. Make sure your device has Virtualization enabled. On Windows: Task Manager->Performance  (look at the CPU and Hyper-V works in other cases). If Virtualization is disabled you can see a video or intructions on how to enable it.
2. Open Android Studio (emulators can run without Android Studio, but in our case we will use Android Studio) and go to far right (by default).
3. You will see `Device Manager` and open it.
4. Click on `+`.
5. Click on `Create Virtual Device`.
6. Select the device.
7. Select `UpsideDownCake`. You can also use other images if you know them.
8. Finish up the setup.
Note: It may ask you to install HAXM. Go for it. If not then you are hopefuly good.

- Emulator has black screen or it is too slow
1. Wipe the date
2. Restart emulator

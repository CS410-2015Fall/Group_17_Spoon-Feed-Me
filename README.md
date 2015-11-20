# Group_17_Spoon-Feed-Me </br>

How To Install/View: </br>
1. Node.js (Node Package Manager npm should come with node install) </br>
2. Install ionic and cordova : "npm install -g cordova ionic" </br>
3. Clone repo </br>
4. Navigate to cloned folder </br>
    - To view on the browser : "ionic serve" </br>
    - To emulate on android  : "ionic build android", "ionic run android" </br>
        - You will need to install the Android SDK, then specify an AVD (Android Virtual Device) otherwise this won't work
</br>

## Cordova Plugins </br>
In order to run the app locally in your dev environment, you may need to install the plugins listed below. In order to do this, navigate to the root SpoonFeedMe ionic project folder, and run the following commands: 

* Text to speech: ```cordova plugin add cordova-plugin-tts```
* Whitelist: ```cordova plugin add cordova-plugin-whitelist```
* Voice Recognition ```cordova plugin add https://github.com/milestester/SpeechRecognitionPlugin```

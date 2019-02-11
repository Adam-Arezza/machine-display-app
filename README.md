# vue_hmi_app
This is a minimal machine monitoring application using mqtt and socket.io as the main communications protocols.
It can be used to display machine information from any mqtt enabled HMI/PLC device. The mqtt protocol uses a publisher/subscriber communication which goes through a 'broker'. In this case the broker was the HMI device itself and the application connects via IP and Port of the HMI on the network. 

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Start the express server
npm start

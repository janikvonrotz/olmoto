# olmoto

Create secret events and share photos with your friends.

* Stores photos on Dropbox.
* Invite users by email.
* Mobile first ui.
* Deployable to heroku, modulus other other Meteor supporting services.

# Configure and Run

* Copy `settings.json` to `settings-dev.json` and update the copy.
* Run `npm run dev`.
* Login with this url `http://localhost:3000/login/admin@olmoto.com/password`.

# Todo

* Event view - GoogleMaps
* File edit - Cover change (there can be only the one)
* User - expand form
* User - delete
* React Helmet with viewport 1
* Responsive File GridList
* Configure route not found

# Bug

* Event list - fallback for events without category or make category required
* Do not login when creating a new user -> create user server side with method

# Done

* Access control file: all, user: admin, event: admin
* User action logging
* Next and Previous navigation - add componentWillReceiveProps for spinner loading
* 2 files goto previous not working
* File edit - Spinner
* User - check if is admin by method on client startup

# Security risk

* user_id can be faked on client side logging.
* authenticated user have right to update event (participation is updated client side)

# Ressources

Meteor environment variables
https://www.eventedmind.com/items/meteor-what-is-meteor-bindenvironment

Meteor wrap async
https://www.eventedmind.com/items/meteor-meteor-wrapasync

Login and Redirect with Flowrouter
https://medium.com/@satyavh/using-flow-router-for-authentication-ba7bb2644f42#.bskh7ph8k

Switch case alternative
https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/

key press handling for react components
https://github.com/glortho/react-keydown
https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy

Sort not working in publication
http://stackoverflow.com/questions/15153349/meteor-subscribe-doesnt-update-sort-order-of-collection

Get next and previous
http://stackoverflow.com/questions/25130237/meteor-collection-get-previous-and-next-item

Dropbox uploads
https://github.com/VeliovGroup/Meteor-Files/wiki/DropBox-Integration

Redux and mantra
https://medium.com/@sammkj/redux-in-mantra-6f840b0413ea#.ptne1b2of
https://github.com/saschb2b/meteor-mantra-react-redux-kickstarter

Generator
https://github.com/mantrajs/mantra-cli

UI
http://www.material-ui.com/

Grid
https://github.com/roylee0704/react-flexbox-grid

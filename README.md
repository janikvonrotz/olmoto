# OLMOTO

Create events and share photos with your friends.

* Stores photos on Dropbox.
* Invite users simply by email.

![](https://raw.githubusercontent.com/RenoMeyer/olmoto/master/screenshot.png)

Technical features

* Access control for methods, publications and routing.
* Ready for deployment to heroku.
* Mobile first ui with material design.
* Fulltext search everywhere.
* File upload with Meteor-Files.
* Keyboard navigation in single views.

# Configure and Run

* Copy `settings.json` to `settings-dev.json` and update the copy.
* Run `npm run dev`.
* Login with this url `http://localhost:3000/login/admin@olmoto.com/password`.

# Deploy

* Install heroku toolbelt and make it ready for deployment.
* Copy `settings.json` to `settings-prod.json` and update the copy.
* Run `npm run deploy`.

# Todo

* Style file_list
* All innline styles to const styles
* On user delete remove participations in events
* Filter old events
* Download Button for Pictures

# Bug

* Reactive participants counter on event list (action is not fired, goes straight to detail view)

# Done

* Mobile event view does not load (edit works fine) -> lags a lot.
* Fix user search
* Update header title and appbar with Redux
* Design email for user inviations
* Participants list in event (Chips)
* New user doesn't work (probably because of the mail)
* Configure smtp adress for send mail on heroku
* Theme the app and MarkdownEditor
* Event view - GoogleMaps
* Add Roboto font
* Add file version preview
* Update button and position on every view and make sure structure of Cards are valid
* Pages -> Page title="home" -> if not exist create page (check is sub) and show Draft.js Editor with markdown to render the page. With picture upload (drag and drop and paste) usage: page.
* Changing album of covers in file list has no effect
* User delete
* Configure route not found
* Delete old cover when adding a new
* Add file loader component (Img src)
* Ablums for every event, add picture type cover -> move it to different subfolder on dropbox
* Event list - fallback for events without category or make category required
* File edit - Cover change (there can be only the one)
* Responsive File GridList
* Load spinner for cover image
* React Helmet with viewport 1
* Do not login when creating a new user -> create user server side with method
* User - expand form
* Access control file: all, user: admin, event: admin
* User action logging
* Next and Previous navigation - add componentWillReceiveProps for spinner loading
* 2 files goto previous not working
* File edit - Spinner
* User - check if is admin by method on client startup

# Security risk

* user_id can be faked on client side for logging.
* authenticated user have right to update event (participation is updated client side)
* user credentials are passed in get request.

# Resources

Wait for user to load
http://stackoverflow.com/questions/34751753/how-to-make-flowrouter-wait-for-users-collection-on-the-client

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

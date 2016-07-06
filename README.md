# olmoto

Create secret events and share photos with your friends.

# Configure and Run

* Copy `settings.json` to `settings-dev.json` and update the copy.
* Run `npm run dev`.
* Login with this url `http://localhost:3000/login/admin@olmoto.com/password`.

# notes

One page to create new user
Firstname, Lastname, Mail, Password Random.id(), Admin
Login by url, very insecure without SSL!
/login?mail=user@test.com?password=43k5jd4fd23gfd -> EventPage
Redirect if logged In.

For every picture select album (event).
Add album Property for FilePage. If set filter pictures by album.

Store subscriptions in user object.
Get user list by Id
On Participate store count of participants in event -> inc or dec

# Ressources

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

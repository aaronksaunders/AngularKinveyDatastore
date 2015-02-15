AngularJS Bootstrap Example for Querying Data w/Kinvey
===========

For this sample to work, you must create an account in Kinvey and update the constants declared in the `app.js` file.

You will also need to create a collection name `Devices` and add `first_col` and `second_col` and columns in the collection.

And finally you will need to have created a user object so you can log in to your application.

```JavaScript
app.constant("KINVEY", {
    "APPINFO": {
        "appId" : "YOUR APP ID",
        "appSecret" : "YOUR APP SECRET VALUE"
    }
});
```